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
        "w-fit tracking-[-0.03em] text-left font-kr mx-auto mb-[7px] lg:mb-[2.2407vh] text-[8.6vw] leading-[22px] md:leading-[5vw] pt-[3vh] lg:pt-[12.623vh] whitespace-pre-wrap lg:ml-[31vw] lg:text-[5vw]",
        isEng && "tracking-[-0.01em] font-en md:leading-[5vw] lg:text-[6vw]",
        className
      )}
    >
      {isMobile ? t("mobile-phrase") : t("phrase")}
    </h1>
  );
}
