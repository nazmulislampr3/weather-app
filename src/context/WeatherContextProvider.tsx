import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { createContext, useContextSelector } from "use-context-selector";
import getWeather from "../services/getWeather";
import { SearchParams, Weather, WeatherError, WeatherType } from "../types";

const weatherContext = createContext<{
  weather: WeatherType;
  searchParams: SearchParams;
  setSearchParams: Dispatch<SetStateAction<SearchParams>>;
  error: WeatherError | null;
} | null>(null);

const WeatherContextProvider = ({ children }: { children: ReactNode }) => {
  const [weather, setWeather] = useState<WeatherType>(null);
  const [error, setError] = useState<WeatherError | null>(null);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    units: "metric",
  });

  useEffect(() => {
    if (searchParams.q || (searchParams.lat && searchParams.lon)) {
      getWeather(searchParams).then((res) => {
        if (res.message) {
          setError(res as WeatherError);
          setWeather(null);
        } else {
          setWeather(res as Weather);
          setError(null);
        }
      });
    }
  }, [searchParams]);

  return (
    <weatherContext.Provider
      value={{ weather, searchParams, setSearchParams, error }}
    >
      {children}
    </weatherContext.Provider>
  );
};

export default WeatherContextProvider;

export const useWeather = () =>
  useContextSelector(weatherContext, (state) => state);
