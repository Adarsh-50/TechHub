import { Routes, Route, useLocation } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Sidebar from "./components/Sidebar";

import "./App.css";
  

function App() {
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  return (
    <div className="admin-app">
      {!isLoginPage && <Sidebar />}

      <main className={isLoginPage ? "login-content" : "admin-content"}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;