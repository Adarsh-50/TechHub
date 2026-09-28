import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const adminUser = JSON.parse(
    localStorage.getItem("adminUser")
  );

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");

    navigate("/login");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-brand-name">
          <span>Tech</span>Hub
        </div>

        <div className="sidebar-brand-tagline">
          TECH • STORE
        </div>
      </div>

      <div className="sidebar-user">
        <div className="sidebar-user-role">
          ADMIN
        </div>

        <div className="sidebar-user-name">
          {adminUser?.name || "Admin"}
        </div>
      </div>

      <nav>
        <Link to="/">Dashboard</Link>

        <Link to="/products">
          Products
        </Link>

        <Link to="/orders">
          Orders
        </Link>

        <Link to="/users">
          Users
        </Link>

        <button
          type="button"
          className="sidebar-logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>
    </div>
  );
}

export default Sidebar;