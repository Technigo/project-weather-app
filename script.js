/*
preeti - Sunrise and sunset (format time)
daniel - Weather forecast (5 day) done

daniel - stretch - More cities (search?)
daniel - stretch - Use location
preeti - stretch - More data

Styling
  stretch - warm/cold
  stretch - Animations

*/

const APIKEY = "859d1c6268a1c95a2e2ded0c95483c8a";
const url = "https://api.openweathermap.org/data/2.5/weather/";

const currentWeather = document.getElementById("currentWeather");
const comment = document.getElementById("comment");
const additionalData = document.getElementById("additionalData");
const sunTime = document.getElementById("sunTime");
const forecast = document.getElementById("forecast");
const locations = document.getElementById("locations");

const fetchWeather = (param) => {
  fetch(url + param)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    })
}

const getCurrentWeather = (param) => {
  fetch(url + param)
    .then(response => response.json())
    .then((data) => {
      console.log("Current weather", data);
      currentWeather.innerHTML = `
      <h2>${data.name}</h2>
      <p>${data.weather[0].description} | ${Math.round(data.main.temp)} °C</p>`;
    })
    .catch((error) => {
      console.log(error);
    })
  // Preeti Additional weather data
}

const getSunTime = () => {
  // Preeti
}

const getForecast = async () => {
  // Daniel
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=${APIKEY}`)
    .then(response => response.json())
    .then((data) => {
      console.log("Weather forecast", data);
      forecast.innerHTML = `
      <h3>5 day forecast</h3>
      <h4>at this time on...</h4>
      <div id="forecastGrid"></div>`
      // The indeces of the forecast the next 24, 48, 72, 96 and 120 hours from the current weather forecast
      const dayIndex = [7, 15, 23, 31, 39];
      const forecastGrid = document.getElementById("forecastGrid");
      dayIndex.forEach((day) => {
        forecastGrid.innerHTML += `
        <div class="card">
          <h4>${data.list[day].dt_txt.split(" ")[0]}</h4>
          <img src="https://openweathermap.org/img/wn/${data.list[day].weather[0].icon}@2x.png">
          <p>${data.list[day].weather[0].main} | ${data.list[day].main.temp}</p>
          <p>
            Wind ${data.list[day].wind.speed} m/s
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" style="transform: rotate(${data.list[day].wind.deg}deg);" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
            </svg>
          </p>
        </div>`
        // Not 100% sure if the wind direction is correct, comapred to openweather website and it seems to be more or less correct but I am not sure which data they are using
      });
    })
    .catch((error) => {
      console.log("Error in getForecast()", error);
    })
}

getCurrentWeather(`?q=Stockholm,Sweden&units=metric&APPID=${APIKEY}`);
getForecast();