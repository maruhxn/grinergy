"use client";

import useIsMobile from "@/hooks/useIsMobile";
import { useEffect, useState } from "react";
import BreadCrumb from "./BreadCrumb";
import SideBar from "./Sidebar";

export default function AdminClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile) setIsOpen(true);
  }, [isMobile]);
  return (
    <>
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && isMobile && (
        <div
          onClick={() => setIsOpen(false)}
          className="none lg:block absolute w-full h-screen bg-black/60 z-20"
        />
      )}
      <div className="w-full min-h-screen p-[1rem] lg:pl-[16.625rem]">
        <BreadCrumb isOpen={isOpen} setIsOpen={setIsOpen} />
        {children}
      </div>
    </>
  );
}
