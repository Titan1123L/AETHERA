import { useNavigate } from "react-router-dom";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { Button } from "@/components/ui/button";

import { X, Loader2 } from "lucide-react";

import { toast } from "sonner";

import { useFavorites } from "@/hooks/use-favorite";

import { useWeatherQuery } from "@/hooks/use-weather";

interface FavoriteCityCardProps {
  id: number;

  city: string;

  lat: number;

  lon: number;

  country: string;

  state?: string;

  onRemove: (id: number) => void;
}

function FavoriteCityCard({
  id,

  city,

  lat,

  lon,

  country,

  state,

  onRemove,
}: FavoriteCityCardProps) {
  const navigate = useNavigate();

  const { data: weather, isLoading } = useWeatherQuery({
    lat,
    lon,
  });

  const handleNavigate = () => {
    navigate(`/city/${city}?lat=${lat}&lon=${lon}`);
  };

  return (
    <div
      onClick={handleNavigate}
      className="relative min-w-[260px] cursor-pointer glass-card dark:glass-card-dark transition-all hover:shadow-xl hover:scale-105 group p-4"
    >
      {/* REMOVE BUTTON */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(id);
          toast.error(`${city} removed`);
        }}
      >
        <X className="h-3 w-3 text-red-600 dark:text-red-400" />
      </Button>

      {isLoading ? (
        <div className="flex h-20 items-center justify-center">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
        </div>
      ) : weather ? (
        <div className="space-y-3">
          {/* TOP - City Info & Weather Icon */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3 className="text-base font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent truncate">
                {city}
              </h3>
              <p className="text-xs text-muted-foreground truncate">
                {state ? `${state}, ` : ""}
                {country}
              </p>
            </div>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description}
              className="h-12 w-12 flex-shrink-0 drop-shadow-lg"
            />
          </div>

          {/* Temperature & Description */}
          <div className="border-t border-white/10 pt-2">
            <p className="text-3xl font-bold text-primary leading-none">
              {Math.round(weather.main.temp)}°
            </p>
            <p className="text-xs capitalize text-muted-foreground font-medium">
              {weather.weather[0].description}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">Failed to load</p>
      )}
    </div>
  );
}

export function FavoriteCities() {
  const { favorites, deleteFavorite } = useFavorites();

  if (!favorites || favorites.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Favorite Cities
      </h2>

      <ScrollArea className="w-full whitespace-nowrap rounded-xl border border-white/10">
        <div className="flex gap-4 px-4 py-3">
          {favorites.map((city: any) => (
            <FavoriteCityCard
              key={city.id}
              {...city}
              onRemove={() => deleteFavorite.mutate(city.id)}
            />
          ))}
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
