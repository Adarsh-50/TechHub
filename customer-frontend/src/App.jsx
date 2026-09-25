import { useEffect, useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Payment from "./pages/Payment";
import Profile from "./pages/Profile";

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  const cartKey = user
    ? `cart_user_${user.id}`
    : "cart_guest";

  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem(cartKey)) || []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/products?page=1&limit=4"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      setFeaturedProducts(data.products);
    } catch (error) {
      setError("Unable to load featured products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const addToCart = (product) => {
    const updatedCart = [...cart, product];

    setCart(updatedCart);
    localStorage.setItem(
      cartKey,
      JSON.stringify(updatedCart)
    );
  };

  return (
    <div>
      <section className="hero">
        <div className="home-brand">
          <div className="home-brand-name">
            <span>Tech</span>Hub
          </div>

          <div className="home-brand-tagline">
            TECH • STORE
          </div>
        </div>

        <h1>Upgrade Your Tech</h1>

        <p>
          Discover the latest electronics at the best prices.
        </p>

        <Link to="/products" className="shop-button">
          Shop Now
        </Link>
      </section>

      <section className="featured-section">
        <h2>Featured Products</h2>

        {loading && <p>Loading featured products...</p>}

        {error && <p>{error}</p>}

        {!loading && !error && (
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <img
                  src={`http://localhost:5000/images/${product.image}`}
                  alt={product.name}
                />

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
        )}
      </section>
    </div>
  );
}

function App() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;