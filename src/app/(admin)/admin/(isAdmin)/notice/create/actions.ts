"use server";

import ValidationException from "@/exceptions/ValidationException";
import { NOTICE_COUNT_TAG, NOTICE_TAG } from "@/libs/constants";
import db from "@/libs/db";
import handleError from "@/libs/error-handler";
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

    const result = noticeSchema.safeParse(data);
    if (!result.success) throw new ValidationException();

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
          (fileKey) =>
            ({
              fileName: fileKey.split("_")[1],
              fileKey,
              noticeId: notice.id,
            } as PrismaFileObject)
        ),
      });
    }

    revalidateTag(NOTICE_TAG);
    revalidateTag(NOTICE_COUNT_TAG);
  } catch (error) {
    return await handleError(error);
  }
}
