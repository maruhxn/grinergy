"use client";
import { cn } from "@/libs/utils";
import { motion } from "framer-motion";

export default function GoodDesignLogo({ isEng }: { isEng: boolean }) {
  return (
    <motion.img
      className={cn(
        "absolute bottom-[8vw] left-[23vw] h-[4vh] object-contain sm:h-[4.5vh] sm:bottom-[10vh] lg:h-[2.5vw] lg:bottom-[8vw] lg:left-[14vw]",
        isEng ? "sm:left-[19vw]" : "sm:left-[25vw]"
      )}
      src={isEng ? "/images/good_design_en.png" : "/images/good_design_kr.png"}
      alt="우수 로고"
      transition={{ delay: 3, duration: 1 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
    />
  );
}
