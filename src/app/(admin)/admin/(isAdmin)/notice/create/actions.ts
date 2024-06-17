"use server";

import db from "@/libs/db";
import { createManyNoticeFiles } from "@/libs/server-functions";
import { File as PrismaFileObject } from "@prisma/client";
import { redirect } from "next/navigation";
import { noticeSchema } from "./schema";

export async function uploadNotice(formData: FormData) {
  const data = {
    files: formData.getAll("files"),
    title: formData.get("title"),
    contents: formData.get("contents"),
  };

  if (data.files.length > 0) {
    const filePathArr = await createManyNoticeFiles(data.files);
    if (!filePathArr) throw new Error("파일 저장 에러");
    data.files = filePathArr as any;
  }

  const result = noticeSchema.safeParse(data);
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

  redirect("/admin/notice");
}
