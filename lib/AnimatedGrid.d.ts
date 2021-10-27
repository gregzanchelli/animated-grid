/// <reference types="react" />
import { SpringConfig } from "@react-spring/web";
declare type AnimatedGridData<T extends object> = T & {
    x: number;
    y: number;
    width: number;
    height: number;
    index: number;
};
declare type AnimatedGridProps<T extends {
    [key: string]: any;
}> = {
    columnQueryMap: {
        [query: string]: number;
    };
    defaultColumnCount: number;
    data: Array<T>;
    heightFn?: (item: T) => number;
    keyFn: (item: AnimatedGridData<T>) => string;
    defaultHeight: number;
    renderFn: (item: AnimatedGridData<T>) => JSX.Element;
    config?: SpringConfig;
    trail?: number;
};
export declare function AnimatedGrid<T extends object>({ columnQueryMap, defaultColumnCount, data, defaultHeight, heightFn, keyFn, renderFn, config, trail, }: AnimatedGridProps<T>): JSX.Element;
export {};
