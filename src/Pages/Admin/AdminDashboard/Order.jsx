import { useEffect, useState } from "react";
import axios from "axios";
import { Eye } from "lucide-react";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 TEMP DUMMY DATA (replace with API later)
  useEffect(() => {
    setTimeout(() => {
      setOrders([
        {
          _id: "ORD001",
          user: "Afsal Rahman",
          total: 1299,
          status: "pending",
          date: "2025-02-10",
        },
        {
          _id: "ORD002",
          user: "Hashida",
          total: 799,
          status: "delivered",
          date: "2025-02-09",
        },
        {
          _id: "ORD003",
          user: "Rashid",
          total: 499,
          status: "cancelled",
          date: "2025-02-08",
        },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const statusStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "delivered":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">

      {/* CARD */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">

        {/* HEADER */}
        <div className="px-6 py-4 bg-linear-to-r from-green-700 to-green-600">
          <h2 className="text-white text-sm font-semibold tracking-wide">
            Orders
          </h2>
          <p className="text-green-100 text-xs">
            View and manage customer orders
          </p>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wide">
              <tr>
                <th className="px-6 py-3 text-left">Order ID</th>
                <th className="px-6 py-3 text-left">Customer</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Total</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-gray-500">
                    Loading orders...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-gray-500">
                    No orders found
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-t hover:bg-green-50 transition"
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {order._id}
                    </td>

                    <td className="px-6 py-4 text-gray-700">
                      {order.user}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {order.date}
                    </td>

                    <td className="px-6 py-4 font-semibold text-green-700">
                      ₹{order.total}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <button
                        className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                        title="View Order"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}
