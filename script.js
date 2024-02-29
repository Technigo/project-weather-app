//OpenWeatherMap API
const BASE_URL = "http://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "86cc8fe4b24936e5560b67f7b96b6c03";
const urlCity = "Stockholm";
const URL = `${BASE_URL}${urlCity}&units=metric&APPID=${API_KEY}`;

// Forecast API
const FORECAST_BASE_URL = "http://api.openweathermap.org/data/2.5/forecast?";
let lat = "59.3326";
let lon = "18.0649";
const FORECAST_URL = `${FORECAST_BASE_URL}lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
//const FORECAST_URL =
("http://api.openweathermap.org/data/2.5/forecast?lat=18&lon=10&appid=86cc8fe4b24936e5560b67f7b96b6c03");

// DOM selectors
const city = document.getElementById("city");
const temp = document.getElementById("temp");
const description = document.getElementById("description");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const animationButton = document.getElementById("animation-button");
const forecast = document.getElementById("forecast");

const fetchWeather = () => {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      city.innerHTML = `<h2>${data.name}</h2>`;
      temp.innerHTML = `<h1>${Math.round(data.main.temp)}°&#x1D9C;</h1>`;
      description.innerHTML = `<h3>${data.weather[0].main}</h3>`;
      let sunriseHoursMinutes = prettyDate2(data.sys.sunrise * 1000);
      let sunsetHoursMinutes = prettyDate2(data.sys.sunset * 1000);

      sunrise.innerHTML = `<h3>${sunriseHoursMinutes}</h3>`;
      sunset.innerHTML = `<h3>${sunsetHoursMinutes}</h3>`;
    })
    .catch((error) => console.log("Caught error:", error));
};
fetchWeather();

const checkIfNoon = (string) => {
  return string.includes("12:00:00");
};

const fetchForecast = () => {
  fetch(FORECAST_URL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // For loop to display 4 days on weather. data.list[0].dt_text
      console.log(data.list[0].dt_txt)

      const array = data.list.filter((array) => array.dt_txt.includes("12:00:00"));
      console.log(array);
    
      array.forEach((element) => {
        forecastList.innerHTML += `<li>${element.dt_txt} IMG ${element.main.temp}</li>`;
      });
      const forecastArray = data.list;
      const mappedArray = forecastArray.map(checkIfNoon);
      console.log(mappedArray);

    })
    .catch((error) => console.log("Caught error:", error));
};
fetchForecast();

// Clean up the date to the 24h numbers with just hours and minutes.
const prettyDate2 = (time) => {
  let date = new Date(parseInt(time));
  return date.toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

//Choose Image based on weather description.
const chooseImage = (weather) => {};

// Check to see if current time is after sunset and before sunrise. Display moon.
const checkMoon = (sunrise, sunset) => {};

// Toggle forecast
const toggleForecast = () => {};

// Eventlisteners
//animationButton.addEventListener("click", toggelForecast())
