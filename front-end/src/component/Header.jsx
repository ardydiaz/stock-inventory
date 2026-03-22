import React from "react";

const Header = ({ setShowAddProduct, setShowStockIn, setShowStockOut }) => {
  return (
    <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Inventory Dashboard</h1>

        <div className="flex gap-2">
          <button onClick={() => setShowAddProduct(true)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow">
            Add Product
          </button>
          <button onClick={() => setShowStockIn(true)} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow">
            Stock In
          </button>
          <button onClick={() => setShowStockOut(true)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow">
            Stock Out
          </button>
        </div>
    </div>
  )
}
export default Header;