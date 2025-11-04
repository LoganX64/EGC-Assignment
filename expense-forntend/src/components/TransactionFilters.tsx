import { useState, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setFilters,
  fetchAllTransactions,
} from "@/features/transactions/transactionSlice";
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from "@/features/types/types";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Filter, X } from "lucide-react";
import { format, parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { cn } from "@/lib/utils";

export const TransactionFilters = () => {
  const dispatch = useAppDispatch();

  // select
  const { filters, allTransactions } = useAppSelector(
    (state) => state.transactions
  );

  const allPossibleCategories = useMemo(() => {
    const predefined = [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES];

    const custom = Array.from(
      new Set(
        allTransactions.map((t) => t.category).filter((c): c is string => !!c)
      )
    );

    return Array.from(new Set([...predefined, ...custom])).sort();
  }, [allTransactions]);

  const [localFilters, setLocalFilters] = useState({
    type: "all",
    category: "all",
    startDate: "",
    endDate: "",
  });

  // sync
  useEffect(() => {
    setLocalFilters({
      type: filters.type || "all",
      category: filters.category || "all",
      startDate: filters.startDate || "",
      endDate: filters.endDate || "",
    });
  }, [filters]);

  const getCategoryOptions = () => {
    if (localFilters.type === "income") return INCOME_CATEGORIES;
    if (localFilters.type === "expense") return EXPENSE_CATEGORIES;
    return allPossibleCategories;
  };
  const categoryOptions = getCategoryOptions();

  const handleFilterChange = (key: keyof typeof localFilters, value: string) =>
    setLocalFilters((prev) => ({ ...prev, [key]: value }));

  const applyFilters = () => {
    const normalized = {
      type: localFilters.type === "all" ? "" : localFilters.type,
      category: localFilters.category === "all" ? "" : localFilters.category,
      startDate: localFilters.startDate,
      endDate: localFilters.endDate,
    };
    dispatch(setFilters(normalized));
    dispatch(fetchAllTransactions(normalized));
  };

  const clearFilters = () => {
    const cleared = {
      type: "all",
      category: "all",
      startDate: "",
      endDate: "",
    };
    setLocalFilters(cleared);
    dispatch(setFilters({}));
    dispatch(fetchAllTransactions({}));
  };

  const toLocalDate = (dateStr: string) => {
    if (!dateStr) return undefined;
    const utc = parseISO(dateStr);
    return toZonedTime(utc, Intl.DateTimeFormat().resolvedOptions().timeZone);
  };

  return (
    <div className="bg-card border rounded-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold">Filters</h3>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={clearFilters}>
            <X className="h-3 w-3 mr-1" />
            Clear
          </Button>
          <Button size="sm" onClick={applyFilters}>
            Apply Filters
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="text-sm font-medium block mb-1">Type</label>
          <Select
            value={localFilters.type}
            onValueChange={(v) => {
              handleFilterChange("type", v);
              handleFilterChange("category", "all");
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* category */}
        <div>
          <label className="text-sm font-medium block mb-1">Category</label>
          <Select
            value={localFilters.category}
            onValueChange={(v) => handleFilterChange("category", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categoryOptions.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* date */}
        <div>
          <label className="text-sm font-medium block mb-1">From Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !localFilters.startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {localFilters.startDate ? (
                  format(toLocalDate(localFilters.startDate)!, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={toLocalDate(localFilters.startDate)}
                onSelect={(date) =>
                  handleFilterChange(
                    "startDate",
                    date ? format(date, "yyyy-MM-dd") : ""
                  )
                }
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* end date */}
        <div>
          <label className="text-sm font-medium block mb-1">To Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !localFilters.endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {localFilters.endDate ? (
                  format(toLocalDate(localFilters.endDate)!, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={toLocalDate(localFilters.endDate)}
                onSelect={(date) =>
                  handleFilterChange(
                    "endDate",
                    date ? format(date, "yyyy-MM-dd") : ""
                  )
                }
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};
