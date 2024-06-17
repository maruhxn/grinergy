"use client";

import useIsMobile from "@/hooks/useIsMobile";
import { cn } from "@/libs/utils";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function HomeParagraph({ isEng }: { isEng: boolean }) {
  const t = useTranslations("Home");
  const isMobile = useIsMobile();

  return (
    <motion.h1
      transition={{ delay: 2, duration: 1 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      className={cn(
        "whitespace-pre-line absolute text-white top-[43vh] lg:top-[16vw] z-[9] font-bold left-[23vw] lg:left-[14vw] tracking-[-0.015em]",
        isEng
          ? "text-[20px] leading-[24px] sm:left-[19vw] sm:text-[26pt] sm:leading-[30pt] sm:tracking-[0em] lg:tracking-[-0.015em] lg:text-[45px] lg:leading-[48px]"
          : "text-[22px] leading-[30px] sm:left-[25vw] sm:text-[22pt] sm:leading-[34pt] lg:text-[43px] lg:leading-[60px]"
      )}
    >
      {isMobile ? t("mobile-title") : t("title")}
    </motion.h1>
  );
}
