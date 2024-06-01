import { ClassValue, clsx } from "clsx";
import { getLocale } from "next-intl/server";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getIsEng = async () => {
  const locale = await getLocale();
  return locale === "en";
};
