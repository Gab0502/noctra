import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import PageBuilder from "@/components/editor/PageBuilder";

export default async function NewProject() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return <PageBuilder mode="new" />;
}
