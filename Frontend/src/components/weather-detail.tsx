

import {
  Sunrise,
  Sunset,
 Compass,
  Gauge,
} from "lucide-react";

import { format } from "date-fns";

import type {
  WeatherData,
} from "@/types/weather";

interface WeatherDetailsProps {
  data: WeatherData;
}

export function WeatherDetails({
  data,
}: WeatherDetailsProps) {
    if (!data) {
  return null;
}

  const {
    wind,
    main,
    sys,
  } = data;

  // FORMAT TIME
  const formatTime = (
    timestamp: number
  ) => {

    return format(
      new Date(timestamp * 1000),
      "h:mm a"
    );
  };

  // WIND DIRECTION
  const getWindDirection = (
    degree: number
  ) => {

    const directions = [
      "N",
      "NE",
      "E",
      "SE",
      "S",
      "SW",
      "W",
      "NW",
    ];

    const index =
      Math.round(
        (
          (degree %= 360) < 0
            ? degree + 360
            : degree
        ) / 45
      ) % 8;

    return directions[index];
  };

  const details = [

    {
      title: "Sunrise",

      value: formatTime(
        sys.sunrise
      ),

      icon: Sunrise,

      color: "text-orange-500",
    },

    {
      title: "Sunset",

      value: formatTime(
        sys.sunset
      ),

      icon: Sunset,

      color: "text-pink-500",
    },

    {
      title: "Wind Direction",

      value: `${getWindDirection(
        wind.deg
      )} (${wind.deg}°)`,

      icon: Compass,

      color: "text-green-500",
    },

    {
      title: "Pressure",

      value: `${main.pressure} hPa`,

      icon: Gauge,

      color: "text-purple-500",
    },
  ];

  return (
    <div className="glass-card dark:glass-card-dark overflow-hidden p-6">
      <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Weather Details
      </h2>

      <div className="grid gap-2 sm:grid-cols-2">
        {details.map((detail) => (
          <div
            key={detail.title}
            className="glass-effect backdrop-blur rounded-lg border border-white/10 bg-white/5 dark:bg-white/5 p-3 transition-all hover:bg-white/10 dark:hover:bg-white/10 hover:shadow-lg"
          >
            <div className="flex items-start gap-2">
              <div className={`p-1.5 rounded-lg flex-shrink-0 ${detail.color.replace('text-', 'bg-')}/20`}>
                <detail.icon
                  className={`h-3.5 w-3.5 ${detail.color}`}
                />
              </div>

              <div className="space-y-0.5 flex-1 min-w-0">
                <p className="text-xs font-medium text-muted-foreground leading-none">
                  {detail.title}
                </p>

                <p className="text-xs font-semibold truncate">
                  {detail.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default WeatherDetails;
