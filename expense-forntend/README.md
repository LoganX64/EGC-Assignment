# 💰 Finance Flow Frontend

This is the **frontend** for the Expense Tracker Application, built using **React**, **Redux Toolkit**, **TypeScript**, and **Zod**.  
It connects to the backend API to manage income and expense transactions through a modern, responsive interface.

---

## 🚀 Tech Stack

| Category         | Technologies Used                     |
| ---------------- | ------------------------------------- |
| Framework        | [React 18+] + [TypeScript]            |
| State Management | [Redux Toolkit]                       |
| API Calls        | [Axios]                               |
| Validation       | [Zod]                                 |
| Styling          | [Tailwind CSS]                        |
| Data Flow        | Redux Thunks (async actions for CRUD) |

---

## 📁 Folder Structure

```
src/
├── assets/
│   └── react.svg
├── components/
│   ├── ui/
│   │   └── add-edit-transactions-dialog.tsx // Generic dialog component
│   ├── ChartsSection.tsx
│   ├── Navbar.tsx
│   ├── SummaryCards.tsx
│   ├── TransactionFilters.tsx
│   └── TransactionTable.tsx
├── config/
│   └── apiConfig.ts // API base URLs, keys, etc.
├── features/
│   └── transactions/
│       ├── transactionApi.ts // Axios-based API calls for transactions
│       └── transactionSlice.ts // Redux Toolkit slice and async thunks
├── types/ // TypeScript interfaces and types
├── lib/ // Utility functions (helpers)
├── store/
│   ├── hooks.ts // Typed Redux hooks (useAppDispatch/useAppSelector)
│   └── store.ts // Redux store configuration
├── App.css
├── App.tsx
├── index.css
└── main.tsx // Entry point (renders App.tsx)
```

---

## 🧩 Core Features

- ✅ Add, Update, and Delete transactions
- ✅ Fetch transactions with filters (type, category, date)
- ✅ Auto-calculated **total income** and **total expense**
- ✅ Redux Toolkit-powered async thunks for API communication
- ✅ Zod validation for safe inputs
- ✅ State management and async actions via **Redux Toolkit**

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/expense-tracker-frontend.git
cd expense-tracker-frontend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment

Create a `.env` file in the root directory:

```bash
VITE_API_BASE_URL=http://localhost:4000
```

> ⚠️ The backend should expose `/api/transactions` endpoints.

### 4️⃣ Run the App

```bash
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

## 🔄 Redux Flow

1. **Component** dispatches async thunk →
2. **Thunk** calls `transactionsAPI` via Axios →
3. **Slice reducers** update store based on pending/fulfilled/rejected →
4. **UI** re-renders with new state using `useAppSelector`

Example:

```ts
dispatch(fetchTransactions());
dispatch(addTransaction(newTransaction));
dispatch(deleteTransaction(id));
```

---

## 🧠 Key Files Explained

| File                    | Purpose                                              |
| ----------------------- | ---------------------------------------------------- |
| **hooks.ts**            | Provides typed `useDispatch` and `useSelector` hooks |
| **store.ts**            | Configures global Redux store                        |
| **transactionApi.ts**   | Centralizes Axios CRUD API logic                     |
| **transactionSlice.ts** | Defines state, reducers, async actions               |
| **types.ts**            | TypeScript interfaces for transactions & filters     |

---

## 🧪 Example API Endpoints (Expected Backend)

| Method   | Endpoint                | Description            |
| -------- | ----------------------- | ---------------------- |
| `GET`    | `/api/transactions`     | Fetch all transactions |
| `POST`   | `/api/transactions`     | Create new transaction |
| `PUT`    | `/api/transactions/:id` | Update transaction     |
| `DELETE` | `/api/transactions/:id` | Delete transaction     |

---

## 🧾 Example `.env` File

```
VITE_API_BASE_URL=http://localhost:4000
```

---

## 👨‍💻 Author

**KP Jitin**  
Web Developer – EGC India Assignment  
📧 [kpjitin@gmail.com](mailto:kpjitin@gmail.com)

---

## 🏁 License

Licensed under the **MIT License**.
