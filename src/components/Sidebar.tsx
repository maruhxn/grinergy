"use client";

import { cn } from "@/libs/utils";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

const navItemList = [
  { title: "홈페이지", link: "/" },
  { title: "공지사항 관리", link: "/admin/notice" },
  { title: "공지사항 생성", link: "/admin/notice/create" },
  { title: "뉴스 관리", link: "/admin/news" },
  { title: "뉴스 생성", link: "/admin/news/create" },
];

export default function SideBar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const logoCss = "cursor-pointer mb-[2rem] ml-[2rem]";

  return (
    <aside
      className={cn(
        "absolute top-0 left-0 w-[200px] z-30 bg-white lg:w-[250px] h-full min-h-screen flex flex-col py-[30px] transition-all duration-[300ms]",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {isOpen && (
        <>
          <img
            onClick={() => router.push("/")}
            className={cn(logoCss, "hidden w-[125px] lg:inline")}
            src="/images/header_logo.png"
            alt="로고"
          />
          <svg
            className={cn(logoCss, "block size-[20px] lg:hidden")}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            onClick={() => setIsOpen((curr) => !curr)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </>
      )}
      <ul className="text-[0.9rem] lg:text-[1rem] w-full mt-[1.125rem] py-[1rem] px-[0.5rem] flex flex-col gap-[10px]">
        {navItemList.map((item, idx) => (
          <li
            className="cursor-pointer w-full rounded-[10px] py-[0.5rem] px-[1.5rem] font-kr font-medium hover:bg-black/80 hover:text-white"
            key={idx}
            onClick={() => {
              router.push(item.link);
              setIsOpen(false);
            }}
          >
            {item.title}
          </li>
        ))}
      </ul>
    </aside>
  );
}
