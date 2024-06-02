"use client";

import useInterval from "@/hooks/useInterval";
import useIsMobile from "@/hooks/useIsMobile";
import { cn } from "@/libs/utils";
import "moment-timezone";
import "moment/locale/fr";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Moment from "react-moment";

export default function InfoRow({
  isEng,
  idx,
}: {
  isEng: boolean;
  idx: number;
}) {
  const t = useTranslations("Contact");
  const isMobile = useIsMobile();
  const isFirst = idx === 0;
  const [currTime, setCurrTime] = useState<number>(Date.now());

  useInterval(() => {
    setCurrTime(Date.now());
  }, 3000);

  const textData = [
    {
      tz: "Asia/Seoul",
      country: "SEOUL",
      purpose: "Headquarters",
      row1: t("first.row1"),
      row2: t("first.row2"),
      email: "info@grinergy.tech",
      tel: "+82. 2. 587.7127",
    },
    {
      tz: "America/Los_Angeles",
      country: "US",
      purpose: "Business office",
      row1: "3003 N. 1st st, #305,",
      row2: "San Jose, CA 95134",
      email: "bj.kim@grinergy.tech",
      tel: "+1. 310. 866. 3777",
    },
    {
      tz: "America/New_York",
      country: "US",
      purpose: "R&D lab",
      row1: "1395 Main st, second floor,",
      row2: "Waltham, MA 02451",
      email: "bj.kim@grinergy.tech",
      tel: null,
    },
    {
      tz: "Europe/Helsinki",
      country: "FINLAND",
      purpose: "GRINERGY smart oy",
      row1: "Salomonkatu 17A third floor,",
      row2: "00100 Helsinki",
      email: "shjeon@grinergy.tech",
      tel: "+358. 9. 682. 9. 4917",
    },
  ];

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[40%_60%]">
      <div
        className={cn(
          "flex flex-col ml-[5%] mb-[20px] lg:mb-0 relative top-[2%]"
        )}
      >
        {isMobile ? (
          <>
            <div className="flex gap-[10px]">
              <span className="contact-row-left-span underline">
                {textData[idx].country}
              </span>
              <span className="contact-row-left-span text-black/50 flex gap-[3px] font-normal">
                <Moment
                  format="hh"
                  tz="Asia/Seoul"
                  className="tracking-[-0.03em]"
                >
                  {currTime}
                </Moment>
                <span className="relative bottom-[2px] animate-blink">:</span>
                <Moment
                  format="mm a"
                  tz="Asia/Seoul"
                  className="tracking-[-0.03em]"
                >
                  {currTime}
                </Moment>
              </span>
            </div>

            <span className="contact-row-left-span">
              {textData[idx].purpose}
            </span>
          </>
        ) : (
          <>
            <span className="contact-row-left-span underline">
              {textData[idx].country}
            </span>
            <span className="contact-row-left-span">
              {textData[idx].purpose}
            </span>
            <span className="contact-row-left-span text-black/50 flex gap-[3px] font-normal !text-[1.25vw]">
              <Moment
                format="hh"
                tz={textData[idx].tz}
                className="tracking-[-0.03em]"
              >
                {currTime}
              </Moment>
              <span className="relative bottom-[2px] animate-blink">:</span>
              <Moment
                format="mm a"
                tz={textData[idx].tz}
                className="tracking-[-0.03em]"
              >
                {currTime}
              </Moment>
            </span>
          </>
        )}
      </div>
      <div className="flex flex-col ml-[5%]">
        {isFirst && !isEng && (
          <span className="contact-row-right-span">서울특별시 금천구</span>
        )}
        <span
          className={cn(
            "contact-row-right-span",
            (!isFirst || isEng) && "contact-row-en-span"
          )}
        >
          {textData[idx].row1}
        </span>
        <span
          className={cn(
            "contact-row-right-span",
            (!isFirst || isEng) && "contact-row-en-span"
          )}
        >
          {textData[idx].row2}
        </span>
        <span className="text-[13.5pt] font-en font-bold tracking-[0.01em] lg:text-[1.5vw]">
          {textData[idx].email}
        </span>
        {textData[idx].tel && (
          <span className="text-[13.5pt] mt-[17pt] mb-0 lg:text-[1.5vw] lg:mt-[3vh] font-en tracking-[0.01em]">
            {textData[idx].tel}
          </span>
        )}
      </div>
    </div>
  );
}
