import { z } from "zod";

export const updateNoticeSchema = z.object({
  files: z
    .array(
      z.object({
        fileName: z.string(),
        filePath: z.string(),
      })
    )
    .nullish(),
  title: z.string().nullish(),
  contents: z.string().nullish(),
  deletedFiles: z.array(z.string()).nullish(),
});

export type UpdateNoticeDto = z.infer<typeof updateNoticeSchema>;
