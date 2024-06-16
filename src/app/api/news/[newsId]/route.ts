import db from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { newsId } }: { params: { newsId: string } }
) {
  try {
    const findNews = await db.news.findUnique({
      where: {
        id: newsId,
      },
    });

    if (!findNews) {
      return NextResponse.json("뉴스 정보가 없습니다.", {
        status: 404,
      });
    }

    return NextResponse.json(findNews);
  } catch (error) {
    return NextResponse.json(
      "서버 에러가 발생했습니다. 관리자에게 문의하세요.",
      {
        status: 500,
      }
    );
  }
}
