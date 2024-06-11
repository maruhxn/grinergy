"use client";

import { toEn, toKo } from "@/app/(client)/(home)/actions";

export default function LanguageBox() {
  return (
    <div className="hidden lg:block bg-white font-en relative">
      <form
        className="aspect-[32/28] border border-black text-[10px] tracking-[-0.015em] flex justify-center items-center cursor-pointer w-[25px] 2xl:w-[30px]"
        action={toKo}
      >
        <button className="relative top-[2px]">KOR</button>
      </form>
      <form
        className="aspect-[32/28] border border-black text-[10px] tracking-[-0.015em] flex justify-center items-center cursor-pointer w-[25px] top-0 relative bg-black text-white lg:top-[21px] lg:absolute 2xl:w-[30px] 2xl:top-[26px]"
        action={toEn}
      >
        <button className="relative top-[2px]">ENG</button>
      </form>
    </div>
  );
}
