import { useAppSelector } from "@/store/hooks";
import { TrendingUp, TrendingDown, ArrowDownUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SummaryCardProps {
  title: string;
  amount: number;
  trend: number;
  icon: React.ReactNode;
  variant: "income" | "expense" | "balance";
}

const SummaryCard = ({
  title,
  amount,
  trend,
  icon,
  variant,
}: SummaryCardProps) => {
  const bgColor =
    variant === "income"
      ? "bg-green-50"
      : variant === "expense"
      ? "bg-red-50"
      : "bg-blue-50";
  const borderColor =
    variant === "income"
      ? "border-green-200"
      : variant === "expense"
      ? "border-red-200"
      : "border-blue-200";

  return (
    <Card
      className={`border ${borderColor} ${bgColor} hover:shadow-md transition-shadow`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="flex items-center">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">₹{amount.toLocaleString()}</div>
        {trend !== 0 && (
          <p className="text-xs text-muted-foreground">
            {trend > 0 ? (
              <TrendingUp className="h-3 w-3 inline mr-1" />
            ) : (
              <TrendingDown className="h-3 w-3 inline mr-1" />
            )}
            {trend >= 0 ? "+" : ""}
            {trend}% from last month
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export const SummaryCards = () => {
  const { totalIncome, totalExpense } = useAppSelector(
    (state) => state.transactions
  );
  const netBalance = totalIncome - totalExpense;

  // Mock trend data -pending
  const incomeTrend = 12;
  const expenseTrend = -5;
  const balanceTrend = 8;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <SummaryCard
        title="Total Income"
        amount={totalIncome}
        trend={incomeTrend}
        icon={<TrendingUp className="h-4 w-4 text-green-600" />}
        variant="income"
      />
      <SummaryCard
        title="Total Expenses"
        amount={totalExpense}
        trend={expenseTrend}
        icon={<TrendingDown className="h-4 w-4 text-red-600" />}
        variant="expense"
      />
      <SummaryCard
        title="Net Balance"
        amount={netBalance}
        trend={balanceTrend}
        icon={<ArrowDownUp className="h-4 w-4 text-blue-600" />}
        variant="balance"
      />
    </div>
  );
};
