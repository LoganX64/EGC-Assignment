# 💰 Expense Tracker (Full Stack)

A full-stack **Expense Tracker Application** built with **Node.js (Express + MongoDB)** on the backend and **React (TypeScript + Redux Toolkit)** on the frontend.  
Users can manage income and expense transactions with filtering, sorting, and summaries.

---

## 🧱 Tech Stack

**Backend:** Node.js, Express, MongoDB, Mongoose, Joi  
**Frontend:** React, TypeScript, Redux Toolkit, Axios, Zod, Tailwind CSS

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/expense-tracker.git
cd expense-tracker
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env`:

```env
PORT=4000
MONGO_CONNECTION_STRING=mongodb://localhost:27017/expense_tracker
```

Run:

```bash
npm run dev
```

Backend URL → [http://localhost:4000](http://localhost:4000)

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
```

Create `.env`:

```env
VITE_API_BASE_URL=http://localhost:4000
```

Run:

```bash
npm run dev
```

Frontend URL → [http://localhost:5173](http://localhost:5173)

---

## 🔌 API Overview

| Method | Endpoint                | Description            |
| ------ | ----------------------- | ---------------------- |
| GET    | `/api/transactions`     | Fetch all transactions |
| POST   | `/api/transactions`     | Create new transaction |
| PUT    | `/api/transactions/:id` | Update transaction     |
| DELETE | `/api/transactions/:id` | Delete transaction     |

---

## 🧮 Features

- Add / Edit / Delete income & expense records
- Filter by type, category, and date range
- View income and expense summaries
- Pagination & sorting support
- Validation on both backend (Joi) and frontend (Zod)

---

## 👨‍💻 Author

**KP Jitin**  
Web Developer – EGC India Assignment  
📧 [kpjitin@gmail.com](mailto:kpjitin@gmail.com)

---

## 🏁 License

Licensed under the **MIT License**.
