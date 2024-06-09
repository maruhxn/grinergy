"use client";

import useIsMobile from "@/hooks/useIsMobile";
import { cn } from "@/libs/utils";
import { useTranslations } from "next-intl";

interface BigPhraseProps {
  at: "Ourstory" | "History" | "Product";
  isEng: boolean;
  className?: string;
}

export default function BigPhrase({ at, isEng, className }: BigPhraseProps) {
  const t = useTranslations(at);
  const isMobile = useIsMobile();
  return (
    <h1
      className={cn(
        "w-fit text-left mx-auto mb-[7px] lg:mb-[2.2407vh] text-[8.6vw] leading-[22px] pt-[3vh] lg:pt-[12.623vh] whitespace-pre-wrap lg:ml-[31vw] sm:leading-[36px] md:leading-[5vw]",
        isEng
          ? "tracking-[-0.01em] font-en lg:text-[6vw]"
          : "tracking-[-0.03em] font-kr lg:text-[5vw]",
        className
      )}
    >
      {isMobile ? t("mobile-phrase") : t("phrase")}
    </h1>
  );
}
