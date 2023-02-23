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

//Setting the date
// const weekday = (info) => {
//   const currentDate = new Date(info * 1000) // sets to millisec
//   return currentDate.toLocaleDateString("en-GB", {
//     weekday: "short"
//   })
// }

// fetch(
//   "https://api.openweathermap.org/data/2.5/forecast?q=Gothenburg,Sweden&units=metric&APPID=7ff627bd38e63e85c26d65d579c38c04"
// )
//   .then((response) => {
//     return response.json()
//   })
//   .then((json) => {
//     const fetchingForecast = json.list.filter((item) =>
//       item.dt_txt.includes("12:00")
//     ) //Choose weather from the same time every day
//     console.log(fetchingForecast)
//     forecast.innerHTML += `
//        <div class="forecastTemp">
//          <div class="weekday">${weekday(fetchingForecast[0].dt)}</div>
//          <div class="temp"> ${fetchingForecast[0].main.temp.toFixed(0)}°</div>
//        </div>
//        <div class="forecastTemp">
//          <div class="weekday">${weekday(fetchingForecast[1].dt)}</div>
//          <div class="temp"> ${fetchingForecast[1].main.temp.toFixed(0)}°</div>
//        </div>
//        <div class="forecastTemp">
//          <div class="weekday">${weekday(fetchingForecast[2].dt)}</div>
//          <div class="temp"> ${fetchingForecast[2].main.temp.toFixed(0)}°</div>
//        </div>
//        <div class="forecastTemp">
//          <div class="weekday">${weekday(fetchingForecast[3].dt)}</div>
//          <div class="temp"> ${fetchingForecast[3].main.temp.toFixed(0)}°</div>
//        </div>
//        <div class="forecastTemp">
//          <div class="weekday">${weekday(fetchingForecast[4].dt)}</div>
//          <div class="temp"> ${fetchingForecast[4].main.temp.toFixed(0)}°</div>
//        </div>
//        `
//   })
