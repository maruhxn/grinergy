import GlobalException from "@/exceptions/GlobalException";
import { sendSlackNotification } from "./utils";

export interface ErrorResponse {
  message: string;
  statusCode: number;
}

export default async function handleError(
  error: unknown
): Promise<ErrorResponse> {
  console.error(error);

  if (error instanceof GlobalException) {
    return {
      message: error.message,
      statusCode: error.statusCode,
    };
  } else {
    await sendSlackNotification(
      `${(error as Error).stack!.substring(0, 500)}...`
    );

    return {
      message: error instanceof Error ? error.message : "Server Error",
      statusCode: 500,
    };
  }
}
