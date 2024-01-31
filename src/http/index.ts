export async function http<T extends any>(...agrs: Parameters<typeof fetch>): Promise<T | null> {
    const response = await fetch(...agrs);
    if (!response.ok) {
        // throw new Error(response.statusText);
        return null;
    }

    return await (response.json() as T);
}
