import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import AdminDashboardClient from "@/components/admin/AdminDashboardClient";

export default async function AdminDashboard() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return <AdminDashboardClient />;
}
