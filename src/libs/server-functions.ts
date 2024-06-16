"use server";

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
    console.error(error);
  }
};

export const uploadNewsPhoto = async (file: File) => {
  try {
    const fileData = await file.arrayBuffer();
    const fileName = `${Date.now()}_${path.basename(file.name)}`;
    const filePath = `/uploads/news/${fileName}`;
    await fs.appendFile(`./public${filePath}`, Buffer.from(fileData));
    return filePath;
  } catch (error) {
    console.error(error);
  }
};
