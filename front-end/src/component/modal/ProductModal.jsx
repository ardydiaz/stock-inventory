import React from "react";
import { useState } from "react";
import Modal from "./modal";

const ProductModal = (props) => {
  const {
    title,
    onSubmit,
    onClose,
    name,
    setName,
    sku,
    setSku,
    category,
    setCategory,
    price,
    setPrice,
    stock,
    setStock
  } = props;
  const [errors, setErrors] = useState({}); 
  return (
    <Modal title={title} onClose={onClose}>
      
      <div className="space-y-3">
        <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} className="input"/>
        <input type="text" placeholder="SKU" value={sku} onChange={(e) => setSku(e.target.value)} className={`input border rounded-lg w-full px-3 py-2 ${errors?.sku ? "border-red-500" : "border-gray-200"}`}/>
          {errors?.sku && <p className="text-red-500 text-sm mt-1">{errors.sku[0]}</p>}
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} className="input" />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} className="input" />
        <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} className="input" />
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button onClick={onClose} className="btn-secondary">
          Cancel
        </button>
        <button onClick={onSubmit} className="btn-primary">
          Submit
        </button>
      </div>

    </Modal>
  );
};

export default ProductModal;