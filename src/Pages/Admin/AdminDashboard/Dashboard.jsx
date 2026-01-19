import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Menu } from "lucide-react";

import AdminSidebar from "./Adminsidebar";
import AdminHome from "./Adminhome";
import ManageBooks from "./Managebook";
import Orders from "./Order";
import UsersList from "./User";

export default function AdminDashboard() {
  const [active, setActive] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  /* ================= CONTENT SWITCH ================= */
  const renderContent = () => {
    switch (active) {
      case "books":
        return <ManageBooks />;
      case "order":
        return <Orders />;
      case "users":
        return <UsersList />;
      default:
        return <AdminHome />;
    }
  };

  /* ================= LOGOUT ================= */
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, logout",
    });

    if (result.isConfirmed) {
      // 🔥 Clear admin authentication
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminRole");

      // (safety – if old keys exist)
      localStorage.removeItem("accessToken");
      localStorage.removeItem("role");

      // Redirect to admin login & block back navigation
      navigate("/admin/login", { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* ================= SIDEBAR (DESKTOP) ================= */}
      <div className="hidden md:block">
        <AdminSidebar active={active} setActive={setActive} />
      </div>

      {/* ================= SIDEBAR (MOBILE) ================= */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative z-50 w-64 h-full bg-white shadow-xl">
            <AdminSidebar
              active={active}
              setActive={(val) => {
                setActive(val);
                setSidebarOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 flex flex-col">

        {/* ================= HEADER ================= */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-4 md:px-6 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu size={22} />
            </button>

            <h1 className="text-lg font-semibold text-gray-700 capitalize">
              {active}
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-1.5 rounded-lg
                       bg-red-50 text-red-600
                       hover:bg-red-100
                       text-sm font-medium"
          >
            Logout
          </button>
        </header>

        {/* ================= PAGE CONTENT ================= */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {renderContent()}
        </main>

      </div>
    </div>
  );
}
