import AdminTable from "@/components/AdminTable";
import PageInfoSection from "@/components/PageInfoSection";
import Pagination from "@/components/Pagination";
import { PAGE_SIZE } from "@/libs/constants";
import db from "@/libs/db";
import { redirect } from "next/navigation";

async function getAllNotices(currPage: number, searchKeyword?: string) {
  const data = await db.notice.findMany({
    select: {
      id: true,
      title: true,
      contents: true,
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

export default async function AdminNoticePage({
  searchParams,
}: {
  searchParams?: { page: string; keyword: string };
}) {
  const currPage = searchParams?.page ? Number(searchParams.page) : 1;
  if (currPage <= 0) redirect("/admin/notice");

  const searchKeyword = searchParams?.keyword;
  const totalCount = await db.notice.count({
    where: searchKeyword
      ? {
          title: {
            contains: searchKeyword,
          },
        }
      : undefined,
  });
  const data = await getAllNotices(currPage, searchKeyword);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div className="w-full h-full bg-white lg:h-screen rounded-[10px] overflow-x-scroll py-[2rem] px-[1rem]">
      <PageInfoSection
        currPage={currPage}
        total={totalCount}
        className="mb-[5px]"
      />
      <AdminTable type="notice" data={data} />
      <Pagination currPage={currPage} totalPages={totalPages} />
    </div>
  );
}
