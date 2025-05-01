import { Shield, User, CreditCard, FileText, Bell } from "lucide-react";
import Link from "next/link";

export default async function MemberPortal() {
  return (
    <div className="container mx-auto py-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Member Portal</h1>
        <p className="text-gray-600">Welcome to your cooperative account</p>
      </header>

      {/* Account Overview */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Account Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <p className="text-sm text-gray-500">Savings Balance</p>
            <p className="text-2xl font-bold">$2,450.00</p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <p className="text-sm text-gray-500">Interest Earned</p>
            <p className="text-2xl font-bold">$45.20</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg">
            <p className="text-sm text-gray-500">Loan Balance</p>
            <p className="text-2xl font-bold">$0.00</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/member-portal/profile" className="block">
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow h-full">
              <div className="flex items-center mb-4">
                <User className="w-5 h-5 text-blue-600 mr-2" />
                <h2 className="text-lg font-semibold">Profile Management</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Update your personal information and communication preferences.
              </p>
            </div>
          </Link>

          <Link href="/member-portal/savings" className="block">
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow h-full">
              <div className="flex items-center mb-4">
                <CreditCard className="w-5 h-5 text-blue-600 mr-2" />
                <h2 className="text-lg font-semibold">Savings Operations</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Request deposits or withdrawals from your savings account.
              </p>
            </div>
          </Link>

          <Link href="/member-portal/loans" className="block">
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow h-full">
              <div className="flex items-center mb-4">
                <FileText className="w-5 h-5 text-blue-600 mr-2" />
                <h2 className="text-lg font-semibold">Loan Services</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Apply for loans and view your repayment schedule.
              </p>
            </div>
          </Link>

          <Link href="/member-portal/notifications" className="block">
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow h-full">
              <div className="flex items-center mb-4">
                <Bell className="w-5 h-5 text-blue-600 mr-2" />
                <h2 className="text-lg font-semibold">Notifications</h2>
              </div>
              <p className="text-gray-600 mb-4">
                View and manage your notification preferences.
              </p>
            </div>
          </Link>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
          <div className="space-y-4">
            <div className="border-b pb-2">
              <p className="text-sm font-medium">Savings Deposit</p>
              <p className="text-green-600 font-medium">+$200.00</p>
              <p className="text-xs text-gray-500">May 15, 2023</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm font-medium">Interest Credit</p>
              <p className="text-green-600 font-medium">+$12.50</p>
              <p className="text-xs text-gray-500">May 1, 2023</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm font-medium">Savings Deposit</p>
              <p className="text-green-600 font-medium">+$150.00</p>
              <p className="text-xs text-gray-500">Apr 15, 2023</p>
            </div>
          </div>
          <Link
            href="/member-portal/transactions"
            className="block w-full mt-4"
          >
            <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-sm">
              View All Transactions
            </button>
          </Link>
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <div className="flex items-center mb-4">
          <Shield className="w-5 h-5 text-blue-600 mr-2" />
          <h2 className="text-lg font-semibold">Security Center</h2>
        </div>
        <p className="text-gray-600 mb-4">
          Your security is our priority. All transactions are protected with
          end-to-end encryption.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/member-portal/security">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              Security Settings
            </button>
          </Link>
          <Link href="/dashboard/reset-password">
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
              Change Password
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
