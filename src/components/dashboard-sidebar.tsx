"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  CreditCard,
  FileSpreadsheet,
  FileText,
  Home,
  Package,
  Settings,
  Users,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Member Management", href: "/dashboard/members", icon: Users },
  { name: "Savings Management", href: "/dashboard/savings", icon: CreditCard },
  { name: "Loan Management", href: "/dashboard/loans", icon: FileText },
  { name: "Inventory Management", href: "/dashboard/inventory", icon: Package },
  { name: "Accounting", href: "/dashboard/accounting", icon: FileSpreadsheet },
  { name: "Reports", href: "/dashboard/reports", icon: BarChart3 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-[calc(100vh-64px)] hidden md:block">
      <div className="p-4">
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon
                  className={`mr-3 h-5 w-5 ${isActive ? "text-blue-700" : "text-gray-400"}`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
