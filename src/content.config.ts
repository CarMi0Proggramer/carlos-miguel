import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const video = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/video" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    dateFormatted: z.string(),
    link: z.string(),
  }),
});

export const collections = {
  video,
};
