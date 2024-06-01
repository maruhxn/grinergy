"use client";

import useIsMobile from "@/hooks/useIsMobile";
import { cn } from "@/libs/utils";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FloatingLanguageBox from "./FloatingLanguageBox";
import LanguageBox from "./LanguageBox";
import MobileSidebar from "./MobileSidebar";

export const headerMenuList = [
  { link: "/", title: "Homepage" },
  { link: "", title: "About" },
  { link: "/about/ourstory", title: "Our story" },
  { link: "/about/history", title: "History" },
  { link: "/product", title: "Product" },
  { link: "/investors", title: "Investors" },
  { link: "/news", title: "News" },
  { link: "/notice", title: "Notice" },
  { link: "/contact", title: "Contact" },
];

export default function Header() {
  const menuItemCss =
    "text-[45px] tracking-[-0.018em] lg:tracking-normal mb-[25px] lg:mb-0 text-center w-full lg:w-auto hover:text-black/50 hover:no-underline lg:text-[1.1458vw] font-en cursor-pointer z-20 lg:hover:underline";
  const router = useRouter();
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSubVisible, setIsSubVisible] = useState<boolean>(false);

  useEffect(() => {
    if (!isMobile) setIsOpen(false);
  }, [isMobile, isOpen]);

  useEffect(() => {
    setIsOpen(isOpen ? false : isOpen);
    if (pathname !== "/about/ourstory" && pathname !== "/about/history") {
      setIsSubVisible(isSubVisible ? false : isSubVisible);
    }
  }, [pathname]);

  return (
    <>
      {isOpen && (
        <MobileSidebar
          setIsOpen={setIsOpen}
          isSubVisible={isSubVisible}
          setIsSubVisible={setIsSubVisible}
        />
      )}
      <nav className="h-[7.5vh] pr-[23px] pl-[18px] bg-white fixed top-0 z-10 flex justify-between items-center lg:px-[3.854vw] w-full lg:h-[10vh]">
        <div className="w-1/3">
          <img
            src="/images/header_logo.png"
            alt="grinergy logo"
            className="flex items-center relative -top-[6px] cursor-pointer w-[100px] sm:w-[145px] sm:static lg:relative lg:w-[9.15625vw]"
            onClick={() => router.push("/")}
          />
        </div>

        <div className="w-1/3">
          <ul className="hidden lg:flex justify-center items-center gap-[4.666vw] z-10">
            {headerMenuList.map(
              (menuItem, idx) =>
                menuItem.title.toLowerCase() !== "homepage" &&
                (["our story", "history"].includes(
                  menuItem.title.toLowerCase()
                ) ? (
                  isSubVisible && (
                    <li
                      className={cn(
                        menuItemCss,
                        pathname === menuItem.link && "text-black",
                        "absolute top-[7.5vh] left-[43%] [&:nth-child(3)]:left-[53.5%]"
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
                      menuItemCss,
                      pathname === menuItem.link && "text-black"
                    )}
                    key={idx}
                    onClick={() => setIsSubVisible(!isSubVisible)}
                  >
                    {menuItem.title}
                  </li>
                ) : (
                  <li
                    className={cn(
                      menuItemCss,
                      pathname === menuItem.link && "text-black"
                    )}
                    key={idx}
                    onClick={() => router.push(menuItem.link)}
                  >
                    {menuItem.title}
                  </li>
                ))
            )}
          </ul>
        </div>

        <div className="w-1/3 flex justify-end">
          {/* Admin Page Button */}
          {pathname === "/" && <LanguageBox />}
        </div>

        {/* MOBILE */}
        <img
          src="/images/hamburger.png"
          alt="메뉴 토글 버튼"
          onClick={() => setIsOpen(true)}
          className="z-20 relative object-contain w-[23px] md:w-[30px] md:block lg:hidden"
        />
        {pathname === "/" && <FloatingLanguageBox />}
      </nav>
      {pathname !== "/" && <div className="h-[12vh] lg:h-[17vh]" />}
    </>
  );
}
