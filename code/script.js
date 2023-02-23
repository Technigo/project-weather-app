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
      console.log(json);
      weatherResults = json;

      //Hello

      //Todays weather explanation
      let localWeatherToday = weatherResults.weather[0].main;

      if (localWeatherToday === "Clear") {
        todaysWeather.innerHTML = `<div class= "Clear">
                  <img class= "sunny" src="images/sun-glasses.png"/>
                  <h1> Sunglass-up. ${weatherResults.name} is shining and so are you.</h1>
                  </div>`;
        document.body.style.backgroundColor = "#F7E9B9";
        document.body.style.color = "#2A5510";
      } else if (localWeatherToday === "Rain") {
        todaysWeather.innerHTML = `<div class= "rain">
                  <img class= "rain" src="images/umbrella.png"/>
                  <h1> Fetch that umbrella. ${weatherResults.name} is crying today.</h1>
                  </div>`;
        document.body.style.backgroundColor = "#A3DEF7";
        document.body.style.color = "#164A68";
      } else {
        todaysWeather.innerHTML = `<div class= "clouds">
                  <img class= "rain" src="images/clouds.png"/>
                  <h1> Cuddle up! The ${weatherResults.name} sky is grey today.</h1>
                  </div>`;
        document.body.style.backgroundColor = "#FBF4F4";
        document.body.style.color = "#F47775";
      }
      console.log(localWeatherToday);

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
