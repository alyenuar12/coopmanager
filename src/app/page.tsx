import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import {
  ArrowUpRight,
  BarChart3,
  Calculator,
  CreditCard,
  FileSpreadsheet,
  Lock,
  Settings,
  Shield,
  Users,
} from "lucide-react";
import { createClient } from "../../supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <Hero />

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Comprehensive Cooperative Management
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform provides everything you need to manage your
              cooperative efficiently with separate portals for administrators
              and members.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Settings className="w-6 h-6" />,
                title: "Admin Dashboard",
                description:
                  "Complete financial management system with comprehensive modules",
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Member Portal",
                description: "Mobile-friendly interface for member services",
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Enterprise Security",
                description: "End-to-end encryption with SSL/SHA-256",
              },
              {
                icon: <BarChart3 className="w-6 h-6" />,
                title: "Advanced Reporting",
                description: "Comprehensive financial analytics and reports",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admin Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Admin Tools</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything administrators need to manage the cooperative
              efficiently
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-6 h-6" />,
                title: "Member Management",
                description:
                  "Add, edit, and manage member profiles with complete history tracking",
              },
              {
                icon: <Calculator className="w-6 h-6" />,
                title: "Savings Management",
                description:
                  "Process deposits, withdrawals, and calculate interest automatically",
              },
              {
                icon: <CreditCard className="w-6 h-6" />,
                title: "Loan Management",
                description:
                  "Review applications, approve loans, and track repayments",
              },
              {
                icon: <FileSpreadsheet className="w-6 h-6" />,
                title: "Inventory Control",
                description:
                  "Track stock levels, process sales, and generate reports",
              },
              {
                icon: <BarChart3 className="w-6 h-6" />,
                title: "Accounting Module",
                description:
                  "Record transactions and generate financial statements",
              },
              {
                icon: <Lock className="w-6 h-6" />,
                title: "Security Controls",
                description:
                  "Role-based access and comprehensive audit logging",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-blue-100">Secure Transactions</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Member Access</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-blue-100">Uptime Guaranteed</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Cooperative?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join cooperatives that are already benefiting from our comprehensive
            management platform.
          </p>
          <a
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started Now
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
