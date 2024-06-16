import { z } from "zod";

export const newsSchema = z.object({
  photo: z.string().nullish(),
  title: z.string(),
  url: z.string(),
  contents: z.string(),
});

export type CreateNewsSchema = z.infer<typeof newsSchema>;
