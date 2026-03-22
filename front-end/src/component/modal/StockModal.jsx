import React from "react";
import Modal from "./modal";

const StockModal = ({
  title,
  onSubmit,
  onClose,
  products,
  selectedProduct,
  setSelectedProduct,
  quantity,
  setQuantity,
  reference,
  setReference,
  remarks,
  setRemarks
}) => {
  return (
    <Modal title={title} onClose={onClose}>

      <div className="space-y-3">

        <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)} className="input" >
          <option value="">Select Product</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} (Stock: {p.current_stock})
            </option>
          ))}
        </select>
        <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="input" />
        <input type="text" placeholder="Reference" value={reference} onChange={(e) => setReference(e.target.value)} className="input" />
        <input type="text" placeholder="Remarks" value={remarks} onChange={(e) => setRemarks(e.target.value)} className="input" />
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

export default StockModal;