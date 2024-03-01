//DOM-Selectors
const locationName = document.getElementById("location");
const todaysTemperature = document.getElementById("todays-temperature");
const todaysWeather = document.getElementById("todays-weather");
const todaysSunrise = document.getElementById("sunrise");
const todaysSunset = document.getElementById("sunset");
const forecastDay = document.getElementById("forecast-day");
const forecastWeather = document.getElementById("forecast-weather");
const forecastTemperature = document.getElementById("forecast-temperature");
const forecastContainer = document.getElementById("forecast-container");
const errorContainer = document.getElementById("error-container");

//Weather Today API
//https://api.openweathermap.org/data/2.5/weather?q=Gagnef,Sweden&units=metric&APPID=YOUR_API_KEY

const BASE_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "bf5fcdbe6629518d85ff1555a95c673f";
// const API_KEY = "bf5fcdbe6629518d85ff1555a95c673"; // Use this to show error message
const city = "Gagnef, Sweden";

//Creating the correct API URL for todays weather data
const weatherTodayURL = `${BASE_WEATHER_URL}?q=${city}&units=metric&APPID=${API_KEY}`;

// Error handling function
const displayErrorMessage = (errorMessage) => {
  // Display an error message in case of API not loading correctly
  errorContainer.innerHTML = `<p>${errorMessage}</p>`;
};

//Fetch wather data from API
const fetchWeatherTodayAPI = () =>
  fetch(weatherTodayURL)
    .then((response) => {
      return response.json();
    })
    .then((weatherTodayData) => {
      // Update DOM with city name
      locationName.innerHTML = `<h4>${weatherTodayData.name}</h4>`;

      //Modify temperature data to only show one decimal
      const temperatureWithOneDecimal = weatherTodayData.main.temp.toFixed(1);
      // Update DOM with today's temperature
      todaysTemperature.innerHTML = `<h1>${temperatureWithOneDecimal}°</h1>`;

      weatherTodayData.weather.forEach((weather) => {
        // Update DOM with today's weather
        todaysWeather.innerHTML = `<h1>${weather.main}</h1>`;

        // Convert Unix timestamps to milliseconds
        const sunriseTime = new Date(weatherTodayData.sys.sunrise * 1000);
        const sunsetTime = new Date(weatherTodayData.sys.sunset * 1000);

        // Format sunrise and sunset times to 24-hour format
        const sunriseFormatted = sunriseTime.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        });
        const sunsetFormatted = sunsetTime.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        });

        // Convert "Sunrise" and "Sunset" to lowercase
        const sunriseLowerCase = "Sunrise".toLowerCase();
        const sunsetLowerCase = "Sunset".toLowerCase();

        // Update DOM with today's sunrise and sunset in lowercase and 24-hour format
        todaysSunrise.innerHTML = `<h1>${sunriseLowerCase} ${sunriseFormatted}</h1>`;

        todaysSunset.innerHTML = `<h1>${sunsetLowerCase} ${sunsetFormatted}</h1>`;
      });
    })
    .catch((error) => {
      // Display an error message in case of error
      displayErrorMessage("Failed to fetch weather data.");
    });

fetchWeatherTodayAPI();

//Forecast API
//https://api.openweathermap.org/data/2.5/forecast/?q=Gagnef,Sweden&units=metric&APPID=YOUR_API_KEY

const BASE_FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast/";

//Creating the correct API URL for weather forecast
const weatherForecastURL = `${BASE_FORECAST_URL}?q=${city}&units=metric&APPID=${API_KEY}`;

//Fetch forecast data from API
const fetchWeatherForecastAPI = () =>
  fetch(weatherForecastURL)
    .then((response) => {
      return response.json();
    })
    .then((weatherForecastData) => {
      // Extracting dates and weather icons from the forecast data for 12:00:00 entries
      const filteredWeatherData = weatherForecastData.list
        .filter((item) => item.dt_txt.includes("12:00:00")) //Filter on 12:00:00 entries only
        .map((item) => {
          const timestamp = item.dt * 1000; // Convert seconds to milliseconds
          const date = new Date(timestamp);
          const dayOfWeek = date.toLocaleString("en-US", { weekday: "long" }); // Get day of the week
          const weatherIconCode = item.weather[0].icon; // Get the icon code
          const iconUrl = `https://openweathermap.org/img/wn/${weatherIconCode}.png`; // Construct the icon URL
          const temperature = item.main.temp.toFixed(0); // Get temperature from main object
          return {
            dayOfWeek,
            iconUrl,
            temperature,
          };
        });

      // Display the forecast data in the application
      filteredWeatherData.slice(1, 5).forEach((forecast) => {
        const dayOfWeekLowerCase = forecast.dayOfWeek.toLowerCase(); // Convert day of week to lowercase
        const forecastHTML = `
    <div class="forecast-row">
      <h3>${dayOfWeekLowerCase}</h3>
      <img src="${forecast.iconUrl}" alt="Weather Icon">
      <h3>${forecast.temperature}°</h3>
    </div>
  `;
        forecastContainer.innerHTML += forecastHTML;
      });
    })
    .catch((error) => {
      // Display an error message in case of error
      displayErrorMessage("Failed to fetch weather data.");
    });

fetchWeatherForecastAPI();
