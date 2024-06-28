"use server";

import FileDeleteException from "@/exceptions/FileDeleteException";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import path from "path";
import s3Client from "../s3-client";

export async function getUploadUrl(fileName: string, fileType: string) {
  const fileKey = `${Date.now()}_${path.basename(fileName)}`;
  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: fileKey,
    ContentType: fileType,
    ACL: "public-read",
  });
  const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // URL 유효 기간 설정 (1시간)
  return [url, fileKey];
}

// export const uploadManyFiles = async (files: FormDataEntryValue[]) => {
//   const fileKeyArr = [];
//   for (let i = 0; i < files.length; i++) {
//     const file = files[i] as File;
//     const fileKey = await uploadOneFile(file);
//     fileKeyArr.push({
//       fileName: file.name,
//       fileKey: fileKey,
//     });
//   }
//   return fileKeyArr;
// };

// export const uploadOneFile = async (file: File) => {
//   if (file.size > MAX_FILE_SIZE)
//     throw new ValidationException("파일의 크기는 5MB 이하만 가능합니다.");

//   try {
//     const bucket = process.env.R2_BUCKET_NAME;
//     const fileKey = `${Date.now()}_${path.basename(file.name)}`;
//     await s3Client.send(
//       new PutObjectCommand({
//         Bucket: bucket,
//         Key: fileKey,
//         Body: Buffer.from(await file.arrayBuffer()),
//         ACL: "public-read",
//         ContentType: file.type,
//       })
//     );
//     return fileKey;
//   } catch (error) {
//     throw new FileUploadException(`클라우드 업로드 실패. 파일명: ${file.name}`);
//   }
// };

export const deleteOneFile = async (fileKey: string) => {
  try {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME as string,
        Key: fileKey,
      })
    );
  } catch (error) {
    throw new FileDeleteException();
  }
};
