"use server";

import FileDeleteException from "@/app/exceptions/FileDeleteException";
import FileUploadException from "@/app/exceptions/FileUploadException";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import path from "path";
import s3Client from "../s3-client";

export const uploadManyFiles = async (files: FormDataEntryValue[]) => {
  const fileKeyArr = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i] as File;
    const fileKey = await uploadOneFile(file);
    fileKeyArr.push({
      fileName: file.name,
      fileKey: fileKey,
    });
  }
  return fileKeyArr;
};

export const uploadOneFile = async (file: File) => {
  try {
    const bucket = process.env.R2_BUCKET_NAME;
    const fileKey = `${Date.now()}_${path.basename(file.name)}`;
    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: fileKey,
        Body: Buffer.from(await file.arrayBuffer()),
        ACL: "public-read",
        ContentType: file.type,
      })
    );
    return fileKey;
  } catch (error) {
    console.error(error);
    throw new FileUploadException(`클라우드 업로드 실패. 파일명: ${file.name}`);
  }
};

export const deleteOneFile = async (fileKey: string) => {
  try {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME as string,
        Key: fileKey,
      })
    );
  } catch (error) {
    console.error(error);
    throw new FileDeleteException();
  }
};
