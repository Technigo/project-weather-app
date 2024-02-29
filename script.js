const todaysWeatherBox = document.getElementById("todaysWeather");
const sunsetSunriseBox = document.getElementById("sunsetSunrise");
const weatherMessageBox = document.getElementById("weatherMessageBox");

const todaysWeatherBaseURL = "https://api.openweathermap.org/data/2.5/weather";
const forecastBaseURL = "https://api.openweathermap.org/data/2.5/forecast";
const API_KEY = "dae068dbdd598bca3f03f4b209decb99";
const city = "Stockholm";
const units = "metric";

const URL = `${todaysWeatherBaseURL}?q=${city}&units=${units}&APPID=${API_KEY}`;
const forecastURL = `${forecastBaseURL}?q=${city}&units=${units}&APPID=${API_KEY}`;

const showsTodaysWeather = (weatherData) => {
  const todaysWeather = weatherData.weather[0].description;
  const todaysTemperature = weatherData.main.temp.toFixed(1);
  const sunrise = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const sunset = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
  todaysWeatherBox.innerHTML = `${todaysWeather} | ${todaysTemperature}&deg`;
  sunsetSunriseBox.innerHTML = `sunrise: ${sunrise} sunset: ${sunset}`;
  weatherMessageBox.innerHTML = `${city}`;
};

fetch(URL)
  .then((response) => response.json())
  .then((weatherData) => {
    showsTodaysWeather(weatherData);
  });

const showForecastWeather = (forecastData) => {};

fetch(forecastURL)
  .then((response) => response.json())
  .then((forecastData) => {
    showForecastWeather(forecastData);
  });
