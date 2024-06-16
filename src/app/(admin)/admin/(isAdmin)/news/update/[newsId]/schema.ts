import { z } from "zod";

export const updateNewsSchema = z.object({
  photo: z.string().nullish(),
  title: z
    .string()
    .min(1, {
      message: "제목을 입력해주세요",
    })
    .nullish(),
  url: z
    .string()
    .min(1, {
      message: "URL을 입력해주세요",
    })
    .nullish(),
  contents: z
    .string()
    .min(1, {
      message: "내용을 입력해주세요",
    })
    .nullish(),
});

export type UpdateNewsDto = z.infer<typeof updateNewsSchema>;
