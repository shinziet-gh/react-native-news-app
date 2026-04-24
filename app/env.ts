import { BASE_URL } from "@env";

//Handle managing env variables across dev/production
export const getEnv = (key: string): string | undefined => {

    if (BASE_URL) {
        return BASE_URL
    }

    if (process.env?.[key]) {
        return process.env[key];
    }

    return undefined;
}