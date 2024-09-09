import { IconType } from "react-icons";
import { useWeather } from "../context/WeatherContextProvider";
import { Weather } from "../types";
import { FaTemperatureLow } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { GiCrossedAirFlows } from "react-icons/gi";
import { RiSpeedFill } from "react-icons/ri";
type OtherDetail = {
  Icon: IconType;
  name: string;
  value: string;
};

const MainWeather = ({
  weather: {
    condition,
    feels_like,
    icon,
    pressure,
    location,
    speed,
    temp_max,
    temp_min,
    time,
    temp,
    humidity,
  },
}: {
  weather: Weather;
}) => {
  const {
    searchParams: { units },
  } = useWeather()!;
  const temperatureUnit = units === "metric" ? "C" : "F";

  const others: OtherDetail[] = [
    {
      Icon: FaTemperatureLow,
      name: "Feels like",
      value: feels_like,
    },
    {
      Icon: WiHumidity,
      name: "Humidity",
      value: humidity,
    },
    {
      Icon: GiCrossedAirFlows,
      name: "Speed",
      value: speed,
    },
    {
      Icon: RiSpeedFill,
      name: "Pressure",
      value: pressure,
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center text-4xl lg:text-5xl">
      <div className="font-extrabold">{location}</div>
      <div className="flex items-center mt-10">
        <img className="w-32 md:w-40 lg:w-52" src={icon} alt="icon" />
        <div className="-ml-3">
          <div className="flex gap-2 items-center">
            <div className="font-bold" style={{ fontSize: "1.5em" }}>
              {temp}{" "}
            </div>
            <div className="flex flex-col justify-between">
              <div
                className="font-bold flex items-center"
                style={{ fontSize: "0.5em" }}
              >
                °{temperatureUnit}
                <span
                  className="ml-3 font-semibold"
                  style={{ fontSize: "0.8em" }}
                >
                  ({temp_max} / {temp_min})
                </span>
              </div>
              <div className="font-bold mt-1" style={{ fontSize: "0.4em" }}>
                {condition}
              </div>
            </div>
          </div>
          <div className="font-bold lg:mt-1" style={{ fontSize: "0.38em" }}>
            {time}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-none lg:grid-flow-col mt-16 w-full max-w-xl gap-y-20">
        {others.map(({ Icon, value }, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center text-3xl gap-4"
          >
            <Icon />
            <span
              className="font-semibold"
              style={{
                fontSize: "0.7em",
              }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainWeather;
