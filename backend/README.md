<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

---

# 📦 Stock Inventory API (Laravel 12)

A RESTful API for managing **products, stock levels, and inventory movements**.

---

# ⚙️ Installation & Setup
**Clone the Repository**
* `git clone https://github.com/your-username/your-repo.git`

**cd your-repo**
* Install Dependencies
   * `composer install`

**Setup Environment**
* copy .env.example
* edit to `.env file`:

**Generate app key:**
* `php artisan key:generate`

**Configure Database**
*`Edit your .env file:`*

* DB_CONNECTION=mysql
* DB_HOST=127.0.0.1
* DB_PORT=3306
* DB_DATABASE=your_database
* DB_USERNAME=root
* DB_PASSWORD=

**Run Migrations**
* php artisan migrate

**Run the Server**
* php artisan serve

## 🚀 Base URL

```
http://127.0.0.1:8000/api
```

---

## 🔐 Authentication (Laravel Sanctum)

### 👤 Register

**POST** `http://127.0.0.1:8000/api/register`

#### Request:
```json
{
  "name": "ardy diaz",
  "email": "ardy@gmail.com",
  "password": "123456",
}
```
### Login

**POST** `http://127.0.0.1:8000/api/login`

#### Request:

```json
{
  "email": "ardy@gmail.com",
  "password": "123456"
}
```

```json
{
  "token": "your_access_token"
}
```

👉 Use this in headers:

```
Authorization: Bearer your_access_token
Example: * `Bearer 5|7veRYy7TAJjoLA9dqcFkoBb1DIxuSKAVU8yeIAkie499ca70`
```

## 📡 HTTP Headers

**All protected endpoints require the following headers:**
* Authorization: ` Bearer your_access_token`
* Accept: `application/json`
* Content-Type: `application/json`

#### Response:

---

# 📦 Products API

## 🔍 Get Products

**GET** `http://127.0.0.1:8000/api/products`

#### Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 4,
      "name": "Orange",
      "sku": "sku-144",
      "category": "Fruits",
      "price": "30.00",
      "current_stock": 450,
      "status": 1,
      "created_at": "2026-03-20T16:20:43.000000Z",
      "updated_at": "2026-03-20T16:20:43.000000Z",
      "deleted_at": null
    }
  ]
}
```

### Query Params:
```
Search filter
```
**GET** `http://127.0.0.1:8000/api/products?name=Apple`
#### Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 3,
      "name": "Apple",
      "sku": "sku-1",
      "category": "fruits",
      "price": "90.00",
      "current_stock": 25,
      "status": 1,
      "created_at": "2026-03-20T01:03:36.000000Z",
      "updated_at": "2026-03-20T15:45:05.000000Z",
      "deleted_at": null
    }
  ]
}
```
**GET** `http://127.0.0.1:8000/api/products?price=100`
#### Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 2,
      "name": "coconut",
      "sku": "sku-07",
      "category": "5",
      "price": "100.00",
      "current_stock": 24,
      "status": 1,
      "created_at": "2026-03-19T14:15:26.000000Z",
      "updated_at": "2026-03-20T14:50:11.000000Z",
      "deleted_at": null
    }
  ]
}
```
**GET** `http://127.0.0.1:8000/api/products?min_price=50&max_price=150`
#### Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 3,
      "name": "Apple",
      "sku": "sku-1",
      "category": "fruits",
      "price": "90.00",
      "current_stock": 25,
      "status": 1,
      "created_at": "2026-03-20T01:03:36.000000Z",
      "updated_at": "2026-03-20T15:45:05.000000Z",
      "deleted_at": null
    },
    {
      "id": 2,
      "name": "coconut",
      "sku": "sku-07",
      "category": "5",
      "price": "100.00",
      "current_stock": 24,
      "status": 1,
      "created_at": "2026-03-19T14:15:26.000000Z",
      "updated_at": "2026-03-20T14:50:11.000000Z",
      "deleted_at": null
    }
  ]
}
```
**GET** `http://127.0.0.1:8000/api/products?name=Apple&min_price=50&max_price=150`
#### Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 3,
      "name": "Apple",
      "sku": "sku-1",
      "category": "fruits",
      "price": "90.00",
      "current_stock": 25,
      "status": 1,
      "created_at": "2026-03-20T01:03:36.000000Z",
      "updated_at": "2026-03-20T15:45:05.000000Z",
      "deleted_at": null
    }
  ]
}
```
`
* `name` → search product
* `price` → exact price
* `min_price` / `max_price` → price range
* `deleted=only` → show soft deleted
---

## ➕ Create Product

**POST** `http://127.0.0.1:8000/api/add-products`

```json
{
  "name": "Product A",
  "sku": "SKU001",
  "price": 100,
  "category": "Food",
  "current_stock": 10,
  "status": true
}
```

---

## 🔎 Get Single Product

**GET** `http://127.0.0.1:8000/api/products/show/{id}`

---

## ✏️ Update Product

**PUT** `http://127.0.0.1:8000/api/products/update/{id}`

```json
{
  "name": "Updated Product",
  "price": 200
}
```

---

## 🗑️ Delete Product

**DELETE** `http://127.0.0.1:8000/api/products/delete/{id}`

---

## ♻️ Restore Product

**PUT** `http://127.0.0.1:8000/api/products/restore/{id}`

---

# 📊 Inventory API

## 📥 Stock In

**POST** `http://127.0.0.1:8000/api/inventory/stock-in`

```json
{
  "product_id": 1,
  "quantity": 10,
  "reference": "PO-001",
  "remarks": "Restock"
}
```

---

## 📤 Stock Out

**POST** `http://127.0.0.1:8000/api/inventory/stock-out`

```json
{
  "product_id": 1,
  "quantity": 5,
  "reference": "SO-001",
  "remarks": "Sold items"
}
```

---

## 📜 Movements

**GET** `http://127.0.0.1:8000/api/inventory/movements`

---

# ⚠️ Error Handling

### Validation Error (422)

```json
{
  "success": false,
  "errors": {}
}
```

### General Error (400)

```json
{
  "success": false,
  "message": "Error message"
}
```
# 🗑️ Soft Delete Product

**DELETE** `http://127.0.0.1:8000/api/products/delete/{id}`

This does NOT permanently delete the product
It sets a deleted_at timestamp
Response:
{
  "success": true,
  "message": "Product deleted successfully"
}


# ♻️ Restore Product

**PUT** `http://127.0.0.1:8000/api//products/restore/{id}`

Restore a soft-deleted product
Response:
{
  "success": true,
  "message": "Product restored successfully",
  "data": { }
}
---

# 🛠️ Tech Stack

* Laravel 12
* Laravel Sanctum
* MySQL

---

# 📌 Notes

* All protected routes require **Bearer Token**
* Products use **Soft Deletes**
* Products use **restre Delete produc**
* Products use **search filter**
* Products use **inventory movements**
* Inventory uses **Database Transactions**

---

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. It simplifies common tasks such as routing, authentication, sessions, caching, and database operations.

* [Laravel Documentation](https://laravel.com/docs)
* [Laracasts](https://laracasts.com)

---

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
