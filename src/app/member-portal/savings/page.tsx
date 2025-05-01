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
import { CreditCard, Download, Plus, Upload } from "lucide-react";

export default function SavingsPage() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">My Savings</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">Download Statement</Button>
          <Button>New Transaction</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-blue-50">
          <CardHeader className="pb-2">
            <CardTitle>Regular Savings</CardTitle>
            <CardDescription>Main savings account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$2,450.00</div>
            <p className="text-sm text-muted-foreground mt-2">
              2.5% interest rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Emergency Fund</CardTitle>
            <CardDescription>Rainy day savings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$1,200.00</div>
            <p className="text-sm text-muted-foreground mt-2">
              1.75% interest rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Holiday Savings</CardTitle>
            <CardDescription>Special purpose savings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$750.00</div>
            <p className="text-sm text-muted-foreground mt-2">
              2.0% interest rate
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your recent savings transactions</CardDescription>
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  date: "2023-07-01",
                  desc: "Deposit",
                  account: "Regular Savings",
                  amount: "+$200.00",
                  balance: "$2,450.00",
                },
                {
                  date: "2023-06-25",
                  desc: "Interest Credit",
                  account: "Regular Savings",
                  amount: "+$12.50",
                  balance: "$2,250.00",
                },
                {
                  date: "2023-06-20",
                  desc: "Deposit",
                  account: "Emergency Fund",
                  amount: "+$100.00",
                  balance: "$1,200.00",
                },
                {
                  date: "2023-06-15",
                  desc: "Deposit",
                  account: "Holiday Savings",
                  amount: "+$50.00",
                  balance: "$750.00",
                },
                {
                  date: "2023-06-10",
                  desc: "Deposit",
                  account: "Regular Savings",
                  amount: "+$200.00",
                  balance: "$2,237.50",
                },
              ].map((tx, i) => (
                <TableRow key={i}>
                  <TableCell>{tx.date}</TableCell>
                  <TableCell>{tx.desc}</TableCell>
                  <TableCell>{tx.account}</TableCell>
                  <TableCell className="text-green-600">{tx.amount}</TableCell>
                  <TableCell>{tx.balance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Make a Deposit</CardTitle>
            <CardDescription>Add funds to your savings account</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="account">Select Account</Label>
                <select className="w-full p-2 border rounded-md">
                  <option>Regular Savings</option>
                  <option>Emergency Fund</option>
                  <option>Holiday Savings</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input id="amount" type="number" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Input
                  id="notes"
                  placeholder="Add a note for this transaction"
                />
              </div>
              <Button className="w-full">Submit Deposit Request</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Savings Goals</CardTitle>
            <CardDescription>
              Track your progress towards savings goals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Vacation Fund</span>
                  <span>$750 / $2,000</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: "37.5%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>New Car</span>
                  <span>$3,500 / $10,000</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: "35%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Home Down Payment</span>
                  <span>$12,000 / $50,000</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: "24%" }}
                  ></div>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                Add New Goal
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
