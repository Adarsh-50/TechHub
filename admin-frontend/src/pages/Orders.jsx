import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);

  const [loading, setLoading] = useState(true);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [error, setError] = useState("");

  // Orders pagination
  const [ordersPage, setOrdersPage] = useState(1);
  const ordersPerPage = 5;

  // Order History pagination
  const [historyPage, setHistoryPage] = useState(1);
  const historyPerPage = 5;

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

  const fetchOrderHistory = async () => {
    try {
      setHistoryLoading(true);

      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        "http://localhost:5000/api/orders/history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch order history"
        );
      }

      setOrderHistory(data);
    } catch (error) {
      setError(
        error.message || "Unable to load order history"
      );
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchOrderHistory();
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

      // Refresh history so the latest status change appears immediately
      await fetchOrderHistory();

      // Go back to the first history page so the newest record is visible
      setHistoryPage(1);
    } catch (error) {
      setError(
        error.message ||
          "Unable to update order status"
      );
    }
  };

  // -----------------------------
  // Orders Pagination
  // -----------------------------

  const ordersTotalPages = Math.max(
    1,
    Math.ceil(orders.length / ordersPerPage)
  );

  const ordersStartIndex =
    (ordersPage - 1) * ordersPerPage;

  const currentOrders = orders.slice(
    ordersStartIndex,
    ordersStartIndex + ordersPerPage
  );

  // -----------------------------
  // Order History Pagination
  // -----------------------------

  const historyTotalPages = Math.max(
    1,
    Math.ceil(orderHistory.length / historyPerPage)
  );

  const historyStartIndex =
    (historyPage - 1) * historyPerPage;

  const currentHistory = orderHistory.slice(
    historyStartIndex,
    historyStartIndex + historyPerPage
  );

  const formatDateTime = (dateString) => {
    if (!dateString) return "Unknown";

    return new Date(dateString).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
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

      {/* =========================
          ORDERS SECTION
      ========================== */}

      <div className="orders-section-title">
        <h2>Orders</h2>
        <p>
          Manage customer orders and update their status.
        </p>
      </div>

      <div className="orders-table-container">

        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <>
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
                {currentOrders.map((order) => {

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
                        <span
                          className={`order-status-badge status-${order.status.toLowerCase()}`}
                        >
                          {order.status}
                        </span>
                      </td>

                      <td>
                        <select
                          className={`order-status-select status-${order.status.toLowerCase()}`}
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

            {/* Orders Pagination */}

            {ordersTotalPages > 1 && (
              <div className="orders-pagination">

                <button
                  onClick={() =>
                    setOrdersPage(
                      (page) => Math.max(1, page - 1)
                    )
                  }
                  disabled={ordersPage === 1}
                >
                  Previous
                </button>

                <span>
                  Page {ordersPage} of {ordersTotalPages}
                </span>

                <button
                  onClick={() =>
                    setOrdersPage(
                      (page) =>
                        Math.min(
                          ordersTotalPages,
                          page + 1
                        )
                    )
                  }
                  disabled={
                    ordersPage === ordersTotalPages
                  }
                >
                  Next
                </button>

              </div>
            )}

          </>
        )}

      </div>

      {/* =========================
          ORDER HISTORY SECTION
      ========================== */}

      <div className="order-history-section">

        <div className="orders-section-title">
          <h2>Order History</h2>
          <p>
            Track every order status change, including
            the admin who made the change.
          </p>
        </div>

        <div className="orders-table-container">

          {historyLoading ? (
            <p>Loading order history...</p>
          ) : orderHistory.length === 0 ? (
            <div className="order-history-empty">
              <h3>No Order History</h3>
              <p>
                No order status changes have been recorded yet.
              </p>
            </div>
          ) : (
            <>

              <table className="orders-table order-history-table">

                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Previous Status</th>
                    <th>New Status</th>
                    <th>Changed By</th>
                    <th>Date & Time</th>
                  </tr>
                </thead>

                <tbody>
                  {currentHistory.map((history) => (
                    <tr key={history.id}>

                      <td>
                        #{history.orderId}
                      </td>

                      <td>
                        <span className="history-old-status">
                          {history.previousStatus}
                        </span>
                      </td>

                      <td>
                        <span className="history-new-status">
                          {history.newStatus}
                        </span>
                      </td>

                      <td>
                        <div className="history-admin-name">
                          {history.User?.name ||
                            "Unknown Admin"}
                        </div>

                        {history.User?.email && (
                          <div className="history-admin-email">
                            {history.User.email}
                          </div>
                        )}
                      </td>

                      <td>
                        {formatDateTime(
                          history.createdAt
                        )}
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>

              {/* Order History Pagination */}

              {historyTotalPages > 1 && (
                <div className="orders-pagination">

                  <button
                    onClick={() =>
                      setHistoryPage(
                        (page) =>
                          Math.max(1, page - 1)
                      )
                    }
                    disabled={historyPage === 1}
                  >
                    Previous
                  </button>

                  <span>
                    Page {historyPage} of{" "}
                    {historyTotalPages}
                  </span>

                  <button
                    onClick={() =>
                      setHistoryPage(
                        (page) =>
                          Math.min(
                            historyTotalPages,
                            page + 1
                          )
                      )
                    }
                    disabled={
                      historyPage ===
                      historyTotalPages
                    }
                  >
                    Next
                  </button>

                </div>
              )}

            </>
          )}

        </div>

      </div>

    </div>
  );
}

export default Orders;