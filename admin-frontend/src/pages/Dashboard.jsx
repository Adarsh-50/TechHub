import { Link } from "react-router-dom";

function Dashboard() {
  const recentOrders = [
    {
      id: "#1",
      customer: "Rahul Sharma",
      product: "Gaming Laptop",
      amount: 74999,
      status: "Pending",
    },
    {
      id: "#2",
      customer: "Priya Singh",
      product: "Smartphone",
      amount: 34999,
      status: "Shipped",
    },
    {
      id: "#3",
      customer: "Amit Kumar",
      product: "Wireless Headphones",
      amount: 4999,
      status: "Delivered",
    },
  ];

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Total Products</h3>
          <p>4</p>
        </div>

        <div className="dashboard-card">
          <h3>Total Orders</h3>
          <p>12</p>
        </div>

        <div className="dashboard-card">
          <h3>Total Users</h3>
          <p>25</p>
        </div>

        <div className="dashboard-card">
          <h3>Total Revenue</h3>
          <p>₹1,25,000</p>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Recent Orders</h2>

        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.product}</td>
                <td>₹{order.amount}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="dashboard-section">
        <h2>Quick Actions</h2>

        <div className="quick-actions">
          <Link to="/products" className="quick-action-button">
            Add Product
          </Link>

          <Link to="/orders" className="quick-action-button">
            View Orders
          </Link>

          <Link to="/users" className="quick-action-button">
            View Users
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;