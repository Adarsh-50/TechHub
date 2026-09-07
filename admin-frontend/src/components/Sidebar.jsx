import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>TechHub Admin</h2>

      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/products">Products</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/users">Users</Link>
        <Link to="/login">Logout</Link>
      </nav>
    </div>
  );
}

export default Sidebar;