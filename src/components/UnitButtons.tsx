import { useWeather } from "../context/WeatherContextProvider";
import cn from "../utils/cn";

const UnitButtons = () => {
  const {
    searchParams: { units },
    setSearchParams,
  } = useWeather()!;

  return (
    <div className="flex gap-2 items-center unitBtns">
      <button
        className={cn({
          "scale-110": units === "metric",
        })}
        onClick={() =>
          setSearchParams((prev) => ({ ...prev, units: "metric" }))
        }
      >
        °C
      </button>
      <span>|</span>
      <button
        className={cn({
          "scale-110": units === "imperial",
        })}
        onClick={() =>
          setSearchParams((prev) => ({ ...prev, units: "imperial" }))
        }
      >
        °F
      </button>
    </div>
  );
};

export default UnitButtons;
