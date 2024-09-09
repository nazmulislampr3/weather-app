import { useWeather } from "../context/WeatherContextProvider";
import ErrorPage from "./ErrorPage";
import MainData from "./MainData";

const MainLayout = () => {
  const { error, weather } = useWeather()!;
  return (
    <div className="overflow-y-auto lg:overflow-hidden h-full">
      <div className="h-full py-2 lg:scrollbar">
        {!error && weather ? (
          <MainData weather={weather} />
        ) : error ? (
          <ErrorPage error={error} />
        ) : null}
      </div>
    </div>
  );
};

export default MainLayout;
