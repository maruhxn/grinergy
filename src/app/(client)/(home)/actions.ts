"use server";

import { cookies } from "next/headers";

export async function toKo() {
  cookies().set("lan", "ko");
}
export async function toEn() {
  cookies().set("lan", "en");
}
