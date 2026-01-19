
export default function Orders() {
  const orders = [
    {
      id: "ORD123456",
      date: "12 Sep 2025",
      total: "₹499",
      status: "Delivered",
    },
    {
      id: "ORD123457",
      date: "25 Sep 2025",
      total: "₹799",
      status: "Shipped",
    },
  ];

  const statusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Shipped":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="w-full max-w-5xl">

      {/* HEADER */}
      <div className="bg-green-700 text-white px-6 py-3">
        <h2 className="text-[14px] font-semibold tracking-wide">
          My Orders
        </h2>
      </div>

      {/* CARD */}
      <div className="bg-white border border-gray-200">

        {/* TABLE HEADER */}
        <div className="grid grid-cols-5 gap-4 px-6 py-3 text-[12px] font-medium text-gray-600 border-b">
          <div>Order ID</div>
          <div>Date</div>
          <div>Total</div>
          <div>Status</div>
          <div>Action</div>
        </div>

        {/* ROWS */}
        {orders.map((order) => (
          <div
            key={order.id}
            className="grid grid-cols-5 gap-4 px-6 py-4 text-[13px] border-b last:border-b-0"
          >
            <div className="font-medium">{order.id}</div>
            <div>{order.date}</div>
            <div>{order.total}</div>
            <div>
              <span
                className={`px-3 py-1 rounded-full text-[11px] font-medium ${statusColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>
            <div>
              <button className="text-green-700 hover:underline text-sm">
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

