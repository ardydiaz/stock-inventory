import { useEffect, useState } from "react";
import Header from "./Header";
import ProductTable from "./ProductTable";
import MovementsTable from "./MovementsTable";
import ProductModal from "./modal/ProductModal";
import StockModal from "./modal/StockModal";
import api from "../api/axios";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showStockIn, setShowStockIn] = useState(false);
  const [showStockOut, setShowStockOut] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(false);
  
  //Search & Filter states
  const [searchName, setSearchName] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  
  // STOCK STATES
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [reference, setReference] = useState("");
  const [remarks, setRemarks] = useState("");
  
  // ADD PRODUCT STATES
  const [newName, setNewName] = useState("");
  const [newSku, setNewSku] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newStock, setNewStock] = useState("");
  
  // EDIT PRODUCT STATES
  const [editId, setEditId] = useState("");
  const [editName, setEditName] = useState("");
  const [editSku, setEditSku] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editStock, setEditStock] = useState("");
  const [editStatus, setEditStatus] = useState(true);

  //delete product state
  const [showDeleted, setShowDeleted] = useState(false);


  // FETCH WITH FILTER
  const fetchData = async () => {
    try {
      const [productsRes, movementsRes] = await Promise.all([
        api.get("/products", {
          params: {
            name: searchName || undefined,
            min_price: minPrice || undefined,
            max_price: maxPrice || undefined,
            deleted: showDeleted ? "only" : undefined, 
          },
        }),
        api.get("/inventory/movements"),
      ]);
      setProducts(productsRes.data.data);
      setMovements(movementsRes.data.data);
    } catch (err) {
      console.error(err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

// DELETE PRODUCT (Soft Delete)
  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await api.delete(`/products/delete/${id}`);
      alert(res.data.message);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete product");
    }
  };
 
  // RESTORE PRODUCT
  const handleRestoreProduct = async (id) => {
        try {
            const res = await api.put(`/products/restore/${id}`);
            alert(res.data.message);
            fetchData(); // refresh table
        } catch (err) {
            alert(err.response?.data?.message || "Failed to restore product");
        }
  };

  // fetch and auto search when filters change
  useEffect(() => { fetchData(); },  [searchName, minPrice, maxPrice, showDeleted]);

  const handleStock = async (type) => {
    try {
      const endpoint = type === "in" ? "/inventory/stock-in" : "/inventory/stock-out";
      const res = await api.post(endpoint, {
        product_id: selectedProduct,
        quantity: parseInt(quantity),
        reference,
        remarks,
      });
      alert(res.data.message);
      fetchData();
      setShowStockIn(false); setShowStockOut(false);
      setSelectedProduct(""); setQuantity(""); setReference(""); setRemarks("");
    } catch (err) {
      alert(err.response?.data?.message || "Stock operation failed");
    }
  };

  const handleAddProduct = async () => {
    try {
      const res = await api.post("/add-products", {
        name: newName,
        sku: newSku,
        category: newCategory,
        price: parseFloat(newPrice),
        current_stock: parseInt(newStock),
        status: true,
      });
      alert(res.data.message || "Product added");
      fetchData();
      setShowAddProduct(false);
    } catch (err) {
        if (err.response?.data?.errors?.sku) {
            alert(err.response.data.errors.sku[0]); // show exact SKU error
        } else if (err.response?.data?.message) {
            alert(err.response.data.message); // general error
        } else {
            alert("Failed"); // fallback
        }
    }
  };

  const openEditModal = (product) => {
    setEditId(product.id);
    setEditName(product.name);
    setEditSku(product.sku);
    setEditCategory(product.category);
    setEditPrice(product.price);
    setEditStock(product.current_stock);
    setEditStatus(product.status);
    setShowEditProduct(true);
  };

  const handleUpdateProduct = async () => {
    try {
      const res = await api.put(`/products/update/${editId}`, {
        name: editName,
        sku: editSku,
        category: editCategory,
        price: parseFloat(editPrice),
        current_stock: parseInt(editStock),
        status: editStatus,
      });
      alert(res.data.message || "Updated");
      fetchData();
      setShowEditProduct(false);
    } catch (err) {
      alert(err.response?.data?.error || "Failed");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
       <Header setShowAddProduct={setShowAddProduct} setShowStockIn={setShowStockIn} setShowStockOut={setShowStockOut}/>

       <div className="mb-4 flex items-center gap-2">
        <input
            type="checkbox"
            checked={showDeleted}
            onChange={() => setShowDeleted(!showDeleted)}
            className="form-checkbox"
        />
        <label>Show Deleted Products</label>
        </div>

      {/* PRODUCTS */}
      <ProductTable products={products} openEditModal={openEditModal} searchName={searchName} setSearchName={setSearchName} minPrice={minPrice} setMinPrice={setMinPrice} maxPrice={maxPrice} setMaxPrice={setMaxPrice} onDeleteProduct={handleDeleteProduct} onRestoreProduct={handleRestoreProduct} showDeleted={showDeleted} />

      {/* MOVEMENTS */}
      <MovementsTable movements={movements} />


      {/* MODALS */}
      {showStockIn && <StockModal title="Stock In" onSubmit={() => handleStock("in")} onClose={() => setShowStockIn(false)} products={products} selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} quantity={quantity} setQuantity={setQuantity} reference={reference} setReference={setReference} remarks={remarks} setRemarks={setRemarks} />}
      {showStockOut && <StockModal title="Stock Out" onSubmit={() => handleStock("out")} onClose={() => setShowStockOut(false)} products={products} selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} quantity={quantity} setQuantity={setQuantity} reference={reference} setReference={setReference} remarks={remarks} setRemarks={setRemarks} />}
      {showAddProduct && <ProductModal title="Add Product" onSubmit={handleAddProduct} onClose={() => setShowAddProduct(false)} name={newName} setName={setNewName} sku={newSku} setSku={setNewSku} category={newCategory} setCategory={setNewCategory} price={newPrice} setPrice={setNewPrice} stock={newStock} setStock={setNewStock} />}
      {showEditProduct && <ProductModal title="Edit Product" onSubmit={handleUpdateProduct} onClose={() => setShowEditProduct(false)} name={editName} setName={setEditName} sku={editSku} setSku={setEditSku} category={editCategory} setCategory={setEditCategory} price={editPrice} setPrice={setEditPrice} stock={editStock} setStock={setEditStock} />}
    </div>
  );
}
