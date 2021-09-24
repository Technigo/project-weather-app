// Global variables
const todaysWeather = document.getElementById("weatherContainer");
const fiveDayForecastContainer = document.getElementById("fiveDayForecast");
const API_WEATHER =
  "https://api.openweathermap.org/data/2.5/weather?q=stockholm,Sweden&units=metric&APPID=f9773f2491f9348664665c65e8d966c3";
const API_FIVE_DAY_FORECAST =
  "https://api.openweathermap.org/data/2.5/forecast?q=stockholm,Sweden&units=metric&APPID=f9773f2491f9348664665c65e8d966c3";

const currentWeatherPictureContainer = document.getElementById(
  "currentWeatherPictureContainer"
);
currentWeatherPictureContainer.className = "current-weather-picture-container";

const cityName = document.getElementById("cityName");
//cityName.className = "city-name";
const currentTemperature = document.getElementById("currentTemperature");
//currentTemperature.className = "current-temperature";
const currentWeatherStatus = document.getElementById("currentWeatherStatus");
//currentWeatherStatus.className = "current-weather-status";
const sunrise = document.getElementById("sunrise");
// sunrise.className = "sunrise";
const sunset = document.getElementById("sunset");
// sunset.className = "sunset";

// Object with all emoji
const emojiObject = {
  Clouds: "./assets/cloud.png",

  Wind: "./assets/wind.png",

  Clear: "./assets/sun.png",

  Rain: "./assets/rain.png",

  Snow: "./assets/snow.png",
};

const staticImg = {
  day: "./assets/sunglasses.png",
  cold: "./assets/mitten.png",
};

const fetchWeather = () => {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=stockholm,Sweden&units=metric&APPID=f9773f2491f9348664665c65e8d966c3"
  )
    .then((response) => response.json())
    .then((data) => {
      const todaysTemp = data.main.temp_max.toFixed(0);
      currentTemperature.innerHTML = `${todaysTemp}`;
      console.log(todaysTemp);
      cityName.innerHTML = `${data.name}`;
      currentWeatherStatus.innerHTML = `${data.weather[0].description}`;

      switch (todaysTemp <= 15) {
        case true:
          todaysWeather.classList.toggle("cold");
          currentWeatherPictureContainer.innerHTML = `
          <img class="currentWeatherImg" src="${staticImg.cold}"/>
          `;
          break;
        case false:
          currentWeatherPictureContainer.innerHTML = `
          <img class="currentWeatherImg" src="${staticImg.day}"/>
          `;
        default:
          console.log("problem");
      }
    })
    .catch((error) => console.error(error));
};

fetchWeather();

const fetchSunriseSunset = () => {
  fetch(API_WEATHER)
    .then((response) => response.json())
    .then((data) => {
      console.log("Data from sunrise/sunset:", data);
      const sunriseDate = new Date(
        (data.sys.sunrise +
          data.timezone +
          new Date().getTimezoneOffset() * 60) *
          1000
      );
      const sunriseTime =
        sunriseDate.getHours() + ":" + sunriseDate.getMinutes();

      const sunsetDate = new Date(
        (data.sys.sunset +
          data.timezone +
          new Date().getTimezoneOffset() * 60) *
          1000
      );
      const sunsetTime = sunsetDate.getHours() + ":" + sunsetDate.getMinutes();
      sunrise.innerHTML += `
      <img class="sun-img"src="./assets/sunrise32.png"/> ${sunriseTime}
      `;
      sunset.innerHTML += `
      <img class="sun-img"src="./assets/sunset32.png"/> ${sunsetTime}
      `;
    });
};

fetchSunriseSunset();

const fetchForecast = () => {
  fetch(API_FIVE_DAY_FORECAST)
    .then((response) => response.json())
    .then((data) => {
      console.log("New Forecast JSON:", data);

      let filteredFiveDays = data.list.filter((item) =>
        item.dt_txt.includes("09:00")
      );
      console.log(filteredFiveDays);
      // let filteredFiveNights = data.list.filter((item) =>
      //   item.dt_txt.includes("21:00")
      // );

      filteredFiveDays.forEach((item) => {
        fiveDayForecastContainer.innerHTML += `
        <div class="weekday-row">
        <div class="forecast-content" id="week-day">${new Date(
          item.dt_txt
        ).toLocaleDateString("en-US", {
          weekday: "short",
        })}
        </div>
        <div class="forecast-content" id="emoji"> <img src = "${
          emojiObject[item.weather[0].main]
        }"></div>
        
        <div class="forecast-content" id="temperature">${item.main.temp_max.toFixed(
          1
        )}°C</div>
        </div>`;
      });
    })
    .catch((error) => console.error(error));
};

fetchForecast();

// key: f9773f2491f9348664665c65e8d966c3
