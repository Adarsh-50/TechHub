import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Payment() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const cartKey = user
    ? `cart_user_${user.id}`
    : "cart_guest";

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem(cartKey)) || []
  );

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );

  const handlePayment = async () => {
    if (!token || !user) {
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      setError("Your cart is empty");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const items = cart.map((item) => ({
        productId: item.id,
        quantity: 1,
      }));

      const response = await fetch(
        "http://localhost:5000/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            items,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Payment failed");
        return;
      }

      localStorage.removeItem(cartKey);
      setCart([]);

      alert(
        `Order placed successfully!\nOrder ID: ${data.order.id}`
      );

      navigate("/");
    } catch (error) {
      setError("Unable to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-box">

        <div className="payment-brand">
          <div className="payment-brand-name">
            <span>Tech</span>Hub
          </div>

          <div className="payment-brand-tagline">
            TECH • STORE
          </div>
        </div>

        <h1>Payment</h1>

        <div className="payment-summary">
          <h2>Order Summary</h2>

          {cart.map((item, index) => (
            <div className="payment-item" key={index}>
              <span>{item.name}</span>
              <span>₹{Number(item.price).toFixed(2)}</span>
            </div>
          ))}

          <h3>Total: ₹{total.toFixed(2)}</h3>
        </div>

        <div className="payment-methods">
          <h2>Payment Method</h2>

          <label className={paymentMethod === "card" ? "selected" : ""}>
            <input
              type="radio"
              value="card"
              checked={paymentMethod === "card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Card
          </label>

          <label className={paymentMethod === "upi" ? "selected" : ""}>
            <input
              type="radio"
              value="upi"
              checked={paymentMethod === "upi"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            UPI
          </label>

          <label className={paymentMethod === "cod" ? "selected" : ""}>
            <input
              type="radio"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash on Delivery
          </label>
        </div>

        {paymentMethod === "card" && (
          <div className="payment-form">
            <input
              type="text"
              placeholder="Card Number"
            />

            <div className="payment-row">
              <input
                type="text"
                placeholder="MM/YY"
              />

              <input
                type="text"
                placeholder="CVV"
              />
            </div>

            <input
              type="text"
              placeholder="Card Holder Name"
            />
          </div>
        )}

        {paymentMethod === "upi" && (
          <div className="payment-form">
            <input
              type="text"
              placeholder="Enter UPI ID"
            />
          </div>
        )}

        {paymentMethod === "cod" && (
          <p className="cod-message">
            You will pay when your order is delivered.
          </p>
        )}

        {error && (
          <p className="auth-error">
            {error}
          </p>
        )}

        <button
          className="pay-button"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : `Pay ₹${total.toFixed(2)}`}
        </button>

      </div>
    </div>
  );
}

export default Payment;