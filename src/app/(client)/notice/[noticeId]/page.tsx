import FileDownload from "@/components/FileDownload";
import db from "@/libs/db";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import moment from "moment";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Notice Detail",
};

export default async function NoticeDetailPage({
  params: { noticeId },
}: {
  params: { noticeId: string };
}) {
  const data = await db.notice.findUnique({
    where: {
      id: noticeId,
    },
    include: {
      files: true,
    },
  });

  if (!data) notFound();

  return (
    <div className="w-full lg:w-1/2 font-kr overflow-hidden mx-auto">
      <h1 className="text-[13.2vw] mb-[2.63vh] lg:mb-0 lg:text-[6.25vw] text-center tracking-[-0.015em] font-en">
        notice
      </h1>
      {data && (
        <div className="bg-white mx-auto p-[20px]">
          <div className="flex justify-between items-end border-b-[1px] border-black pb-[0.5rem]">
            <h2 className="text-[1rem] lg:text-[1.5rem] tracking-[-0.05em] font-kr font-bold">
              {data.title}
            </h2>
            <span className="text-[10px] lg:text-[14px] text-[#666]">
              {moment(data.createdAt).format("YYYY-MM-DD")}
            </span>
          </div>
          <div className="ql-snow">
            <div
              className="ql-editor p-0 text-[12px] leading-[1.7em] lg:text-[0.75rem] lg:leading-[2em] mt-[2rem] overflow-y-hidden"
              dangerouslySetInnerHTML={{
                __html: DOMPurify(new JSDOM("<!DOCTYPE html>").window).sanitize(
                  data.contents
                ),
              }}
            />
          </div>

          <div className="text-[11px] lg:text-[16px] w-full mt-[20px] bg-[#f5f5f5] py-[10px] px-[20px] border-[1px] border-black/30 text-black flex flex-col font-kr">
            <span className="text-[11px] mb-[8px] lg:text-[0.75rem] lg:mb-[10px] text-black">
              첨부파일
            </span>
            {data.files && data.files.length > 0 ? (
              <ul className="text-black/60 text-[10px] lg:text-[0.75rem] flex flex-col gap-[3px] lg:gap-[5px] p-0">
                {data.files.map((file, i) => (
                  <li
                    className="w-fit cursor-pointer text-[0.75rem] justify-between hover:underline"
                    key={i}
                  >
                    <FileDownload file={file} />
                  </li>
                ))}
              </ul>
            ) : (
              "첨부파일 없음"
            )}
          </div>
          <Link
            className="w-fit text-[0.6rem] lg:text-[13.5px] py-[0.3rem] px-[0.8rem] lg:py-[0.5rem] lg:px-[1rem] mt-[10px] ml-auto block text-white bg-black/80 border-0 cursor-pointer rounded-[5px] hover:bg-black/60"
            href="/notice"
          >
            목록
          </Link>
        </div>
      )}
    </div>
  );
}
