import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, FileText, Plus, Search, Upload } from "lucide-react";

export default function LoansPage() {
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
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input className="pl-10 w-64" placeholder="Search loans" />
          </div>
        </div>
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
            ].map((loan) => (
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
                  <Button variant="ghost" size="sm">
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
    </div>
  );
}
