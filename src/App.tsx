import "./styles.css";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from "react";
import {
  LineChart,
  Line,
  LineProps,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { Props as LegendProps } from "recharts/types/component/Legend";
import type { Props as XAxisProps } from "recharts/types/cartesian/XAxis";
import type { Props as YAxisProps } from "recharts/types/cartesian/YAxis";
import { useZoomAndPan } from "./hooks/useZoomAndPan";
import { useTooltipSorting } from "./hooks/useTooltipSorter";

export type LineChartProps<T extends Record<string, unknown>> = {
  data: T[];
  lines: LineProps[];
  chartOptions?: PropsOf<typeof LineChart>;
  gridOptions?: PropsOf<typeof CartesianGrid> & { hide?: boolean };
  axis?: {
    x?: XAxisProps & { hide?: boolean };
    y?: YAxisProps & { hide?: boolean };
  };
  tooltip?: PropsOf<Tooltip<number, string>> & { hide?: boolean };
  legend?: LegendProps & { hide?: boolean };
};

const DEFAULT_CHART_PROPS: PropsOf<typeof LineChart> = {
  width: 500,
  height: 400,
  margin: {
    top: 25,
    right: 10,
    left: 10,
    bottom: 0
  }
};

const DEFAULT_GRID_PROPS: PropsOf<typeof CartesianGrid> = {
  strokeDasharray: "3 3"
};

const RechartsClipPaths = forwardRef((_, ref: React.ForwardedRef<any>) => {
  const grid = useRef<SVGRectElement>(null);
  const axis = useRef<SVGRectElement>(null);
  useImperativeHandle(ref, () => ({
    grid,
    axis
  }));

  return (
    <>
      <clipPath id="chart-xaxis-clip">
        <rect fill="rgba(0,0,0,0)" height="100%" ref={axis} />
      </clipPath>
      <clipPath id="chart-grid-clip">
        <rect fill="rgba(0,0,0,0)" height="100%" ref={grid} />
      </clipPath>
    </>
  );
});

const Chart = <T extends Record<string, unknown>>({
  data,
  lines,
  chartOptions,
  gridOptions,
  axis,
  tooltip,
  legend
}: LineChartProps<T>) => {
  const [loaded, setLoaded] = useState(false);

  const {
    clipPathRefs,
    xPadding,
    onChartMouseDown,
    onChartMouseUp,
    setWrapperRef,
    onChartMouseMove
  } = useZoomAndPan({
    chartLoaded: loaded
  });

  const { onSeriesMouseOver, tooltipSorter } = useTooltipSorting();

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 100);
  }, []);

  return (
    <ResponsiveContainer
      className="noselect"
      width="100%"
      height="100%"
      debounce={100}
      ref={setWrapperRef}
    >
      <LineChart
        {...{
          ...DEFAULT_CHART_PROPS,
          margin: {
            ...DEFAULT_CHART_PROPS.margin,
            ...chartOptions?.margin
          }
        }}
        data={data}
        onMouseMove={onChartMouseMove}
        onMouseDown={onChartMouseDown}
        onMouseUp={onChartMouseUp}
      >
        <defs>
          <RechartsClipPaths ref={clipPathRefs} />
        </defs>
        <CartesianGrid
          {...{
            ...(DEFAULT_GRID_PROPS as any),
            ...gridOptions,
            stroke: gridOptions?.hide ? "transparent" : gridOptions?.stroke
          }}
        />
        {axis?.x?.hide ? null : (
          <XAxis
            {...axis?.x}
            padding={{ left: xPadding[0], right: xPadding[1] }}
            domain={["dataMin", "dataMax"]}
            className="x-axis"
          />
        )}
        {axis?.y?.hide ? null : <YAxis {...axis?.y} />}
        {tooltip?.hide ? null : (
          <Tooltip {...tooltip} itemSorter={tooltipSorter} />
        )}
        {legend?.hide ? null : <Legend {...(legend as any)} />}
        {lines.map((l, i) => (
          <Line
            key={`${l.key}-${i}`}
            id={l.key}
            {...(l as any)}
            className={`${l.className || ""}`}
            activeDot={{
              onMouseOver: () => onSeriesMouseOver(String(l.dataKey))
            }}
            onMouseOver={() => onSeriesMouseOver(String(l.dataKey))}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
