import { ClassValue, clsx } from "clsx";
import { getLocale } from "next-intl/server";
import { twMerge } from "tailwind-merge";
import { ErrorResponse } from "./error-handler";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getIsEng = async () => {
  const locale = await getLocale();
  return locale === "en";
};

export const getErrorMessage = (error: unknown) => {
  if (error && typeof error === "object" && "message" in error) {
    return (error as ErrorResponse).message;
  }

  // 예상치 못한 에러 구조일 경우에 대한 기본 메시지
  return "예상치 못한 오류가 발생했습니다. 나중에 다시 시도해주세요.";
};

export async function sendSlackNotification(message: string) {
  const response = await fetch(process.env.SLACK_WEBHOOK_URL as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: message }),
  });

  if (!response.ok) {
    console.error(`Error sending Slack notification: ${response.statusText}`);
  }
}
