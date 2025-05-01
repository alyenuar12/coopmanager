import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard, Download, Plus, Search, Upload } from "lucide-react";

export default function SavingsPage() {
  return (
    <div className="container mx-auto py-6">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Savings Management</h1>
          <p className="text-gray-600">
            Process deposits, withdrawals, and manage savings accounts
          </p>
        </div>
        <div className="flex gap-2">
          <Button className="flex items-center gap-2">
            <Plus size={16} />
            <span>New Transaction</span>
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
          <p className="text-sm text-gray-500">Total Savings</p>
          <p className="text-2xl font-bold">$458,250.00</p>
          <p className="text-xs text-green-600">+$24,500 this month</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500">Total Accounts</p>
          <p className="text-2xl font-bold">245</p>
          <p className="text-xs text-green-600">+12 this month</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500">Interest Paid</p>
          <p className="text-2xl font-bold">$3,450.00</p>
          <p className="text-xs text-blue-600">This month</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500">Average Balance</p>
          <p className="text-2xl font-bold">$1,870.00</p>
          <p className="text-xs text-green-600">+8% from last month</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              className="pl-10"
              placeholder="Search by member name, account number, or transaction ID"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 border rounded-md text-sm">
              <option>All Transaction Types</option>
              <option>Deposits</option>
              <option>Withdrawals</option>
              <option>Interest</option>
            </select>
            <select className="px-4 py-2 border rounded-md text-sm">
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>This Year</option>
              <option>Custom Range</option>
            </select>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Recent Transactions</h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Transaction ID
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
                Type
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
                Date
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
            ].map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {transaction.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.member}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      transaction.type === "Deposit"
                        ? "bg-green-100 text-green-800"
                        : transaction.type === "Withdrawal"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {transaction.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      transaction.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {transaction.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                  <Button variant="ghost" size="sm">
                    Receipt
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
                <span className="font-medium">125</span> results
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
                  13
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

      {/* Savings Products */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Savings Products</h2>
          <Button size="sm" className="flex items-center gap-2">
            <Plus size={16} />
            <span>Add Product</span>
          </Button>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <CreditCard className="w-8 h-8 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold">Regular Savings</h3>
            </div>
            <p className="text-gray-600 mb-2">
              Basic savings account with standard interest rate
            </p>
            <div className="text-sm text-gray-500 space-y-1">
              <p>
                Interest Rate: <span className="font-medium">2.5%</span>
              </p>
              <p>
                Min. Balance: <span className="font-medium">$50</span>
              </p>
              <p>
                Active Accounts: <span className="font-medium">187</span>
              </p>
            </div>
          </div>
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <CreditCard className="w-8 h-8 text-purple-600 mr-3" />
              <h3 className="text-lg font-semibold">Premium Savings</h3>
            </div>
            <p className="text-gray-600 mb-2">
              Higher interest rate for larger balances
            </p>
            <div className="text-sm text-gray-500 space-y-1">
              <p>
                Interest Rate: <span className="font-medium">3.75%</span>
              </p>
              <p>
                Min. Balance: <span className="font-medium">$1,000</span>
              </p>
              <p>
                Active Accounts: <span className="font-medium">43</span>
              </p>
            </div>
          </div>
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <CreditCard className="w-8 h-8 text-green-600 mr-3" />
              <h3 className="text-lg font-semibold">Youth Savings</h3>
            </div>
            <p className="text-gray-600 mb-2">
              Special savings account for members under 18
            </p>
            <div className="text-sm text-gray-500 space-y-1">
              <p>
                Interest Rate: <span className="font-medium">3.0%</span>
              </p>
              <p>
                Min. Balance: <span className="font-medium">$10</span>
              </p>
              <p>
                Active Accounts: <span className="font-medium">15</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
