import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { BookOpen, ShoppingCart, Users, IndianRupee } from "lucide-react";

export default function AdminHome() {
  const stats = [
    { title: "Total Books", value: 128, icon: BookOpen },
    { title: "Orders", value: 54, icon: ShoppingCart },
    { title: "Users", value: 312, icon: Users },
    { title: "Revenue", value: "₹45,800", icon: IndianRupee },
  ];

  const salesData = [
    { month: "Jan", sales: 4000 },
    { month: "Feb", sales: 3000 },
    { month: "Mar", sales: 5000 },
    { month: "Apr", sales: 4200 },
    { month: "May", sales: 6100 },
  ];

  const categoryData = [
    { name: "Fiction", value: 40 },
    { name: "Self Help", value: 25 },
    { name: "Kids", value: 15 },
    { name: "Education", value: 20 },
  ];

  const COLORS = ["#15803d", "#22c55e", "#86efac", "#4ade80"];

  return (
    <div className="space-y-8">
      <h2 className="text-lg font-semibold">Dashboard Overview</h2>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full text-green-700">
                <Icon size={22} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{item.title}</p>
                <h3 className="text-xl font-bold">{item.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* BAR CHART */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-sm font-semibold mb-4">Monthly Sales</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={salesData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#15803d" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-sm font-semibold mb-4">Books by Category</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={90}
              >
                {categoryData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
/* later replace with this code 
useEffect(() => {
  api.get("/admin/stats").then(res => {
    setSalesData(res.data.sales);
  });
}, []);*/
