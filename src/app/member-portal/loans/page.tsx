import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, AlertCircle } from "lucide-react";

export default function LoansPage() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">My Loans</h1>
        <Button>Apply for Loan</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-blue-50">
          <CardHeader className="pb-2">
            <CardTitle>Active Loans</CardTitle>
            <CardDescription>Current loan accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1</div>
            <p className="text-sm text-muted-foreground mt-2">Personal Loan</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Outstanding</CardTitle>
            <CardDescription>Amount remaining to pay</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$4,650.00</div>
            <p className="text-sm text-muted-foreground mt-2">
              7.5% interest rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Next Payment</CardTitle>
            <CardDescription>Due on July 15, 2023</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$350.00</div>
            <p className="text-sm text-muted-foreground mt-2">
              15 days remaining
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Loans</CardTitle>
          <CardDescription>Your current loan accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Loan ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Original Amount</TableHead>
                <TableHead>Outstanding</TableHead>
                <TableHead>Interest Rate</TableHead>
                <TableHead>Term</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>L12345</TableCell>
                <TableCell>Personal Loan</TableCell>
                <TableCell>$5,000.00</TableCell>
                <TableCell>$4,650.00</TableCell>
                <TableCell>7.5%</TableCell>
                <TableCell>24 months</TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                    Current
                  </span>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Schedule</CardTitle>
          <CardDescription>Upcoming and past loan payments</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Principal</TableHead>
                <TableHead>Interest</TableHead>
                <TableHead>Remaining Balance</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  date: "2023-07-15",
                  amount: "$350.00",
                  principal: "$300.00",
                  interest: "$50.00",
                  balance: "$4,350.00",
                  status: "Upcoming",
                },
                {
                  date: "2023-06-15",
                  amount: "$350.00",
                  principal: "$295.00",
                  interest: "$55.00",
                  balance: "$4,650.00",
                  status: "Paid",
                },
                {
                  date: "2023-05-15",
                  amount: "$350.00",
                  principal: "$290.00",
                  interest: "$60.00",
                  balance: "$4,945.00",
                  status: "Paid",
                },
              ].map((payment, i) => (
                <TableRow key={i}>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>{payment.principal}</TableCell>
                  <TableCell>{payment.interest}</TableCell>
                  <TableCell>{payment.balance}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        payment.status === "Paid"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Make a Payment</CardTitle>
            <CardDescription>Pay towards your loan</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="loan">Select Loan</Label>
                <select className="w-full p-2 border rounded-md">
                  <option>Personal Loan (L12345)</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Payment Amount</Label>
                <Input id="amount" type="number" defaultValue="350.00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payment-date">Payment Date</Label>
                <Input
                  id="payment-date"
                  type="date"
                  defaultValue="2023-07-15"
                />
              </div>
              <Button className="w-full">Make Payment</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Loan Products</CardTitle>
            <CardDescription>Available loan options</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-md hover:bg-gray-50">
                <h3 className="font-medium">Personal Loan</h3>
                <p className="text-sm text-muted-foreground">
                  For personal expenses and needs
                </p>
                <div className="mt-2 text-sm">
                  <p>Interest Rate: 7.5% - 12.5%</p>
                  <p>Term: 1-5 years</p>
                  <p>Max Amount: $10,000</p>
                </div>
              </div>
              <div className="p-4 border rounded-md hover:bg-gray-50">
                <h3 className="font-medium">Business Loan</h3>
                <p className="text-sm text-muted-foreground">
                  For business expansion and working capital
                </p>
                <div className="mt-2 text-sm">
                  <p>Interest Rate: 6.5% - 10.0%</p>
                  <p>Term: 1-10 years</p>
                  <p>Max Amount: $50,000</p>
                </div>
              </div>
              <div className="p-4 border rounded-md hover:bg-gray-50">
                <h3 className="font-medium">Education Loan</h3>
                <p className="text-sm text-muted-foreground">
                  For educational expenses
                </p>
                <div className="mt-2 text-sm">
                  <p>Interest Rate: 5.0% - 7.0%</p>
                  <p>Term: 5-15 years</p>
                  <p>Max Amount: $25,000</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Apply for a New Loan
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
