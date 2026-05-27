import { useState } from "react";

import { useNavigate } from "react-router-dom";

// import { format } from "date-fns";

import { Search, Loader2, Clock, Star } from "lucide-react";

import { useLocationSearch } from "@/hooks/use-weather";

import { useSearchHistory } from "../hooks/use-search-history";

import { useFavorites } from "../hooks/use-favorite";

import { X } from "lucide-react";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

import { Button } from "@/components/ui/button";

export function CitySearch() {
  const [open, setOpen] = useState(false);

  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const { data: locations, isLoading } = useLocationSearch(query);

  const { favorites } = useFavorites();

  const { history, deleteHistory, addToHistory } = useSearchHistory();

  // SELECT CITY
  const handleSelect = (cityData: string) => {
    const parts = cityData.split("|");

    const lat = parts[0];

    const lon = parts[1];

    const name = parts[2];

    const country = parts[3];

    // SAVE HISTORY
    addToHistory.mutate({
      city: name,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      country,
    });

    // CLOSE MODAL
    setOpen(false);

    // CLEAR SEARCH
    setQuery("");

    // NAVIGATE
    navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
  };

  return (
    <>
      {/* SEARCH BUTTON */}
      <Button
        variant="outline"
        className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-52 lg:w-72 glass-effect backdrop-blur border-white/20 bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 transition-all"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4 text-primary" />
        <span className="truncate">Search cities worldwide...</span>
      </Button>

      {/* SEARCH MODAL */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="rounded-lg">
          {/* INPUT */}
          <CommandInput
            placeholder="Search cities, regions, or countries..."
            value={query}
            onValueChange={setQuery}
            className="border-b border-white/10"
          />

          <CommandList>
            {/* LOADING */}
            {isLoading && (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
              </div>
            )}

            {/* EMPTY */}
            {!isLoading && query.length > 2 && locations?.length === 0 && (
              <CommandEmpty className="text-center py-6 text-muted-foreground">
                No cities found for &quot;{query}&quot;
              </CommandEmpty>
            )}

            {/* FAVORITES */}
            {favorites.length > 0 && (
              <CommandGroup heading="⭐ Favorite Cities">
                {favorites.map((city: any) => (
                  <CommandItem
                    key={city.id}
                    value={`${city.lat}|${city.lon}|${city.city}|${city.country}`}
                    onSelect={handleSelect}
                    className="cursor-pointer hover:bg-primary/10 transition-colors"
                  >
                    <Star className="mr-2 h-4 w-4 text-amber-500 fill-amber-500" />

                    <span className="font-medium">{city.city}</span>

                    {city.state && (
                      <span className="text-xs text-muted-foreground">
                        , {city.state}
                      </span>
                    )}

                    <span className="text-xs text-muted-foreground">
                      , {city.country}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {/* HISTORY */}
            {history.length > 0 && (
              <>
                <CommandSeparator className="bg-white/10" />

                <CommandGroup heading="🕐 Recent Searches">
                  {history.slice(0, 5).map((item: any) => (
                    <CommandItem
                      key={item.id}
                      value={`${item.lat}|${item.lon}|${item.city}|${item.country}`}
                      onSelect={handleSelect}
                      className="cursor-pointer hover:bg-accent/10 transition-colors group"
                    >
                      <Clock className="mr-2 h-4 w-4 text-cyan-500" />

                      <span className="flex-1">{item.city}</span>

                      {item.state && (
                        <span className="text-xs text-muted-foreground">
                          {item.state}
                        </span>
                      )}

                      <span className="text-xs text-muted-foreground">
                        {item.country}
                      </span>

                      <button
                        className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20 rounded p-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteHistory.mutate(item.id);
                        }}
                      >
                        <X className="h-3 w-3 text-red-600 dark:text-red-400" />
                      </button>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}

            {/* SEARCH RESULTS */}
            {locations && locations.length > 0 && (
              <>
                <CommandSeparator className="bg-white/10" />

                <CommandGroup heading="🔍 Search Results">
                  {locations.slice(0, 10).map((location: any) => (
                    <CommandItem
                      key={`${location.lat}-${location.lon}`}
                      value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                      onSelect={handleSelect}
                      className="cursor-pointer hover:bg-primary/10 transition-colors"
                    >
                      <Search className="mr-2 h-4 w-4 text-primary" />

                      <span className="font-medium">{location.name}</span>

                      {location.state && (
                        <span className="text-xs text-muted-foreground">
                          , {location.state}
                        </span>
                      )}

                      <span className="text-xs text-muted-foreground ml-auto">
                        {location.country}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
export default CitySearch;
