"use client";

import { search } from "@/app/(client)/actions";
import { usePathname } from "next/navigation";

export default function SearchBar() {
  const pathname = usePathname();
  const searchWithPathane = search.bind(null, pathname);

  return (
    <div className="w-1/2 mb-[5px] lg:w-[29.5%]">
      <form
        action={searchWithPathane}
        className="h-[1.5625rem] flex relative lg:h-[1.875rem]"
      >
        <input
          type="text"
          name="keyword"
          required
          className="appearance-none rounded-none font-kr w-full border-black/80 border-[1px] border-r-0 px-[10px] h-full rounded-bl-[5px] rounded-tl-[5px] outline-none text-black/60 text-sm"
        />
        <button className="m-0 h-full border-black/80 border-[1px] bg-black/80 text-center flex justify-center items-center text-white rounded-tr-[5px] rounded-br-[5px] cursor-pointer text-[20px] p-[5px] hover:border-black/60 hover:bg-black/60">
          <svg
            className="size-[20px]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}
