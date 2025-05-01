import MemberPortalNavbar from "@/components/member-portal-navbar";
import MemberPortalSidebar from "@/components/member-portal-sidebar";
import { createClient } from "../../../supabase/server";
import { redirect } from "next/navigation";

export default async function MemberPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <MemberPortalNavbar />
      <div className="flex flex-1">
        <MemberPortalSidebar />
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}
