import { weatherData } from "./data.js";

// Globals
const main = document.getElementById("main");
const footer = document.getElementById("footer");

// const data = {
//   forecast: "cloudy",
//   forecast_temp: "23",
//   icon: "./assets/weather-icons/noun_Cloud_1188486.svg",
//   alt: "cloudy",
//   colorText: "#f47775",
//   backgroundColor: "#f4f7f8",
//   text: "Get your sunnies on. Stockholm is looking rather great today.",
//   sunset: "22.30",
//   sunrise: "08.00",
// };

// Function that handles the theme colors depending on the current weather
const handleColorTheme = (currentWeather) => {
  const theme = weatherData[currentWeather];

  if (!theme) {
    console.log("Load default theme");
    return false;
  }

  // Set main theme for weather app
  main.style.backgroundColor = theme.bgColor;
  main.style.color = theme.color;
  // Set opacity to footer
  footer.style.backgroundColor = `${theme.color}33`;
};

// Function that handles all the logic
export const handleWeatherData = (data) => {
  // Make some logic in here and then pass that to innerhtml
  console.log(weatherData);
  console.log(data);

  const currentWeather = data.weather[0].main;

  // Get the right color theme depending on weather
  handleColorTheme(currentWeather);

  // getCurrentWeatherData
  // getFiveDaysForecast
};
