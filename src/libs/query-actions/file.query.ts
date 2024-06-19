"use server";

import FileUploadException from "@/app/exceptions/FileUploadException";
import fs from "fs/promises";
import path from "path";

export const createManyNoticeFiles = async (files: FormDataEntryValue[]) => {
  try {
    const filePathArr = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i] as File;
      const fileData = await file.arrayBuffer();
      const fileName = `${Date.now()}_${path.basename(file.name)}`;
      const filePath = `/uploads/notice/${fileName}`;
      await fs.appendFile(`./public${filePath}`, Buffer.from(fileData));
      filePathArr.push({
        fileName: file.name,
        filePath,
      });
    }
    return filePathArr;
  } catch (error) {
    throw new FileUploadException();
  }
};

export const uploadNewsPhoto = async (file: File) => {
  let filePath;
  try {
    const fileData = await file.arrayBuffer();
    const fileName = `${Date.now()}_${path.basename(file.name)}`;
    filePath = `/uploads/news/${fileName}`;
    await fs.appendFile(`./public${filePath}`, Buffer.from(fileData));
    return filePath;
  } catch (error) {
    throw new FileUploadException(`다음 경로의 파일 업로드 실패: ${filePath}`);
  }
};
