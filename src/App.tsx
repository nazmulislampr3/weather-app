import MainLayout from "./components/MainLayout";
import Searchbar from "./components/Searchbar";
import { useWeather } from "./context/WeatherContextProvider";

const App = () => {
  const { weather } = useWeather()!;

  const bg = weather?.main_condition
    ? `/images/${weather.main_condition}.jpg`
    : null;
  return (
    <div
      className="bg-center bg-cover min-h-screen bg-blue-800 flex items-center justify-center"
      style={{
        ...(bg ? { background: `url("${bg}")` } : {}),
      }}
    >
      <div className="glass w-full max-w-6xl h-screen lg:h-[80vh] flex flex-col lg:pt-3 p-1">
        <Searchbar />
        <MainLayout />
      </div>
    </div>
  );
};

export default App;
