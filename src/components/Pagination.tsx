"use client";

import { cn } from "@/libs/utils";
import { usePathname, useRouter } from "next/navigation";

interface PaginationProps {
  currPage: number;
  totalPages: number;
}

export default function Pagination({ currPage, totalPages }: PaginationProps) {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="mt-[10px] flex justify-center gap-[10px] lg:mt-[10px]">
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (value: number) => (
          <button
            disabled={value === currPage}
            className={cn(
              "size-[24px] aspect-square text-[10px] font-kr cursor-pointer rounded-[5px] bg-white text-black hover:bg-[#ccc]",
              value === currPage && "bg-black/80 text-white"
            )}
            onClick={() => router.push(`${pathname}?page=${value}`)}
            key={value}
          >
            {value}
          </button>
        )
      )}
    </div>
  );
}
