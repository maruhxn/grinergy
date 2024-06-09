"use client";

import { cn } from "@/libs/utils";
import { useTranslations } from "next-intl";

export default function CircleModel({ isEng }: { isEng: boolean }) {
  const t = useTranslations("Product");

  return (
    <section className="h-[50vw] my-[20vh] lg:h-[80vh] lg:my-[15vw] w-full flex justify-center items-center">
      <div
        className={cn(
          "text-[11px] leading-[14pt] md:leading-[17pt] size-[30vw] lg:size-[15.63vw] lg:text-[1.4063vw] lg:leading-[1.8583vw] absolute flex flex-col justify-center items-center rounded-full text-white bg-green tracking-[-0.015em] whitespace-pre-wrap text-center",
          isEng ? "md:text-[12px] font-en" : "md:text-[11.5pt] font-kr"
        )}
      >
        {t("circle.center")}
      </div>
      <>
        <div
          className={cn(
            "product-outline-circle size-[43vw] lg:size-[22.5vw] animate-forwardRotate"
          )}
        >
          <div
            className={cn(
              "product-icon-div top-[-7%] left-[39%] animate-mobileBackwardAndScale lg:animate-backwardAndScale"
            )}
          >
            <img
              className="w-[7vw] lg:w-[3vw]"
              src="/images/icon1-1.png"
              alt="icon1"
            />
            <span
              className={cn(
                "top-[7vw] lg:top-[3vw] absolute text-green text-[10px] whitespace-pre-wrap w-[250%] text-center leading-[12px] animate-backwardOpacity",
                isEng ? "font-en" : "font-kr font-medium"
              )}
            >
              {t("circle.icon1")}
            </span>
          </div>
        </div>
        <div
          className={cn(
            "product-outline-circle size-[56vw] lg:size-[29vw] animate-backwardRotate"
          )}
        >
          <div
            className={cn(
              "product-icon-div top-[42%] left-[-6%] lg:top-[45%] lg:left-[-5%] animate-mobileForwardAndScale lg:animate-forwardAndScale"
            )}
          >
            <img
              className="w-[7vw] lg:w-[3vw]"
              src="/images/icon1-2.png"
              alt="icon2"
            />
            <span
              className={cn(
                "top-[7vw] lg:top-[3vw] absolute text-green text-[10px] whitespace-pre-wrap w-[250%] text-center leading-[12px] animate-forwardOpacity",
                isEng ? "font-en" : "font-kr font-medium"
              )}
            >
              {t("circle.icon2")}
            </span>
          </div>
        </div>
        <div
          className={cn(
            "product-outline-circle size-[69vw] lg:size-[35.5vw] animate-forwardRotate"
          )}
        >
          <div
            className={cn(
              "product-icon-div top-[95%] left-[43%] lg:top-[96%] lg:left-[45%] animate-mobileBackwardAndScale lg:animate-backwardAndScale"
            )}
          >
            <img
              className="w-[7vw] lg:w-[3vw]"
              src="/images/icon1-3.png"
              alt="icon3"
            />
            <span
              className={cn(
                "top-[7vw] lg:top-[3vw] absolute text-green text-[10px] whitespace-pre-wrap w-[250%] text-center leading-[12px] animate-backwardOpacity",
                isEng ? "font-en" : "font-kr font-medium"
              )}
            >
              {t("circle.icon3")}
            </span>
          </div>
        </div>
        <div
          className={cn(
            "product-outline-circle size-[82vw] lg:size-[42vw] animate-backwardRotate"
          )}
        >
          <div
            className={cn(
              "product-icon-div top-[45%] right-[-4%] lg:top-[44%] lg:right-[-4%] animate-mobileForwardAndScale lg:animate-forwardAndScale"
            )}
          >
            <img
              className="w-[7vw] lg:w-[3vw]"
              src="/images/icon1-4.png"
              alt="icon4"
            />
            <span
              className={cn(
                "top-[7vw] lg:top-[3vw] absolute text-green text-[10px] whitespace-pre-wrap w-[250%] text-center leading-[12px] animate-forwardOpacity",
                isEng ? "font-en" : "font-kr font-medium"
              )}
            >
              {t("circle.icon4")}
            </span>
          </div>
        </div>
      </>
    </section>
  );
}
