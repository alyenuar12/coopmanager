"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Transaction = {
  date: string;
  desc: string;
  account: string;
  amount: string;
  balance: string;
  status: string;
};

type TransactionAnalyticsProps = {
  transactions: Transaction[];
  dateRange: string;
};

export default function TransactionAnalytics({
  transactions,
  dateRange,
}: TransactionAnalyticsProps) {
  const [activeTab, setActiveTab] = useState("bar");

  // Process transaction data for charts
  const processTransactionsForBarChart = () => {
    // Group transactions by account type
    const accountData: Record<string, { income: number; expense: number }> = {};

    transactions.forEach((tx) => {
      const account = tx.account;
      const amount = parseFloat(tx.amount.replace(/[^0-9.-]+/g, ""));

      if (!accountData[account]) {
        accountData[account] = { income: 0, expense: 0 };
      }

      if (tx.amount.startsWith("+")) {
        accountData[account].income += amount;
      } else {
        accountData[account].expense += amount;
      }
    });

    return Object.keys(accountData).map((account) => ({
      name: account,
      Pemasukan: accountData[account].income,
      Pengeluaran: accountData[account].expense,
    }));
  };

  const processPieChartData = () => {
    let income = 0;
    let expense = 0;

    transactions.forEach((tx) => {
      const amount = parseFloat(tx.amount.replace(/[^0-9.-]+/g, ""));

      if (tx.amount.startsWith("+")) {
        income += amount;
      } else {
        expense += amount;
      }
    });

    return [
      { name: "Pemasukan", value: income },
      { name: "Pengeluaran", value: expense },
    ];
  };

  const barChartData = processTransactionsForBarChart();
  const pieChartData = processPieChartData();
  const COLORS = ["#0088FE", "#FF8042"];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analitik Transaksi</CardTitle>
        <p className="text-sm text-muted-foreground">
          {dateRange === "30"
            ? "30 hari terakhir"
            : dateRange === "60"
              ? "60 hari terakhir"
              : dateRange === "90"
                ? "90 hari terakhir"
                : "Tahun ini"}
        </p>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="bar"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="bar">Grafik Batang</TabsTrigger>
            <TabsTrigger value="pie">Grafik Lingkaran</TabsTrigger>
          </TabsList>
          <TabsContent value="bar" className="mt-4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={barChartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value) => `Rp${value.toLocaleString()}`}
                  labelFormatter={(label) => `Rekening: ${label}`}
                />
                <Legend />
                <Bar dataKey="Pemasukan" fill="#4ade80" />
                <Bar dataKey="Pengeluaran" fill="#f87171" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="pie" className="mt-4">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `Rp${value.toLocaleString()}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
