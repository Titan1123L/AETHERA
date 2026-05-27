import {
  useSearchParams,
  useParams,
} from "react-router-dom";

import {
  CurrentWeather,
} from "@/components/current-weather";

import {
  HourlyTemperature,
} from "@/components/hourly-temp";

import {
  WeatherDetails,
} from "@/components/weather-detail";

import {
  WeatherForecast,
} from "@/components/weather-forecast";

import {
  useWeatherQuery,
  useForecastQuery,
  useReverseGeocodeQuery,
} from "@/hooks/use-weather";

import WeatherSkeleton
from "@/components/loading";

export default function CityPage() {

  useParams();

  const [searchParams] =
    useSearchParams();

  // GET LAT/LON FROM URL
  const lat =
    Number(
      searchParams.get("lat")
    );

  const lon =
    Number(
      searchParams.get("lon")
    );

  const coordinates = {
    lat,
    lon,
  };

  // FETCH WEATHER
  const currentWeatherQuery =
    useWeatherQuery(
      coordinates
    );

  const forecastQuery =
    useForecastQuery(
      coordinates
    );

  const locationQuery =
    useReverseGeocodeQuery(
      coordinates
    );

  // LOADING
  if (
    currentWeatherQuery.isLoading ||
    forecastQuery.isLoading ||
    locationQuery.isLoading
  ) {

    return <WeatherSkeleton />;
  }

  // ERROR
  if (
    currentWeatherQuery.error ||
    forecastQuery.error
  ) {

    return (

      <div className="p-4">

        Failed to load weather data.

      </div>
    );
  }

  return (
    <div className="space-y-8 py-4">
      {/* Main Weather Grid */}
      <div className="grid gap-8 lg:grid-cols-5">
        {/* Current Weather - spans 3 cols */}
        <div className="lg:col-span-3">
          {currentWeatherQuery.data && (
            <CurrentWeather
              data={currentWeatherQuery.data}
              locationName={locationQuery.data?.[0]}
            />
          )}
        </div>

        {/* Hourly Temperature - spans 2 cols */}
        <div className="lg:col-span-2">
          {forecastQuery.data && (
            <HourlyTemperature data={forecastQuery.data} />
          )}
        </div>
      </div>

      {/* Weather Details & Forecast */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Weather Details */}
        {currentWeatherQuery.data && (
          <WeatherDetails data={currentWeatherQuery.data} />
        )}

        {/* Forecast */}
        {forecastQuery.data && (
          <WeatherForecast data={forecastQuery.data} />
        )}
      </div>
    </div>
  );
}
