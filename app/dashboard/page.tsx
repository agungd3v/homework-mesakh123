import { redirect } from "next/navigation";
import { getSession  } from "../utils/session";

export default async function Dashboard() {
  const session: any = await getSession();
  if (session?.user.role == 1) return redirect("/dashboard/admin");
  if (session?.user.role == 2) return redirect("/dashboard/manager");
  if (session?.user.role == 3) return redirect("/dashboard/viewer");
}
