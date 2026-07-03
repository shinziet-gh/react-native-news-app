import { Articles } from "./articles";

export async function getArticles(apiURL: string): Promise<Articles[]> {
    const response = await fetch(apiURL);
    const data: unknown = await response.json();

    if (!hasArticles(data)) {
        return [];
    }

    return data.articles.filter(article => article.urlToImage !== null);
}

function hasArticles(data: any): data is { articles: Articles[] } {
    return "articles" in data;
}
