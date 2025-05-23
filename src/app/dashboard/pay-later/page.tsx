import PayLaterClient from "./client";

// Mock data for scheduled payments
const mockScheduledPayments = [
  {
    id: "SP001",
    loanId: "L001",
    member: "Sarah Johnson",
    amount: "$450.00",
    scheduledDate: "June 15, 2023",
    status: "Pending",
  },
  {
    id: "SP002",
    loanId: "L003",
    member: "Lisa Wilson",
    amount: "$325.00",
    scheduledDate: "June 20, 2023",
    status: "Pending",
  },
  {
    id: "SP003",
    loanId: "L004",
    member: "James Miller",
    amount: "$275.00",
    scheduledDate: "June 10, 2023",
    status: "Processed",
  },
  {
    id: "SP004",
    loanId: "L002",
    member: "David Brown",
    amount: "$180.00",
    scheduledDate: "June 25, 2023",
    status: "Pending",
  },
  {
    id: "SP005",
    loanId: "L005",
    member: "Patricia Davis",
    amount: "$550.00",
    scheduledDate: "June 5, 2023",
    status: "Cancelled",
  },
];

// This is a Server Component
export default async function PayLaterPage() {
  // In a real implementation, we would fetch data from the database here
  // using the server-side createClient function
  // For now, we'll use the mock data
  const scheduledPayments = mockScheduledPayments;

  // Pass the data to the client component
  return <PayLaterClient initialPayments={scheduledPayments} />;
}
