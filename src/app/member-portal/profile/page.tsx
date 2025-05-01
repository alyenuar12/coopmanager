import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-primary/10 p-4 rounded-full">
          <User className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">My Profile</h1>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="bg-card p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                defaultValue="john.doe@example.com"
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
            <Button className="mt-2">Update Information</Button>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Membership Details</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Member ID</p>
              <p className="font-medium">MEM12345</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Member Since</p>
              <p className="font-medium">January 15, 2022</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Membership Status</p>
              <p className="font-medium">Active</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Membership Type</p>
              <p className="font-medium">Full Member</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
