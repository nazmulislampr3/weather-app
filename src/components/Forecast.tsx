import { WeatherMain } from "../types";

const Forecast = ({
  forecast,
  title,
}: {
  forecast: WeatherMain[];
  title: string;
}) => {
  return (
    <div className="">
      <h3 className="font-bold text-4xl">{title}</h3>
      <div className="flex flex-col gap-1 mt-4">
        {forecast.map(({ icon, temp, time }, index) => (
          <div
            key={index}
            className="flex items-center justify-between lg:text-xl font-semibold"
          >
            <span>{time}</span>
            <img className="w-20" src={icon} alt="icon" />
            <span>{temp}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
