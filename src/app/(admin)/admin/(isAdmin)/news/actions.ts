"use server";

import db from "@/libs/db";
import { revalidatePath } from "next/cache";

export async function deleteNews(newsId: string) {
  await db.news.delete({
    where: {
      id: newsId,
    },
  });
  revalidatePath("/admin/news");
}
