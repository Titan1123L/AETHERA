import { Button } from "@/components/ui/button";
import { useGeolocation } from "@/hooks/use-geolocation";
import WeatherSkeleton from "@/components/loading";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { MapPin, AlertTriangle, RefreshCw, AlertCircle } from "lucide-react";
import {
  useForecastQuery,
  useReverseGeocodeQuery,
  useWeatherQuery,
} from "@/hooks/use-weather";
import CurrentWeather from "@/components/current-weather";
import HourlyTemperature from "@/components/hourly-temp";
import WeatherDetails from "@/components/weather-detail";
import WeatherForecast from "../components/weather-forecast";
import { FavoriteCities } from "../components/favirote-cities";

const weatherDashboard = () => {
  const { coordinates, error, getLocation, isLoading } = useGeolocation();

  const locationQuery = useReverseGeocodeQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const currentWeatherQuery = useWeatherQuery(coordinates);


  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      currentWeatherQuery.refetch();
      forecastQuery.refetch();
      locationQuery.refetch();
    }
  };

  if (isLoading) {
    return <WeatherSkeleton />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{error}</p>
          <Button variant="outline" onClick={getLocation} className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  if (!coordinates) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Location Unavailable</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          Unable to retrieve your location. Please ensure location services are
          enabled and try again.
          <Button
            variant="outline"
            onClick={getLocation}
            className="w-fit mt-4"
          >
            <MapPin className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (currentWeatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Weather Error</AlertTitle>
        <AlertDescription>
          Unable to retrieve weather information. Please try again later.
          <Button
            variant="outline"
            onClick={handleRefresh}
            className="w-fit mt-4"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!currentWeatherQuery.data || !forecastQuery.data) {
    return <WeatherSkeleton />;
  }

  return (
    <div className="space-y-12 py-6">
      {/* ===== Favorite Cities Section ===== */}
      <section className="border-b border-white/10 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1">
            <FavoriteCities />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={handleRefresh}
            disabled={currentWeatherQuery.isFetching || forecastQuery.isFetching}
            className="ml-4 hover:bg-primary/10 transition-colors"
            title="Refresh weather data"
          >
            <RefreshCw
              className={`h-5 w-5 ${
                currentWeatherQuery.isFetching ? "animate-spin" : ""
              }`}
            />
          </Button>
        </div>
      </section>

      {/* ===== Current Weather Section ===== */}
      <section>
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            {currentWeatherQuery.data && (
              <CurrentWeather
                data={currentWeatherQuery.data}
                locationName={locationQuery.data?.[0]}
              />
            )}
          </div>
          <div className="lg:col-span-2">
            {forecastQuery.data && (
              <HourlyTemperature data={forecastQuery.data} />
            )}
          </div>
        </div>
      </section>

      {/* ===== Weather Details & Forecast Section ===== */}
      <section className="border-t border-white/10 pt-8">
        <div className="grid gap-8 md:grid-cols-2">
          <WeatherDetails data={currentWeatherQuery.data} />
          <WeatherForecast data={forecastQuery.data} />
        </div>
      </section>
    </div>
  );
};
export default weatherDashboard;
