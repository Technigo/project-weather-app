//DOM-Selectors
const locationName = document.getElementById("location");
const todaysTemperature = document.getElementById("todays-temperature");
const todaysWeather = document.getElementById("todays-weather");

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

      console.log(weatherTodayData);
    });
};

fetchWeatherTodayAPI();

//Forecast API
//https://api.openweathermap.org/data/2.5/forecast/?q=Gagnef,Sweden&units=metric&APPID=bf5fcdbe6629518d85ff1555a95c673f

const BASE_FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast/";

const weatherForecastURL = `${BASE_FORECAST_URL}?q=${city}&units=metric&APPID=${API_KEY}`;

const fetchWeatherForecastAPI = () => {
  fetch(weatherForecastURL)
    .then((response) => {
      return response.json();
    })
    .then((weatherForecastData) => {
      console.log(weatherForecastData);
    });
};
fetchWeatherForecastAPI();
