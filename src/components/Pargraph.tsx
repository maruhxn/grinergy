"use client";

import useIsMobile from "@/hooks/useIsMobile";
import { cn } from "@/libs/utils";
import { useTranslations } from "next-intl";

interface PargraphProps {
  at: "Ourstory" | "Product";
  idx: number;
  isEng: boolean;
  className?: string;
}

export default function Pargraph({ at, idx, isEng, className }: PargraphProps) {
  const isMobile = useIsMobile();
  const t = useTranslations(at);
  return (
    <div
      className={cn(
        "text-[12px] w-screen md:w-screen my-[8vh] lg:text-[1.09375vw] lg:w-fit lg:mx-auto lg:mt-[17.592vh] lg:mb-[17.592vh] lg:pl-0",
        isEng ? "pl-[18vw] sm:text-[17px]" : "pl-[16vw] sm:text-[15px]",
        className
      )}
    >
      <h3
        className={cn(
          "mb-[23px] lg:mb-[20px] whitespace-pre-wrap font-bold text-green",
          isEng ? "font-en" : "font-kr tracking-[-0.03em]"
        )}
      >
        {isMobile
          ? t(`paragrah-${idx}.mobile-title`)
          : t(`paragrah-${idx}.title`)}
      </h3>
      <p
        className={cn(
          "text-black/95 whitespace-pre-wrap leading-[22px] md:leading-[22px]",
          isEng
            ? "font-en lg:leading-[1.6vw]"
            : "font-kr tracking-[-0.05em] lg:leading-[1.8229vw]"
        )}
      >
        {isMobile
          ? t(`paragrah-${idx}.mobile-text`)
          : t(`paragrah-${idx}.text`)}
      </p>
    </div>
  );
}
