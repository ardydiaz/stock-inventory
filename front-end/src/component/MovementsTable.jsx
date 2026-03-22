import React from "react";

const MovementsTable = ({ movements }) => {
   return (
          <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Inventory Movements</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-600 text-center">
            <thead className="bg-gray-100 text-xs uppercase">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Qty</th>
                <th className="px-6 py-3">Reference</th>
                <th className="px-6 py-3">Remarks</th>
                <th className="px-6 py-3">Date</th>
              </tr>
            </thead>

            <tbody>
              {movements.map((m) => (
                <tr key={m.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-3">{m.id}</td>
                  <td className="px-6 py-3">{m.product?.name}</td>

                  <td className="px-6 py-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      m.type === "in" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    }`}>
                      {m.type.toUpperCase()}
                    </span>
                  </td>

                  <td className="px-6 py-3 font-semibold">{m.quantity}</td>
                  <td className="px-6 py-3">{m.reference}</td>
                  <td className="px-6 py-3">{m.remarks}</td>
                  <td className="px-6 py-3 text-gray-500">
                    {new Date(m.movement_date).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
   );
}

export default MovementsTable;