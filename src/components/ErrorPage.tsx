import { WeatherError } from "../types";
import { MdError } from "react-icons/md";

const ErrorPage = ({ error }: { error: WeatherError }) => {
  return (
    <div className="h-full w-full flex items-center">
      <div className="m-auto font-bold text-2xl lg:text-4xl flex items-center gap-1.5 justify-center">
        <MdError />
        <span className="-mt-1">{error.message}</span>
      </div>
    </div>
  );
};

export default ErrorPage;
