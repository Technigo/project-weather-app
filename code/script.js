// Global variables
const todaysWeather = document.getElementById("weatherContainer");
const fiveDayForecastContainer = document.getElementById("fiveDayForecast");
const API_WEATHER =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=f9773f2491f9348664665c65e8d966c3";
const API_FIVE_DAY_FORECAST =
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=f9773f2491f9348664665c65e8d966c3";

const currentWeatherPictureContainer = document.getElementById(
  "currentWeatherPictureContainer"
);
currentWeatherPictureContainer.className = "current-weather-picture-container";

const cityName = document.getElementById("cityName");
cityName.className = "city-name";
const currentTemperature = document.getElementById("currentTemperature");
currentTemperature.className = "current-temperature";
const currentWeatherStatus = document.getElementById("currentWeatherStatus");
currentWeatherStatus.className = "current-weather-status";
const sunrise = document.getElementById("sunrise");
sunrise.className = "sunrise";
const sunset = document.getElementById("sunset");
sunset.className = "sunset";

// Object with all emoji
const emojiObject = {
  Clouds: "/Designs/Design-1/assets/cloud.png",

  Wind: "/Designs/Design-1/assets/wind.png",

  Clear: "/Designs/Design-1/assets/sun.png",

  Rain: "/Designs/Design-1/assets/rain.png",

  Snow: "/Designs/Design-1/assets/snow.png",
};

const staticImg = {
  day: "/Designs/Design-1/assets/sun.png",
  night: "/Designs/Design-1/assets/moon.png",
};

// this part wont work cause there is no generic functions anymore
const fetchWeather = () => {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=f9773f2491f9348664665c65e8d966c3"
  )
    .then((response) => response.json())
    .then((data) => {
      // console.log("The data from the json:", data);
      // console.log("max temp", Math.floor(data.main.temp_max));
      // const sunrise = data.sys.sunrise;
      // const sunset = data.sys.sunset;
      // renderCurrentWeather(
      //   Math.floor(data.main.temp),
      //   dayWeatherPicture,
      //   data.name,
      //   data.weather[0].description
      //   // Date.prototype.getTime(sunrise),
      //   // Date.prototype.getTime(sunset)
      // );

      const todaysTemp = data.main.temp_max.toFixed(0);
      currentTemperature.innerHTML = `${todaysTemp}`;
      console.log(todaysTemp);
      currentWeatherPictureContainer.innerHTML = `
      <img class="currentWeatherImg" src="${staticImg.day}"/>
      `;
      cityName.innerHTML = `${data.name}`;
      currentWeatherStatus.innerHTML = `${data.weather[0].description}`;

      switch (todaysTemp <= 10) {
        case true:
          todaysWeather.classList.toggle("cold");
          break;
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
      <img src="/Designs/Design-1/assets/sunrise-small.png"/>${sunriseTime}
      `;
      sunset.innerHTML += `
      <img src="/Designs/Design-1/assets/sunset-small.png"/>${sunsetTime}
      `;
    });
};

fetchSunriseSunset();

//  sunrise
// 1632329324 sunset
// Date.prototype.getMilliseconds(1632285134)
// Date.prototype.getMilliseconds(1632329324)

const fetchForecast = () => {
  fetch(API_FIVE_DAY_FORECAST)
    .then((response) => response.json())
    .then((data) => {
      // console.log("New Forecast JSON:", data);

      let filteredFiveDays = data.list.filter((item) =>
        item.dt_txt.includes("12:00")
      );
      // console.log(filteredFiveDays);

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
          0
        )}°C</div>
        </div>`;
      });
    })
    .catch((error) => console.error(error));
};

fetchForecast();

// key: f9773f2491f9348664665c65e8d966c3
