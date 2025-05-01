import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TransactionsPage() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            View your recent account transactions
          </CardDescription>
          <div className="flex flex-col md:flex-row gap-4 pt-4">
            <Input placeholder="Search transactions..." className="max-w-sm" />
            <div className="flex items-center gap-2">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All accounts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All accounts</SelectItem>
                  <SelectItem value="savings">Savings Account</SelectItem>
                  <SelectItem value="loan">Loan Account</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Last 30 days" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="60">Last 60 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                  <SelectItem value="year">This year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">Filter</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  date: "2023-07-01",
                  desc: "Savings Deposit",
                  account: "Savings",
                  amount: "+$500.00",
                  balance: "$2,500.00",
                  status: "Completed",
                },
                {
                  date: "2023-06-28",
                  desc: "Loan Payment",
                  account: "Loan",
                  amount: "-$350.00",
                  balance: "$4,650.00",
                  status: "Completed",
                },
                {
                  date: "2023-06-25",
                  desc: "Interest Credit",
                  account: "Savings",
                  amount: "+$12.50",
                  balance: "$2,000.00",
                  status: "Completed",
                },
                {
                  date: "2023-06-20",
                  desc: "Savings Deposit",
                  account: "Savings",
                  amount: "+$500.00",
                  balance: "$1,987.50",
                  status: "Completed",
                },
                {
                  date: "2023-06-15",
                  desc: "Loan Payment",
                  account: "Loan",
                  amount: "-$350.00",
                  balance: "$5,000.00",
                  status: "Completed",
                },
              ].map((tx, i) => (
                <TableRow key={i}>
                  <TableCell>{tx.date}</TableCell>
                  <TableCell>{tx.desc}</TableCell>
                  <TableCell>{tx.account}</TableCell>
                  <TableCell
                    className={
                      tx.amount.startsWith("+")
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {tx.amount}
                  </TableCell>
                  <TableCell>{tx.balance}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                      {tx.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-center mt-4">
            <Button variant="outline">Load More</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Download Statements</CardTitle>
            <CardDescription>Download your account statements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">June 2023 Statement</p>
                  <p className="text-sm text-muted-foreground">All accounts</p>
                </div>
                <Button variant="outline" size="sm">
                  Download
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">May 2023 Statement</p>
                  <p className="text-sm text-muted-foreground">All accounts</p>
                </div>
                <Button variant="outline" size="sm">
                  Download
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">April 2023 Statement</p>
                  <p className="text-sm text-muted-foreground">All accounts</p>
                </div>
                <Button variant="outline" size="sm">
                  Download
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transaction Analytics</CardTitle>
            <CardDescription>View your spending patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center border rounded-md">
              <p className="text-muted-foreground">
                Transaction analytics chart will be displayed here
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
