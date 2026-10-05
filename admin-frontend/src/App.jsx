import {
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import VerifyProducts from "./pages/VerifyProducts";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Sidebar from "./components/Sidebar";

import "./App.css";


function ProtectedRoute({ children }) {
  const adminToken =
    localStorage.getItem("adminToken");

  const adminUser = JSON.parse(
    localStorage.getItem("adminUser")
  );

  if (!adminToken || !adminUser) {
    return <Navigate to="/login" replace />;
  }

  if (
    adminUser.role !== "admin" &&
    adminUser.role !== "superadmin"
  ) {
    return <Navigate to="/login" replace />;
  }

  return children;
}


function App() {
  const location = useLocation();

  const isLoginPage =
    location.pathname === "/login";

  return (
    <div className="admin-app">

      {!isLoginPage && <Sidebar />}

      <main
        className={
          isLoginPage
            ? "login-content"
            : "admin-content"
        }
      >

        <Routes>

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />

          <Route
            path="/verify-products"
            element={
              <ProtectedRoute>
                <VerifyProducts />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />

        </Routes>

      </main>

    </div>
  );
}


export default App;