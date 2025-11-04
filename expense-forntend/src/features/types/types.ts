export type TransactionType = "income" | "expense";

export const INCOME_CATEGORIES = [
  "Salary",
  "Freelance",
  "Investment",
  "Bonus",
  "Other Income",
] as const;

export const EXPENSE_CATEGORIES = [
  "Food",
  "Rent",
  "Transport",
  "Entertainment",
  "Shopping",
  "Bills",
  "Health",
  "Education",
  "Other Expense",
] as const;

export type IncomeCategory = (typeof INCOME_CATEGORIES)[number];
export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];
export type Category = IncomeCategory | ExpenseCategory;

export interface Transaction {
  _id?: string;
  type: "income" | "expense";
  amount: number;
  description: string;
  category: string;
  date: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TransactionFilters {
  type?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface TransactionState {
  transactions: Transaction[];
  allTransactions: Transaction[];
  loading: boolean;
  error: string | null;
  filters: TransactionFilters;
  totalIncome: number;
  totalExpense: number;
}

export interface NewTransaction {
  type: "income" | "expense";
  amount: number;
  description: string;
  category: string;
  date: string;
}
