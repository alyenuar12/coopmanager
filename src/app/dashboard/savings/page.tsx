"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CreditCard,
  Download,
  Plus,
  Search,
  Upload,
  Filter,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Import refactored components
import StatsCard from "@/components/savings/stats-card";
import SavingsProductCard from "@/components/savings/savings-product-card";
import TransactionTable, {
  Transaction,
} from "@/components/savings/transaction-table";
import TransactionForm from "@/components/savings/transaction-form";
import SearchFilters from "@/components/savings/search-filters";
import Pagination from "@/components/savings/pagination";

const initialTransactions: Transaction[] = [
  {
    id: "T001",
    member: "John Doe",
    type: "Deposit",
    amount: "$500.00",
    date: "May 15, 2023",
    status: "Completed",
  },
  {
    id: "T002",
    member: "Jane Smith",
    type: "Withdrawal",
    amount: "$200.00",
    date: "May 14, 2023",
    status: "Completed",
  },
  {
    id: "T003",
    member: "Robert Johnson",
    type: "Interest",
    amount: "$12.50",
    date: "May 1, 2023",
    status: "Completed",
  },
  {
    id: "T004",
    member: "Emily Davis",
    type: "Deposit",
    amount: "$1,000.00",
    date: "Apr 28, 2023",
    status: "Completed",
  },
  {
    id: "T005",
    member: "Michael Wilson",
    type: "Withdrawal",
    amount: "$350.00",
    date: "Apr 25, 2023",
    status: "Pending",
  },
];

const savingsProducts = [
  {
    id: "regular",
    name: "Regular Savings",
    description: "Basic savings account with standard interest rate",
    interestRate: "2.5%",
    minBalance: "$50",
    activeAccounts: 187,
    iconColor: "text-blue-600",
  },
  {
    id: "premium",
    name: "Premium Savings",
    description: "Higher interest rate for larger balances",
    interestRate: "3.75%",
    minBalance: "$1,000",
    activeAccounts: 43,
    iconColor: "text-purple-600",
  },
  {
    id: "youth",
    name: "Youth Savings",
    description: "Special savings account for members under 18",
    interestRate: "3.0%",
    minBalance: "$10",
    activeAccounts: 15,
    iconColor: "text-green-600",
  },
];

export default function SavingsPage() {
  // State for transactions and pagination
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(10);
  const [totalResults] = useState(125); // This would come from API in a real app

  // State for new transaction dialog
  const [isNewTransactionDialogOpen, setIsNewTransactionDialogOpen] =
    useState(false);
  const [newTransaction, setNewTransaction] = useState({
    member: "",
    type: "Deposit" as const,
    amount: "",
  });

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [transactionType, setTransactionType] = useState("all");
  const [dateRange, setDateRange] = useState("30");
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
  const [accountType, setAccountType] = useState("all");
  const [status, setStatus] = useState("all");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  // Handle import functionality
  const handleImport = () => {
    // Create a hidden file input element
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".csv,.xlsx,.xls";

    // Handle file selection
    fileInput.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // In a real app, you would process the file here
        alert(
          `File selected: ${file.name}. In a production environment, this would be processed.`,
        );
      }
    };

    // Trigger file selection dialog
    fileInput.click();
  };

  // Handle export functionality
  const handleExport = () => {
    // In a real application, this would generate a CSV or Excel file
    // For demo purposes, we'll create a simple CSV string
    const headers = [
      "Transaction ID",
      "Member",
      "Type",
      "Amount",
      "Date",
      "Status",
    ];

    const csvContent = [
      headers.join(","),
      ...filteredTransactions.map((t) =>
        [t.id, t.member, t.type, t.amount, t.date, t.status].join(","),
      ),
    ].join("\n");

    // Create a Blob and download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `savings_transactions_${new Date().toISOString().split("T")[0]}.csv`,
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle adding a new transaction
  const handleAddTransaction = () => {
    // Validate inputs
    if (!newTransaction.member || !newTransaction.amount) {
      alert("Please fill in all required fields");
      return;
    }

    // Create new transaction object
    const newId = `T${String(transactions.length + 1).padStart(3, "0")}`;
    const today = new Date();
    const formattedDate = `${today.toLocaleString("default", { month: "short" })} ${today.getDate()}, ${today.getFullYear()}`;

    const transactionToAdd: Transaction = {
      id: newId,
      member: newTransaction.member,
      type: newTransaction.type,
      amount: `$${parseFloat(newTransaction.amount).toFixed(2)}`,
      date: formattedDate,
      status: "Pending",
    };

    // Add to transactions array
    setTransactions([transactionToAdd, ...transactions]);

    // Reset form and close dialog
    setNewTransaction({ member: "", type: "Deposit", amount: "" });
    setIsNewTransactionDialogOpen(false);
  };

  // Handle view transaction details
  const handleViewTransactionDetails = (transactionId: string) => {
    alert(`Viewing details for transaction ${transactionId}`);
    // In a real app, this would open a detailed view or navigate to a details page
  };

  // Handle generate receipt
  const handleGenerateReceipt = (transactionId: string) => {
    alert(`Generating receipt for transaction ${transactionId}`);
    // In a real app, this would generate and download a receipt PDF
  };

  // Handle view product details
  const handleViewProductDetails = (productId: string) => {
    alert(`View ${productId} Savings product details`);
    // In a real app, this would open a product details page or modal
  };

  // Handle reset filters
  const handleResetFilters = () => {
    setSearchTerm("");
    setTransactionType("all");
    setDateRange("30");
    setAccountType("all");
    setStatus("all");
    setMinAmount("");
    setMaxAmount("");
  };

  // Handle apply filters
  const handleApplyFilters = () => {
    // In a real app, this would apply more complex filters
    alert("Filters applied successfully!");
  };

  // Filter transactions based on search term and filters
  const filteredTransactions = transactions.filter((transaction) => {
    // Search term filter
    const matchesSearch =
      searchTerm === "" ||
      transaction.member.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase());

    // Transaction type filter
    const matchesType =
      transactionType === "all" ||
      transaction.type.toLowerCase() === transactionType.toLowerCase();

    // Date filter (simplified for demo)
    // In a real app, you would parse the date and compare properly
    let matchesDate = true;

    if (dateRange !== "all") {
      // Simple date filtering logic - this would be more sophisticated in a real app
      const today = new Date();
      const transactionDate = new Date(transaction.date);

      if (dateRange === "30") {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(today.getDate() - 30);
        matchesDate = transactionDate >= thirtyDaysAgo;
      } else if (dateRange === "90") {
        const ninetyDaysAgo = new Date();
        ninetyDaysAgo.setDate(today.getDate() - 90);
        matchesDate = transactionDate >= ninetyDaysAgo;
      } else if (dateRange === "365") {
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(today.getFullYear() - 1);
        matchesDate = transactionDate >= oneYearAgo;
      }
    }

    // Amount filter
    let matchesAmount = true;
    if (isAdvancedSearchOpen && (minAmount || maxAmount)) {
      const transactionAmount = parseFloat(
        transaction.amount.replace("$", "").replace(",", ""),
      );
      const minAmountValue = minAmount ? parseFloat(minAmount) : 0;
      const maxAmountValue = maxAmount ? parseFloat(maxAmount) : Infinity;

      matchesAmount =
        transactionAmount >= minAmountValue &&
        transactionAmount <= maxAmountValue;
    }

    return matchesSearch && matchesType && matchesDate && matchesAmount;
  });

  return (
    <>
      <div className="container mx-auto py-6">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Savings Management</h1>
            <p className="text-gray-600">
              Process deposits, withdrawals, and manage savings accounts
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              className="flex items-center gap-2"
              onClick={() => setIsNewTransactionDialogOpen(true)}
            >
              <Plus size={16} />
              <span>New Transaction</span>
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleImport}
            >
              <Upload size={16} />
              <span>Import</span>
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleExport}
            >
              <Download size={16} />
              <span>Export</span>
            </Button>
          </div>
        </header>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Savings"
            value="$458,250.00"
            change="+$24,500 this month"
            changeColor="text-green-600"
          />
          <StatsCard
            title="Total Accounts"
            value="245"
            change="+12 this month"
            changeColor="text-green-600"
          />
          <StatsCard
            title="Interest Paid"
            value="$3,450.00"
            change="This month"
            changeColor="text-blue-600"
          />
          <StatsCard
            title="Average Balance"
            value="$1,870.00"
            change="+8% from last month"
            changeColor="text-green-600"
          />
        </div>

        {/* Search and Filter */}
        <SearchFilters
          searchTerm={searchTerm}
          transactionType={transactionType}
          dateRange={dateRange}
          isAdvancedSearchOpen={isAdvancedSearchOpen}
          accountType={accountType}
          status={status}
          minAmount={minAmount}
          maxAmount={maxAmount}
          onSearchTermChange={setSearchTerm}
          onTransactionTypeChange={setTransactionType}
          onDateRangeChange={setDateRange}
          onToggleAdvancedSearch={() =>
            setIsAdvancedSearchOpen(!isAdvancedSearchOpen)
          }
          onAccountTypeChange={setAccountType}
          onStatusChange={setStatus}
          onMinAmountChange={setMinAmount}
          onMaxAmountChange={setMaxAmount}
          onResetFilters={handleResetFilters}
          onApplyFilters={handleApplyFilters}
        />

        {/* Recent Transactions */}
        <TransactionTable
          transactions={filteredTransactions}
          onViewDetails={handleViewTransactionDetails}
          onGenerateReceipt={handleGenerateReceipt}
        />

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalResults / resultsPerPage)}
          totalResults={totalResults}
          resultsPerPage={resultsPerPage}
          onPageChange={setCurrentPage}
        />

        {/* Savings Products */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Savings Products</h2>
            <Button
              size="sm"
              className="flex items-center gap-2"
              onClick={() => {
                alert("This would open a dialog to add a new savings product");
                // In a real app, this would open a dialog to create a new savings product
              }}
            >
              <Plus size={16} />
              <span>Add Product</span>
            </Button>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {savingsProducts.map((product) => (
              <SavingsProductCard
                key={product.id}
                name={product.name}
                description={product.description}
                interestRate={product.interestRate}
                minBalance={product.minBalance}
                activeAccounts={product.activeAccounts}
                iconColor={product.iconColor}
                onClick={() => handleViewProductDetails(product.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* New Transaction Dialog */}
      <Dialog
        open={isNewTransactionDialogOpen}
        onOpenChange={setIsNewTransactionDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Transaction</DialogTitle>
            <DialogDescription>
              Enter the details for the new transaction. Click save when you're
              done.
            </DialogDescription>
          </DialogHeader>
          <TransactionForm
            member={newTransaction.member}
            type={newTransaction.type}
            amount={newTransaction.amount}
            onMemberChange={(value) =>
              setNewTransaction({ ...newTransaction, member: value })
            }
            onTypeChange={(value) =>
              setNewTransaction({ ...newTransaction, type: value })
            }
            onAmountChange={(value) =>
              setNewTransaction({ ...newTransaction, amount: value })
            }
            onSave={handleAddTransaction}
            onCancel={() => setIsNewTransactionDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
