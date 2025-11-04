import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type {
  Transaction,
  TransactionFilters,
  TransactionState,
} from "../types/types";
import { transactionsAPI } from "./transactionApi";
import type { RootState } from "@/store/store";

const initialState: TransactionState = {
  transactions: [],
  allTransactions: [],
  loading: false,
  error: null,
  filters: {},
  totalIncome: 0,
  totalExpense: 0,
};

// Fetch table + filter
export const fetchAllTransactions = createAsyncThunk(
  "transactions/fetchAll",
  async (filters: TransactionFilters = {}, { getState }) => {
    const state = getState() as RootState;
    const merged = { ...state.transactions.filters, ...filters };
    const data = await transactionsAPI.getAll(merged);
    return { items: data.items, summary: data.summary };
  }
);

// for cards
export const fetchSummary = createAsyncThunk(
  "transactions/fetchSummary",
  async () => {
    const data = await transactionsAPI.getAll(); // no filters
    return { items: data.items, summary: data.summary };
  }
);

// Basic Crud
export const addTransaction = createAsyncThunk(
  "transactions/add",
  async (transaction: Transaction) => {
    const data = await transactionsAPI.create(transaction);
    return data;
  }
);
export const updateTransaction = createAsyncThunk(
  "transactions/update",
  async ({ id, transaction }: { id: string; transaction: Transaction }) => {
    const data = await transactionsAPI.update(id, transaction);
    return data;
  }
);
export const deleteTransaction = createAsyncThunk(
  "transactions/delete",
  async (id: string) => {
    await transactionsAPI.remove(id);
    return id;
  }
);

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<TransactionFilters>) {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    // filter table
    builder
      .addCase(fetchAllTransactions.pending, (state) => {
        state.loading = true;
        // state.error = null;
      })
      .addCase(fetchAllTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload.items;

        const hasActiveFilters = Object.values(state.filters).some(
          (v) => v != null && v !== ""
        );
        if (!hasActiveFilters) {
          state.allTransactions = action.payload.items;
        }
      })
      .addCase(fetchAllTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to load";
      });

    //  summary chart and card
    builder.addCase(fetchSummary.fulfilled, (state, action) => {
      const items = action.payload.items;

      state.allTransactions = items;

      const incomes = items.filter((t: Transaction) => t.type === "income");
      const expenses = items.filter((t: Transaction) => t.type === "expense");

      state.totalIncome =
        action.payload.summary?.income ??
        incomes.reduce((sum: number, t: Transaction) => sum + t.amount, 0);

      state.totalExpense =
        action.payload.summary?.expense ??
        expenses.reduce((sum: number, t: Transaction) => sum + t.amount, 0);
    });

    //  basic Crud
    builder
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.transactions.unshift(action.payload);
        state.allTransactions.unshift(action.payload);
        if (action.payload.type === "income")
          state.totalIncome += action.payload.amount;
        else state.totalExpense += action.payload.amount;
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        const idx = state.transactions.findIndex(
          (t) => t._id === action.payload._id
        );
        if (idx !== -1) {
          const old = state.transactions[idx];
          if (old.type === "income") state.totalIncome -= old.amount;
          else state.totalExpense -= old.amount;

          state.transactions[idx] = action.payload;
          const allIdx = state.allTransactions.findIndex(
            (t) => t._id === action.payload._id
          );
          if (allIdx !== -1) state.allTransactions[allIdx] = action.payload;

          if (action.payload.type === "income")
            state.totalIncome += action.payload.amount;
          else state.totalExpense += action.payload.amount;
        }
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        const tx = state.transactions.find((t) => t._id === action.payload);
        if (tx) {
          if (tx.type === "income") state.totalIncome -= tx.amount;
          else state.totalExpense -= tx.amount;
        }
        state.transactions = state.transactions.filter(
          (t) => t._id !== action.payload
        );
        state.allTransactions = state.allTransactions.filter(
          (t) => t._id !== action.payload
        );
      });
  },
});

export const { setFilters } = transactionSlice.actions;
export default transactionSlice.reducer;
