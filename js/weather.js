import { forecastData } from "./data.js";
import { loadWeatherContent } from "./main.js";

const data = {
  forecast: "cloudy",
  forecast_temp: "23",
  icon: "./assets/weather-icons/noun_Cloud_1188486.svg",
  alt: "cloudy",
  colorText: "#f47775",
  backgroundColor: "#f4f7f8",
  text: "Get your sunnies on. Stockholm is looking rather great today.",
  sunset: "22.30",
  sunrise: "08.00",
};

export const handleForecastData = (apiData) => {
  console.log(apiData);

  // Build a new data object with all logic

  loadWeatherContent(data);
};
