import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

import { format } from "date-fns";

import type { ForecastData } from "@/types/weather";

interface WeatherForecastProps {
  data: ForecastData;
}

interface DailyForecast {
  date: number;

  temp_min: number;

  temp_max: number;

  humidity: number;

  wind: number;

  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
}

export function WeatherForecast({ data }: WeatherForecastProps) {
  if (!data || !data.list) {
    return null;
  }

  // GROUP FORECAST BY DAY
  const dailyForecasts = data.list.reduce(
    (acc, forecast) => {
      const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");

      if (!acc[date]) {
        acc[date] = {
          temp_min: forecast.main.temp_min,

          temp_max: forecast.main.temp_max,

          humidity: forecast.main.humidity,

          wind: forecast.wind.speed,

          weather: forecast.weather[0],

          date: forecast.dt,
        };
      } else {
        acc[date].temp_min = Math.min(
          acc[date].temp_min,
          forecast.main.temp_min,
        );

        acc[date].temp_max = Math.max(
          acc[date].temp_max,
          forecast.main.temp_max,
        );
      }

      return acc;
    },

    {} as Record<string, DailyForecast>,
  );

  // NEXT 5 DAYS
  const nextDays = Object.values(dailyForecasts).slice(1, 6);

  // FORMAT TEMP
  const formatTemp = (temp: number) => `${Math.round(temp)}°`;

  return (
    <div className="glass-card dark:glass-card-dark overflow-hidden p-6">
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        5-Day Forecast
      </h2>

      <div className="grid gap-3">
        {nextDays.map((day) => (
          <div
            key={day.date}
            className="grid grid-cols-1 gap-4 rounded-xl glass-effect backdrop-blur border border-white/10 bg-white/5 dark:bg-white/5 p-4 md:grid-cols-3 md:items-center transition-all hover:bg-white/10 dark:hover:bg-white/10 hover:shadow-lg"
          >
            {/* DATE + DESCRIPTION */}
            <div className="flex items-center gap-3">
              <img
                src={`https://openweathermap.org/img/wn/${day.weather.icon}@2x.png`}
                alt={day.weather.description}
                className="h-14 w-14"
              />

              <div>
                <p className="font-medium">
                  {format(new Date(day.date * 1000), "EEE, MMM d")}
                </p>

                <p className="text-sm text-muted-foreground capitalize">
                  {day.weather.description}
                </p>
              </div>
            </div>

            {/* MIN/MAX TEMP */}
            <div className="flex justify-start gap-3 md:justify-center">
              <div className="flex items-center gap-2 bg-blue-500/15 px-3 py-2 rounded-lg">
                <ArrowDown className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-semibold">
                  {formatTemp(day.temp_min)}
                </span>
              </div>

              <div className="flex items-center gap-2 bg-red-500/15 px-3 py-2 rounded-lg">
                <ArrowUp className="h-4 w-4 text-red-600 dark:text-red-400" />
                <span className="text-sm font-semibold">
                  {formatTemp(day.temp_max)}
                </span>
              </div>
            </div>

            {/* HUMIDITY + WIND */}
            <div className="flex justify-start gap-3 md:justify-end">
              <div className="flex items-center gap-2 text-sm">
                <Droplets className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="font-medium">{day.humidity}%</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Wind className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                <span className="font-medium">{day.wind} m/s</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default WeatherForecast;
