import { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async (page = currentPage) => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `http://localhost:5000/api/products?page=${page}&limit=8`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch products"
        );
      }

      setProducts(data.products || []);
      setCurrentPage(data.currentPage || page);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      setError("Unable to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      const token = localStorage.getItem("adminToken");

      const url = editingProduct
        ? `http://localhost:5000/api/products/${editingProduct.id}`
        : "http://localhost:5000/api/products";

      const method = editingProduct ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          category: formData.category,
          price: Number(formData.price),
          stock: Number(formData.stock),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to save product"
        );
      }

      setFormData({
        name: "",
        category: "",
        price: "",
        stock: "",
      });

      setEditingProduct(null);
      setShowForm(false);

      await fetchProducts(currentPage);
    } catch (error) {
      setError(
        error.message || "Unable to save product"
      );
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);

    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
    });

    setShowForm(true);
    setError("");
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setError("");

      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `http://localhost:5000/api/products/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete product"
        );
      }

      /*
       * If the last product on the current page
       * was deleted, move back one page.
       */
      if (
        products.length === 1 &&
        currentPage > 1
      ) {
        setCurrentPage(currentPage - 1);
      } else {
        await fetchProducts(currentPage);
      }
    } catch (error) {
      setError(
        error.message || "Unable to delete product"
      );
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(null);

    setFormData({
      name: "",
      category: "",
      price: "",
      stock: "",
    });

    setShowForm(true);
    setError("");
  };

  return (
    <div className="products-page">

      <div className="products-brand">
        <div className="products-brand-name">
          <span>Tech</span>Hub
        </div>

        <div className="products-brand-tagline">
          TECH • STORE
        </div>
      </div>

      <div className="page-header">
        <h1>Product Management</h1>

        <button
          className="add-product-button"
          onClick={handleAddProduct}
        >
          Add Product
        </button>
      </div>

      {error && (
        <p className="admin-products-error">
          {error}
        </p>
      )}

      {showForm && (
        <div className="product-form">
          <h2>
            {editingProduct
              ? "Edit Product"
              : "Add Product"}
          </h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="save-product-button"
            >
              {editingProduct
                ? "Update Product"
                : "Add Product"}
            </button>

            <button
              type="button"
              className="cancel-button"
              onClick={() => {
                setShowForm(false);
                setEditingProduct(null);
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      <div className="products-table-container">
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <>
            <table className="products-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>

                    <td>{product.name}</td>

                    <td>{product.category}</td>

                    <td>
                      ₹
                      {Number(
                        product.price
                      ).toLocaleString("en-IN")}
                    </td>

                    <td>{product.stock}</td>

                    <td>
                      <button
                        className="edit-button"
                        onClick={() =>
                          handleEdit(product)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-button"
                        onClick={() =>
                          handleDelete(product.id)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {totalPages > 1 && (
              <div className="product-pagination">

                <button
                  onClick={() =>
                    setCurrentPage(
                      currentPage - 1
                    )
                  }
                  disabled={currentPage === 1}
                >
                  Previous
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (
                  <button
                    key={page}
                    className={
                      currentPage === page
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setCurrentPage(page)
                    }
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage(
                      currentPage + 1
                    )
                  }
                  disabled={
                    currentPage === totalPages
                  }
                >
                  Next
                </button>

              </div>
            )}
          </>
        )}
      </div>

    </div>
  );
}

export default Products;