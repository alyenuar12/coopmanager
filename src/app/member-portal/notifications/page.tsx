import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, CheckCircle, AlertCircle, Info } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        <Button variant="outline">Mark All as Read</Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <CardTitle className="text-base">
                      Annual General Meeting
                    </CardTitle>
                    <CardDescription>
                      The annual general meeting will be held on July 15, 2023
                    </CardDescription>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">
                  2 hours ago
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  Announcement
                </span>
                <Button variant="ghost" size="sm">
                  Mark as Read
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <CardTitle className="text-base">
                      Loan Payment Successful
                    </CardTitle>
                    <CardDescription>
                      Your loan payment of $350.00 was successfully processed
                    </CardDescription>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">1 day ago</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  Transaction
                </span>
                <Button variant="ghost" size="sm">
                  Mark as Read
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <CardTitle className="text-base">
                      Upcoming Loan Payment
                    </CardTitle>
                    <CardDescription>
                      Your next loan payment of $350.00 is due in 3 days
                    </CardDescription>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">
                  2 days ago
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Alert</span>
                <Button variant="ghost" size="sm">
                  Mark as Read
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <CardTitle className="text-base">
                      New Savings Product
                    </CardTitle>
                    <CardDescription>
                      Check out our new high-yield savings account with 5%
                      interest rate
                    </CardDescription>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">
                  5 days ago
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  Announcement
                </span>
                <Button variant="ghost" size="sm">
                  Mark as Read
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unread" className="space-y-4 mt-6">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <CardTitle className="text-base">
                      Annual General Meeting
                    </CardTitle>
                    <CardDescription>
                      The annual general meeting will be held on July 15, 2023
                    </CardDescription>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">
                  2 hours ago
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  Announcement
                </span>
                <Button variant="ghost" size="sm">
                  Mark as Read
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4 mt-6">
          <Card className="border-l-4 border-l-amber-500">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <CardTitle className="text-base">
                      Upcoming Loan Payment
                    </CardTitle>
                    <CardDescription>
                      Your next loan payment of $350.00 is due in 3 days
                    </CardDescription>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">
                  2 days ago
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Alert</span>
                <Button variant="ghost" size="sm">
                  Mark as Read
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="announcements" className="space-y-4 mt-6">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <CardTitle className="text-base">
                      Annual General Meeting
                    </CardTitle>
                    <CardDescription>
                      The annual general meeting will be held on July 15, 2023
                    </CardDescription>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">
                  2 hours ago
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  Announcement
                </span>
                <Button variant="ghost" size="sm">
                  Mark as Read
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <CardTitle className="text-base">
                      New Savings Product
                    </CardTitle>
                    <CardDescription>
                      Check out our new high-yield savings account with 5%
                      interest rate
                    </CardDescription>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">
                  5 days ago
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  Announcement
                </span>
                <Button variant="ghost" size="sm">
                  Mark as Read
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>
            Manage your notification preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Notification settings will be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
