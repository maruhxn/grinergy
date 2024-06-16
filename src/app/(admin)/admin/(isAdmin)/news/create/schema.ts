import { z } from "zod";

export const newsSchema = z.object({
  photo: z.string().nullish(),
  title: z
    .string({
      required_error: "제목은 필수입니다.",
    })
    .min(1, {
      message: "제목을 입력해주세요",
    }),
  url: z
    .string({
      required_error: "URL은 필수입니다.",
    })
    .min(1, {
      message: "URL을 입력해주세요",
    }),
  contents: z
    .string({
      required_error: "내용은 필수입니다.",
    })
    .min(1, {
      message: "내용을 입력해주세요",
    }),
});

export type CreateNewsSchema = z.infer<typeof newsSchema>;
