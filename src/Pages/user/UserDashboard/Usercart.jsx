import { useState } from "react";
import Swal from "sweetalert2";

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "The Power of Habit",
      price: 499,
      qty: 1,
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=100",
    },
    {
      id: 2,
      title: "Atomic Habits",
      price: 399,
      qty: 2,
      image:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=100",
    },
  ]);

  const increaseQty = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    Swal.fire({
      title: "Remove item?",
      text: "This item will be removed from your cart",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#15803d",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove",
    }).then((result) => {
      if (result.isConfirmed) {
        setCartItems((items) => items.filter((item) => item.id !== id));
      }
    });
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="w-full max-w-5xl">

      {/* HEADER */}
      <div className="bg-green-700 text-white px-6 py-3">
        <h2 className="text-[14px] font-semibold tracking-wide">
          My Cart
        </h2>
      </div>

      {/* CARD */}
      <div className="bg-white border border-gray-200 p-6">

        {cartItems.length === 0 ? (
          <p className="text-sm text-gray-500">
            Your cart is empty.
          </p>
        ) : (
          <>
            {/* ITEMS */}
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-20 object-cover border"
                    />

                    <div>
                      <p className="text-sm font-medium">
                        {item.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        ₹{item.price}
                      </p>
                    </div>
                  </div>

                  {/* QTY */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="px-2 border"
                    >
                      −
                    </button>
                    <span className="text-sm">{item.qty}</span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="px-2 border"
                    >
                      +
                    </button>
                  </div>

                  {/* REMOVE */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* SUMMARY */}
            <div className="mt-8 flex justify-end">
              <div className="w-72 border p-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Delivery</span>
                  <span className="text-green-700">FREE</span>
                </div>
                <hr />
                <div className="flex justify-between font-semibold mt-2">
                  <span>Total</span>
                  <span>₹{subtotal}</span>
                </div>

                <button className="w-full mt-4 bg-black text-white py-2 text-sm hover:bg-gray-800">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
