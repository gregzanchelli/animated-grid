import { useEffect, useState } from "react";
import { debounce } from "debounce";

type MediaQueryMap<T> = {
  [query: string]: T;
};

export default function useMedia<T>(
  queries: MediaQueryMap<T>,
  defaultValue: T,
  options?: {
    debounce?: number;
  }
) {
  const match = () => {
    for (const query in queries) {
      if (matchMedia(query).matches) {
        return queries[query];
      }
    }
    return defaultValue;
  };
  const [value, set] = useState(match);
  useEffect(() => {
    const handler = debounce(() => {
      set(match);
    }, options?.debounce ?? 50);
    window.addEventListener("resize", handler);
    return () => {
      handler.clear();
      window.removeEventListener("resize", handler);
    };
  }, []);
  return value;
}
