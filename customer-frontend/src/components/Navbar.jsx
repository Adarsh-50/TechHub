import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

function Navbar() {
  const [profileOpen, setProfileOpen] = useState(false);

  const profileMenuRef = useRef(null);

  const getCartKey = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    return user
      ? `cart_user_${user.id}`
      : "cart_guest";
  };

  const getCartCount = () => {
    const cart =
      JSON.parse(localStorage.getItem(getCartKey())) || [];

    return cart.length;
  };

  const [cartCount, setCartCount] = useState(getCartCount());

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(getCartCount());
    };

    const updateLoginStatus = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", updateCartCount);
    window.addEventListener("storage", updateLoginStatus);

    const interval = setInterval(() => {
      updateCartCount();
      updateLoginStatus();
    }, 500);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("storage", updateLoginStatus);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setProfileOpen(false);

    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <div className="logo">TechHub</div>

      <div className="nav-links">
        <Link
          to="/"
          onClick={() => setProfileOpen(false)}
        >
          Home
        </Link>

        <Link
          to="/products"
          onClick={() => setProfileOpen(false)}
        >
          Products
        </Link>

        <Link
          to="/cart"
          onClick={() => setProfileOpen(false)}
        >
          Cart ({cartCount})
        </Link>

        {isLoggedIn ? (
          <div
            className="profile-menu"
            ref={profileMenuRef}
          >
            <button
              className="profile-icon-button"
              onClick={() => setProfileOpen(!profileOpen)}
              title="Profile"
            >
              <svg
                className="profile-icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="8"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="2"
                />

                <path
                  d="M4 21C4.5 16.5 7.5 14 12 14C16.5 14 19.5 16.5 20 21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {profileOpen && (
              <div className="profile-dropdown">
                <Link
                  to="/profile"
                  onClick={() => setProfileOpen(false)}
                >
                  My Orders
                </Link>

                <button onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;