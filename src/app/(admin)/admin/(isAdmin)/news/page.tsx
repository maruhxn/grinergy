import AdminTable from "@/components/AdminTable";
import PageInfoSection from "@/components/PageInfoSection";
import Pagination from "@/components/Pagination";
import { PAGE_SIZE } from "@/libs/constants";

import {
  getCachedAllNewsForAdmin,
  getCachedTotalNewsCount,
  getSearchedNewsCount,
  getSearchedNewsForAdmin,
} from "@/libs/db-actions/news";
import { redirect } from "next/navigation";

export default async function AdminNewsPage({
  searchParams,
}: {
  searchParams?: { page: string; keyword: string };
}) {
  const currPage = searchParams?.page ? Number(searchParams.page) : 1;
  if (currPage <= 0) redirect("/admin/news");

  const searchKeyword = searchParams?.keyword;
  const totalCount = searchKeyword
    ? await getSearchedNewsCount(searchKeyword)
    : await getCachedTotalNewsCount();
  const data = searchKeyword
    ? await getSearchedNewsForAdmin(currPage, searchKeyword)
    : await getCachedAllNewsForAdmin(currPage);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div className="w-full h-full bg-white lg:h-screen rounded-[10px] overflow-x-scroll py-[2rem] px-[1rem]">
      <PageInfoSection
        currPage={currPage}
        total={totalCount}
        className="mb-[5px]"
      />
      <AdminTable type="news" data={data} />
      <Pagination currPage={currPage} totalPages={totalPages} />
    </div>
  );
}
