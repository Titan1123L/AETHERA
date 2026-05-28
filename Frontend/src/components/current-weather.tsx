import { Button } from "./ui/button";
import { useFavorites } from "../hooks/use-favorite";

import { toast } from "sonner";
import { ArrowDown,ArrowUp,
  Droplets,
  Wind,
  Sunrise,
  Star,
  Sunset,
} from "lucide-react";

import type { WeatherData, GeocodingResponse } from "../types/weather";

interface CurrentWeatherProps {
  data: WeatherData;
  locationName?: GeocodingResponse;
}

export function CurrentWeather({ data, locationName }: CurrentWeatherProps) {
  if (!data || !data.weather?.length) {
    return null;
  }

  const {
    weather: [currentWeather],
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
    sys: { sunrise, sunset, country },
    name,
  } = data;

  const formatTemp = (value: number) => `${Math.round(value)}°`;

  const { favorites, addFavorite, deleteFavorite, isFavorite } = useFavorites();

  const favoriteCity = favorites.find(
    (city: { lat: number; lon: number; id: string | number }) =>
      city.lat === data.coord.lat && city.lon === data.coord.lon,
  );

  const favorite = isFavorite(data.coord.lat, data.coord.lon);

  const handleFavorite = () => {
    if (favorite && favoriteCity) {
      deleteFavorite.mutate(favoriteCity.id);
      toast.error("Removed from favorites");
      return;
    }

    addFavorite.mutate({
      city: locationName?.name || "Unknown",
      lat: data.coord.lat,
      lon: data.coord.lon,
      country: locationName?.country || "",
      state: locationName?.state,
    });

    toast.success("Added to favorites");
  };

  const formatTime = (timestamp: number) =>
    new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="glass-card dark:glass-card-dark overflow-hidden p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-muted-foreground">
            {locationName?.name}
          </h2>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleFavorite}
            className="hover:bg-primary/20 transition-colors"
          >
            <Star
              className={`h-5 w-5 transition-colors ${
                favorite
                  ? "fill-amber-400 text-amber-400"
                  : "text-muted-foreground"
              }`}
            />
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {locationName?.name || name}
              </h2>

              {locationName?.state && (
                <span className="text-sm text-muted-foreground">
                  {locationName.state}
                </span>
              )}
            </div>

            <p className="text-sm text-muted-foreground">
              {locationName?.country || country}
            </p>
          </div>

          <div className="flex items-center gap-6 py-4">
            <div className="relative">
              <p className="text-8xl font-bold tracking-tighter">
                {formatTemp(temp)}
              </p>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-2xl -z-10" />
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">
                Feels like{" "}
                <span className="text-primary font-semibold">
                  {formatTemp(feels_like)}
                </span>
              </p>

              <div className="flex gap-4 text-sm font-medium">
                <span className="flex items-center gap-1 bg-blue-500/10 dark:bg-blue-400/10 px-3 py-1 rounded-lg">
                  <ArrowDown className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  {formatTemp(temp_min)}
                </span>

                <span className="flex items-center gap-1 bg-red-500/10 dark:bg-red-400/10 px-3 py-1 rounded-lg">
                  <ArrowUp className="h-4 w-4 text-red-600 dark:text-red-400" />
                  {formatTemp(temp_max)}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="glass-effect backdrop-blur rounded-lg border border-white/10 bg-white/5 dark:bg-white/5 p-3 hover:bg-white/10 dark:hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-500/20 dark:bg-blue-400/20">
                  <Droplets className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Humidity
                  </p>
                  <p className="text-sm font-bold">{humidity}%</p>
                </div>
              </div>
            </div>

            <div className="glass-effect backdrop-blur rounded-lg border border-white/10 bg-white/5 dark:bg-white/5 p-3 hover:bg-white/10 dark:hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-cyan-500/20 dark:bg-cyan-400/20">
                  <Wind className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Wind
                  </p>
                  <p className="text-sm font-bold">{speed} m/s</p>
                </div>
              </div>
            </div>

            <div className="glass-effect backdrop-blur rounded-lg border border-white/10 bg-white/5 dark:bg-white/5 p-3 hover:bg-white/10 dark:hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-amber-500/20 dark:bg-amber-400/20">
                  <Sunrise className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Sunrise
                  </p>
                  <p className="text-sm font-bold">{formatTime(sunrise)}</p>
                </div>
              </div>
            </div>

            <div className="glass-effect backdrop-blur rounded-lg border border-white/10 bg-white/5 dark:bg-white/5 p-3 hover:bg-white/10 dark:hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-pink-500/20 dark:bg-pink-400/20">
                  <Sunset className="h-4 w-4 text-pink-600 dark:text-pink-400" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Sunset
                  </p>
                  <p className="text-sm font-bold">{formatTime(sunset)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="relative flex aspect-square w-full max-w-[220px] items-center justify-center">
            <img
              src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
              alt={currentWeather.description}
              className="h-full w-full object-contain"
            />

            <div className="absolute bottom-0 text-center">
              <p className="text-sm font-medium capitalize">
                {currentWeather.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;
