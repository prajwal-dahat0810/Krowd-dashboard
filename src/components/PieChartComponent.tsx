import { useEffect, useState, type FC } from 'react';
import {
  Cell,
  Legend,
  Pie,
  Sector,
  type SectorProps,
  PieChart,
  ResponsiveContainer,
} from 'recharts';
type Coordinate = {
  x: number;
  y: number;
};
type PieSectorData = {
  percent?: number;
  name?: string | number;
  midAngle?: number;
  middleRadius?: number;
  tooltipPosition?: Coordinate;
  value?: number;
  paddingAngle?: number;
  dataKey?: string;
  payload?: { name?: string; value?: number };
};
type PieSectorDataItem = React.SVGProps<SVGPathElement> &
  Partial<SectorProps> &
  PieSectorData;
const renderActiveShape = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill,
  payload,
  percent,
}: PieSectorDataItem) => {
  console.log(payload);
  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * (midAngle ?? 1));
  const cos = Math.cos(-RADIAN * (midAngle ?? 1));
  const sx = (cx ?? 0) + ((outerRadius ?? 0) + 10) * cos;
  const sy = (cy ?? 0) + ((outerRadius ?? 0) + 10) * sin;
  const mx = (cx ?? 0) + ((outerRadius ?? 0) + 30) * cos;
  const my = (cy ?? 0) + ((outerRadius ?? 0) + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        className=" text-sm text-wrap"
        fill={fill}
      >
        {payload?.name ?? ''}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={(outerRadius ?? 0) + 6}
        outerRadius={(outerRadius ?? 0) + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />

      <text
        x={ex + (cos >= 0 ? 1 : -1) * 4}
        y={ey}
        dy={2}
        textAnchor={textAnchor}
        fill="#999"
        className="max-sm:text-[10px] "
      >
        {`Rate ${((percent ?? 1) * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};

const PIE_COLORS = [
  '#3b82f6',
  '#22c55e',
  '#f97316',
  '#a855f7',
  '#ef4444',
  '#06b6d4',
];

export type PieChartComponentProps = {
  productShare: {
    name: string;
    value: number;
  }[];
};
export const PieChartComponent: FC<PieChartComponentProps> = ({
  productShare,
}) => {
  const [radius, setRadius] = useState({ inner: 60, outer: 80 });
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setRadius({ inner: 50, outer: 65 });
      } else {
        setRadius({ inner: 70, outer: 90 });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div className=" h-full bg-slate-50 rounded-2xl px-9 max-sm:px-2 pt-3 pb-10  ">
      <div className="flex w-full justify-between items-center ">
        <div className="font-bold font-sans text-[#1e3970] max-sm:text-sm">
          Distribution
        </div>
        <button className="bg-[#4d75ee]  border-[#1d4fe6] cursor-pointer border-2 px-6 py-1 max-sm:py-1 rounded-[8px] text-white ">
          Revenue
        </button>
      </div>
      <ResponsiveContainer
        width="100%"
        height="100%"
        className="px-1 py-2 mt-3 max-sm:mt-0  overflow-x-scroll"
      >
        <PieChart>
          <Pie
            activeShape={renderActiveShape}
            data={productShare}
            cx="50%"
            cy="50%"
            innerRadius={radius.inner}
            outerRadius={radius.outer}
            fill="#8884d8"
            dataKey="value"
          >
            <Legend />
            {productShare.map((entry, index) => (
              <Cell
                key={`cell-${entry.name}`}
                fill={PIE_COLORS[index % PIE_COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
