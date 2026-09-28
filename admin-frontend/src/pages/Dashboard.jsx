import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    recentOrders: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        "http://localhost:5000/api/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch dashboard data"
        );
      }

      setDashboardData(data);
    } catch (error) {
      setError("Unable to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard-page">

      <div className="dashboard-brand">
        <div className="dashboard-brand-name">
          <span>Tech</span>Hub
        </div>

        <div className="dashboard-brand-tagline">
          TECH • STORE
        </div>
      </div>

      <h1>Dashboard</h1>

      {loading && (
        <p>Loading dashboard...</p>
      )}

      {error && (
        <p className="admin-dashboard-error">
          {error}
        </p>
      )}

      {!loading && !error && (
        <>
          <div className="dashboard-cards">
            <div className="dashboard-card">
              <h3>Total Products</h3>
              <p>{dashboardData.totalProducts}</p>
            </div>

            <div className="dashboard-card">
              <h3>Total Orders</h3>
              <p>{dashboardData.totalOrders}</p>
            </div>

            <div className="dashboard-card">
              <h3>Total Users</h3>
              <p>{dashboardData.totalUsers}</p>
            </div>

            <div className="dashboard-card">
              <h3>Total Revenue</h3>
              <p>
                ₹
                {Number(
                  dashboardData.totalRevenue
                ).toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          <div className="dashboard-section">
            <h2>Recent Orders</h2>

            {dashboardData.recentOrders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
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
                  {dashboardData.recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td>#{order.id}</td>

                      <td>
                        {order.User?.name || "Unknown"}
                      </td>

                      <td>
                        {order.OrderItems?.length > 0
                          ? order.OrderItems.length === 1
                            ? order.OrderItems[0].Product?.name
                            : `${order.OrderItems.length} items`
                          : "No items"}
                      </td>

                      <td>
                        ₹
                        {Number(
                          order.totalAmount
                        ).toLocaleString("en-IN")}
                      </td>

                      <td>{order.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}

    </div>
  );
}

export default Dashboard;