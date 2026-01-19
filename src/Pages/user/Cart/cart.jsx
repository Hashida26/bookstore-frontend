import { Trash2, Minus, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
} from "../../../Redux/Cartslice";

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  /* ================= CONFIRM ================= */
  const confirmRemove = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Remove this book?",
      showCancelButton: true,
      confirmButtonText: "Remove",
      confirmButtonColor: "#dc2626",
    }).then((res) => {
      if (res.isConfirmed) dispatch(removeFromCart(id));
    });
  };

  const confirmClearCart = () => {
    Swal.fire({
      icon: "warning",
      title: "Clear entire cart?",
      showCancelButton: true,
      confirmButtonText: "Clear Cart",
      confirmButtonColor: "#dc2626",
    }).then((res) => {
      if (res.isConfirmed) dispatch(clearCart());
    });
  };

  /* ================= TOTALS ================= */
  const totalQty = cartItems.reduce((t, i) => t + i.qty, 0);
  const totalPrice = cartItems.reduce(
    (t, i) => t + i.price * i.qty,
    0
  );

  return (
    <div className="min-h-screen bg-[#f1f3f6] px-4 md:px-10 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ================= LEFT ================= */}
        <div className="lg:col-span-2 space-y-5">

          {/* HEADER */}
          <div className="bg-white rounded-xl shadow-sm px-5 py-4">
            <h2 className="text-sm font-semibold text-gray-800">
              My Cart ({totalQty})
            </h2>
          </div>

          {/* EMPTY */}
          {cartItems.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm p-10 text-center text-sm text-gray-500">
              Your cart is empty
            </div>
          )}

          {/* CART CARDS */}
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="
                bg-gradient-to-b from-white to-gray-50
                rounded-xl shadow-md
                hover:shadow-lg transition
                px-5 py-5
                flex gap-5 items-start
              "
            >
              {/* IMAGE */}
              <img
                src={item.image || "/placeholder-book.png"}
                alt={item.title}
                onClick={() => navigate(`/book/${item.id}`)}
                className="
                  w-20 h-28 object-cover rounded-lg
                  cursor-pointer
                  hover:scale-105 transition
                "
              />

              {/* DETAILS */}
              <div className="flex-1">
                <h3
                  onClick={() => navigate(`/book/${item.id}`)}
                  className="
                    text-sm font-medium text-gray-800
                    cursor-pointer
                    hover:text-indigo-600
                  "
                >
                  {item.title}
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                  {item.author}
                </p>

                <p className="text-sm font-semibold text-gray-900 mt-2">
                  ₹{item.price}
                </p>

                {/* QUANTITY */}
                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={() => dispatch(decreaseQty(item.id))}
                    className="
                      w-8 h-8 rounded-full
                      border bg-white
                      hover:bg-indigo-600 hover:text-white
                      transition shadow-sm
                    "
                  >
                    <Minus size={13} className="mx-auto" />
                  </button>

                  <span
                    className="
                      min-w-[38px]
                      text-center text-sm font-semibold
                      px-2 py-1
                      bg-indigo-50 text-indigo-700
                      rounded-md shadow-sm
                    "
                  >
                    {item.qty}
                  </span>

                  <button
                    onClick={() => dispatch(increaseQty(item.id))}
                    className="
                      w-8 h-8 rounded-full
                      border bg-white
                      hover:bg-indigo-600 hover:text-white
                      transition shadow-sm
                    "
                  >
                    <Plus size={13} className="mx-auto" />
                  </button>
                </div>
              </div>

              {/* REMOVE */}
              <button
                onClick={() => confirmRemove(item.id)}
                className="
                  p-2.5 rounded-full
                  bg-red-50 text-red-600
                  shadow-sm
                  hover:bg-red-600 hover:text-white
                  transition
                "
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}

          {/* CLEAR CART */}
          {cartItems.length > 0 && (
            <button
              onClick={confirmClearCart}
              className="
                w-fit px-6 py-2.5
                rounded-full
                bg-red-50 text-red-600
                text-xs font-semibold
                shadow-sm
                hover:bg-red-600 hover:text-white
                transition
              "
            >
              Clear Cart
            </button>
          )}
        </div>

        {/* ================= RIGHT ================= */}
        {cartItems.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-5 h-fit sticky top-24">
            <h2 className="text-xs font-semibold text-gray-500 mb-4">
              PRICE DETAILS
            </h2>

            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Items ({totalQty})</span>
                <span>₹{totalPrice}</span>
              </div>

              <div className="flex justify-between">
                <span>Discount</span>
                <span className="text-green-600">-₹50</span>
              </div>

              <hr />

              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{Math.max(totalPrice - 50, 0)}</span>
              </div>
            </div>

            {/* BUY */}
            <button
              onClick={() => navigate("/login")}
              className="
                w-full mt-5 py-2.5
                rounded-full
                bg-[#fb641b] text-white
                text-sm font-medium
                shadow-md
                hover:bg-white hover:text-[#fb641b] hover:border
                transition
              "
            >
              PLACE ORDER
            </button>

            <Link to="/books">
              <button
                className="
                  w-full mt-3 py-2
                  rounded-full border
                  text-xs
                  hover:bg-gray-900 hover:text-white
                  transition
                "
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
