import { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const cartKey = user
    ? `cart_user_${user.id}`
    : "cart_guest";

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem(cartKey)) || []
  );

  const fetchProducts = async (searchValue, page) => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `http://localhost:5000/api/products?search=${encodeURIComponent(
          searchValue
        )}&page=${page}&limit=8`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      setProducts(data.products);
      setRelatedProducts(data.relatedProducts);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (error) {
      setError("Unable to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(search, currentPage);
  }, [search, currentPage]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const addToCart = (product) => {
    const updatedCart = [...cart, product];

    setCart(updatedCart);
    localStorage.setItem(
      cartKey,
      JSON.stringify(updatedCart)
    );
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="products-page">
      <h1>All Products</h1>

      <div className="product-search">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={handleSearch}
        />
      </div>

      {loading && <p>Loading products...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && products.length === 0 && (
        <p>No products found.</p>
      )}

      {!loading && !error && products.length > 0 && (
        <>
          <div className="product-grid">
            {products.map((product) => (
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

          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              <span>
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}

          {relatedProducts.length > 0 && (
            <div className="related-products-section">
              <h2>Related Products</h2>

              <div className="product-grid">
                {relatedProducts.map((product) => (
                  <div
                    className="product-card"
                    key={product.id}
                  >
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
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Products;