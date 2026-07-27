import * as z from "zod";

const Title = z.object({
    title: z.string(),
})

const NewsUrl = z.object({
    url: z.string(),
})

const Author = z.object({
    author: z.string(),
})

const ImageUrl = z.object({
    urlToImage: z.string(),
})

const NewsDescription = z.object({
    description: z.string(),
})

const NewsSource = z.object({
    id: z.string(),
    name: z.string(),
})

const PublishDate = z.object({
    date: z.string(),
})

// business, sport, rugby, entertainment, world, technology, lifestyle, travel

export const NewsCategory = z.enum(["top", "business", "lifestyle", "technology", "world"]);

export const ArticleSchema = z.object({
    title: z.string(),
    url: z.string(),
    author: z.string().optional(),
    urlToImage: z.string(),
    description: z.string(),
    source: z.string().optional(),
    publishedAt: z.string(),
    category: NewsCategory.optional()
})

export type Articles = z.infer<typeof ArticleSchema>;