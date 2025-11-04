import { useState, useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import {
  addTransaction,
  updateTransaction,
  fetchAllTransactions,
} from "@/features/transactions/transactionSlice";
import type { Transaction } from "@/features/types/types";
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from "@/features/types/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface TransactionFormProps {
  existingTransaction?: Transaction;
  onClose: () => void;
}

export const TransactionForm = ({
  existingTransaction,
  onClose,
}: TransactionFormProps) => {
  const dispatch = useAppDispatch();

  // form state
  const [formData, setFormData] = useState<
    Omit<Transaction, "_id" | "createdAt" | "updatedAt">
  >({
    type: "income",
    amount: 0,
    description: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [categoryReady, setCategoryReady] = useState(false); // ← NEW

  useEffect(() => {
    if (existingTransaction) {
      setFormData({
        type: existingTransaction.type,
        amount: existingTransaction.amount,
        description: existingTransaction.description,
        category: existingTransaction.category,
        date: existingTransaction.date.split("T")[0],
      });
    } else {
      setFormData({
        type: "income",
        amount: 0,
        description: "",
        category: "",
        date: new Date().toISOString().split("T")[0],
      });
    }

    setCategoryReady(true);
  }, [existingTransaction]);

  // --- Category list  ---
  const getCategories = () => {
    return formData.type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  };
  const categories = getCategories();
  const categoryList = [...categories] as string[];
  const isCustomCategory =
    formData.category && !categoryList.includes(formData.category);

  // --- Handlers ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) || 0 : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // --- Validation & Submit ---
  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.amount || formData.amount <= 0)
      newErrors.amount = "Enter a valid amount";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!formData.date) newErrors.date = "Date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      if (existingTransaction?._id) {
        await dispatch(
          updateTransaction({
            id: existingTransaction._id,
            transaction: { ...formData } as Transaction,
          })
        ).unwrap();
      } else {
        await dispatch(addTransaction(formData)).unwrap();
      }
      await dispatch(fetchAllTransactions({}));
      onClose();
    } catch (err) {
      console.error("Transaction failed:", err);
      alert("Failed to save transaction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* TYPE & AMOUNT */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="type" className="mb-2">
            Type
          </Label>
          {categoryReady && (
            <Select
              value={formData.type}
              onValueChange={(v) => {
                handleSelectChange("type", v);
                setFormData((prev) => ({ ...prev, category: "" }));
              }}
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>

        <div>
          <Label htmlFor="amount" className="mb-2">
            Amount (₹)
          </Label>
          <Input
            id="amount"
            type="number"
            name="amount"
            min="0"
            step="0.01"
            value={formData.amount === 0 ? "" : formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            className={errors.amount ? "border-red-500" : ""}
          />
          {errors.amount && (
            <p className="text-red-500 text-xs mt-1">{errors.amount}</p>
          )}
        </div>
      </div>

      {/* CATEGORY */}
      <div>
        <Label htmlFor="category" className="mb-2">
          Category
        </Label>

        {/* Pre-defined dropdown */}
        {categoryReady && (
          <Select
            value={isCustomCategory ? "" : formData.category}
            onValueChange={(v) => handleSelectChange("category", v)}
          >
            <SelectTrigger id="category-select">
              <SelectValue placeholder={`Choose ${formData.type} category…`} />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <Input
          id="category"
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Or type a custom category…"
          className={`mt-2 ${errors.category ? "border-red-500" : ""}`}
        />
        {errors.category && (
          <p className="text-red-500 text-xs mt-1">{errors.category}</p>
        )}
      </div>

      {/* DATE */}
      <div>
        <Label htmlFor="date" className="mb-2">
          Date
        </Label>
        <Input
          id="date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className={errors.date ? "border-red-500" : ""}
        />
        {errors.date && (
          <p className="text-red-500 text-xs mt-1">{errors.date}</p>
        )}
      </div>

      {/* DESCRIPTION */}
      <div>
        <Label htmlFor="description" className="mb-2">
          Description
        </Label>
        <Input
          id="description"
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="e.g., Monthly salary, Grocery shopping"
          className={errors.description ? "border-red-500" : ""}
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">{errors.description}</p>
        )}
      </div>

      {/* BUTTONS */}
      <div className="flex justify-end gap-3 pt-3">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={loading} className="min-w-[120px]">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>{existingTransaction ? "Save Changes" : "Add Transaction"}</>
          )}
        </Button>
      </div>
    </form>
  );
};

export default TransactionForm;
