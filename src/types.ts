export type SearchParams = {
  q?: string;
  lon?: string;
  lat?: string;
  units: "metric" | "imperial";
};

export type WeatherMain = {
  temp: number;
  time: string;
  icon: string;
};

export type WeatherError = {
  message: string;
};

export type Weather = WeatherMain & {
  location: string;
  lat: number;
  lon: number;
  condition: string;
  main_condition: string;
  feels_like: string;
  temp_min: string;
  temp_max: string;
  pressure: string;
  humidity: string;
  speed: string;
  hourly: WeatherMain[];
  daily: WeatherMain[];
};

export type WeatherType = Weather | null;
// | null;
