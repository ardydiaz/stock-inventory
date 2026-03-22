# 📦 Inventory Management Frontend (React)

This is the **React frontend** for the Inventory Management System.
It connects to a Laravel API backend and provides features such as product management, stock tracking, , show deleted products, search filtering, soft delete and restore delete product.

---

## 🚀 Features

* 📋 View Products Table
* 🔍 Search & Filter (Name, Price Range)
* ➕ Add Product
* ✏️ Edit Product
* 👁️ Show Deleted Products
* 🗑️ Soft Delete
* ♻️ Restore Deleted
* 📥 Stock In
* 📤 Stock Out
* 📊 Inventory Movements Table
* 💅 Modern UI using Tailwind CSS
* 🔄 API Integration (Axios)

---

## 🛠️ Tech Stack

* React (Vite / CRA)
* Axios (API Requests)
* Tailwind CSS (Styling)

---

## 📂 Project Structure

```
src/
│── components/
│   ├── Header.jsx
│   ├── ProductTable.jsx
│   ├── MovementsTable.jsx
    ├── Dashboard.jsx
│   └── modal/
│       ├── ProductModal.jsx
│       ├── StockModal.jsx
│       └── Modal.jsx
│
│── api/
│   └── axios.js
│
│── images (System UI)
│   
```

---

## ⚙️ Installation

### 1. Clone the repository

```
git clone https://github.com/ardydiaz/stock-inventory.git
cd front-end
```

### 2. Install dependencies

```
npm install
```

### 3. Run the project

```
npm run dev
```

App will run at:

```
http://localhost:5173
```

---

---

## 🔍 Search & Filter (API Integration)

The frontend connects to the backend API using query parameters:

### Example Requests

```
GET /api/products?name=Apple
GET /api/products?price=100
GET /api/products?min_price=50&max_price=150
GET /api/products?name=Apple&min_price=50&max_price=150
```

### React Implementation

Filters are managed in `Dashboard.jsx`:

```js
api.get("/products", {
  params: {
    name: searchName,
    min_price: minPrice,
    max_price: maxPrice,
  },
});
```

---

## 🧩 Components Overview

### 🧱 Dashboard.jsx

* Main container
* Handles API calls
* Manages state (products, filters, modals)

### 📋 ProductTable.jsx

* Displays product list
* Contains search & filter inputs
* Triggers edit modal

### 📦 ProductModal.jsx

* Used for:

  * Add Product
  * Edit Product

### 📥📤 StockModal.jsx

* Handles:

  * Stock In
  * Stock Out

### 🧊 Modal.jsx

* Reusable modal wrapper (UI consistency)

---

## 🎨 Styling (Tailwind)

Reusable classes example:

```css
.input {
  @apply w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400;
}

.btn-primary {
  @apply px-5 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white;
}

.btn-secondary {
  @apply px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200;
}
```

---

## 🧪 Sample UI Flow

1. User types in search input
2. React updates state
3. `useEffect` triggers API call
4. Backend filters data
5. Table updates automatically

---

## 📌 Notes

* Make sure backend API is running
* Ensure CORS is enabled in Laravel
* Use correct API base URL

---


## 👨‍💻 Author

Ardy Diaz

---

## 📄 License

This project is open-source and available under the MIT License.
