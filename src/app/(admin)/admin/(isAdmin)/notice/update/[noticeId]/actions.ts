"use server";

import db from "@/libs/db";
import { createManyNoticeFiles } from "@/libs/server-functions";
import { File as PrismaFileObject } from "@prisma/client";
import fs from "fs/promises";
import { redirect } from "next/navigation";
import { updateNoticeSchema } from "./schema";

export const updateNotice = async (noticeId: string, formData: FormData) => {
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

  if (!notice) throw new Error("공지사항 정보가 없습니다.");

  if (data.files && data.files.length > 0) {
    const filePathArr = await createManyNoticeFiles(data.files);
    if (!filePathArr) throw new Error("파일 저장 에러");
    data.files = filePathArr as any;
  }

  const result = updateNoticeSchema.safeParse(data);
  if (!result.success) return result.error.flatten();
  const { title, contents, files, deletedFiles } = result.data;

  deletedFiles?.forEach(async (deletedFilePath) => {
    await fs.unlink(`./public${deletedFilePath}`);
    await db.file.delete({
      where: {
        noticeId,
        filePath: deletedFilePath,
      },
    });
  });

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

  redirect("/admin/notice");
};
