"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, CreditCard, FileText, Home, Shield, User } from "lucide-react";

const menuItems = [
  { name: "Dashboard", href: "/member-portal", icon: Home },
  { name: "Profile", href: "/member-portal/profile", icon: User },
  { name: "Savings", href: "/member-portal/savings", icon: CreditCard },
  { name: "Loans", href: "/member-portal/loans", icon: FileText },
  { name: "Transactions", href: "/member-portal/transactions", icon: FileText },
  { name: "Notifications", href: "/member-portal/notifications", icon: Bell },
  { name: "Security", href: "/member-portal/security", icon: Shield },
];

export default function MemberPortalSidebar() {
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
