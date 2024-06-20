import s3Client from "@/libs/s3-client";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const fileKey = searchParams.get("fileKey");
  const fileName = searchParams.get("fileName");

  if (!fileKey || !fileName)
    return new Response("파일 경로 및 이름을 모두 전달해주세요.", {
      status: 400,
    });

  const file = await s3Client.send(
    new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: fileKey,
    })
  );

  if (!file)
    new Response("파일이 존재하지 않습니다.", {
      status: 404,
    });
  return new NextResponse(file.Body?.transformToWebStream(), {
    headers: {
      "Content-Disposition": `attachment; filename=${fileName}`,
      "Content-Type": "application/octet-stream",
    },
  });
}
