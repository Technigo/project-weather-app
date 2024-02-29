const todaysWeatherBox = document.getElementById("weatherTodayBox");
const weatherMessageBox = document.getElementById("weatherMessageBox");

const todaysWeatherBaseURL = "https://api.openweathermap.org/data/2.5/weather";
const forecastBaseURL = "https://api.openweathermap.org/data/2.5/forecast";
const API_KEY = "dae068dbdd598bca3f03f4b209decb99";
const city = "Stockholm";
const units = "metric";

const URL = `${todaysWeatherBaseURL}?q=${city}&units=${units}&APPID=${API_KEY}`;
const forecastURL = `${forecastBaseURL}?q=${city}&units=${units}&APPID=${API_KEY}`;

const showTodaysWeather = (weatherData) => {
  const todaysWeather = weatherData.weather[0].description;
  const todaysTemperature = weatherData.main.temp.toFixed(1);
  const sunrise = weatherData.sys.sunrise;
  const sunset = weatherData.sys.sunset;
  todaysWeatherBox.innerHTML = `${todaysWeather} ${todaysTemperature}&deg ${sunrise} ${sunset}`;
  weatherMessageBox.innerHTML = `${city}`;
};

fetch(URL)
  .then((response) => response.json())
  .then((weatherData) => {
    showTodaysWeather(weatherData);
  });

// fetch(forecastURL)
//   .then((response) => response.json())
//   .then((forecastData) => {

//   });
