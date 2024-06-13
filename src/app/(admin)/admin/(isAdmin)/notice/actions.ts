"use server";

import db from "@/libs/db";
import fs from "fs/promises";
import { revalidatePath } from "next/cache";

export async function deleteNotice(noticeId: string) {
  const notice = await db.notice.delete({
    where: {
      id: noticeId,
    },
    select: {
      files: {
        select: {
          filePath: true,
        },
      },
    },
  });

  notice.files.forEach(async ({ filePath }) => {
    await fs.unlink(filePath);
  });

  revalidatePath("/admin/notice");
}
