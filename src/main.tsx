import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import WeatherContextProvider from "./context/WeatherContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <WeatherContextProvider>
    <App />
  </WeatherContextProvider>
);
