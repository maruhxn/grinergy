"use client";

import { cn } from "@/libs/utils";
import { usePathname, useRouter } from "next/navigation";
import { headerMenuList } from "./Header";

interface Props {
  setIsOpen: any;
  isSubVisible: boolean;
  setIsSubVisible: any;
}

export default function MobileSidebar({
  setIsOpen,
  isSubVisible,
  setIsSubVisible,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const itemCss =
    "w-full text-center tracking-[-0.018em] text-black cursor-pointer";
  return (
    <ul className="fixed top-0 left-0 z-50 flex flex-col justify-center items-center w-full h-screen bg-white overflow-y-scroll font-en gap-[15px] text-[30px] md:gap-[25px] md:text-[40px]">
      {headerMenuList.map((menuItem, idx) =>
        ["our story", "history"].includes(menuItem.title.toLowerCase()) ? (
          isSubVisible && (
            <li
              className={cn(
                itemCss,
                pathname === menuItem.link && "text-black/50",
                "text-[23px] md:text-[33px]"
              )}
              key={idx}
              onClick={() => router.push(menuItem.link)}
            >
              {menuItem.title}
            </li>
          )
        ) : menuItem.title.toLowerCase() === "about" ? (
          <li
            className={cn(
              itemCss,
              pathname === menuItem.link && "text-black/50"
            )}
            key={idx}
            onClick={() => setIsSubVisible(!isSubVisible)}
          >
            {menuItem.title}
          </li>
        ) : (
          <li
            className={cn(
              itemCss,
              pathname === menuItem.link && "text-black/50"
            )}
            key={idx}
            onClick={() => router.push(menuItem.link)}
          >
            {menuItem.title}
          </li>
        )
      )}
      <img
        className="absolute top-[18px] right-[23px] w-[23px]"
        src="/images/close.png"
        alt="close-btn"
        onClick={() => setIsOpen(false)}
      />
    </ul>
  );
}
