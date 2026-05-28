import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { format } from "date-fns";

import type { ForecastData } from "@/types/weather";

interface HourlyTemperatureProps {
  data: ForecastData;
}

interface ChartData {
  time: string;
  temp: number;
  feels_like: number;
}

export function HourlyTemperature({ data }: HourlyTemperatureProps) {
  if (!data || !data.list) {
    return null;
  }
  const chartData: ChartData[] = data.list.slice(0, 8).map((item) => ({
    time: format(new Date(item.dt * 1000), "ha"),

    temp: Math.round(item.main.temp),

    feels_like: Math.round(item.main.feels_like),
  }));

  return (
    <div className="glass-card dark:glass-card-dark overflow-hidden p-6 flex-1">
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Today&apos;s Temperature
      </h2>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            {/* X AXIS */}
            <XAxis
              dataKey="time"
              stroke="currentColor"
              className="text-muted-foreground"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              stroke="currentColor"
              className="text-muted-foreground"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}°`}
            />

            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="glass-effect backdrop-blur rounded-lg border border-white/20 bg-white/80 dark:bg-black/40 p-3 shadow-lg">
                      <div className="grid grid-cols-2 gap-4">
                        {/* TEMP */}
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground font-semibold">
                            Temp
                          </span>

                          <span className="font-bold text-primary">
                            {payload[0].value}°
                          </span>
                        </div>

                        {/* FEELS LIKE */}
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground font-semibold">
                            Feels
                          </span>

                          <span className="font-bold text-accent">
                            {payload[1].value}°
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }

                return null;
              }}
            />

            {/* ACTUAL TEMP */}
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#2563eb"
              strokeWidth={3}
              dot={false}
            />

            {/* FEELS LIKE */}
            <Line
              type="monotone"
              dataKey="feels_like"
              stroke="#64748b"
              strokeWidth={2}
              dot={false}
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
export default HourlyTemperature;
