"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const formSchema = z.object({
  password: z.string({
    required_error: "비밀번호는 필수입니다.",
  }),
});

export const login = async (prevState: any, formData: FormData) => {
  const data = {
    password: formData.get("password"),
  };

  const result = formSchema.safeParse(data);

  if (!result.success) return result.error.flatten();
  if (result.data.password !== process.env.ADMIN_PASSWORD) {
    return {
      fieldErrors: {
        password: ["비밀번호가 일치하지 않습니다."],
      },
    };
  }

  const token = jwt.sign({ ok: true }, process.env.COOKIE_SECRET as string, {
    algorithm: "HS256",
  });

  cookies().set("token", token, {
    httpOnly: true,
    secure: false,
    maxAge: 259200, // 3d
  });

  redirect("/admin/notice");
};

export const logout = async () => {
  cookies().delete("token");
  redirect("/admin/login");
};
