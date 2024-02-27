const BASE_URL =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=";
const API_KEY = "ea8ddf441b50c5601343ca1ba4aa982c";

const URL = `${BASE_URL}${API_KEY}`;

//DOM Selectors
const city = document.getElementById("currentCity");
const temp = document.getElementById("currentTemp");
const weather = document.getElementById("currentWeather");
const sunrise = document.getElementById("sunrise")

//Fetch API

const fetchNameTempWeather = () => {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      city.textContent = `
      ${data.name}
      `;
      const roundedTemp = Math.round(data.main.temp * 10) / 10;
      temp.textContent = `
      ${roundedTemp} °C
      `;
      weather.textContent = `
      ${data.weather[0].main}
      `;
    });
};

fetchNameTempWeather();

//Fetch time for sunrise and sunset

const fetchSunrise = () => {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      const sunriseTime = new Date(data.sys.sunrise * 1000)
      const hours = sunriseTime.getHours().toString().padStart(2, "0")
      const minutes = sunriseTime.getMinutes().toString().padStart(2, "0")

      const formattedSunrise = `${hours}:${minutes}`

      sunrise.textContent = `
      Sunrise ${formattedSunrise}
      `
    })
}



fetchSunrise()