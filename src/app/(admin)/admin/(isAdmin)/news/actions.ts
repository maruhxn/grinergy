"use server";

import db from "@/libs/db";
import fs from "fs/promises";
import { revalidatePath } from "next/cache";

export async function deleteNews(newsId: string) {
  const news = await db.news.delete({
    where: {
      id: newsId,
    },
    select: {
      photo: true,
    },
  });

  if (news.photo) await fs.unlink(`./public${news.photo}`);

  revalidatePath("/admin/news");
}
