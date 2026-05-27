import { useQuery } from "@tanstack/react-query";

interface Coordinates {
  lat: number;
  lon: number;
}

const BASE_URL =
  "http://localhost:8080/api/weather";

export const WEATHER_KEYS = {

  weather: (coords: Coordinates) =>
    ["weather", coords] as const,

  forecast: (coords: Coordinates) =>
    ["forecast", coords] as const,

  location: (coords: Coordinates) =>
    ["location", coords] as const,

  search: (query: string) =>
    ["location-search", query] as const,

} as const;


// CURRENT WEATHER
export function useWeatherQuery(
  coordinates: Coordinates | null
) {

  return useQuery({

    queryKey:
      WEATHER_KEYS.weather(
        coordinates ?? {
          lat: 0,
          lon: 0,
        }
      ),

    queryFn: async () => {

      if (!coordinates) return null;

      const response = await fetch(
        `${BASE_URL}/current?lat=${coordinates.lat}&lon=${coordinates.lon}`
      );

      return response.json();
    },

    enabled: !!coordinates,
  });
}


// 5 DAY FORECAST
export function useForecastQuery(
  coordinates: Coordinates | null
) {

  return useQuery({

    queryKey:
      WEATHER_KEYS.forecast(
        coordinates ?? {
          lat: 0,
          lon: 0,
        }
      ),

    queryFn: async () => {

      if (!coordinates) return null;

      const response = await fetch(
        `${BASE_URL}/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}`
      );

      return response.json();
    },

    enabled: !!coordinates,
  });
}


// REVERSE GEOCODING
export function useReverseGeocodeQuery(
  coordinates: Coordinates | null
) {

  return useQuery({

    queryKey:
      WEATHER_KEYS.location(
        coordinates ?? {
          lat: 0,
          lon: 0,
        }
      ),

    queryFn: async () => {

      if (!coordinates) return null;

      const response = await fetch(
        `${BASE_URL}/reverse-geocode?lat=${coordinates.lat}&lon=${coordinates.lon}`
      );

      return response.json();
    },

    enabled: !!coordinates,
  });
}


// SEARCH LOCATIONS
export function useLocationSearch(
  query: string
) {

  return useQuery({

    queryKey:
      WEATHER_KEYS.search(query),

    queryFn: async () => {

      const response = await fetch(
        `${BASE_URL}/search?query=${query}`
      );

      return response.json();
    },

    enabled: query.length >= 3,
  });
}