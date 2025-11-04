import { API_BASE_URL } from "@/config/apiConfig";
import axios from "axios";
import type { Transaction, TransactionFilters } from "../types/types";

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/transactions`,
});
// api calls get,add,update, delete
export const transactionsAPI = {
  getAll: async (filters?: TransactionFilters) => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          params.append(key, String(value));
        }
      });
    }
    const { data } = await api.get(`?${params.toString()}`);
    return data;
  },

  create: async (transaction: Transaction) => {
    const { data } = await api.post("/", transaction);
    return data;
  },

  update: async (id: string, transaction: Transaction) => {
    const { data } = await api.put(`/${id}`, transaction);
    return data;
  },

  remove: async (id: string) => {
    const { data } = await api.delete(`/${id}`);
    return data;
  },
};
