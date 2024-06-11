"use server";

import { redirect } from "next/navigation";

export async function search(pathname: string, formData: FormData) {
  const params = {
    keyword: formData.get("keyword")!.toString(),
  };
  const formattedParams = new URLSearchParams(params).toString();

  const url = `${pathname}?${formattedParams}`;

  redirect(url);
}
