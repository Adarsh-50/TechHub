import { useEffect, useState } from "react";

function VerifyProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [verifyingId, setVerifyingId] = useState(null);

  const [successProduct, setSuccessProduct] = useState(null);

  const fetchPendingProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        "http://localhost:5000/api/products/pending/list",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to fetch pending products"
        );
      }

      setProducts(data.products || []);
    } catch (error) {
      setError(
        error.message ||
          "Unable to load pending products"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingProducts();
  }, []);

  const handleVerify = async (productId) => {
    try {
      setVerifyingId(productId);
      setError("");

      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `http://localhost:5000/api/products/${productId}/verify`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to verify product"
        );
      }

      // Save the verified product so we can
      // show its name in the success popup.
      setSuccessProduct(data.product);

      // Remove the verified product from
      // the pending list.
      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) =>
            product.id !== productId
        )
      );
    } catch (error) {
      setError(
        error.message ||
          "Unable to verify product"
      );
    } finally {
      setVerifyingId(null);
    }
  };

  const closeSuccessPopup = () => {
    setSuccessProduct(null);
  };

  return (
    <div className="verify-products-page">

      <div className="verify-products-brand">
        <div className="verify-products-brand-name">
          <span>Tech</span>Hub
        </div>

        <div className="verify-products-brand-tagline">
          TECH • STORE
        </div>
      </div>

      <div className="verify-products-header">
        <h1>Verify Products</h1>

        <p>
          Review products waiting for verification.
        </p>
      </div>

      {loading && (
        <p className="verify-products-message">
          Loading pending products...
        </p>
      )}

      {error && (
        <p className="verify-products-error">
          {error}
        </p>
      )}

      {!loading &&
        !error &&
        products.length === 0 && (
          <div className="no-pending-products">
            <h2>No Products Pending</h2>

            <p>
              There are currently no products
              waiting for verification.
            </p>
          </div>
        )}

      {!loading &&
        products.length > 0 && (
          <div className="pending-products-container">

            {products.map((product) => (
              <div
                className="pending-product-card"
                key={product.id}
              >

                <div className="pending-product-details">

                  <h2>{product.name}</h2>

                  <p>
                    <strong>Product ID:</strong>{" "}
                    #{product.id}
                  </p>

                  <p>
                    <strong>Category:</strong>{" "}
                    {product.category}
                  </p>

                  <p>
                    <strong>Price:</strong>{" "}
                    ₹
                    {Number(
                      product.price
                    ).toLocaleString("en-IN")}
                  </p>

                  <p>
                    <strong>Stock:</strong>{" "}
                    {product.stock}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    <span className="pending-status">
                      {product.verificationStatus}
                    </span>
                  </p>

                </div>

                <div className="pending-product-actions">

                  <button
                    className="verify-product-button"
                    onClick={() =>
                      handleVerify(product.id)
                    }
                    disabled={
                      verifyingId === product.id
                    }
                  >
                    {verifyingId === product.id
                      ? "Verifying..."
                      : "Verify Product"}
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      {/* Success Popup */}
      {successProduct && (
        <div className="verification-success-overlay">

          <div className="verification-success-popup">

            <div className="verification-success-icon">
              ✓
            </div>

            <h2>
              Product Verified Successfully!
            </h2>

            <p>
              <strong>
                {successProduct.name}
              </strong>{" "}
              has been verified and is now
              available in Products.
            </p>

            <button
              className="verification-success-button"
              onClick={closeSuccessPopup}
            >
              OK
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default VerifyProducts;