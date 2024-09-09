import { DateTime } from "luxon";
import { SearchParams, Weather, WeatherError, WeatherMain } from "../types";

const BASE_URL = "https://api.openweathermap.org/data/2.5/";
const API_KEY = "85394a0f8bc54a2dd2569dd942cdc340";

const getIcon = (icon: string) =>
  `https://openweathermap.org/img/wn/${icon}@2x.png`;

const formatTime = (secs: number, format: string) => {
  return DateTime.fromSeconds(secs, { zone: "utc" }).toFormat(format);
};

const getForcast = async (
  { lat, lon, units }: SearchParams,
  timezone: number,
  temperatureUnit: "F" | "C"
): Promise<{ daily: WeatherMain[]; hourly: WeatherMain[] }> => {
  const url: any = new URL(BASE_URL + "forecast");
  url.search = new URLSearchParams({
    lat: String(lat),
    lon: String(lon),
    units,
    appid: API_KEY,
  });

  const forecast = await fetch(url).then((res) => res.json());
  let forecastList = forecast.list.map(
    ({
      dt,
      main: { temp },
      weather: {
        0: { icon },
      },
    }: any) => ({
      dt,
      dt_txt: formatTime(dt + timezone, "yyyy-MM-dd hh:mm:ss a"),
      temp: `${temp.toFixed()} °${temperatureUnit}`,
      icon: getIcon(icon),
    })
  );

  const hourly = forecastList
    .slice(0, 8)
    .map(({ dt, dt_txt, ...others }: any) => ({
      time: formatTime(dt + timezone, "hh:mm:ss a"),
      ...others,
    }));

  const todayDate = formatTime(
    Number((new Date().getTime() / 1000).toFixed()),
    "yyyy-MM-dd"
  );

  const daily = forecastList
    .filter(({ dt_txt }: any) => {
      const [part1, part2, part3] = dt_txt.split(" ");
      return part1 !== todayDate && part2 === "12:00:00" && part3 === "AM";
    })
    .map(({ dt, dt_txt, ...others }: any) => ({
      time: formatTime(dt + timezone, "ccc"),
      ...others,
    }));

  return {
    daily,
    hourly,
  };
};

const getWeather = async (
  searchParams: SearchParams
): Promise<Weather | WeatherError> => {
  const url: any = new URL(BASE_URL + "weather");
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  const res = await fetch(url).then((res) => res.json());
  if (res.message) {
    return { message: res.message };
  }

  const {
    coord: { lon, lat },
    dt,
    main: { temp, temp_max, temp_min, feels_like, humidity, pressure },
    name,
    sys: { country },
    timezone,
    weather: {
      0: { icon, description: condition, main },
    },
    wind: { speed },
  } = res;

  const temperatureUnit = searchParams.units === "metric" ? "C" : "F";
  const forecast = await getForcast(
    { lat: String(lat), lon: String(lon), units: searchParams.units },
    timezone,
    temperatureUnit
  );

  return {
    location: `${name}, ${country}`,
    lat,
    lon,
    condition,
    feels_like: `${feels_like.toFixed()} °${temperatureUnit}`,
    humidity: `${humidity.toFixed()}%`,
    icon: getIcon(icon),
    pressure: `${pressure.toFixed()} hPa`,
    temp: temp.toFixed(),
    temp_max: `${temp_max.toFixed()} °${temperatureUnit}`,
    temp_min: `${temp_min.toFixed()} °${temperatureUnit}`,
    time: formatTime(dt + timezone, "ccc, dd MMM | hh:mm:ss a"),
    speed: `${speed.toFixed()} km/h`,
    main_condition: main,
    ...forecast,
  };
};

export default getWeather;
