import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login.jsx";
import ProductList from "../pages/ProductList.jsx";
import ProductDetail from "../pages/ProductDetail.jsx";
import Register from "../pages/Register.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
