import { useState } from "react";

function Products() {
  const products = [
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
    <div className="products-page">
      <h1>All Products</h1>

      <div className="product-grid">
        {products.map((product, index) => (
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
    </div>
  );
}

export default Products;