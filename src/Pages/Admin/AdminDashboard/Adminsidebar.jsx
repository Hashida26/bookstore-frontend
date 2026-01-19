import {
  LayoutDashboard,
  BookOpen,
  ShoppingBag,
  Users,
} from "lucide-react";

export default function AdminSidebar({ active, setActive }) {
  const menu = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "books", label: "Books", icon: BookOpen },
    { id: "order", label: "Orders", icon: ShoppingBag },
    { id: "users", label: "Users", icon: Users },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r shadow-sm flex flex-col">
      <div className="h-16 flex items-center justify-center border-b">
        <h2 className="text-lg font-bold text-emerald-700">
          Admin Panel
        </h2>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menu.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl
              transition-all
              ${
                active === id
                  ? "bg-emerald-600 text-white shadow"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
          >
            <Icon size={18} />
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
