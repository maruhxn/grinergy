import { redirect } from "next/navigation";

export default function AdminMainPage() {
  console.log("main");
  redirect("/admin/notice");
}
