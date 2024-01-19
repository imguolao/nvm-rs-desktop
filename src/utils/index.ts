export function isString(val: unknown): val is string {
    return typeof val === 'string';
}

export function isHttpUrl(str: string): boolean {
    try {
        const url = new URL(str);
        return url.protocol === 'http:' || url.protocol === 'https:'
    } catch {
        return false;
    }
}

export function debounce(fn: (...args: any[]) => void, wait: number) {
    let timer: number;
    return (...args: any[]) => {
        !!timer && clearTimeout(timer);
        timer = setTimeout(() => fn.apply(null, args), wait) as unknown as number;
    }
}
