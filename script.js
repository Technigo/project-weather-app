const weatherContainer = document.getElementById("weather-container");
const cityContainer = document.getElementById("city-container");

const fetchWeather = () => {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=18169ba1f8859ef1f0186e26f6fac435"
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      weatherContainer.innerHTML = `
    ${json.weather[0].description} | ${json.main.temp.toFixed(1)}° 
    `;
    });
};
fetchWeather();

const fetchCity = () => {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=18169ba1f8859ef1f0186e26f6fac435"
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      cityContainer.innerHTML = `
    ${json.name}
    `;
    });
};
fetchCity();
