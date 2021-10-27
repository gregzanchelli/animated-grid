import { AnimatedGrid } from "react-animated-grid";
import { useState } from "react";

export default function App() {
  const [data, setData] = useState([
    { id: "a", title: "Title A", content: "content a" },
    { id: "b", title: "Title B", content: "content b" },
    { id: "c", title: "Title C", content: "content c" },
    { id: "d", title: "Title D", content: "content d" },
    { id: "e", title: "Title E", content: "content e" },
  ]);
  return (
    <AnimatedGrid
      data={data}
      defaultColumnCount={1}
      defaultHeight={150}
      trail={5}
      config={{
        mass: 1,
        tension: 1000,
        friction: 100,
        clamp: true,
      }}
      itemWidth={240}
      columnQueries={9}
      windowPadding={100}
      keyFn={(item) => item.id}
      renderFn={(item) => {
        return (
          <div
            style={{
              width: "100%",
              border: "solid 1px black",
              height: 150,
              background: "#eeee",
              boxSizing: "border-box",
              padding: 8,
            }}
          >
            <h1>{item.title}</h1>
            <div>{item.content}</div>
          </div>
        );
      }}
    />
  );
}
