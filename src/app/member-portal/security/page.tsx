import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Key, Smartphone, Clock } from "lucide-react";

export default function SecurityPage() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold tracking-tight">Security</h1>

      <Tabs defaultValue="password" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="2fa">Two-Factor Auth</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
        </TabsList>

        <TabsContent value="password" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your account password</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <Button>Update Password</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Password Requirements</CardTitle>
              <CardDescription>
                Ensure your password meets these requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>Minimum 8 characters</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>At least one uppercase letter</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>At least one lowercase letter</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>At least one number</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>At least one special character</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="2fa" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>
                Add an extra layer of security to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">SMS Authentication</p>
                      <p className="text-sm text-muted-foreground">
                        Receive a code via SMS
                      </p>
                    </div>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Key className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Authenticator App</p>
                      <p className="text-sm text-muted-foreground">
                        Use an authenticator app
                      </p>
                    </div>
                  </div>
                  <Switch />
                </div>

                <div className="pt-4">
                  <Button variant="outline">
                    Setup Two-Factor Authentication
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Sessions</CardTitle>
              <CardDescription>Manage your active sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Current Session</p>
                      <p className="text-xs text-muted-foreground">
                        Chrome on Windows • IP: 192.168.1.1 • Last active: Just
                        now
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                    Current
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Mobile App</p>
                      <p className="text-xs text-muted-foreground">
                        iOS • IP: 192.168.1.2 • Last active: 2 hours ago
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Revoke
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Firefox</p>
                      <p className="text-xs text-muted-foreground">
                        Firefox on macOS • IP: 192.168.1.3 • Last active: 1 day
                        ago
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Revoke
                  </Button>
                </div>

                <div className="pt-4">
                  <Button variant="destructive">
                    Revoke All Other Sessions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Login History</CardTitle>
              <CardDescription>Recent login activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Successful login</p>
                  <p className="text-xs text-muted-foreground">
                    Chrome on Windows • IP: 192.168.1.1 • Today, 10:30 AM
                  </p>
                </div>
                <div>
                  <p className="font-medium">Successful login</p>
                  <p className="text-xs text-muted-foreground">
                    iOS App • IP: 192.168.1.2 • Yesterday, 8:15 PM
                  </p>
                </div>
                <div>
                  <p className="font-medium">Failed login attempt</p>
                  <p className="text-xs text-muted-foreground">
                    Unknown • IP: 203.0.113.1 • 3 days ago, 2:45 PM
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
