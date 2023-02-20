import { render } from "react-dom";

import Chart, { LineChartProps } from "./App";

const numberAxisData = [
  { name: 1, cost: 25.5, impression: 100 },
  { name: 2, cost: 25.39, impression: 120 },
  { name: 4, cost: 18.16, impression: 180 },
  { name: 5, cost: 26.29, impression: 200 },
  { name: 6, cost: 39, impression: 499 },
  { name: 7, cost: 50.53, impression: 50 },
  { name: 8, cost: 82.52, impression: 100 },
  { name: 9, cost: 91.79, impression: 200 },
  { name: 10, cost: 52.94, impression: 222 },
  { name: 11, cost: 84.3, impression: 210 },
  { name: 12, cost: 54.41, impression: 300 },
  { name: 13, cost: 2.1, impression: 50 },
  { name: 14, cost: 58, impression: 190 },
  { name: 15, cost: 20, impression: 300 },
  { name: 16, cost: 19, impression: 400 },
  { name: 17, cost: 36, impression: 200 },
  { name: 18, cost: 92, impression: 50 },
  { name: 19, cost: 83, impression: 100 },
  { name: 20, cost: 78, impression: 100 },
  { name: 21, cost: 78, impression: 100 }
];

const categoricalAxisData = [
  { name: "A", cost: 25.5, impression: 100 },
  { name: "B", cost: 25.39, impression: 120 },
  { name: "C", cost: 18.37, impression: 150 },
  { name: "D", cost: 18.16, impression: 180 },
  { name: "E", cost: 26.29, impression: 200 },
  { name: "F", cost: 39, impression: 499 },
  { name: "G", cost: 50.53, impression: 50 },
  { name: "H", cost: 82.52, impression: 100 },
  { name: "I", cost: 91.79, impression: 200 },
  { name: "J", cost: 52.94, impression: 222 },
  { name: "K", cost: 84.3, impression: 210 },
  { name: "L", cost: 54.41, impression: 300 },
  { name: "M", cost: 2.1, impression: 50 },
  { name: "N", cost: 58, impression: 190 },
  { name: "O", cost: 20, impression: 300 },
  { name: "P", cost: 19, impression: 400 },
  { name: "Q", cost: 36, impression: 200 },
  { name: "R", cost: 92, impression: 50 },
  { name: "S", cost: 83, impression: 100 },
  { name: "T", cost: 78, impression: 1000 }
];

const chartNumericAxisProps: LineChartProps<
  typeof numberAxisData[number]
>["axis"] = {
  x: {
    dataKey: "name",
    type: "number",
    scale: "linear",
    allowDataOverflow: true,
    allowDecimals: false,
    interval: 0
  }
};

const lines = [
  {
    dataKey: "impression",
    strokeWidth: 1,
    name: "impression",
    stroke: "green",
    connectNulls: true
  }
];

const rootElement = document.getElementById("root");
render(
  <div style={{ width: "90vw", height: "500px" }}>
    <h2>Numeric Axis</h2>
    <Chart data={numberAxisData} lines={lines} axis={chartNumericAxisProps} />
  </div>,
  rootElement
);
