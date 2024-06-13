"use server";

import db from "@/libs/db";
import { File as PrismaFileObject } from "@prisma/client";
import fs from "fs/promises";
import { redirect } from "next/navigation";
import path from "path";
import { noticeSchema } from "./schema";

export async function uploadNotice(formData: FormData) {
  const data = {
    files: formData.getAll("files"),
    title: formData.get("title"),
    contents: formData.get("contents"),
  };

  if (data.files.length > 0) {
    const filePathArr = [];
    for (let i = 0; i < data.files.length; i++) {
      const file = data.files[i] as File;
      const fileData = await file.arrayBuffer();
      const fileName = `${Date.now()}_${path.basename(file.name)}`;
      const filePath = `./public/uploads/notice/${fileName}`;
      await fs.appendFile(filePath, Buffer.from(fileData));
      filePathArr.push({
        fileName: file.name,
        filePath,
      });
    }
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
