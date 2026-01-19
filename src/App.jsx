import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./Pages/user/Navbar";
import Footer from "./Pages/user/Footer";

// user pages
import Home from "./Pages/user/home/Home";
import Books from "./Pages/user/Books/Books";
import Singleview from "./Pages/user/BookDetails/SingleView.jsx";
import Login from "./Pages/user/USER-LOGIN/Userlogin.jsx";
import Register from "./Pages/user/USER-LOGIN/Usersignup.jsx";
import CartPage from "./Pages/user/Cart/cart.jsx";
import Dashboard from "./Pages/user/UserDashboard/Dashboard.jsx";
import AboutSection from "./Pages/user/About.jsx";
import Contact from "./Contact.jsx";

// admin pages
import AdminDashboard from "./Pages/Admin/AdminDashboard/Dashboard.jsx";
import BookForm from "./Pages/Admin/AdminDashboard/Bookform.jsx";
import AdminLogin from "./Pages/Admin/AdminLogin.jsx";

// route guards
import ProtectedRoute from "./route/ProtectedRoute.jsx";
import AdminRoute from "./route/AdminProtectedRoute.jsx";

function Layout({ children }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}
      {children}
      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>

          {/* ================= USER ROUTES ================= */}
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/book/:id" element={<Singleview />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/about" element={<AboutSection />} />
          <Route path="/contact" element={<Contact />} />

          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* ================= ADMIN ROUTES ================= */}
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/books/add"
            element={
              <AdminRoute>
                <BookForm />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/books/edit/:id"
            element={
              <AdminRoute>
                <BookForm />
              </AdminRoute>
            }
          />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
