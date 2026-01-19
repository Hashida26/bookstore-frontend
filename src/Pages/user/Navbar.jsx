import { useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { useSelector } from "react-redux";
import SearchBar from "./Searchbar";
import logo from "../../assets/book logo.png";
import { AuthContext } from "../../context/Authcontext";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const { user, setUser } = useContext(AuthContext);
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setShowProfileMenu(false);
    navigate("/login");
  };

  /* CLOSE PROFILE DROPDOWN ON OUTSIDE CLICK */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* REDUX CART */
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((t, i) => t + i.qty, 0);

  return (
    <>
      {/* ================= TOP BAR ================= */}
      <div className="w-full bg-[#99ca3b] text-white text-xs md:text-sm py-2 px-[5%] flex justify-between sticky top-0 z-50">
        <p className="font-medium">📞 Toll Free: 1800-425-1234</p>

        <div className="hidden md:flex gap-6 items-center relative">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowProfileMenu((p) => !p)}
                className="flex items-center gap-2 font-semibold hover:text-gray-200"
              >
                <User size={18} />
                {user}
              </button>

              {/* PROFILE DROPDOWN */}
              <div
                className={`absolute right-0 mt-3 w-52 bg-white text-gray-700
                rounded-md shadow-xl z-[999] transition-all duration-200
                ${showProfileMenu ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
              >
                {role === "user" && (
                  <>
                    <Link to="/account" className="block px-4 py-2 hover:bg-gray-100">
                      My Account
                    </Link>
                    <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100">
                      My Orders
                    </Link>
                  </>
                )}

                {role === "admin" && (
                  <>
                    <Link to="/admin/dashboard" className="block px-4 py-2 hover:bg-gray-100">
                      Admin Dashboard
                    </Link>
                    <Link to="/admin/books" className="block px-4 py-2 hover:bg-gray-100">
                      Manage Books
                    </Link>
                    <Link to="/admin/orders" className="block px-4 py-2 hover:bg-gray-100">
                      Manage Orders
                    </Link>
                  </>
                )}

                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-red-500 border-t hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          )}
        </div>
      </div>

      {/* ================= MAIN NAVBAR ================= */}
      <nav className="w-full bg-white border-b sticky top-[36px] z-40">
        <div className="flex items-center justify-between px-[5%] py-3">
          <button className="md:hidden" onClick={() => setIsSidebarOpen(true)}>
            <Menu size={28} />
          </button>

          {/* LOGO + BRAND NAME */}
         <Link to="/" className="flex items-center gap-3">
  <img
    src={logo}
    alt="PENTIP Online Bookstore"
    className="w-12 h-12 object-contain"
  />

  <div className="leading-tight">
    <span className="font-extrabold text-xl tracking-wide text-gray-800">
      PEN<span className="text-[#99ca3b]">TIP</span>
    </span>
    <p className="text-[11px] text-gray-500 font-medium">
      Online Bookstore
    </p>
  </div>
</Link>

          

          <div className="hidden md:flex w-[40%]">
            <SearchBar />
          </div>

          <Link to="/cart" className="relative hidden md:block">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <button onClick={() => setShowMobileSearch(true)} className="md:hidden">
            <Search size={26} />
          </button>
        </div>
      </nav>

      {/* ================= DESKTOP LINKS BAR ================= */}
      <div className="hidden md:flex w-full bg-white sticky top-[96px] z-30 border-b">
        <div className="max-w-7xl mx-auto w-full px-12 py-4 flex justify-between text-gray-600 font-semibold">
          <Link to="/">Home</Link>
          <Link to="/books">Books</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>

      {/* ================= MOBILE SIDEBAR ================= */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-[1000]" onClick={() => setIsSidebarOpen(false)}>
          <div className="w-[75%] h-full bg-white p-6" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setIsSidebarOpen(false)}>
              <X size={28} />
            </button>

            <div className="flex flex-col gap-6 text-lg mt-6">
              <Link to="/">Home</Link>
              <Link to="/books">Books</Link>
              <Link to="/categories">Categories</Link>

              {user ? (
                <>
                  {role === "admin" && <Link to="/admin/dashboard">Admin Dashboard</Link>}
                  <button onClick={logout} className="text-left text-red-500">
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= MOBILE BOTTOM NAV ================= */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#99ca3b] text-white py-2 flex justify-around z-50">
        <Search size={26} />
        <Link to="/cart" className="relative">
          <ShoppingCart size={26} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-3 bg-white text-red-500 text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
        <Link to={user ? "/account" : "/login"}>
          <User size={26} />
        </Link>
      </div>
    </>
  );
}
