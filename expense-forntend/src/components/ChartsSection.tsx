import { useMemo } from "react";
import { useAppSelector } from "@/store/hooks";
import type { RootState } from "@/store/store";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PIE_COLORS = ["#00C49F", "#FF8042"];

export const ChartsSection = () => {
  const { allTransactions, totalIncome, totalExpense } = useAppSelector(
    (state: RootState) => state.transactions
  );

  // Pie chart
  const pieData = useMemo(() => {
    return [
      { name: "Income", value: totalIncome },
      { name: "Expense", value: totalExpense },
    ].filter((i) => i.value > 0);
  }, [totalIncome, totalExpense]);

  // bar graph
  const expenseBreakdownData = useMemo(() => {
    const monthly: Record<string, Record<string, number>> = {};

    allTransactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        const month = t.date.substring(0, 7);
        if (!monthly[month]) monthly[month] = {};
        monthly[month][t.category] =
          (monthly[month][t.category] || 0) + t.amount;
      });

    const categories = Array.from(
      new Set(
        allTransactions
          .filter((t) => t.type === "expense")
          .map((t) => t.category)
      )
    ).sort();

    const sorted = Object.entries(monthly).sort((a, b) =>
      a[0].localeCompare(b[0])
    );

    const recent = sorted.slice(Math.max(0, sorted.length - 6));

    return recent.map(([month, cats]) => {
      const row: Record<string, unknown> = { month };
      categories.forEach((cat) => (row[cat] = cats[cat] ?? 0));
      return row;
    });
  }, [allTransactions]);

  const categoryColors = useMemo(() => {
    const map: Record<string, string> = {};
    const palette = [
      "#FF8042",
      "#FFBB28",
      "#8884d8",
      "#82ca9d",
      "#a4de6c",
      "#d0ed57",
    ];
    let i = 0;
    expenseBreakdownData.forEach((row) => {
      Object.keys(row).forEach((k) => {
        if (k !== "month" && !map[k]) {
          map[k] = palette[i % palette.length];
          i++;
        }
      });
    });
    return map;
  }, [expenseBreakdownData]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* pie  */}
      <Card>
        <CardHeader>
          <CardTitle>Total Income vs Expense</CardTitle>
          <CardDescription>Overall financial balance</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {pieData.map((_e, i) => (
                    <Cell key={`cell-${i}`} fill={PIE_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => `₹${v.toLocaleString()}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              No transactions yet
            </p>
          )}
        </CardContent>
      </Card>

      {/* bar chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Expense Breakdown</CardTitle>
          <CardDescription>Last 6 months by category</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          {expenseBreakdownData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={expenseBreakdownData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  tickFormatter={(v) =>
                    new Date(v + "-01").toLocaleDateString("en-US", {
                      month: "short",
                    })
                  }
                />
                <YAxis tickFormatter={(v) => `₹${v.toLocaleString()}`} />
                <Tooltip
                  formatter={(v: number) => `₹${v.toLocaleString()}`}
                  labelFormatter={(l) =>
                    `Month: ${new Date(l + "-01").toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}`
                  }
                />
                <Legend />
                {Object.keys(categoryColors).map((cat) => (
                  <Bar
                    key={cat}
                    dataKey={cat}
                    fill={categoryColors[cat]}
                    name={cat}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              No expense data
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
