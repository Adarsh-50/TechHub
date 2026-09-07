import { useState } from "react";

function Products() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Gaming Laptop",
      category: "Laptops",
      price: 74999,
      stock: 10,
    },
    {
      id: 2,
      name: "Smartphone",
      category: "Mobiles",
      price: 34999,
      stock: 15,
    },
    {
      id: 3,
      name: "Wireless Headphones",
      category: "Accessories",
      price: 4999,
      stock: 20,
    },
    {
      id: 4,
      name: "Smart Watch",
      category: "Wearables",
      price: 7999,
      stock: 12,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingProduct) {
      const updatedProducts = products.map((product) =>
        product.id === editingProduct.id
          ? {
              ...product,
              name: formData.name,
              category: formData.category,
              price: Number(formData.price),
              stock: Number(formData.stock),
            }
          : product
      );

      setProducts(updatedProducts);
      setEditingProduct(null);
    } else {
      const newProduct = {
        id: products.length + 1,
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        stock: Number(formData.stock),
      };

      setProducts([...products, newProduct]);
    }

    setFormData({
      name: "",
      category: "",
      price: "",
      stock: "",
    });

    setShowForm(false);
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
  };

  const handleDelete = (id) => {
    const updatedProducts = products.filter(
      (product) => product.id !== id
    );

    setProducts(updatedProducts);
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
  };

  return (
    <div className="products-page">
      <div className="page-header">
        <h1>Product Management</h1>

        <button
          className="add-product-button"
          onClick={handleAddProduct}
        >
          Add Product
        </button>
      </div>

      {showForm && (
        <div className="product-form">
          <h2>
            {editingProduct ? "Edit Product" : "Add Product"}
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

            <button type="submit" className="save-product-button">
              {editingProduct ? "Update Product" : "Add Product"}
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
                <td>₹{product.price}</td>
                <td>{product.stock}</td>

                <td>
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-button"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;