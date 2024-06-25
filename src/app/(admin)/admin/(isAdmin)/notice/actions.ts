"use server";

import NotFoundException from "@/exceptions/NotFoundException";
import { NOTICE_COUNT_TAG, NOTICE_TAG } from "@/libs/constants";
import db from "@/libs/db";
import { deleteOneFile } from "@/libs/db-actions/file";
import handleError from "@/libs/error-handler";
import { revalidateTag } from "next/cache";

export async function deleteNotice(noticeId: string) {
  try {
    const notice = await db.notice.findUnique({
      where: {
        id: noticeId,
      },
      select: {
        id: true,
        files: {
          select: {
            fileKey: true,
          },
        },
      },
    });

    if (!notice) throw new NotFoundException("공지사항 정보가 없습니다.");

    const fileDeletionPromises = notice.files.map(async ({ fileKey }) => {
      await deleteOneFile(fileKey);
    });

    await db.notice.delete({
      where: {
        id: notice.id,
      },
    });

    // 모든 파일 삭제 작업이 완료될 때까지 기다림
    await Promise.all(fileDeletionPromises);

    revalidateTag(NOTICE_TAG);
    revalidateTag(NOTICE_COUNT_TAG);
  } catch (error) {
    return await handleError(error);
  }
}
