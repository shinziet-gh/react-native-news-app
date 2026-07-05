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

const NewsCategory = z.enum(["home", "business", "technology", "entertainment", "sports", "science", "health"]);

export const ArticleSchema = z.object({
    title: z.string(),
    url: z.string(),
    author: z.string(),
    urlToImage: z.string(),
    description: z.string(),
    source: z.string(),
    publishedAt: z.string(),
    category: NewsCategory
})

export type Articles = z.infer<typeof ArticleSchema>;