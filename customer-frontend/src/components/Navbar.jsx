import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const [cartCount, setCartCount] = useState(
    JSON.parse(localStorage.getItem("cart"))?.length || 0
  );

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.length);
    };

    window.addEventListener("storage", updateCartCount);

    const interval = setInterval(updateCartCount, 500);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      clearInterval(interval);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">TechHub</div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart ({cartCount})</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;