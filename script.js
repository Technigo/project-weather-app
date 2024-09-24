/* *********************************
  Constants
********************************* */

const API_URL_WEATHER_NOW =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=f1eb0732aa36b48c85267620f68aa926";
const API_URL_WEATHER_FORECAST =
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=f1eb0732aa36b48c85267620f68aa926";

/* *********************************
  DOM selectors
********************************* */

const app = document.getElementById("app");
let weatherTodayContainer = document.getElementById("weather-today");
let weatherForecastContainer = document.getElementById("weather-forecast");

/* *********************************
  Global variables
********************************* */

let weatherToday = "";
let weatherTypeToday = "";

/* *********************************
  Functions
********************************* */

const fetchWeather = async (weather) => {
  try {
    const response = await fetch(weather);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    data = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

// Helper function for changing background color based on type of weather
const typeOfWeather = () => {
  switch (weatherTypeToday.toLowerCase()) {
    case "clouds":
      app.classList.add("is-cloudy");
      break;
    case "sun":
      app.classList.add("is-sunny");
      break;
    default:
      break;
  }
};

// 1. Function to render current weather
const currentWeather = async () => {
  const weatherRightNow = await fetchWeather(API_URL_WEATHER_NOW);

  console.log(weatherRightNow);
  if (weatherRightNow) {
    weatherTypeToday = weatherRightNow.weather[0].main;
    const temp = weatherRightNow.main.temp;
    const sunrise = new Date(
      weatherRightNow.sys.sunrise * 1000
    ).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const sunset = new Date(
      weatherRightNow.sys.sunset * 1000
    ).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    weatherTodayContainer.innerHTML = `
      <div class="weather-today__meta">
        <p id="todays-temp">${weatherTypeToday} | ${temp}°</p>
        <p id="todays-sunrise">Sunrise ${sunrise}</p>
        <p id="todays-sunset">Sunset ${sunset}</p>
      </div>
    `;
  }

  typeOfWeather();
};

currentWeather();

// 2. Function to render forecast
const forecastedWeather = async () => {
  const forecastData = await fetchWeather(API_URL_WEATHER_FORECAST);
  console.log(forecastData); // Log the forecast data to check
};
