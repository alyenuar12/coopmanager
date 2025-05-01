import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import dynamic from "next/dynamic";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";

// Dynamically import the Calendar component with no SSR
const Calendar = dynamic(
  () => import("@/components/ui/calendar").then((mod) => mod.Calendar),
  { ssr: false },
);

export default function ReportsPage() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">Schedule Report</Button>
          <Button>Generate New Report</Button>
        </div>
      </div>

      <Tabs defaultValue="financial" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="loans">Loans</TabsTrigger>
          <TabsTrigger value="savings">Savings</TabsTrigger>
        </TabsList>

        <TabsContent value="financial" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
              <CardDescription>
                Generate and view financial reports
              </CardDescription>
              <div className="flex flex-col md:flex-row gap-4 pt-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Income Statement</SelectItem>
                      <SelectItem value="balance">Balance Sheet</SelectItem>
                      <SelectItem value="cashflow">Cash Flow</SelectItem>
                      <SelectItem value="trial">Trial Balance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-[240px] justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <span>Pick a date</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" />
                    </PopoverContent>
                  </Popover>
                  <Button>Generate</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    title: "Income Statement",
                    date: "June 2023",
                    status: "Ready",
                  },
                  {
                    title: "Balance Sheet",
                    date: "June 2023",
                    status: "Ready",
                  },
                  {
                    title: "Cash Flow Statement",
                    date: "June 2023",
                    status: "Ready",
                  },
                  {
                    title: "Income Statement",
                    date: "May 2023",
                    status: "Ready",
                  },
                  { title: "Balance Sheet", date: "May 2023", status: "Ready" },
                  {
                    title: "Cash Flow Statement",
                    date: "May 2023",
                    status: "Ready",
                  },
                ].map((report, index) => (
                  <Card key={index} className="flex flex-col">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                      <CardDescription>{report.date}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                          {report.status}
                        </span>
                        <div className="space-x-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="members" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Member Reports</CardTitle>
              <CardDescription>
                Generate and view member-related reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-24 text-lg justify-start px-4"
                >
                  <div className="text-left">
                    <div className="font-medium">Member Directory</div>
                    <div className="text-sm text-muted-foreground">
                      Complete list of all members
                    </div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 text-lg justify-start px-4"
                >
                  <div className="text-left">
                    <div className="font-medium">New Members</div>
                    <div className="text-sm text-muted-foreground">
                      Members who joined recently
                    </div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 text-lg justify-start px-4"
                >
                  <div className="text-left">
                    <div className="font-medium">Member Activity</div>
                    <div className="text-sm text-muted-foreground">
                      Transaction activity by member
                    </div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 text-lg justify-start px-4"
                >
                  <div className="text-left">
                    <div className="font-medium">Inactive Members</div>
                    <div className="text-sm text-muted-foreground">
                      Members with no recent activity
                    </div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="loans" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Loan Reports</CardTitle>
              <CardDescription>
                Generate and view loan-related reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-24 text-lg justify-start px-4"
                >
                  <div className="text-left">
                    <div className="font-medium">Active Loans</div>
                    <div className="text-sm text-muted-foreground">
                      Currently active loans
                    </div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 text-lg justify-start px-4"
                >
                  <div className="text-left">
                    <div className="font-medium">Loan Disbursements</div>
                    <div className="text-sm text-muted-foreground">
                      Recent loan disbursements
                    </div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 text-lg justify-start px-4"
                >
                  <div className="text-left">
                    <div className="font-medium">Loan Repayments</div>
                    <div className="text-sm text-muted-foreground">
                      Recent loan repayments
                    </div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 text-lg justify-start px-4"
                >
                  <div className="text-left">
                    <div className="font-medium">Delinquent Loans</div>
                    <div className="text-sm text-muted-foreground">
                      Overdue loan payments
                    </div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="savings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Savings Reports</CardTitle>
              <CardDescription>
                Generate and view savings-related reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-24 text-lg justify-start px-4"
                >
                  <div className="text-left">
                    <div className="font-medium">Savings Summary</div>
                    <div className="text-sm text-muted-foreground">
                      Overview of all savings accounts
                    </div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 text-lg justify-start px-4"
                >
                  <div className="text-left">
                    <div className="font-medium">Deposits</div>
                    <div className="text-sm text-muted-foreground">
                      Recent deposit transactions
                    </div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 text-lg justify-start px-4"
                >
                  <div className="text-left">
                    <div className="font-medium">Withdrawals</div>
                    <div className="text-sm text-muted-foreground">
                      Recent withdrawal transactions
                    </div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 text-lg justify-start px-4"
                >
                  <div className="text-left">
                    <div className="font-medium">Interest Accruals</div>
                    <div className="text-sm text-muted-foreground">
                      Interest earned on savings
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
