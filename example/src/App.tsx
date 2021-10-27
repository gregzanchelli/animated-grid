import styled, { createGlobalStyle } from "styled-components";
import { AnimatedGrid } from "react-animated-grid";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

const GlobalStyle = createGlobalStyle`
  body {
    width: 100vw;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const CardContainer = styled.div`
  width: 216px;
  /* height: 150px; */
  border-radius: 4px;
  background: #e9e9e9;
  border: 1px solid #d9d9d9;
  box-sizing: border-box;
  padding: 8px 16px 16px 16px;
  margin: auto;
`;

const CardTitle = styled.h3`
  color: #0050b3;
  white-space: nowrap;
  width: 95%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
`;

export const CardContent = styled.div`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px;
  color: #595959;
`;

const id = () => {
  return {
    id: nanoid(),
  };
};

const defaultData = [...Array(20)].map(id);

const WIDTH = 240;

const deleteItem = (i: number) => (a: Array<any>) =>
  [...a.slice(0, i), ...a.slice(i + 1)];

export default function App() {
  const [data, setData] = useState(defaultData);
  return (
    <div>
      <GlobalStyle />
      <button
        onClick={() =>
          setData((prev) => [
            {
              id: nanoid(),
            },
            ...prev,
          ])
        }
      >
        Add
      </button>
      <AnimatedGrid
        defaultColumnCount={1}
        data={data}
        keyFn={(item) => item.id}
        defaultHeight={150}
        trail={5}
        columnQueryMap={{
          [`(min-width: ${9 * WIDTH}px)`]: 9,
          [`(min-width: ${8 * WIDTH}px)`]: 8,
          [`(min-width: ${7 * WIDTH}px)`]: 7,
          [`(min-width: ${6 * WIDTH}px)`]: 6,
          [`(min-width: ${5 * WIDTH}px)`]: 5,
          [`(min-width: ${4 * WIDTH}px)`]: 4,
          [`(min-width: ${3 * WIDTH}px)`]: 3,
          [`(min-width: ${2 * WIDTH}px)`]: 2,
        }}
        renderFn={(item) => {
          return (
            <CardContainer>
              <CardTitle>Card Title Here</CardTitle>
              <CardContent>
                <button onClick={() => setData(deleteItem(item.index))}>
                  delete
                </button>
              </CardContent>
            </CardContainer>
          );
        }}
      />
    </div>
  );
}
