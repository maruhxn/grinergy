"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const getIsAdmin = async () => {
  const token = cookies().get("token")?.value;
  if (!token) return false;

  const payload = jwt.verify(token, process.env.COOKIE_SECRET as string) as {
    ok: boolean;
  };

  if (!payload.ok) return false;
  return true;
};
