import { cn } from "@/libs/utils";
import { useTranslations } from "next-intl";
import HistoryAchievementItem from "./HistoryAchievementItem";

const historyAchKeyMap_kr = {
  2017: ["02월", "03월-1", "03월-2", "04월", "07월", "08월", "09월"],
  2018: ["06월", "07월", "08월", "09월", "10월", "11월", "12월"],
  2019: ["03월", "04월", "06월-1", "06월-2", "07월", "10월"],
  2020: [
    "01월",
    "04월",
    "05월",
    "06월-1",
    "06월-2",
    "09월-1",
    "09월-2",
    "10월",
  ],
  2021: [
    "01월",
    "02월",
    "03월",
    "04월",
    "09월",
    "10월-1",
    "10월-2",
    "10월-3",
    "10월-4",
    "11월-1",
    "11월-2",
    "12월",
  ],
  2022: ["02월", "03월", "05월", "08월"],
  2023: [],
};

const historyAchKeyMap_en = {
  2017: ["FEB", "MAR-1", "MAR-2", "APR", "JUL", "AUG", "SEP"],
  2018: ["JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
  2019: ["MAR", "APR", "JUN-1", "JUN-2", "JUL", "OCT"],
  2020: ["JAN", "APR", "MAY", "JUN-1", "JUN-2", "SEP-1", "SEP-2", "OCT"],
  2021: [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "SEP",
    "OCT-1",
    "OCT-2",
    "OCT-3",
    "OCT-4",
    "NOV-1",
    "NOV-2",
    "DEC",
  ],
  2022: ["FEB", "MAR", "MAY", "AUG"],
  2023: [],
};

export default function HistoryList({ isEng }: { isEng: boolean }) {
  const t = useTranslations("History");
  const selectedMap = isEng ? historyAchKeyMap_en : historyAchKeyMap_kr;

  return (
    <ul className="w-[80%] mx-auto lg:w-[28.646vw]">
      {[2017, 2018, 2019, 2020, 2021, 2022, 2023].map((year, idx) => (
        <li
          className={cn(
            "w-full border-t-[0.5px] border-black/95 flex flex-col items-center py-[4.2vh] lg:py-[6.6667vh] last:pb-0",
            isEng && "lg:pb-[5.6667vh]"
          )}
          key={idx}
        >
          <h3
            className={cn(
              "text-[1rem] sm:text-[1.4rem] lg:text-[2.1875vw] sm:mb-[2px] tracking-[0.038em] text-black/95 font-en font-bold",
              isEng && "lg:mb-[-5px]"
            )}
          >
            {year}
          </h3>
          <h4
            className={cn(
              "font-bold font-kr text-green text-center whitespace-pre-wrap text-[0.7rem] mb-[1.2rem] sm:text-[14px] sm:mb-[15px] lg:text-[1.09375vw] lg:mb-[40px]",
              isEng && "font-en lg:mb-[30px]",
              year === 2023 && "!mb-0"
            )}
          >
            {t(`y${year}.title`)}
          </h4>
          <ul
            className={cn(
              "text-[10px] sm:text-[13px] lg:text-[1.09375vw] w-full text-black/95 flex flex-col justify-between tracking-[-0.05em] font-kr ml-[10%]",
              isEng && "tracking-normal font-en ml-0"
            )}
          >
            <HistoryAchievementItem
              isEng={isEng}
              year={year}
              selectedMap={selectedMap}
            />
          </ul>
        </li>
      ))}
    </ul>
  );
}
