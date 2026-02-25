import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Home";
import ProductDetails from "./pages/ProductDetail";
import SearchPage from "./components/SearchPage";
import Checkout from "./pages/Checkout";
import ShippingInfo from "./pages/Shipping_Info";
import AccountDetail from "./pages/Account_Details";
import Dashboard from "./pages/Admin/Dashboard";
import Login from "./pages/Admin/Login";
import { supabase } from "./utils/supabase";
import ProtectedRoute from "./utils/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/shippinginfo" element={<ShippingInfo />} />
      <Route path="/accountdetail" element={<AccountDetail />} />
      <Route path="/search" element={<SearchPage />} />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route path="/admin/login" element={<Login />} />
    </Routes>
  );
};

export default App;
