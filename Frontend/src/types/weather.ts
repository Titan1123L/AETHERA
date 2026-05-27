export interface Coordinates {
  lat: number;
  lon: number;
}


// CURRENT WEATHER RESPONSE
export interface WeatherData {

  coord: {
    lon: number;
    lat: number;
  };

  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];

  base: string;

  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };

  visibility: number;

  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };

  clouds: {
    all: number;
  };

  dt: number;

  sys: {
    type?: number;
    id?: number;
    country: string;
    sunrise: number;
    sunset: number;
  };

  timezone: number;

  id: number;

  name: string;

  cod: number;
}


// SINGLE FORECAST ITEM
export interface ForecastItem {

  dt: number;

  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };

  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];

  clouds: {
    all: number;
  };

  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };

  visibility: number;

  pop: number;

  rain?: {
    "3h": number;
  };

  snow?: {
    "3h": number;
  };

  dt_txt: string;
}


// 5 DAY FORECAST RESPONSE
export interface ForecastData {

  cod: string;

  message: number;

  cnt: number;

  list: ForecastItem[];

  city: {
    id: number;
    name: string;

    coord: Coordinates;

    country: string;

    population: number;

    timezone: number;

    sunrise: number;

    sunset: number;
  };
}


// GEOCODING RESPONSE
export interface GeocodingResponse {

  name: string;

  local_names?: {
    [key: string]: string;
  };

  lat: number;

  lon: number;

  country: string;

  state?: string;
}