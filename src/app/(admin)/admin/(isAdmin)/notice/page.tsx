import AdminTable from "@/components/AdminTable";
import PageInfoSection from "@/components/PageInfoSection";
import Pagination from "@/components/Pagination";
import { PAGE_SIZE } from "@/libs/constants";
import {
  getCachedAllNoticesForAdmin,
  getCachedTotalNoticeCount,
  getSearchedNoticeCount,
  getSearchedNoticesForAdmin,
} from "@/libs/db-actions/notice";
import { redirect } from "next/navigation";

export default async function AdminNoticePage({
  searchParams,
}: {
  searchParams?: { page: string; keyword: string };
}) {
  const currPage = searchParams?.page ? Number(searchParams.page) : 1;
  if (currPage <= 0) redirect("/admin/notice");

  const searchKeyword = searchParams?.keyword;
  const totalCount = searchKeyword
    ? await getSearchedNoticeCount(searchKeyword)
    : await getCachedTotalNoticeCount();
  const data = searchKeyword
    ? await getSearchedNoticesForAdmin(currPage, searchKeyword)
    : await getCachedAllNoticesForAdmin(currPage);

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
