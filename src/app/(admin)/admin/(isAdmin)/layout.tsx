import AdminClientLayout from "@/components/AdminClientLayout";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface Payload {
  ok: boolean;
}

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = cookies().get("token")?.value;
  if (!token) {
    redirect("/admin/login");
  }

  const payload = jwt.verify(
    token,
    process.env.COOKIE_SECRET as string
  ) as Payload;

  if (!payload.ok) {
    redirect("/admin/login");
  }

  return (
    <div className="bg-black/20 opacity-80 w-full min-h-screen flex overflow-hidden h-screen lg:h-auto">
      <AdminClientLayout>{children}</AdminClientLayout>
    </div>
  );
}
