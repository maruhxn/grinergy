import PageInfoSection from "@/components/PageInfoSection";
import Pagination from "@/components/Pagination";
import { PAGE_SIZE } from "@/libs/constants";
import {
  getCachedAllNews,
  getCachedTotalNewsCount,
  getSearchedNews,
  getSearchedNewsCount,
} from "@/libs/db-actions/news";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "News",
};

export default async function NewsPage({
  searchParams,
}: {
  searchParams?: { page: string; keyword: string };
}) {
  const currPage = searchParams?.page ? Number(searchParams.page) : 1;
  if (currPage <= 0) redirect("/news");

  const searchKeyword = searchParams?.keyword;
  const totalCount = searchKeyword
    ? await getSearchedNewsCount(searchKeyword)
    : await getCachedTotalNewsCount();
  const data = searchKeyword
    ? await getSearchedNews(currPage, searchKeyword)
    : await getCachedAllNews(currPage);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div className="w-[90vw] mb-[2vh] lg:w-[75vw] lg:mb-[4.1666vh] lg:mt-[16.55vh] mx-auto min-h-[74vh] overflow-hidden">
      <h1 className="hidden lg:block text-center pt-[2vh] text-[5vw] leading-[4.5vw] tracking-[-0.015em] mb-[17.592vh] font-en whitespace-pre-wrap">
        {"Innovation for tomorrow,\nchanges for next generation"}
      </h1>

      <h1 className="lg:hidden w-fit pt-[5vh] text-[11.2vw] leading-[11vw] mb-[5vh] font-en whitespace-pre-wrap text-left">
        {"Innovation,\nfor next generation"}
      </h1>

      <PageInfoSection currPage={currPage} total={totalCount} />
      <div className="mt-0 lg:mt-[10px] grid-cols1 gap-y-[10vh] lg:grid-cols-2 xl:grid-cols-3 grid lg:gap-y-[15vh] gap-x-[6%]">
        {data &&
          data.map((post) => (
            <a key={post.id} href={post.url} target="_blank" rel="noreferrer">
              <div className="flex flex-col w-full flex-1 font-kr">
                {post.photo ? (
                  <img
                    className="w-full h-[220px] lg:h-[250px] object-cover object-center"
                    src={`${process.env.R2_PUBLIC_ENDPOINT}/${post.photo}`}
                    alt="뉴스 커버 이미지"
                  />
                ) : (
                  "No Image"
                )}
                <span className="text-[17px] lg:text-[14px] mt-[15px] mb-[10px] text-black/85">
                  {post.title}
                </span>
                <div
                  className="text-[15px] leading-[20px] lg:text-[12.5px] lg:leading-[17px] text-black/50"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify(
                      new JSDOM("<!DOCTYPE html>").window
                    ).sanitize(post.contents.slice(0, 150)),
                  }}
                />
              </div>
            </a>
          ))}
      </div>
      <Pagination currPage={currPage} totalPages={totalPages} />
    </div>
  );
}
