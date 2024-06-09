"use client";

import useIsMobile from "@/hooks/useIsMobile";
import { cn } from "@/libs/utils";
import { useTranslations } from "next-intl";

export default function HistoryAchievementItem({
  year,
  selectedMap,
  isEng,
}: {
  year: number;
  selectedMap: any;
  isEng: boolean;
}) {
  const t = useTranslations("History");
  const isMobile = useIsMobile();

  return (
    <>
      {
        //@ts-ignore
        selectedMap[year].map((key: string) => (
          <li
            key={key}
            className={cn(
              "flex ml-[12%] lg:ml-[14.047%] mb-[1px] lg:mb-0 leading-[20px] xl:leading-[1.9271vw]",
              isEng && "leading-[17px] xl:leading-[1.6vw]"
            )}
          >
            <span
              className={cn(
                "text-[10px] sm:text-[12px] lg:text-[0.9vw] whitespace-nowrap mr-[4.395%] w-[30px]",
                isEng ? "text-black/60" : "text-black"
              )}
            >
              {key.substring(0, 3)}
            </span>

            <span className="whitespace-pre-wrap">
              {t(
                `y${year}.${
                  isMobile ? "mobile-achivement" : "achivement"
                }.${key}`
              )}
            </span>
          </li>
        ))
      }
    </>
  );
}
