import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Shield, Bell, Users, CreditCard } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-6">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">System Settings</h1>
          <p className="text-gray-600">
            Configure system parameters and preferences
          </p>
        </div>
        <Button>Save Changes</Button>
      </header>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-5 mb-8">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Basic system configuration options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="cooperative-name">Cooperative Name</Label>
                  <Input
                    id="cooperative-name"
                    defaultValue="Community Cooperative Credit Union"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    defaultValue="contact@communitycooperative.org"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    defaultValue="123 Main St, Anytown, ST 12345"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Default Timezone</Label>
                <select className="w-full p-2 border rounded-md">
                  <option>UTC-08:00 - Pacific Time</option>
                  <option>UTC-07:00 - Mountain Time</option>
                  <option>UTC-06:00 - Central Time</option>
                  <option>UTC-05:00 - Eastern Time</option>
                  <option>UTC-04:00 - Atlantic Time</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Maintenance Mode</p>
                  <p className="text-sm text-muted-foreground">
                    Enable maintenance mode to prevent user access during
                    updates
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
              <CardDescription>
                Details about the current system installation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Version</p>
                <p className="font-medium">1.0.0</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p className="font-medium">June 15, 2023</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Database Status</p>
                <p className="font-medium text-green-600">Connected</p>
              </div>
              <div className="pt-2">
                <Button variant="outline">Check for Updates</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure system security parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">
                    Require 2FA for all admin users
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Password Expiry</p>
                  <p className="text-sm text-muted-foreground">
                    Force password reset every 90 days
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">IP Restriction</p>
                  <p className="text-sm text-muted-foreground">
                    Limit admin access to specific IP addresses
                  </p>
                </div>
                <Switch />
              </div>

              <div className="space-y-2 pt-4">
                <Label htmlFor="session-timeout">
                  Session Timeout (minutes)
                </Label>
                <Input id="session-timeout" type="number" defaultValue="30" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure system notifications and alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Send notifications via email
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">SMS Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Send notifications via SMS
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">System Alerts</p>
                  <p className="text-sm text-muted-foreground">
                    Send alerts for system events
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-2 pt-4">
                <Label htmlFor="email-from">Email From Address</Label>
                <Input
                  id="email-from"
                  type="email"
                  defaultValue="notifications@communitycooperative.org"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Configure user roles and permissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Self Registration</p>
                  <p className="text-sm text-muted-foreground">
                    Allow users to register accounts
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Verification</p>
                  <p className="text-sm text-muted-foreground">
                    Require email verification for new accounts
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Admin Approval</p>
                  <p className="text-sm text-muted-foreground">
                    Require admin approval for new accounts
                  </p>
                </div>
                <Switch />
              </div>

              <div className="pt-4">
                <Button variant="outline">Manage User Roles</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Settings</CardTitle>
              <CardDescription>Configure financial parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option>USD - US Dollar</option>
                    <option>EUR - Euro</option>
                    <option>GBP - British Pound</option>
                    <option>CAD - Canadian Dollar</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fiscal-year">Fiscal Year Start</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option>January</option>
                    <option>April</option>
                    <option>July</option>
                    <option>October</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="default-savings-rate">
                  Default Savings Interest Rate (%)
                </Label>
                <Input
                  id="default-savings-rate"
                  type="number"
                  defaultValue="2.5"
                  step="0.1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="default-loan-rate">
                  Default Loan Interest Rate (%)
                </Label>
                <Input
                  id="default-loan-rate"
                  type="number"
                  defaultValue="7.5"
                  step="0.1"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Automatic Interest Calculation</p>
                  <p className="text-sm text-muted-foreground">
                    Calculate interest automatically on schedule
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
