import { getIsAdmin } from "@/app/actions";
import AdminClientLayout from "@/components/AdminClientLayout";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = cookies().get("token")?.value;
  const isAdmin = await getIsAdmin();

  if (!isAdmin) {
    redirect("/admin/login");
  }

  return (
    <div className="bg-black/20 opacity-80 w-full h-full min-h-screen flex lg:h-auto">
      <AdminClientLayout>{children}</AdminClientLayout>
    </div>
  );
}
