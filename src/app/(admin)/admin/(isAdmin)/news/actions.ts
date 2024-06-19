"use server";

import FileDeleteException from "@/app/exceptions/FileDeleteException";
import { NEWS_COUNT_TAG, NEWS_TAG } from "@/libs/constants";
import db from "@/libs/db";
import { handleError } from "@/libs/utils";
import fs from "fs/promises";
import { revalidateTag } from "next/cache";

export async function deleteNews(newsId: string) {
  try {
    const news = await db.news.delete({
      where: {
        id: newsId,
      },
      select: {
        photo: true,
      },
    });

    try {
      if (news.photo) await fs.unlink(`./public${news.photo}`);
    } catch (error) {
      throw new FileDeleteException();
    }

    revalidateTag(NEWS_TAG);
    revalidateTag(NEWS_COUNT_TAG);
  } catch (error) {
    handleError(error);
  }
}
