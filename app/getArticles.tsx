import { Articles, ArticleSchema } from "./articles";
import z from "zod";

export async function getArticles(apiURL: string): Promise<Articles[]> {
    const response = await fetch(apiURL);

    const data: unknown = await response.json();

    const ArticlesSchema = z.array(ArticleSchema);

    const result = ArticlesSchema.safeParse(data);

    console.log(result);

    if (!result.success) {
        return [];
    }

    return result.data;
}