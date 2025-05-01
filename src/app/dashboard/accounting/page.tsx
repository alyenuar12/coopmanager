import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

export default function AccountingPage() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Accounting</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">Export</Button>
          <Button>New Transaction</Button>
        </div>
      </div>

      <Tabs defaultValue="transactions" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-3 md:grid-cols-4">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="journal">Journal Entries</TabsTrigger>
          <TabsTrigger value="ledger">General Ledger</TabsTrigger>
          <TabsTrigger value="statements">Financial Statements</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>
                View and manage all financial transactions
              </CardDescription>
              <div className="flex items-center gap-2 pt-2">
                <Input
                  placeholder="Search transactions..."
                  className="max-w-sm"
                />
                <Button variant="outline">Filter</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Account</TableHead>
                    <TableHead>Debit</TableHead>
                    <TableHead>Credit</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[1, 2, 3, 4, 5].map((item) => (
                    <TableRow key={item}>
                      <TableCell>{new Date().toLocaleDateString()}</TableCell>
                      <TableCell>TRX-{1000 + item}</TableCell>
                      <TableCell>Member Deposit</TableCell>
                      <TableCell>Cash Account</TableCell>
                      <TableCell>$1,000.00</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                          Completed
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="journal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Journal Entries</CardTitle>
              <CardDescription>Record and view journal entries</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Journal entries content will be implemented here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ledger" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Ledger</CardTitle>
              <CardDescription>
                View the general ledger accounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                General ledger content will be implemented here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Statements</CardTitle>
              <CardDescription>
                Generate and view financial statements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-24 text-lg justify-start px-4"
                >
                  <div className="text-left">
                    <div className="font-medium">Income Statement</div>
                    <div className="text-sm text-muted-foreground">
                      Revenue, expenses, and profit
                    </div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 text-lg justify-start px-4"
                >
                  <div className="text-left">
                    <div className="font-medium">Balance Sheet</div>
                    <div className="text-sm text-muted-foreground">
                      Assets, liabilities, and equity
                    </div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 text-lg justify-start px-4"
                >
                  <div className="text-left">
                    <div className="font-medium">Cash Flow Statement</div>
                    <div className="text-sm text-muted-foreground">
                      Cash inflows and outflows
                    </div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 text-lg justify-start px-4"
                >
                  <div className="text-left">
                    <div className="font-medium">Trial Balance</div>
                    <div className="text-sm text-muted-foreground">
                      Debits and credits balance
                    </div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
