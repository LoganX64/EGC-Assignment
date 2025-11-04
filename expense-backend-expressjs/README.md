# 💰 Expense Tracker Backend (Node.js + Express + MongoDB)

This backend powers the **Expense Tracker Application**, enabling users to manage their **income and expense records** efficiently.  
It provides complete CRUD operations with filtering, pagination, and summary features.

---

## 🚀 Features

- CRUD operations for transactions (income & expense)
- Filter by **type**, **category**, and **date range**
- Pagination and sorting support
- MongoDB with Mongoose for data storage
- Centralized error and validation handling
- Environment-based configuration using `.env`

---

## 🗂️ Folder Structure

```
src/
├── config/
│   └── db.js # Database connection configuration
├── controllers/
│   └── transactionControllers.js # Logic for handling transaction requests
├── middleware/
│   ├── errorHandler.js # Global error handling logic
│   └── validateRequest.js # Middleware for request validation checks
├── models/
│   └── Transaction.js # Mongoose model for the Transaction entity
├── routes/
│   └── transactionsRoute.js # Express route definitions for transaction endpoints
├── validation/
│   └── transactionValidation.js # Validation schemas (Joi or Express-validator)
└── server.js # The main Express server setup and startup file
```

---

## ⚙️ Setup Instructions

### 1️⃣ Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- npm or yarn

### 2️⃣ Installation

```bash
npm install
```

### 3️⃣ Environment Variables

Create a `.env` file in the project root:

```env
PORT=5000
MONGO_CONNECTION_STRING=mongodb://localhost:27017/expense_tracker
NODE_ENV=development
```

### 4️⃣ Run the Application

#### Development mode:

```bash
npm run dev
```

#### Production mode:

```bash
npm start
```

Backend runs on:  
👉 **[http://localhost:4000](http://localhost:4000)**

---

## 🔌 API Endpoints

| Method   | Endpoint                | Description                      |
| -------- | ----------------------- | -------------------------------- |
| `POST`   | `/api/transactions`     | Create a new transaction         |
| `GET`    | `/api/transactions`     | Get all or filtered transactions |
| `GET`    | `/api/transactions/:id` | Get a specific transaction by ID |
| `PUT`    | `/api/transactions/:id` | Update a transaction             |
| `DELETE` | `/api/transactions/:id` | Delete a transaction             |

---

## 🧮 Query Parameters (GET `/api/transactions`)

| Parameter   | Type   | Example              | Description                  |
| ----------- | ------ | -------------------- | ---------------------------- |
| `type`      | string | `income` / `expense` | Filter by transaction type   |
| `category`  | string | `Food`               | Filter by category           |
| `startDate` | date   | `2025-10-01`         | Start date filter            |
| `endDate`   | date   | `2025-10-31`         | End date filter              |
| `page`      | number | `1`                  | Pagination page (default: 1) |
| `limit`     | number | `10`                 | Items per page (default: 20) |
| `sortBy`    | string | `date:desc`          | Sort field and order         |

---

## 🧾 Example Payloads

### ➕ Create Transaction

```json
{
  "type": "income",
  "amount": 50000,
  "description": "Freelance Project Payment",
  "category": "Work",
  "date": "2025-10-30"
}
```

### ✏️ Update Transaction

```json
{
  "type": "expense",
  "amount": 2500,
  "description": "Grocery and utilities",
  "category": "Food",
  "date": "2025-10-30"
}
```

### ✅ Example Response

```json
{
  "page": 1,
  "limit": 20,
  "total": 4,
  "items": [
    {
      "_id": "6722a9a23c4149e5d92a0c53",
      "type": "income",
      "amount": 75000,
      "description": "Freelance payment",
      "category": "Work",
      "date": "2025-10-30T00:00:00.000Z"
    }
  ],
  "summary": {
    "income": 75000,
    "expense": 2500
  }
}
```

---

## 🧠 Validation Rules

| Field         | Type     | Required | Notes                             |
| ------------- | -------- | -------- | --------------------------------- |
| `type`        | string   | ✅       | Must be `"income"` or `"expense"` |
| `amount`      | number   | ✅       | Must be ≥ 0                       |
| `description` | string   | ❌       | Optional                          |
| `category`    | string   | ❌       | Optional                          |
| `date`        | ISO date | ✅       | Transaction date                  |

---

## 🧱 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Validation:** Joi
- **Logging:** Morgan
- **CORS:** Enabled
- **Environment Config:** dotenv

---

## 👨‍💻 Author

**Jitin K**  
Web Developer – EGC India Assignment  
📧 [kpjitin@gmail.com](mailto:kpjitin@gmail.com)

---

## 🏁 License

Licensed under the **MIT License**.
