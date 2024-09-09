import { BiCurrentLocation } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import UnitButtons from "./UnitButtons";
import { useEffect, useRef, useState } from "react";
import { useWeather } from "../context/WeatherContextProvider";

const Searchbar = () => {
  const [location, setLocation] = useState<string>("");
  const { setSearchParams } = useWeather()!;

  const searchBtnRef = useRef<any>(null);
  const currentLocationBtnRef = useRef<any>(null);

  useEffect(() => {
    currentLocationBtnRef.current.click();
  }, []);

  return (
    <div className="flex justify-center py-1 gap-4">
      <div className="w-full max-w-3xl flex">
        <input
          className="w-full py-2 px-3 outline-0 text-sm lg:text-lg font-bold text-slate-600"
          type="text"
          value={location}
          onChange={({ target: { value } }) => setLocation(value)}
          onKeyDown={({ key }) =>
            key === "Enter" && searchBtnRef.current.click()
          }
        />
        <div className="flex h-full">
          <button
            ref={searchBtnRef}
            className="searchbarIcon"
            onClick={() =>
              setSearchParams((prev) => ({ units: prev.units, q: location }))
            }
          >
            <FaSearch />
          </button>
          <button
            className="searchbarIcon"
            ref={currentLocationBtnRef}
            onClick={() => {
              navigator.geolocation.getCurrentPosition(
                ({ coords: { latitude, longitude } }) => {
                  setSearchParams((prev) => ({
                    units: prev.units,
                    lat: String(latitude),
                    lon: String(longitude),
                  }));
                }
              );

              setLocation("");
            }}
          >
            <BiCurrentLocation />
          </button>
        </div>
      </div>
      <div className="my-auto hidden lg:block">
        <UnitButtons />
      </div>
    </div>
  );
};

export default Searchbar;
