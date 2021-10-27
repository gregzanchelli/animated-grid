import React, { useState, useMemo, useEffect } from "react";
import useMeasure from "react-use-measure";
import { useTransition, a, SpringConfig } from "@react-spring/web";
import useMedia from "./useMedia";
//@ts-ignore
import styles from "./AnimatedGrid.module.css";




type AnimatedGridData<T extends object> = T & {
  x: number;
  y: number;
  width: number;
  height: number;
  index: number;
};

type Query = string;

type ColumnQueryMap = {
  [query: Query]: number;
};

type ColumnQueryConfig = {
  columnQueries: number;
  itemWidth: number;
};

type AnimatedGridProps<T extends { [key: string]: any }> = {
  defaultColumnCount: number;
  data: Array<T>;
  heightFn?: (item: T) => number;
  keyFn: (item: AnimatedGridData<T>) => string;
  defaultHeight: number;
  renderFn: (item: AnimatedGridData<T>) => JSX.Element;
  config?: SpringConfig;
  trail?: number;
} & (
  | {
      columnQueryMap: ColumnQueryMap;
    }
  | ColumnQueryConfig
);

const generateColumnQueryMap = ({
  columnQueries,
  itemWidth,
}: ColumnQueryConfig) => {
  const queries = {};
  for (let i = columnQueries; i > 0; i--) {
    queries[`(min-width: ${i * itemWidth}px)`] = i;
  }
  return queries;
};

export function AnimatedGrid<T extends object>({
  defaultColumnCount,
  data,
  defaultHeight,
  heightFn,
  keyFn,
  renderFn,
  config,
  trail,
  ...props
}: AnimatedGridProps<T>) {
  const columnQueryMap = useMemo(() => {
    if (props["columnQueries"] as ColumnQueryConfig) {
      return generateColumnQueryMap(props as ColumnQueryConfig);
    }
    return props["columnQueryMap"] as ColumnQueryMap;
  }, []);
  const columns = useMedia(columnQueryMap, defaultColumnCount);
  const [ref, { width }] = useMeasure();
  const [items, set] = useState(data);

  useEffect(() => {
    set(data);
  }, [data]);

  const [heights, gridItems] = useMemo(() => {
    let heights = new Array(columns).fill(0); // Each column gets a height starting with zero
    let gridItems: Array<AnimatedGridData<T>> = items.map((child, index) => {
      const childHeight = heightFn ? heightFn(child) : defaultHeight;
      const column = heights.indexOf(Math.min(...heights));
      const x = (width / columns) * column;
      const y = (heights[column] += childHeight) - childHeight;
      return {
        ...child,
        x,
        y,
        width: width / columns,
        height: childHeight,
        index,
      };
    });
    return [heights, gridItems];
  }, [columns, items, width]);

  const transitions = useTransition(gridItems, {
    key: keyFn,
    from: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 0 }),
    enter: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 1 }),
    update: ({ x, y, width, height }) => ({ x, y, width, height }),
    leave: { height: 0, opacity: 0 },
    config: {
      mass: 1,
      tension: 1000,
      friction: 100,
      clamp: true,
      ...(config || {}),
    },
    trail: trail || 0,
  });

  return (
    <div
      ref={ref}
      className={styles.raglist}
      style={{ height: Math.max(...heights) }}
    >
      {transitions((style, item) => (
        <a.div
          style={{
            position: "absolute",
            padding: "0px",
            willChange: "transform, width, height, opacity",
            boxSizing: "border-box",
            ...style,
          }}
        >
          <div>{renderFn(item)}</div>
        </a.div>
      ))}
    </div>
  );
}
