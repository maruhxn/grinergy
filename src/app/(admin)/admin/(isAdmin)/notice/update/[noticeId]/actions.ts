"use server";

import FileDeleteException from "@/app/exceptions/FileDeleteException";
import NotFoundException from "@/app/exceptions/NotFoundException";
import { NOTICE_TAG } from "@/libs/constants";
import db from "@/libs/db";

import { deleteOneFile, uploadManyFiles } from "@/libs/db-actions/file";
import { handleError } from "@/libs/utils";
import { File as PrismaFileObject } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { updateNoticeSchema } from "./schema";

export const updateNotice = async (noticeId: string, formData: FormData) => {
  try {
    const data = {
      title: formData.get("title"),
      contents: formData.get("contents"),
      deletedFiles: formData.getAll("deletedFiles"),
      files: formData.getAll("files"),
    };

    const notice = await db.notice.findUnique({
      where: {
        id: noticeId,
      },
      select: {
        files: true,
      },
    });

    if (!notice) throw new NotFoundException("공지사항 정보가 없습니다.");

    if (data.files && data.files.length > 0) {
      const filePathArr = await uploadManyFiles(data.files);
      data.files = filePathArr as any;
    }

    const result = updateNoticeSchema.safeParse(data);
    if (!result.success) return result.error.flatten();
    const { title, contents, files, deletedFiles } = result.data;

    try {
      deletedFiles?.forEach(async (deletedFilePath) => {
        await deleteOneFile(deletedFilePath);
        await db.file.delete({
          where: {
            noticeId,
            filePath: deletedFilePath,
          },
        });
      });
    } catch (error) {
      throw new FileDeleteException();
    }

    await db.notice.update({
      where: {
        id: noticeId,
      },
      data: {
        title: title ? title : undefined,
        contents: contents ? contents : undefined,
      },
    });

    if (files && files.length > 0) {
      await db.file.createMany({
        data: files.map(
          (file) =>
            ({
              fileName: file.fileName,
              filePath: file.filePath,
              noticeId: noticeId,
            } as PrismaFileObject)
        ),
      });
    }
    revalidateTag(NOTICE_TAG);
  } catch (error) {
    handleError(error);
  }
};
