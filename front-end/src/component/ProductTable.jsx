import React from "react";

    const ProductTable = ({ products, openEditModal, searchName, setSearchName, minPrice, setMinPrice, maxPrice, setMaxPrice, onDeleteProduct, onRestoreProduct, showDeleted,}) => {
       
        return (
        <div className="bg-white shadow-md rounded-xl p-6 mb-8">
           <div className="flex flex-wrap gap-3 mb-4">

                <input
                    type="text"
                    placeholder="Search product name..."
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-lg"
                />

                <input
                    type="number"
                    placeholder="Min price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-lg"
                />

                <input
                    type="number"
                    placeholder="Max price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-lg"
                />
         </div>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Products</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-600 text-center">
            <thead className="bg-gray-100 text-xs uppercase">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">SKU</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Stock</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>

            <tbody>
                        {showDeleted && products.filter(p => p.deleted_at).length === 0 ? (
                            <tr>
                            <td colSpan={6} className="px-6 py-3 text-center text-red-500">
                                No deleted products found
                            </td>
                            </tr>
                        ) : (
                    products
                    .filter(p => showDeleted ? p.deleted_at : !p.deleted_at)
                    .map((p) => (
                    <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-6 py-3">{p.id}</td>
                        <td className="px-6 py-3">{p.name}</td>
                        <td className="px-6 py-3">{p.sku}</td>
                        <td className="px-6 py-3 text-green-600 font-semibold">₱{p.price}</td>

                        <td className="px-6 py-3">
                        <span
                            className={`px-2 py-1 text-xs rounded-full ${
                            p.current_stock < 10
                                ? "bg-red-100 text-red-600"
                                : "bg-green-100 text-green-600"
                            }`}
                        >
                            {p.current_stock}
                        </span>
                        </td>

                        <td className="px-6 py-3 flex gap-2 justify-center">
                        {!p.deleted_at ? (
                            <>
                            <button
                                onClick={() => openEditModal(p)}
                                className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded shadow text-xs"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => onDeleteProduct(p.id)}
                                className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded shadow text-xs"
                            >
                                Delete
                            </button>
                            </>
                        ) : (
                            <button
                            onClick={() => onRestoreProduct(p.id)}
                            className="bg-green-400 hover:bg-green-500 text-white px-3 py-1 rounded shadow text-xs"
                            >
                            Restore
                            </button>
                        )}
                        </td>
                    </tr>
                    ))
                )}
                </tbody>

          </table>
        </div>
      </div>
    );
}

export default ProductTable;