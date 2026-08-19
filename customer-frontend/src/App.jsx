import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Payment from "./pages/Payment";

function Home() {
  const featuredProducts = [
    {
      name: "Gaming Laptop",
      category: "Laptops",
      price: 74999,
      image:
        "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500",
    },
    {
      name: "Smartphone",
      category: "Mobiles",
      price: 34999,
      image:
        "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500",
    },
    {
      name: "Wireless Headphones",
      category: "Accessories",
      price: 4999,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    },
    {
      name: "Smart Watch",
      category: "Wearables",
      price: 7999,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    },
  ];

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const addToCart = (product) => {
    const updatedCart = [...cart, product];

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div>
      <section className="hero">
        <h1>Upgrade Your Tech</h1>
        <p>Discover the latest electronics at the best prices.</p>
        <Link to="/products" className="shop-button">
          Shop Now
        </Link>
      </section>

      <section className="featured-section">
        <h2>Featured Products</h2>

        <div className="product-grid">
          {featuredProducts.map((product, index) => (
            <div className="product-card" key={index}>
              <img src={product.image} alt={product.name} />

              <h3>{product.name}</h3>

              <p>{product.category}</p>

              <h3>₹{product.price}</h3>

              <button
                className="add-cart-button"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </>
  );
}

export default App;