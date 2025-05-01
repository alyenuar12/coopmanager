import { createClient } from "../../../../supabase/server";
import { redirect } from "next/navigation";
import {
  BarChart3,
  Users,
  CreditCard,
  FileText,
  Package,
  Settings,
  FileSpreadsheet,
} from "lucide-react";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
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

        {/* Admin Modules */}
        <h2 className="text-xl font-semibold mb-6">Management Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <Users className="w-6 h-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold">Member Management</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Add, edit, and manage member profiles with complete history
              tracking.
            </p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              Access Module
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <CreditCard className="w-6 h-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold">Savings Management</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Process deposits, withdrawals, and calculate interest
              automatically.
            </p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              Access Module
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <FileText className="w-6 h-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold">Loan Management</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Review applications, approve loans, and track repayments.
            </p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              Access Module
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <Package className="w-6 h-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold">Inventory Management</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Track stock levels, process sales, and generate inventory reports.
            </p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              Access Module
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <FileSpreadsheet className="w-6 h-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold">Accounting Module</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Record transactions and generate financial statements.
            </p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              Access Module
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <BarChart3 className="w-6 h-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold">Reporting Module</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Generate financial reports, export to Excel, and create PDF
              reports.
            </p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              Access Module
            </button>
          </div>
        </div>

        {/* Settings Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <Settings className="w-6 h-6 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold">System Settings</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Configure system parameters, manage user roles, and adjust security
            settings.
          </p>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              General Settings
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
              User Roles
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
              Security Settings
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
