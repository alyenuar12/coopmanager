"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  Clock,
  Download,
  Filter,
  Search,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import {
  processScheduledPayment,
  cancelScheduledPayment,
} from "@/services/payLaterClientService";

interface ScheduledPayment {
  id: string;
  loanId: string;
  member: string;
  amount: string;
  scheduledDate: string;
  status: string;
}

interface PayLaterClientProps {
  initialPayments: ScheduledPayment[];
}

export default function PayLaterClient({
  initialPayments,
}: PayLaterClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("all");
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [processingPaymentId, setProcessingPaymentId] = useState<string | null>(
    null,
  );
  const [cancellingPaymentId, setCancellingPaymentId] = useState<string | null>(
    null,
  );
  const { toast } = useToast();

  // Use the initial payments from server component
  const [scheduledPayments, setScheduledPayments] = useState(initialPayments);

  // Function to handle processing a payment
  const handleProcessPayment = async (paymentId: string) => {
    setProcessingPaymentId(paymentId);
    try {
      const result = await processScheduledPayment(paymentId);

      if (result.success) {
        // Update the payment status in the UI
        setScheduledPayments((payments) =>
          payments.map((payment) =>
            payment.id === paymentId
              ? { ...payment, status: "Processed" }
              : payment,
          ),
        );

        toast({
          title: "Payment Processed",
          description: result.message,
          variant: "default",
        });
      } else {
        toast({
          title: "Processing Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          "An unexpected error occurred while processing the payment.",
        variant: "destructive",
      });
    } finally {
      setProcessingPaymentId(null);
    }
  };

  // Function to handle cancelling a payment
  const handleCancelPayment = async (paymentId: string) => {
    setCancellingPaymentId(paymentId);
    try {
      const result = await cancelScheduledPayment(paymentId);

      if (result.success) {
        // Update the payment status in the UI
        setScheduledPayments((payments) =>
          payments.map((payment) =>
            payment.id === paymentId
              ? { ...payment, status: "Cancelled" }
              : payment,
          ),
        );

        toast({
          title: "Payment Cancelled",
          description: result.message,
          variant: "default",
        });
      } else {
        toast({
          title: "Cancellation Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          "An unexpected error occurred while cancelling the payment.",
        variant: "destructive",
      });
    } finally {
      setCancellingPaymentId(null);
    }
  };

  // Filter function for scheduled payments
  const filteredPayments = scheduledPayments.filter((payment) => {
    // Search term filter
    const matchesSearch =
      searchTerm === "" ||
      payment.member.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.loanId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase());

    // Payment status filter
    const matchesStatus =
      paymentStatus === "all" || payment.status === paymentStatus;

    // Date range filter
    let matchesDateRange = true;
    if (startDate || endDate) {
      // This is a placeholder for date filtering logic
      // In a real implementation, we would convert the dates and compare them
      matchesDateRange = true; // For now, we'll just return true
    }

    // Amount filter
    let matchesAmount = true;
    if (minAmount || maxAmount) {
      const paymentAmount = parseFloat(
        payment.amount.replace("$", "").replace(",", ""),
      );
      const minAmountValue = minAmount ? parseFloat(minAmount) : 0;
      const maxAmountValue = maxAmount ? parseFloat(maxAmount) : Infinity;

      matchesAmount =
        paymentAmount >= minAmountValue && paymentAmount <= maxAmountValue;
    }

    return matchesSearch && matchesStatus && matchesDateRange && matchesAmount;
  });

  return (
    <div className="container mx-auto py-6">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Scheduled Payments</h1>
          <p className="text-gray-600">
            Manage and process scheduled loan payments
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} />
            <span>Export</span>
          </Button>
        </div>
      </header>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500">Pending Payments</p>
          <p className="text-2xl font-bold">3</p>
          <p className="text-xs text-blue-600">$955.00 total</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500">Processed Payments</p>
          <p className="text-2xl font-bold">1</p>
          <p className="text-xs text-green-600">$275.00 total</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500">Cancelled Payments</p>
          <p className="text-2xl font-bold">1</p>
          <p className="text-xs text-red-600">$550.00 total</p>
        </div>
      </div>

      {/* Scheduled Payments Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Scheduled Payments</h2>
          <div className="flex gap-2 items-center">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                className="pl-10 w-64"
                placeholder="Search payments"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={paymentStatus} onValueChange={setPaymentStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Processed">Processed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
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
              <Label htmlFor="date-range">Date Range</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <span>to</span>
                <Input
                  id="end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
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
                  setPaymentStatus("all");
                  setStartDate("");
                  setEndDate("");
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
                Payment ID
              </th>
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
                Amount
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Scheduled Date
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
            {filteredPayments.map((payment) => (
              <tr key={payment.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {payment.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {payment.loanId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {payment.member}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {payment.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {payment.scheduledDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      payment.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : payment.status === "Processed"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {payment.status === "Pending" ? (
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-green-600"
                        onClick={() => handleProcessPayment(payment.id)}
                        disabled={
                          processingPaymentId === payment.id ||
                          cancellingPaymentId === payment.id
                        }
                      >
                        {processingPaymentId === payment.id ? (
                          <Loader2 size={16} className="mr-1 animate-spin" />
                        ) : (
                          <CheckCircle size={16} className="mr-1" />
                        )}
                        Process
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600"
                        onClick={() => handleCancelPayment(payment.id)}
                        disabled={
                          processingPaymentId === payment.id ||
                          cancellingPaymentId === payment.id
                        }
                      >
                        {cancellingPaymentId === payment.id ? (
                          <Loader2 size={16} className="mr-1 animate-spin" />
                        ) : (
                          <XCircle size={16} className="mr-1" />
                        )}
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button variant="ghost" size="sm">
                      Details
                    </Button>
                  )}
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
                <span className="font-medium">{filteredPayments.length}</span>{" "}
                of{" "}
                <span className="font-medium">{filteredPayments.length}</span>{" "}
                results
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
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600 hover:bg-blue-100"
                >
                  1
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
    </div>
  );
}
