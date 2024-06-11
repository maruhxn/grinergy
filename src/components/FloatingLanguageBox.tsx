"use client";

import { toEn, toKo } from "@/app/(client)/(home)/actions";
import { cn } from "@/libs/utils";

export default function FloatingLanguageBox() {
  const boxCss =
    "border border-black aspect-[32/28] tracking-[-0.015em] flex justify-center items-center cursor-pointer w-[28px] text-[12px] sm:w-[35px] sm:text-[13px]";

  return (
    <div className="block bg-white font-en absolute top-[10.5vh] right-[19px] lg:hidden">
      <form className={boxCss} action={toKo}>
        <button className="relative top-[2px]">KOR</button>
      </form>
      <form
        className={cn("relative top-0 bg-black text-white", boxCss)}
        action={toEn}
      >
        <button className="relative top-[2px]">ENG</button>
      </form>
    </div>
  );
}
