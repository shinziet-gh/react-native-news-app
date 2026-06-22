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
    author: z.string(),
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

const NewsCategory = z.enum(["general", "entertainment", "sports", "health"]);

export const Articles = z.object({
    title: Title,
    url: NewsUrl,
    author: Author,
    urlToImage: ImageUrl,
    description: NewsDescription,
    source: NewsSource,
    publishedAt: PublishDate,
    category: NewsCategory
})

