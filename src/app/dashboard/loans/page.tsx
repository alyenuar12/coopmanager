"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Download,
  FileText,
  Filter,
  Plus,
  Search,
  Upload,
  CreditCard,
  Clock,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function LoansPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loanType, setLoanType] = useState("all");
  const [loanStatus, setLoanStatus] = useState("all");
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("immediate");
  const [paymentAmount, setPaymentAmount] = useState("");
  return (
    <div className="container mx-auto py-6">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Loan Management</h1>
          <p className="text-gray-600">
            Review applications, approve loans, and track repayments
          </p>
        </div>
        <div className="flex gap-2">
          <Button className="flex items-center gap-2">
            <Plus size={16} />
            <span>New Loan</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Upload size={16} />
            <span>Import</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} />
            <span>Export</span>
          </Button>
        </div>
      </header>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500">Active Loans</p>
          <p className="text-2xl font-bold">78</p>
          <p className="text-xs text-blue-600">$125,750 outstanding</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500">Pending Applications</p>
          <p className="text-2xl font-bold">12</p>
          <p className="text-xs text-yellow-600">$45,000 requested</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500">Repayments Due</p>
          <p className="text-2xl font-bold">$8,450.00</p>
          <p className="text-xs text-blue-600">This month</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500">Overdue Payments</p>
          <p className="text-2xl font-bold">$1,250.00</p>
          <p className="text-xs text-red-600">3 accounts</p>
        </div>
      </div>

      {/* Loan Applications */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Pending Loan Applications</h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Application ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Member
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Loan Type
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Amount
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date Applied
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[
              {
                id: "LA001",
                member: "John Doe",
                type: "Business Loan",
                amount: "$5,000.00",
                date: "May 15, 2023",
                status: "Pending Review",
              },
              {
                id: "LA002",
                member: "Jane Smith",
                type: "Personal Loan",
                amount: "$2,500.00",
                date: "May 14, 2023",
                status: "Pending Review",
              },
              {
                id: "LA003",
                member: "Robert Johnson",
                type: "Home Improvement",
                amount: "$10,000.00",
                date: "May 12, 2023",
                status: "Under Evaluation",
              },
              {
                id: "LA004",
                member: "Emily Davis",
                type: "Education Loan",
                amount: "$7,500.00",
                date: "May 10, 2023",
                status: "Under Evaluation",
              },
              {
                id: "LA005",
                member: "Michael Wilson",
                type: "Business Loan",
                amount: "$20,000.00",
                date: "May 8, 2023",
                status: "Document Verification",
              },
            ].map((application) => (
              <tr key={application.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {application.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {application.member}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {application.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {application.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {application.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      application.status === "Pending Review"
                        ? "bg-yellow-100 text-yellow-800"
                        : application.status === "Under Evaluation"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {application.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Button variant="ghost" size="sm">
                    Review
                  </Button>
                  <Button variant="ghost" size="sm">
                    Documents
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Active Loans */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Active Loans</h2>
          <div className="flex gap-2 items-center">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                className="pl-10 w-64"
                placeholder="Search loans"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={loanType} onValueChange={setLoanType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Loan Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Loan Types</SelectItem>
                <SelectItem value="Business Loan">Business Loan</SelectItem>
                <SelectItem value="Personal Loan">Personal Loan</SelectItem>
                <SelectItem value="Home Improvement">
                  Home Improvement
                </SelectItem>
                <SelectItem value="Education Loan">Education Loan</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsAdvancedSearchOpen(!isAdvancedSearchOpen)}
            >
              <Filter size={18} />
            </Button>
          </div>
        </div>

        {/* Advanced Search Options - Conditionally Rendered */}
        {isAdvancedSearchOpen && (
          <div className="px-6 pt-2 pb-4 border-b border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="loan-status">Loan Status</Label>
              <Select value={loanStatus} onValueChange={setLoanStatus}>
                <SelectTrigger id="loan-status">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Current">Current</SelectItem>
                  <SelectItem value="Overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="amount-range">Amount Range</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="min-amount"
                  placeholder="Min $"
                  type="number"
                  value={minAmount}
                  onChange={(e) => setMinAmount(e.target.value)}
                />
                <span>to</span>
                <Input
                  id="max-amount"
                  placeholder="Max $"
                  type="number"
                  value={maxAmount}
                  onChange={(e) => setMaxAmount(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-end justify-end">
              <Button
                variant="outline"
                className="mr-2"
                onClick={() => {
                  setSearchTerm("");
                  setLoanType("all");
                  setLoanStatus("all");
                  setMinAmount("");
                  setMaxAmount("");
                }}
              >
                Reset Filters
              </Button>
              <Button>Apply Filters</Button>
            </div>
          </div>
        )}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Loan ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Member
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Loan Type
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Principal
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Outstanding
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Next Payment
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[
              {
                id: "L001",
                member: "Sarah Johnson",
                type: "Business Loan",
                principal: "$15,000.00",
                outstanding: "$12,450.00",
                nextPayment: "May 30, 2023",
                status: "Current",
              },
              {
                id: "L002",
                member: "David Brown",
                type: "Personal Loan",
                principal: "$5,000.00",
                outstanding: "$3,250.00",
                nextPayment: "May 25, 2023",
                status: "Current",
              },
              {
                id: "L003",
                member: "Lisa Wilson",
                type: "Home Improvement",
                principal: "$10,000.00",
                outstanding: "$8,750.00",
                nextPayment: "May 20, 2023",
                status: "Current",
              },
              {
                id: "L004",
                member: "James Miller",
                type: "Education Loan",
                principal: "$7,500.00",
                outstanding: "$6,800.00",
                nextPayment: "May 15, 2023",
                status: "Overdue",
              },
              {
                id: "L005",
                member: "Patricia Davis",
                type: "Business Loan",
                principal: "$20,000.00",
                outstanding: "$18,500.00",
                nextPayment: "May 10, 2023",
                status: "Overdue",
              },
            ]
              .filter((loan) => {
                // Search term filter
                const matchesSearch =
                  searchTerm === "" ||
                  loan.member
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  loan.id.toLowerCase().includes(searchTerm.toLowerCase());

                // Loan type filter
                const matchesType =
                  loanType === "all" || loan.type === loanType;

                // Loan status filter
                const matchesStatus =
                  loanStatus === "all" || loan.status === loanStatus;

                // Amount filter
                let matchesAmount = true;
                if (minAmount || maxAmount) {
                  const principalAmount = parseFloat(
                    loan.principal.replace("$", "").replace(",", ""),
                  );
                  const minAmountValue = minAmount ? parseFloat(minAmount) : 0;
                  const maxAmountValue = maxAmount
                    ? parseFloat(maxAmount)
                    : Infinity;

                  matchesAmount =
                    principalAmount >= minAmountValue &&
                    principalAmount <= maxAmountValue;
                }

                return (
                  matchesSearch && matchesType && matchesStatus && matchesAmount
                );
              })
              .map((loan) => (
                <tr key={loan.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {loan.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {loan.member}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {loan.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {loan.principal}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {loan.outstanding}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {loan.nextPayment}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        loan.status === "Current"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {loan.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Button variant="ghost" size="sm">
                      Details
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedLoan(loan);
                        setIsPaymentModalOpen(true);
                      }}
                    >
                      Payment
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">5</span> of{" "}
                <span className="font-medium">78</span> results
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  1
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600 hover:bg-blue-100"
                >
                  2
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  3
                </a>
                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                  ...
                </span>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  8
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Loan Products */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Loan Products</h2>
          <Button size="sm" className="flex items-center gap-2">
            <Plus size={16} />
            <span>Add Product</span>
          </Button>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <FileText className="w-8 h-8 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold">Personal Loan</h3>
            </div>
            <p className="text-gray-600 mb-2">
              General purpose loan for personal needs
            </p>
            <div className="text-sm text-gray-500 space-y-1">
              <p>
                Interest Rate: <span className="font-medium">8.5%</span>
              </p>
              <p>
                Term: <span className="font-medium">1-5 years</span>
              </p>
              <p>
                Max Amount: <span className="font-medium">$10,000</span>
              </p>
            </div>
          </div>
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <FileText className="w-8 h-8 text-green-600 mr-3" />
              <h3 className="text-lg font-semibold">Business Loan</h3>
            </div>
            <p className="text-gray-600 mb-2">
              For business expansion and working capital
            </p>
            <div className="text-sm text-gray-500 space-y-1">
              <p>
                Interest Rate: <span className="font-medium">7.25%</span>
              </p>
              <p>
                Term: <span className="font-medium">1-10 years</span>
              </p>
              <p>
                Max Amount: <span className="font-medium">$50,000</span>
              </p>
            </div>
          </div>
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <FileText className="w-8 h-8 text-purple-600 mr-3" />
              <h3 className="text-lg font-semibold">Education Loan</h3>
            </div>
            <p className="text-gray-600 mb-2">
              For educational expenses and tuition
            </p>
            <div className="text-sm text-gray-500 space-y-1">
              <p>
                Interest Rate: <span className="font-medium">5.0%</span>
              </p>
              <p>
                Term: <span className="font-medium">5-15 years</span>
              </p>
              <p>
                Max Amount: <span className="font-medium">$25,000</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Make Loan Payment</DialogTitle>
            <DialogDescription>
              {selectedLoan &&
                `Loan ID: ${selectedLoan.id} - ${selectedLoan.member}`}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="payment-amount" className="text-right">
                Amount
              </Label>
              <Input
                id="payment-amount"
                type="number"
                placeholder="Enter payment amount"
                className="col-span-3"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <div className="text-right pt-2">
                <Label>Payment Method</Label>
              </div>
              <div className="col-span-3">
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="immediate" id="immediate" />
                    <Label
                      htmlFor="immediate"
                      className="flex items-center gap-2"
                    >
                      <CreditCard size={16} />
                      Pay Now
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="later" id="later" />
                    <Label htmlFor="later" className="flex items-center gap-2">
                      <Clock size={16} />
                      Pay Later
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {paymentMethod === "later" && (
              <Card className="col-span-4 ml-[100px]">
                <CardContent className="pt-4">
                  <p className="text-sm text-gray-500 mb-2">
                    Pay Later allows you to schedule this payment for a future
                    date.
                  </p>
                  <div className="grid grid-cols-4 items-center gap-4 mb-2">
                    <Label htmlFor="payment-date" className="text-right">
                      Payment Date
                    </Label>
                    <Input
                      id="payment-date"
                      type="date"
                      className="col-span-3"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsPaymentModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                // Handle payment processing
                if (paymentMethod === "later") {
                  // Handle Pay Later logic
                  alert("Payment scheduled for later");
                } else {
                  // Handle immediate payment
                  alert("Processing immediate payment");
                }
                setIsPaymentModalOpen(false);
              }}
            >
              {paymentMethod === "later" ? "Schedule Payment" : "Pay Now"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
