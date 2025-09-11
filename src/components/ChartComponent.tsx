import type { FC } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
export type MonthlySeriesItem = {
  revenue: number;
  target: number;
  month: string;
};
export type ChartComponentProps = {
  monthlySeries: MonthlySeriesItem[];
};
export const ChartComponent: FC<ChartComponentProps> = ({ monthlySeries }) => {
  console.log(monthlySeries);
  return (
    <div className=" h-full bg-slate-50 rounded-2xl focus:ring-0 px-9 max-sm:px-2 pt-3 pb-10 ">
      <div className="flex w-full justify-between items-center ">
        <div className="font-bold font-sans text-[#1e3970]  max-sm:text-sm">
          Performance
        </div>
        <button className="bg-[#f16c6c] border-[#d94747] border-2 cursor-pointer px-6 py-1 max-sm:py-1 rounded-md text-white ">
          Sales
        </button>
      </div>{" "}
      <ResponsiveContainer
        width={"100%"}
        height={"100%"}
        className="px-1 py-2 outline-none focus:outline-none ring-0 focus:ring-0"
      >
        <LineChart
          data={monthlySeries}
          margin={{ left: 1, right: 14, top: 40, bottom: 0 }}
        >
          {" "}
          <Legend
            width={100}
            fontSize={"10px"}
            wrapperStyle={{
              top: 10,
              right: 20,
              backgroundColor: "#f5f5f5",
              border: "1px solid #d5d5d5",
              borderRadius: 3,
              lineHeight: "20px",
            }}
          />
          <XAxis dataKey={"month"} fontSize={"10px"} fontWeight={500} />
          <YAxis dataKey={"target"} fontSize={"10px"} fontWeight={500} />
          <Tooltip
            formatter={(value: number, name: string) => [
              `₹${value.toLocaleString()}`,
              name,
            ]}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            name="Revenue"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="target"
            name="Target"
            stroke="#ef4444"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
