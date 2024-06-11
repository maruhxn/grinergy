"use client";

import { logout } from "@/app/(admin)/admin/login/actions";
import { Dispatch, SetStateAction } from "react";

export default function BreadCrumb({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="rounded-[10px] overflow-hidden mb-[1rem] h-[3rem] bg-white tezxet-[1.125rem] leading-[1.75rem] flex justify-between items-center font-en font-bold px-[1.5rem] lg:px-[2.5rem]">
      {isOpen ? (
        <div />
      ) : (
        <svg
          className="cursor-pointer size-[20px]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      )}
      <form action={logout}>
        <button className="text-[1rem] font-en font-normal">Logout</button>
      </form>
    </div>
  );
}
