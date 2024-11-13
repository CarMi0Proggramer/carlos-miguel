import { defineCollection, z } from "astro:content";

const videoCollection = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        description: z.string(),
        dateFormatted: z.string(),
        link: z.string(),
    }),
});

export const collections = {
    video: videoCollection,
};
