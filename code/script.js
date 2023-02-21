// DOM selectors
const todaysWeather = document.getElementById("todays-weather");
const cityWeather = document.getElementById("city-weather");
const forecast = document.getElementById("forecast-section");
weatherBody = document.getElementById("weather-body");

const fetchingWeather = () => {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=Gothenburg,Sweden&units=metric&APPID=7ff627bd38e63e85c26d65d579c38c04"
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);
    });
};
fetchingWeather();
