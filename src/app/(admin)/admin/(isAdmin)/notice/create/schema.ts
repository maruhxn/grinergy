import { z } from "zod";

export const noticeSchema = z.object({
  files: z
    .array(
      z.object({
        fileName: z.string(),
        filePath: z.string(),
      })
    )
    .nullish(),
  title: z.string({
    required_error: "제목은 필수입니다.",
  }),
  contents: z.string({
    required_error: "내용은 필수입니다.",
  }),
});

export type CreateNoticeSchema = z.infer<typeof noticeSchema>;
