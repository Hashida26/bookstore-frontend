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

  /* ================= HELPERS ================= */
  const closeSidebar = () => setIsSidebarOpen(false);

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setShowProfileMenu(false);
    closeSidebar();
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
      {/*  TOP BAR  */}
      <div className="w-full bg-[#99ca3b] text-white text-xs md:text-sm py-2 px-[5%] flex justify-between sticky top-0 z-50">
        <p className="font-medium">📞 Toll Free: 1800-425-1234</p>

        <div className="hidden md:flex gap-6 items-center relative">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowProfileMenu((p) => !p)}
                className="flex items-center gap-2 font-semibold"
              >
                <User size={18} />
                {user}
              </button>

              <div
                className={`absolute right-0 mt-3 w-52 bg-white text-gray-700 rounded-md shadow-xl z-[999]
                transition-all ${showProfileMenu ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
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

      {/*  MAIN NAVBAR */}
      <nav className="w-full bg-white border-b sticky top-[36px] z-30">
        <div className="flex items-center justify-between px-[5%] py-3">
          <button className="md:hidden" onClick={() => setIsSidebarOpen(true)}>
            <Menu size={28} />
          </button>

          <Link to="/" className="flex items-center gap-3">
            <div>
              <span className="font-extrabold text-xl">
                PEN<span className="text-[#99ca3b]">TIP</span>
              </span>
              <p className="text-[11px] text-gray-500">Online Bookstore</p>
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

         {!showMobileSearch && (
  <button onClick={() => setShowMobileSearch(true)} className="md:hidden">
    <Search size={26} />
  </button>
)}

        </div>
      </nav>

      {/* ================= MOBILE SEARCH ================= */}
      {showMobileSearch && (
        <div
          className="fixed inset-0 bg-black/40 z-[9999] flex items-start justify-center pt-24 md:hidden"
          onClick={() => setShowMobileSearch(false)}
        >
          <div
            className="bg-white w-[90%] rounded-xl p-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-3 top-3"
              onClick={() => setShowMobileSearch(false)}
            >
              <X size={22} />
            </button>

            <SearchBar onSelect={() => setShowMobileSearch(false)} />
          </div>
        </div>
      )}

      {/* ================= MOBILE SIDEBAR ================= */}
     
       
     {/* ================= MOBILE SIDEBAR (COMPACT + PASTEL) ================= */}
{isSidebarOpen && (
  <div
    className="fixed inset-0 bg-black/40 z-[1000] flex items-start justify-center pt-24"
    onClick={closeSidebar}
  >
    <div
      className="w-[85%] max-w-[280px] bg-[#f9fafb] rounded-2xl shadow-xl
      border border-gray-200"
      onClick={(e) => e.stopPropagation()}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <p className="font-semibold text-gray-800 text-sm">
          {user ? `Hi, ${user}` : "Menu"}
        </p>
        <button onClick={closeSidebar}>
          <X size={18} />
        </button>
      </div>

      {/* LINKS */}
      <div className="flex flex-col px-2 py-2 text-gray-700 text-sm">
        <Link
          to="/"
          onClick={closeSidebar}
          className="px-3 py-2.5 rounded-lg hover:bg-gray-100"
        >
          Home
        </Link>

        <Link
          to="/books"
          onClick={closeSidebar}
          className="px-3 py-2.5 rounded-lg hover:bg-gray-100"
        >
          Books
        </Link>

        <Link
          to="/categories"
          onClick={closeSidebar}
          className="px-3 py-2.5 rounded-lg hover:bg-gray-100"
        >
          Categories
        </Link>

        {user && role === "admin" && (
          <Link
            to="/admin/dashboard"
            onClick={closeSidebar}
            className="px-3 py-2.5 rounded-lg hover:bg-gray-100
            text-indigo-600 font-medium"
          >
            Admin Dashboard
          </Link>
        )}
      </div>

      {/* FOOTER */}
      <div className="border-t border-gray-200 px-2 py-2">
        {user ? (
          <button
            onClick={logout}
            className="w-full text-left px-3 py-2.5 rounded-lg
            text-red-500 hover:bg-red-50 text-sm"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            onClick={closeSidebar}
            className="block px-3 py-2.5 rounded-lg hover:bg-gray-100 text-sm"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  </div>
)}


    
          
    

     
          


      {/* ================= MOBILE BOTTOM NAV ================= */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#99ca3b] text-white py-2 flex justify-around z-50">
        <Search size={26} onClick={() => setShowMobileSearch(true)} />
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
