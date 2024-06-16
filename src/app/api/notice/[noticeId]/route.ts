import db from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { noticeId } }: { params: { noticeId: string } }
) {
  try {
    const findNotice = await db.notice.findUnique({
      where: {
        id: noticeId,
      },
      select: {
        title: true,
        contents: true,
        files: true,
      },
    });

    if (!findNotice) {
      return NextResponse.json("공지사항 정보가 없습니다.", {
        status: 404,
      });
    }

    return NextResponse.json(findNotice);
  } catch (error) {
    return NextResponse.json(
      "서버 에러가 발생했습니다. 관리자에게 문의하세요.",
      {
        status: 500,
      }
    );
  }
}
