declare type MediaQueryMap<T> = {
    [query: string]: T;
};
export default function useMedia<T>(queries: MediaQueryMap<T>, defaultValue: T, options?: {
    debounce?: number;
}): T;
export {};
