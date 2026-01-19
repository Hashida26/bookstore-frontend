import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import API from "../../config/api"; // your axios instance

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return Swal.fire("Error", "All fields are required", "error");
    }

    try {
      setLoading(true);

      const res = await API.post("/api/auth/login", {
        email,
        password,
      });

      // 🔒 ROLE CHECK
      if (res.data.role !== "admin") {
        return Swal.fire("Access Denied", "Admin only access", "error");
      }

      // ✅ SAVE TOKEN
      localStorage.setItem("accessToken", res.data.accessToken || res.data.token);
      localStorage.setItem("role", res.data.role);

      Swal.fire({
        icon: "success",
        title: "Welcome Admin",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/admin");
    } catch (error) {
      Swal.fire(
        "Login Failed",
        error.response?.data?.message || "Invalid credentials",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-[340px] p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-xl font-bold text-center mb-6">
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Admin Email"
          className="w-full border px-3 py-2 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2 rounded mb-5"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
