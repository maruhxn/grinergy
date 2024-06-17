import BigPhrase from "@/components/BigPhrase";
import HistoryList from "@/components/HistoryList";
import { cn, getIsEng } from "@/libs/utils";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
import Image from "next/image";

import historyBanner from "../../../../../public/images/historyCoverImg.jpg";

export const metadata: Metadata = {
  title: "History",
};

export default async function History() {
  const isEng = await getIsEng();
  return (
    <div className="mb-[2vh] overflow-hidden lg:mb-[4.1666vh]">
      <BigPhrase isEng={isEng} at={"History"} />
      <Image
        className="w-[93%] mx-auto h-[30vh] lg:h-auto"
        height={700}
        placeholder="blur"
        src={historyBanner}
        alt="커버 이미지"
      />

      <SmallPhrase isEng={isEng} />
      <HistoryList isEng={isEng} />
    </div>
  );
}

function SmallPhrase({ isEng }: { isEng: boolean }) {
  const t = useTranslations("History");

  return (
    <h2
      className={cn(
        "tracking-[-0.03em] text-center text-black/95 font-kr text-[16px] mt-[8vh] mb-[1.2vh] lg:mt-[17.592vh] lg:mb-[6.6667vh] lg:text-[1.5104vw]",
        isEng && "tracking-[-0.015em] font-en font-bold lg:mb-[5.667vh]"
      )}
    >
      {t("small-phrase")}
    </h2>
  );
}
