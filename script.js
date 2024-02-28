const BASE_URL =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=";
const API_KEY = "ea8ddf441b50c5601343ca1ba4aa982c";

const URL = `${BASE_URL}${API_KEY}`;

//DOM Selectors
const city = document.getElementById("currentCity");
const temp = document.getElementById("currentTemp");
const weather = document.getElementById("currentWeather");
const sunriseSunset = document.getElementById("sunriseSunset");

//Fetch API

const fetchWeatherData = () => {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      city.textContent = `
      ${data.name}
      `;
      const roundedTemp = Math.round(data.main.temp * 10) / 10;
      temp.textContent = `
      ${roundedTemp}°C
      `;
      weather.textContent = `
      ${data.weather[0].main}
      `;
      //handle sunrise time
      const sunriseTime = new Date(data.sys.sunrise * 1000);
      const sunriseHours = sunriseTime.getHours().toString().padStart(2, "0");
      const sunriseminutes = sunriseTime
        .getMinutes()
        .toString()
        .padStart(2, "0");

      const formattedSunrise = `${sunriseHours}:${sunriseminutes}`;

      //handle sunset time
      const sunsetTime = new Date(data.sys.sunset * 1000);
      const sunsetHours = sunsetTime.getHours().toString().padStart(2, "0");
      const sunsetMinutes = sunsetTime.getMinutes().toString().padStart(2, "0");

      const formattedSunset = `${sunsetHours}:${sunsetMinutes}`;

      sunriseSunset.textContent = `
      Sunrise ${formattedSunrise} Sunset ${formattedSunset}
      `;
    });
};

fetchWeatherData();


