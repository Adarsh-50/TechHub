import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/orders/my-orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch orders");
      }

      setOrders(data);
    } catch (error) {
      setError("Unable to load your orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token || !user) {
      navigate("/login");
      return;
    }

    fetchOrders();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="profile-page">

      <div className="profile-box">

        <div className="profile-brand">
          <div className="profile-brand-name">
            <span>Tech</span>Hub
          </div>

          <div className="profile-brand-tagline">
            TECH • STORE
          </div>
        </div>

        <h1>My Profile</h1>

        <div className="profile-details">
          <div className="profile-detail">
            <span>Name</span>
            <strong>{user?.name}</strong>
          </div>

          <div className="profile-detail">
            <span>Email</span>
            <strong>{user?.email}</strong>
          </div>
        </div>

        <div className="profile-orders">
          <h2>My Orders</h2>

          {loading && (
            <p className="profile-message">
              Loading your orders...
            </p>
          )}

          {error && (
            <p className="profile-error">
              {error}
            </p>
          )}

          {!loading && !error && orders.length === 0 && (
            <div className="no-orders">
              <p>You haven't placed any orders yet.</p>
            </div>
          )}

          {!loading && !error && orders.length > 0 && (
            <div className="orders-list">
              {orders.map((order) => (
                <div className="profile-order-card" key={order.id}>

                  <div className="order-header">
                    <div>
                      <h3>Order #{order.id}</h3>

                      <p>
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="order-header-right">
                      <span className="order-status">
                        {order.status}
                      </span>

                      <strong>
                        ₹{Number(order.totalAmount).toFixed(2)}
                      </strong>
                    </div>
                  </div>

                  <div className="order-items">
                    {order.OrderItems.map((item) => (
                      <div
                        className="profile-order-item"
                        key={item.id}
                      >
                        <div>
                          <strong>
                            {item.Product.name}
                          </strong>

                          <p>
                            Quantity: {item.quantity}
                          </p>
                        </div>

                        <span>
                          ₹{Number(item.price).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        <button
          className="profile-logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Profile;