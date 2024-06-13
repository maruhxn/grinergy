import { z } from "zod";

export const newsSchema = z.object({
  photo: z.string().nullish(),
  title: z.string({
    required_error: "제목은 필수입니다.",
  }),
  url: z.string({
    required_error: "뉴스 URL은 필수입니다.",
  }),
  contents: z.string({
    required_error: "내용은 필수입니다.",
  }),
});

export type CreateNewsSchema = z.infer<typeof newsSchema>;
