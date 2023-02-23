// DOM selectors
const todaysWeather = document.getElementById("todays-weather");
const cityWeather = document.getElementById("city-weather");
const forecast = document.getElementById("forecast-section");
const weatherBody = document.getElementById("weather-body");

let weatherResults;

const fetchingWeather = () => {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=Gothenburg,Sweden&units=metric&APPID=7ff627bd38e63e85c26d65d579c38c04"
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      weatherResults = json;
      console.log(weatherResults);
      todaysWeather.innerHTML = `<p> ${
        weatherResults.weather[0].description
      } | ${Math.round(weatherResults.main.temp * 10) / 10}° </p>
      <p>
      sunrise ${new Date(weatherResults.sys.sunrise * 1000).toLocaleTimeString(
        [],
        { hour: "2-digit", minute: "2-digit" }
      )}</p>
      <p>sunset ${new Date(weatherResults.sys.sunset * 1000).toLocaleTimeString(
        [],
        { hour: "2-digit", minute: "2-digit" }
      )}</p>`;
    });
};

fetchingWeather();
