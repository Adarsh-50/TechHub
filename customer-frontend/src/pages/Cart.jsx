import { useState } from "react";
import { Link } from "react-router-dom";

function Cart() {
  const user = JSON.parse(localStorage.getItem("user"));

  const cartKey = user
    ? `cart_user_${user.id}`
    : "cart_guest";

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem(cartKey)) || []
  );

  const removeFromCart = (indexToRemove) => {
    const updatedCart = cart.filter(
      (_, index) => index !== indexToRemove
    );

    setCart(updatedCart);
    localStorage.setItem(
      cartKey,
      JSON.stringify(updatedCart)
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );

  return (
    <div className="cart-page">
      <div className="home-brand">
        <div className="home-brand-name">
          <span>Tech</span>Hub
        </div>

        <div className="home-brand-tagline">
          TECH • STORE
        </div>
      </div>

      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p className="empty-cart">
          Your cart is empty.
        </p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item, index) => (
              <div className="cart-item" key={index}>
                <img
                  src={
                    item.image?.startsWith("http")
                      ? item.image
                      : `http://localhost:5000/images/${item.image}`
                  }
                  alt={item.name}
                />

                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>{item.category}</p>
                  <p>₹{item.price}</p>
                </div>

                <button
                  className="remove-button"
                  onClick={() => removeFromCart(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <div className="cart-total-info">
              <span>Total Items</span>
              <span>{cart.length}</span>
            </div>

            <div className="cart-total-price">
              <span>Total</span>
              <strong>₹{total.toFixed(2)}</strong>
            </div>

            <Link
              to="/payment"
              className="checkout-button"
            >
              Proceed to Checkout
            </Link>

            <Link
              to="/products"
              className="continue-shopping-link"
            >
              Continue Shopping
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;