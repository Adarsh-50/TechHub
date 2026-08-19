import { useState } from "react";

function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("card");

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const total = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  return (
    <div className="payment-page">
      <div className="payment-box">
        <h1>Payment</h1>

        <div className="payment-summary">
          <h2>Order Summary</h2>

          {cart.map((item, index) => (
            <div className="payment-item" key={index}>
              <span>{item.name}</span>
              <span>₹{item.price}</span>
            </div>
          ))}

          <h3>Total: ₹{total}</h3>
        </div>

        <div className="payment-methods">
          <h2>Payment Method</h2>

          <label>
            <input
              type="radio"
              value="card"
              checked={paymentMethod === "card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Card
          </label>

          <label>
            <input
              type="radio"
              value="upi"
              checked={paymentMethod === "upi"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            UPI
          </label>

          <label>
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
            <input type="text" placeholder="Card Number" />
            <div className="payment-row">
              <input type="text" placeholder="MM/YY" />
              <input type="text" placeholder="CVV" />
            </div>
            <input type="text" placeholder="Card Holder Name" />
          </div>
        )}

        {paymentMethod === "upi" && (
          <div className="payment-form">
            <input type="text" placeholder="Enter UPI ID" />
          </div>
        )}

        {paymentMethod === "cod" && (
          <p className="cod-message">
            You will pay when your order is delivered.
          </p>
        )}

        <button className="pay-button">
          Pay ₹{total}
        </button>
      </div>
    </div>
  );
}

export default Payment;