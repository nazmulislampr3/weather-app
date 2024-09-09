import { Weather } from "../types";
import Forecast from "./Forecast";
import MainWeather from "./MainWeather";
import UnitButtons from "./UnitButtons";

const MainData = ({ weather }: { weather: Weather }) => {
  return (
    <div className="h-full overflow-y-auto lg:overflow-hidden grid lg:grid-cols-2 gap-10 px-4 scrollbar">
      <div className="mx-auto lg:hidden">
        <UnitButtons />
      </div>
      <MainWeather weather={weather} />
      <div className="flex flex-col items-center lg:overflow-y-auto lg:scrollbar mt-24 lg:mt-4 lg:pr-5">
        <div className="flex flex-col gap-20 mt-0 w-full max-w-xl">
          {weather.hourly.length > 0 ? (
            <Forecast forecast={weather.hourly} title="Hourly forecast" />
          ) : null}
          {weather.daily.length > 0 ? (
            <Forecast forecast={weather.daily} title="Daily forecast" />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MainData;
