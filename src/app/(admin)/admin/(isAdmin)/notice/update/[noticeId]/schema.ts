import { z } from "zod";

export const updateNoticeSchema = z.object({
  files: z.array(z.string()).nullish(),
  title: z.string().min(1, { message: "제목을 입력해주세요" }).nullish(),
  contents: z.string().min(1, { message: "내용을 입력해주세요" }).nullish(),
  deletedFiles: z.array(z.string()).nullish(),
});

export type UpdateNoticeDto = z.infer<typeof updateNoticeSchema>;
