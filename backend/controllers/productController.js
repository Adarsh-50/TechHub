const { Op } = require("sequelize");
const Product = require("../models/Product");

// Get all products with search and pagination
const getProducts = async (req, res) => {
  try {
    const search = req.query.search || "";
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 8, 1);

    const offset = (page - 1) * limit;

    let products = [];
    let totalProducts = 0;
    let relatedProducts = [];

    // Normal product listing
    if (!search) {
      const result = await Product.findAndCountAll({
        limit,
        offset,
        order: [["createdAt", "DESC"]],
      });

      products = result.rows;
      totalProducts = result.count;
    } else {
      const searchTerm = search.toLowerCase();

      // Product type/category mapping
      let mainCategories = [];

      if (
        searchTerm.includes("laptop") ||
        searchTerm.includes("notebook")
      ) {
        mainCategories = ["Laptop"];
      } else if (
        searchTerm.includes("phone") ||
        searchTerm.includes("mobile") ||
        searchTerm.includes("smartphone")
      ) {
        mainCategories = ["Mobile"];
      } else if (
        searchTerm.includes("headphone") ||
        searchTerm.includes("headset") ||
        searchTerm.includes("earphone")
      ) {
        mainCategories = ["Audio"];
      } else if (
        searchTerm.includes("watch") ||
        searchTerm.includes("smartwatch")
      ) {
        mainCategories = ["Watch"];
      } else if (
        searchTerm.includes("tablet") ||
        searchTerm.includes("ipad")
      ) {
        mainCategories = ["Tablet"];
      } else if (searchTerm.includes("camera")) {
        mainCategories = ["Camera"];
      } else if (searchTerm.includes("monitor")) {
        mainCategories = ["Monitor"];
      }

      // Main search condition
      const searchCondition = {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            category: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      };

      // Find all matching products first
      let matchingProducts = await Product.findAll({
        where: searchCondition,
      });

      // If a main product category was identified,
      // keep only the actual products of that category
      // in the main search results.
      if (mainCategories.length > 0) {
        matchingProducts = matchingProducts.filter((product) => {
          return mainCategories.some(
            (category) =>
              product.category.toLowerCase() === category.toLowerCase()
          );
        });
      }

      // Sort main products by newest first
      matchingProducts.sort(
        (a, b) =>
          new Date(b.createdAt) - new Date(a.createdAt)
      );

      totalProducts = matchingProducts.length;

      // Apply pagination after filtering and sorting
      products = matchingProducts.slice(
        offset,
        offset + limit
      );

      // Related product keywords and categories
      let relatedKeywords = [];
      let relatedCategories = [];

      if (mainCategories.includes("Laptop")) {
        relatedKeywords = [
          "mouse",
          "keyboard",
          "headset",
          "headphones",
          "stand",
          "bag",
          "cable",
          "webcam",
        ];

        relatedCategories = ["Accessories"];
      } else if (mainCategories.includes("Mobile")) {
        relatedKeywords = [
          "cover",
          "case",
          "screen protector",
          "tempered glass",
          "charger",
          "earphone",
          "headphone",
          "cable",
          "power bank",
        ];

        relatedCategories = ["Mobile Accessories"];
      } else if (mainCategories.includes("Audio")) {
        relatedKeywords = [
          "stand",
          "case",
          "cover",
          "charger",
          "cable",
          "adapter",
        ];

        relatedCategories = ["Audio Accessories"];
      } else if (mainCategories.includes("Watch")) {
        relatedKeywords = [
          "strap",
          "charger",
          "case",
          "screen protector",
        ];

        relatedCategories = ["Watch Accessories"];
      } else if (mainCategories.includes("Tablet")) {
        relatedKeywords = [
          "cover",
          "case",
          "screen protector",
          "keyboard",
          "charger",
          "stand",
        ];

        relatedCategories = ["Tablet Accessories"];
      } else if (mainCategories.includes("Camera")) {
        relatedKeywords = [
          "tripod",
          "bag",
          "memory card",
          "battery",
          "charger",
          "lens",
        ];

        relatedCategories = ["Camera Accessories"];
      } else if (mainCategories.includes("Monitor")) {
        relatedKeywords = [
          "stand",
          "cable",
          "keyboard",
          "mouse",
          "webcam",
        ];

        relatedCategories = ["Monitor Accessories"];
      }

      // Find related products
      if (
        relatedKeywords.length > 0 &&
        relatedCategories.length > 0
      ) {
        const productIds = matchingProducts.map(
          (product) => product.id
        );

        relatedProducts = await Product.findAll({
          where: {
            [Op.and]: [
              {
                id: {
                  [Op.notIn]:
                    productIds.length > 0
                      ? productIds
                      : [0],
                },
              },
              {
                category: {
                  [Op.in]: relatedCategories,
                },
              },
              {
                [Op.or]: relatedKeywords.map((keyword) => ({
                  name: {
                    [Op.like]: `%${keyword}%`,
                  },
                })),
              },
            ],
          },
          limit: 4,
          order: [["createdAt", "DESC"]],
        });
      }
    }

    const totalPages = Math.ceil(
      totalProducts / limit
    );

    res.json({
      products,
      relatedProducts,
      currentPage: page,
      totalPages,
      totalProducts,
      productsPerPage: limit,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching products",
      error: error.message,
    });
  }
};

// Get single product
const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching product",
      error: error.message,
    });
  }
};

// Create product
const createProduct = async (req, res) => {
  try {
    const { name, category, price, stock, image } = req.body;

    const product = await Product.create({
      name,
      category,
      price,
      stock,
      image,
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating product",
      error: error.message,
    });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const { name, category, price, stock, image } = req.body;

    await product.update({
      name,
      category,
      price,
      stock,
      image,
    });

    res.json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating product",
      error: error.message,
    });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await product.destroy();

    res.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting product",
      error: error.message,
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};