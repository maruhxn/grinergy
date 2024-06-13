import fs from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const filePath = searchParams.get("filePath");
  const fileName = searchParams.get("fileName");

  if (!filePath || !fileName)
    return new Response("파일 경로 및 이름을 모두 전달해주세요.", {
      status: 400,
    });

  if (!fs.existsSync(filePath))
    return new Response("파일이 존재하지 않습니다.", {
      status: 404,
    });

  const file = fs.readFileSync(filePath);
  return new NextResponse(file, {
    headers: {
      "Content-Disposition": `attachment; filename=${fileName}`,
      "Content-Type": "application/octet-stream",
    },
  });
}
