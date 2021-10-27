/// <reference types="react" />
import { SpringConfig } from "@react-spring/web";
declare type AnimatedGridData<T extends object> = T & {
    x: number;
    y: number;
    width: number;
    height: number;
    index: number;
};
declare type Query = string;
declare type ColumnQueryMap = {
    [query: Query]: number;
};
declare type ColumnQueryConfig = {
    columnQueries: number;
    itemWidth: number;
};
declare type AnimatedGridProps<T extends {
    [key: string]: any;
}> = {
    defaultColumnCount: number;
    data: Array<T>;
    heightFn?: (item: T) => number;
    keyFn: (item: AnimatedGridData<T>) => string;
    defaultHeight: number;
    renderFn: (item: AnimatedGridData<T>) => JSX.Element;
    config?: SpringConfig;
    trail?: number;
} & ({
    columnQueryMap: ColumnQueryMap;
} | ColumnQueryConfig);
export declare function AnimatedGrid<T extends object>({ defaultColumnCount, data, defaultHeight, heightFn, keyFn, renderFn, config, trail, ...props }: AnimatedGridProps<T>): JSX.Element;
export {};
