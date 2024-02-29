//DOM-Selectors
const locationName = document.getElementById("location");
const todaysTemperature = document.getElementById("todays-temperature");
const todaysWeather = document.getElementById("todays-weather");
const todaysSunrise = document.getElementById("sunrise");
const todaysSunset = document.getElementById("sunset");
const forecastDay = document.getElementById("forecast-day");
const forecast = document.getElementById("forecast");

//Weather Today API
//https://api.openweathermap.org/data/2.5/weather?q=Gagnef,Sweden&units=metric&APPID=YOUR_API_KEY
//https://api.openweathermap.org/data/2.5/weather/?q=Gagnef,Sweden&units=metric&APPID=bf5fcdbe6629518d85ff1555a95c673f

const BASE_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "bf5fcdbe6629518d85ff1555a95c673f";
const city = "Gagnef,Sweden";

const weatherTodayURL = `${BASE_WEATHER_URL}?q=${city}&units=metric&APPID=${API_KEY}`;

// const fetchWeatherTodayAPI = () => {
//   fetch(weatherTodayURL)
//     .then((response) => {
//       return response.json();
//     })
//     .then((weatherTodayData) => {
//       console.log(weatherTodayData);
//     });
// };

const fetchWeatherTodayAPI = () => {
  fetch(weatherTodayURL)
    .then((response) => {
      return response.json();
    })
    .then((weatherTodayData) => {
      // Update DOM with city name
      locationName.innerHTML = `<h1>${weatherTodayData.name}</h1>`;
      console.log(weatherTodayData.name);

      // Update DOM with today's temperature
      todaysTemperature.innerHTML = `<h1>${weatherTodayData.main.temp}</h1>`;
      console.log(weatherTodayData.main.temp);

      // Update DOM with today's weather
      weatherTodayData.weather.forEach((weather) => {
        console.log(weather);
        console.log(weather.main);
        todaysWeather.innerHTML = `<h1>${weather.main}</h1>`;
      });

      //   // Update DOM with today's sunrise
      //   todaysSunrise.innerHTML = `<h1>Sunrise ${weatherTodayData.sys.sunrise}</h1>`;
      //   console.log(weatherTodayData.sys.sunrise);
      //   // Update DOM with today's sunset
      //   todaysSunset.innerHTML = `<h1>Sunset ${weatherTodayData.sys.sunset}</h1>`;
      //   console.log(weatherTodayData.sys.sunset);

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

      // Update DOM with today's sunrise and sunset in 24-hour format
      todaysSunrise.innerHTML = `<h1>Sunrise ${sunriseFormatted}</h1>`;
      console.log(sunriseFormatted);

      todaysSunset.innerHTML = `<h1>Sunset ${sunsetFormatted}</h1>`;
      console.log(sunsetFormatted);

      console.log(weatherTodayData);
    });
};

fetchWeatherTodayAPI();

//Forecast API
//https://api.openweathermap.org/data/2.5/forecast/?q=Gagnef,Sweden&units=metric&APPID=bf5fcdbe6629518d85ff1555a95c673f

const BASE_FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast/";

const weatherForecastURL = `${BASE_FORECAST_URL}?q=${city}&units=metric&APPID=${API_KEY}`;

const fetchWeatherForecastAPI = () =>
  fetch(weatherForecastURL)
    .then((response) => {
      return response.json();
    })
    .then((weatherForecastData) => {
      console.log(weatherForecastData);
      console.log(weatherForecastData.list);

      // Extracting dates and weather icons from the forecast data for 12:00:00 entries
      const forecastDay = document.getElementById("forecast"); // Assuming you have an element with id="forecast" to display the forecast

      const filteredWeatherData = weatherForecastData.list
        .filter((item) => item.dt_txt.includes("12:00:00"))
        .map((item) => {
          const timestamp = item.dt * 1000; // Convert seconds to milliseconds
          const date = new Date(timestamp);
          const dayOfWeek = date.toLocaleString("en-US", { weekday: "long" }); // Get day of the week
          const weatherIconCode = item.weather[0].icon; // Get the icon code from the first weather entry
          const iconUrl = `http://openweathermap.org/img/wn/${weatherIconCode}.png`; // Construct the icon URL
          const temperature = item.main.temp.toFixed(0); // Get temperature from main object
          return {
            dayOfWeek,
            iconUrl,
            temperature,
          };
        });

      console.log("Filtered Weather Data (12:00:00):", filteredWeatherData);

      // Display the forecast data on the webpage
      forecastDay.innerHTML = filteredWeatherData
        .map(
          (forecast) =>
            `<div><h2>${forecast.dayOfWeek}</h2><img src="${forecast.iconUrl}" alt="Weather Icon"><p>${forecast.temperature}°C</p></div>`
        )
        .join("");
    });

fetchWeatherForecastAPI();

// locationName.innerHTML = `<h1>${weatherTodayData.name}</h1>`;
