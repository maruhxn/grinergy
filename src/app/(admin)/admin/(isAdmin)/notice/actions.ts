"use server";

import FileDeleteException from "@/app/exceptions/FileDeleteException";
import { NOTICE_COUNT_TAG, NOTICE_TAG } from "@/libs/constants";
import db from "@/libs/db";
import { handleError } from "@/libs/utils";
import fs from "fs/promises";
import { revalidateTag } from "next/cache";

export async function deleteNotice(noticeId: string) {
  try {
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

    const fileDeletionPromises = notice.files.map(async ({ filePath }) => {
      try {
        await fs.unlink(filePath);
      } catch (err) {
        throw new FileDeleteException();
      }
    });

    // 모든 파일 삭제 작업이 완료될 때까지 기다림
    await Promise.all(fileDeletionPromises);

    revalidateTag(NOTICE_TAG);
    revalidateTag(NOTICE_COUNT_TAG);
  } catch (error) {
    handleError(error);
  }
}
