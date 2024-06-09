"use client";

import useIsMobile from "@/hooks/useIsMobile";
import { cn } from "@/libs/utils";
import { useTranslations } from "next-intl";

export default function ComparisonGraph({ isEng }: { isEng: boolean }) {
  const t = useTranslations("Product");
  const isMobile = useIsMobile();
  const rowLineCss = cn(
    "bg-white text-[10px] xl:text-[17.3px] text-white relative w-full lg:w-[12.2396vw] mb-[120px] lg:mb-0 h-0 lg:h-[0.75px]",
    isEng ? "font-en font-normal" : "font-kr font-medium"
  );
  const rowCss = "w-[0.5px] lg:w-[1.1979vw] h-[10px] lg:h-[0.75px] bg-white";
  const pseudoBoxCss =
    "h-[100px] sm:h-[120px] lg:h-full w-full lg:w-[14.7396vw] flex justify-center items-center mr-0 lg:mr-[1.1979vw] mb-[10px] lg:mb-0";
  const circleCss =
    "size-[100px] sm:size-[120px] lg:size-[14.7396vw] border-[0.5px] md:border-[0.75px] lg:border-[0.5px] border-white rounded-full flex justify-center items-center text-center whitespace-pre-wrap";
  const colLineCss = "h-[0.75px] w-full lg:w-[0.5px] lg:h-[17.5926vh] bg-white";
  return (
    <section
      className={cn(
        "w-full h-auto lg:h-screen bg-green flex flex-col justify-center items-center text-white mb-[5px] lg:mb-[7px] text-[10px] px-0  py-[8vh] md:px-[12.8vw] lg:py-[16.203vh] lg:px-[12.8vw] lg:leading-[19px] xl:leading-[25px] font-bold",
        isEng
          ? "leading-[10pt] lg:text-[1vw] tracking-[-0.01em] font-en"
          : "leading-[13pt] lg:text-[1.15vw] tracking-[-0.03em] font-kr"
      )}
    >
      <div className="mx-auto flex justify-center items-center lg:block">
        <div className="product-graph-row w-[100px] sm:w-[120px] lg:w-full lg:border-0">
          <div className="hidden border-[0.5px] border-white size-[5px] rounded-full bg-white lg:block" />
          <div className={rowLineCss}>
            <span
              className={cn(
                "absolute whitespace-nowrap left-0 ml-0 xl:ml-[10px]",
                isEng
                  ? "text-[10px] md:text-[10.5px] tracking-[0.015em] lg:tracking-[-0.01em] text-start leading-[13px] top-[32px] lg:text-[12.496px] lg:leading-[17px] 2xl:text-[14.496px] lg:top-[-22px]"
                  : "text-[11px] md:text-[12px] 2xl:text-[17.3px] tracking-normal lg:tracking-[-0.03em] text-center top-[34px] lg:top-[-30px] -translate-x-1/2 left-1/2 lg:translate-x-0 lg:left-0"
              )}
            >
              {t("graph.span1")}
            </span>
            <span
              className={cn(
                "absolute whitespace-nowrap top-[13px] left-1/2 lg:left-0 -translate-x-1/2 lg:translate-x-0 text-center ml-0 xl:ml-[10px] text-[13px] sm:text-[15px] lg:text-[10px] xl:text-[17.3px]",
                isEng && "left-0 transform-none"
              )}
            >
              {t("graph.span2")}
            </span>
          </div>
          <div className={circleCss}>{t("graph.circle1")}</div>
          <div className={rowCss} />
          <div className={circleCss}>
            {isMobile ? t("graph.mobile-circle2") : t("graph.circle2")}
          </div>
          <div className={rowCss} />
          <div className={circleCss}>
            {isMobile ? t("graph.mobile-circle3") : t("graph.circle3")}
          </div>
          <div className={rowCss} />
          <div className={circleCss}>
            {isMobile ? t("graph.mobile-circle4") : t("graph.circle4")}
          </div>
        </div>
        <div className="product-graph-row w-[50px] sm:w-[80px] lg:w-full lg:border-0">
          <div className="block w-full h-[120px] -translate-y-[0.8%] lg:hidden" />
          <div className={cn(pseudoBoxCss, "ml-0 lg:ml-[12.2396vw]")}>
            <div className={colLineCss} />
          </div>
          <div className={pseudoBoxCss}>
            <div className={colLineCss} />
          </div>
          <div className={pseudoBoxCss}>
            <div className={colLineCss} />
          </div>
          <div className={cn(pseudoBoxCss, "!m-0")}>
            <div className={colLineCss} />
          </div>
        </div>
        <div className="product-graph-row w-[100px] sm:w-[120px] lg:w-full lg:border-0">
          <div className="hidden border-[0.5px] border-white size-[5px] rounded-full bg-white lg:block" />
          <div className={rowLineCss}>
            <span
              className={cn(
                "absolute whitespace-pre-wrap left-0 ml-0 xl:ml-[10px] w-max",
                isEng
                  ? "text-[10px] md:text-[10.5px] tracking-[0.015em] lg:tracking-[-0.01em] text-start leading-[13px] top-[32px] lg:text-[12.496px] lg:leading-[17px] 2xl:text-[14.496px] lg:top-[-22px]"
                  : "text-[11px] md:text-[12px] 2xl:text-[17.3px] tracking-normal lg:tracking-[-0.03em] text-center top-[34px] 2xl:top-[-30px]",
                "lg:-top-[40px]"
              )}
            >
              {t("graph.span3")}
            </span>
            <span
              className={cn(
                "absolute whitespace-nowrap top-[13px] left-1/2 lg:left-0 -translate-x-1/2 lg:translate-x-0 text-center ml-0 xl:ml-[10px] text-[13px] sm:text-[15px] lg:text-[10px] xl:text-[17.3px]",
                isEng && "left-0 transform-none"
              )}
            >
              {t("graph.span4")}
            </span>
            <div
              className={cn(
                "absolute whitespace-nowrap top-[70px] lg:-top-[100px] -translate-x-1/2 lg:translate-x-0 text-center ml-0 w-[80%] border-[0.75px] border-white text-[10px] h-[27px] lg:h-[2.4042vw] lg:left-0",
                isEng
                  ? "sm:text-[13px] leading-[30px] left-[40%] md:left-[38%] lg:text-[1.146vw] lg:leading-[2.6042vw]"
                  : "sm:text-[11px] leading-[25px] left-1/2 lg:text-[0.9375vw] lg:leading-[2.3vw]"
              )}
            >
              {t("graph.span5")}
            </div>
          </div>
          <div className={cn(circleCss, "bg-white text-green")}>
            {t("graph.circle5")}
          </div>
          <div className={rowCss} />
          <div className={cn(circleCss, "bg-white text-green")}>
            {isMobile ? t("graph.mobile-circle6") : t("graph.circle6")}
          </div>
          <div className={rowCss} />
          <div className={cn(circleCss, "bg-white text-green")}>
            {isMobile ? t("graph.mobile-circle7") : t("graph.circle7")}
          </div>
          <div className={rowCss} />
          <div className={cn(circleCss, "bg-white text-green")}>
            {isMobile ? t("graph.mobile-circle8") : t("graph.circle8")}
          </div>
        </div>
      </div>
    </section>
  );
}
