import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import { useVirtual } from "react-virtual";
import { data } from "./staticData";

function App() {
  const rows = new Array(data.length)
    .fill(true)
    .map(() => 25 + Math.round(Math.random() * 100));

  const columns = new Array(data.length)
    .fill(true)
    .map(() => 75 + Math.round(Math.random() * 100));

  return (
    <div>
      <h3>Rows</h3>
      <RowVirtualizerDynamic rows={rows} columns={columns} />
      <br />
      
    </div>
  );
}

function RowVirtualizerDynamic({ rows }) {
  const parentRef = React.useRef();

  const rowVirtualizer = useVirtual({
    size: rows.length,
    parentRef
  });

  return (
    <>
      <div
        ref={parentRef}
        className="List"
        style={{
          height: `600px`,
          width: `800px`,
          overflow: "auto"
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.totalSize}px`,
            width: "100%",
            position: "relative"
          }}
        >
          {rowVirtualizer.virtualItems.map(virtualRow => (
            <div
              key={virtualRow.index}
              ref={virtualRow.measureRef}
              className={virtualRow.index % 2 ? "ListItemOdd" : "ListItemEven"}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `150px`,
                transform: `translateY(${virtualRow.start}px)`
              }}
            >
              {data[virtualRow.index]}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}


const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
