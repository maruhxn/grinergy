"use server";

import db from "@/libs/db";
import { revalidatePath } from "next/cache";

export async function deleteNotice(noticeId: string) {
  await db.notice.delete({
    where: {
      id: noticeId,
    },
  });
  revalidatePath("/admin/notice");
}
