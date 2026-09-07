import { useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: "Rahul Sharma",
      product: "Gaming Laptop",
      amount: 74999,
      status: "Pending",
    },
    {
      id: 2,
      customer: "Priya Singh",
      product: "Smartphone",
      amount: 34999,
      status: "Shipped",
    },
    {
      id: 3,
      customer: "Amit Kumar",
      product: "Wireless Headphones",
      amount: 4999,
      status: "Delivered",
    },
  ]);

  const updateStatus = (id, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === id
        ? { ...order, status: newStatus }
        : order
    );

    setOrders(updatedOrders);
  };

  return (
    <div className="orders-page">
      <h1>Order Management</h1>

      <div className="orders-table-container">
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
            {orders.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.product}</td>
                <td>₹{order.amount}</td>
                <td>{order.status}</td>

                <td>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order.id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;