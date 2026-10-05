# 🛒 TechHub — Full-Stack E-Commerce Platform

TechHub is a full-stack e-commerce web application built with React, Node.js, Express, and MySQL.

It provides a complete shopping experience for customers along with a dedicated admin dashboard for managing products, users, orders, and product verification.

---

## ✨ Features

### 👤 Customer

- User registration and login
- JWT-based authentication
- Browse verified products
- View product details
- Add products to cart
- Place orders
- View personal order history
- Track order status

### 🛠️ Admin

- Secure admin authentication
- Admin dashboard
- Product management
- Add, edit, and delete products
- Product verification system
- View and verify pending products
- Order management
- Update order status
- Order history and status tracking
- User management
- Role-based access control

---

## 🔐 Product Verification

TechHub includes a product verification workflow to ensure that only approved products are displayed to customers.

**New Product → Pending → Admin Verification → Verified → Visible to Customers**

If a verified product is edited, it automatically returns to **Pending** and must be verified again.

---

## 📦 Order Management

Admins can update orders through different stages:

**Pending → Processing → Shipped → Delivered**

Orders can also be marked as **Cancelled**.

Every order status change is recorded in the Order History system, including:

- Order ID
- Previous status
- New status
- Admin who made the change
- Date and time

---

## 🏗️ Tech Stack

### Frontend

- React.js
- Vite
- JavaScript
- HTML
- CSS

### Backend

- Node.js
- Express.js
- REST API
- JWT
- bcrypt

### Database

- MySQL
- Sequelize ORM

### Tools

- Git & GitHub
- Postman
- MySQL Workbench
- VS Code

---

## 📁 Project Structure

- **admin-frontend/** — Admin dashboard
- **customer-frontend/** — Customer shopping interface
- **backend/** — Node.js + Express backend
- **README.md** — Project documentation

---

## ⚙️ Getting Started

### 1. Clone the Repository

`git clone https://github.com/Adarsh-50/TechHub.git`

`cd TechHub`

### 2. Install Backend Dependencies

`cd backend`

`npm install`

### 3. Configure Environment Variables

Create a `.env` file inside the `backend` folder.

Use the following configuration:

`PORT=5000`

`DB_HOST=localhost`

`DB_USER=root`

`DB_PASSWORD=your_mysql_password`

`DB_NAME=techhub`

`DB_PORT=3306`

`JWT_SECRET=your_jwt_secret`

### 4. Create the Database

Create a MySQL database named:

**techhub**

### 5. Start the Backend

`npm start`

Backend runs at:

**http://localhost:5000**

### 6. Start the Customer Frontend

Open a new terminal:

`cd customer-frontend`

`npm install`

`npm run dev`

### 7. Start the Admin Frontend

Open another terminal:

`cd admin-frontend`

`npm install`

`npm run dev`

---

## 🔒 Security

TechHub uses:

- JWT authentication
- bcrypt password hashing
- Protected API routes
- Role-based authorization
- Admin-only operations
- Environment variables for sensitive configuration

---

## 🚧 Future Improvements

- Payment gateway integration
- Product search and filtering
- Inventory management
- Email notifications
- Product reviews and ratings
- Wishlist
- Admin analytics
- Production deployment

---

## 👨‍💻 Author

**Adarsh Jaiswal**

B.Tech — Computer Science Engineering  
Specialization: Artificial Intelligence & Machine Learning

---

⭐ If you like the project, consider giving it a star!
