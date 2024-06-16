import { z } from "zod";

export const updateNewsSchema = z.object({
  photo: z.string().nullish(),
  title: z.string().nullish(),
  url: z.string().nullish(),
  contents: z.string().nullish(),
});

export type UpdateNewsDto = z.infer<typeof updateNewsSchema>;
