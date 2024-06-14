import PageInfoSection from "@/components/PageInfoSection";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import { PAGE_SIZE } from "@/libs/constants";
import db from "@/libs/db";
import { Prisma } from "@prisma/client";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Notice",
};

async function getAllNotices(currPage: number, searchKeyword?: string) {
  const data = await db.notice.findMany({
    select: {
      id: true,
      title: true,
      createdAt: true,
    },
    where: searchKeyword
      ? {
          title: {
            contains: searchKeyword,
          },
        }
      : undefined,
    orderBy: {
      createdAt: "desc",
    },
    take: PAGE_SIZE,
    skip: PAGE_SIZE * (currPage - 1),
  });
  return data;
}
export type Notices = Prisma.PromiseReturnType<typeof getAllNotices>;

export default async function NoticePage({
  searchParams,
}: {
  searchParams?: { page: string; keyword: string };
}) {
  const currPage = searchParams?.page ? Number(searchParams.page) : 1;
  if (currPage < 0) redirect("/notice");

  const searchKeyword = searchParams?.keyword;
  const totalCount = await db.notice.count({
    where: searchKeyword
      ? {
          contents: {
            contains: searchKeyword,
          },
        }
      : undefined,
  });
  const data = await getAllNotices(currPage, searchKeyword);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div className="w-[90vw] mb-[2vh] lg:w-[75vw] lg:mb-[4.1666vh] mx-auto min-h-[74vh] overflow-hidden">
      <h1 className="text-[13.2vw] mb-[2.63vh] lg:text-[6.25vw] lg:mb-[10vh] text-center tracking-[-0.015em] font-en">
        Notice
      </h1>
      <PageInfoSection currPage={currPage} total={totalCount} />
      <Table posts={data} />
      <Pagination currPage={currPage} totalPages={totalPages} />
    </div>
  );
}
