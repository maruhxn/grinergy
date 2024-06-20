"use server";

import { NOTICE_COUNT_TAG, NOTICE_TAG } from "@/libs/constants";
import db from "@/libs/db";
import { uploadManyFiles } from "@/libs/db-actions/file";
import { handleError } from "@/libs/utils";
import { File as PrismaFileObject } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { noticeSchema } from "./schema";

export async function uploadNotice(formData: FormData) {
  try {
    const data = {
      files: formData.getAll("files"),
      title: formData.get("title"),
      contents: formData.get("contents"),
    };

    if (data.files.length > 0) {
      const filePathArr = await uploadManyFiles(data.files);
      data.files = filePathArr as any;
    }

    const result = noticeSchema.safeParse(data);
    console.log(result.error?.flatten());
    if (!result.success) return result.error.flatten();

    const { title, contents, files } = result.data;
    const notice = await db.notice.create({
      data: {
        title,
        contents,
      },
      select: {
        id: true,
      },
    });

    if (files && files.length > 0) {
      await db.file.createMany({
        data: files.map(
          (file) =>
            ({
              fileName: file.fileName,
              filePath: file.filePath,
              noticeId: notice.id,
            } as PrismaFileObject)
        ),
      });
    }

    revalidateTag(NOTICE_TAG);
    revalidateTag(NOTICE_COUNT_TAG);
  } catch (error) {
    handleError(error);
  }
}
