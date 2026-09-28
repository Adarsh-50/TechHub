import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        "http://localhost:5000/api/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch orders"
        );
      }

      setOrders(data);
    } catch (error) {
      setError(
        error.message || "Unable to load orders"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      setError("");

      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `http://localhost:5000/api/orders/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update order status"
        );
      }

      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          order.id === id
            ? {
                ...order,
                status: newStatus,
              }
            : order
        )
      );
    } catch (error) {
      setError(
        error.message ||
          "Unable to update order status"
      );
    }
  };

  return (
    <div className="orders-page">

      <div className="orders-brand">
        <div className="orders-brand-name">
          <span>Tech</span>Hub
        </div>

        <div className="orders-brand-tagline">
          TECH • STORE
        </div>
      </div>

      <h1>Order Management</h1>

      {error && (
        <p className="admin-orders-error">
          {error}
        </p>
      )}

      <div className="orders-table-container">

        {loading ? (
          <p>Loading orders...</p>
        ) : (
          <table className="orders-table">

            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Update Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => {

                const itemCount =
                  order.OrderItems?.reduce(
                    (total, item) =>
                      total + item.quantity,
                    0
                  ) || 0;

                return (
                  <tr key={order.id}>

                    <td>
                      #{order.id}
                    </td>

                    <td>
                      {order.User?.name || "Unknown"}
                    </td>

                    <td>
                      {itemCount === 1
                        ? order.OrderItems?.[0]
                            ?.Product?.name ||
                          "Unknown Product"
                        : `${itemCount} items`}
                    </td>

                    <td>
                      ₹
                      {Number(
                        order.totalAmount
                      ).toLocaleString("en-IN")}
                    </td>

                    <td>
                      {order.status}
                    </td>

                    <td>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateStatus(
                            order.id,
                            e.target.value
                          )
                        }
                      >
                        <option value="Pending">
                          Pending
                        </option>

                        <option value="Processing">
                          Processing
                        </option>

                        <option value="Shipped">
                          Shipped
                        </option>

                        <option value="Delivered">
                          Delivered
                        </option>

                        <option value="Cancelled">
                          Cancelled
                        </option>
                      </select>
                    </td>

                  </tr>
                );
              })}
            </tbody>

          </table>
        )}

      </div>

    </div>
  );
}

export default Orders;