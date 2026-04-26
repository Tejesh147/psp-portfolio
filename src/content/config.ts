import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      role: z.string(),
      stack: z.array(z.string()).min(1),
      status: z.enum(["shipped", "in-progress", "archived"]),
      year: z.number().int().min(2000).max(2100),
      order: z.number().int(),
      draft: z.boolean().default(false),
      hero: z
        .object({
          src: image(),
          alt: z.string().min(1),
        })
        .optional(),
      figure: z
        .object({
          src: image(),
          alt: z.string().min(1),
          caption: z.string().min(1),
        })
        .optional(),
      tags: z.array(z.string()).default([]),
      hookHtml: z.string().min(1),
    }),
});

const personal = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    order: z.number().int(),
    icon: z.string(), // lucide icon name, used by XMB sub-items
  }),
});

export const collections = {
  projects,
  personal,
};
