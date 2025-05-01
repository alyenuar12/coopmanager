import {
  BarChart3,
  CreditCard,
  FileText,
  InfoIcon,
  Package,
  Users,
} from "lucide-react";
import Link from "next/link";

export default async function Dashboard() {
  return (
    <div className="container mx-auto py-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">
          Welcome to the Cooperative Management Platform
        </p>
      </header>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500">Total Members</p>
          <p className="text-2xl font-bold">245</p>
          <p className="text-xs text-green-600">+12 this month</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500">Total Savings</p>
          <p className="text-2xl font-bold">$458,250.00</p>
          <p className="text-xs text-green-600">+$24,500 this month</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500">Active Loans</p>
          <p className="text-2xl font-bold">78</p>
          <p className="text-xs text-blue-600">$125,750 outstanding</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500">Monthly Revenue</p>
          <p className="text-2xl font-bold">$12,450.00</p>
          <p className="text-xs text-green-600">+8% from last month</p>
        </div>
      </div>

      {/* Quick Access Modules */}
      <h2 className="text-xl font-semibold mb-6">Quick Access</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link href="/dashboard/members" className="block">
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <Users className="w-6 h-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold">Member Management</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Add, edit, and manage member profiles with complete history
              tracking.
            </p>
          </div>
        </Link>

        <Link href="/dashboard/savings" className="block">
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <CreditCard className="w-6 h-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold">Savings Management</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Process deposits, withdrawals, and calculate interest
              automatically.
            </p>
          </div>
        </Link>

        <Link href="/dashboard/loans" className="block">
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <FileText className="w-6 h-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold">Loan Management</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Review applications, approve loans, and track repayments.
            </p>
          </div>
        </Link>

        <Link href="/dashboard/inventory" className="block">
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <Package className="w-6 h-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold">Inventory Management</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Track stock levels, process sales, and generate inventory reports.
            </p>
          </div>
        </Link>

        <Link href="/dashboard/accounting" className="block">
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <FileText className="w-6 h-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold">Accounting Module</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Record transactions and generate financial statements.
            </p>
          </div>
        </Link>

        <Link href="/dashboard/reports" className="block">
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <BarChart3 className="w-6 h-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold">Reporting Module</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Generate financial reports, export to Excel, and create PDF
              reports.
            </p>
          </div>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <p className="font-medium">New Member Registration</p>
              <p className="text-sm text-gray-500">
                John Doe joined the cooperative
              </p>
            </div>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </div>
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <p className="font-medium">Loan Application</p>
              <p className="text-sm text-gray-500">
                Sarah Smith applied for a business loan
              </p>
            </div>
            <span className="text-sm text-gray-500">5 hours ago</span>
          </div>
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <p className="font-medium">Savings Deposit</p>
              <p className="text-sm text-gray-500">
                Michael Johnson deposited $500
              </p>
            </div>
            <span className="text-sm text-gray-500">Yesterday</span>
          </div>
        </div>
      </div>
    </div>
  );
}
