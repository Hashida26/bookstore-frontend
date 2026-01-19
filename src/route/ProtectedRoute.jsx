import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
 
  const token = localStorage.getItem("accessToken");
    const user = localStorage.getItem("user");

  // If not logged in
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  // If logged in
  return children;
}
