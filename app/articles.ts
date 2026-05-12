//Interface to represent news object
export interface Articles {
    title?: string;
    url?: string;
    author?: string;
    urlToImage?: string;
    description?: string;
    source?: {
        id?: string;
        name?: string;
    }
    publishedAt?: string;
    category?: "general" | "entertainment" | "sports" | "health";
}
