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

export const getErrorMessage = (error: unknown) => {
  let message = "Unknown Error";
  if (error instanceof Error) message = error.message;
  return message;
};

export const handleError = (error: unknown) => {
  console.error(error);
  if (error instanceof Error) {
    throw new Error(error.message);
  } else {
    throw new Error("Server Error");
  }
};
