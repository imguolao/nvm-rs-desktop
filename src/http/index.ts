import { error } from '@/atoms/error';

export async function http(...agrs: Parameters<typeof fetch>) {
    try {
        return await fetch(...agrs);
    } catch (err: any) {
        error(err?.message ?? 'Sorry, an unexpected error has occurred.');
        return null;
    }
}
