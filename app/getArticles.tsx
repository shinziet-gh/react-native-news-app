import { Articles } from "./articles";

export async function getArticles(apiURL: string): Promise<typeof Articles[]> {
    return fetch(apiURL)
        //Use unknown type for fetched data, then cast to object type if the articles property is contained inside data.
        .then((response) => response.json())
        .then((data: unknown) => {
            if (hasArticles(data)) {
                return data.articles;
            }

            return [];
        });
}

function hasArticles(data: any): data is { articles: typeof Articles[] } {
    return "articles" in data;
}
