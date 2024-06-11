import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function AdminLoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 이미 로그인 되어 있는 경우 "/admin"으로 리다이렉트
  const token = cookies().get("token")?.value;
  if (token) {
    redirect("/admin");
  }
  return children;
}
