// Global variables
const fiveDayForecastContainer = document.getElementById("fiveDayForecast");
const API_WEATHER =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=f9773f2491f9348664665c65e8d966c3";
const API_FIVE_DAY_FORECAST =
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=f9773f2491f9348664665c65e8d966c3";

const currentWeatherPictureContainer = document.getElementById(
  "currentWeatherPictureContainer"
);
const cityName = document.getElementById("cityName");
const currentTemperature = document.getElementById("currentTemperature");
const currentWeatherStatus = document.getElementById("currentWeatherStatus");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

// Object with all emoji
// https://stackoverflow.com/questions/37103988/is-it-possible-to-set-an-image-source-on-a-javascript-object-property
const emojiObject = {
  cloudy: Object.assign(new Image(), {
    src: "/Designs/Design-1/assets/Group16.png",
  }),
  partly: Object.assign(new Image(), {
    src: "/Designs/Design-1/assets/Group34.png",
  }),
  sunny: Object.assign(new Image(), {
    src: "/Designs/Design-1/assets/Group36.png",
  }),
  rainy: Object.assign(new Image(), {
    src: "/Designs/Design-1/assets/Group38.png",
  }),
  snowy: Object.assign(new Image(), {
    src: "/Designs/Design-1/assets/Group40.png",
  }),
};
console.log(emojiObject.cloudy.src);

const staticImg = {
  day: Object.assign(new Image(), {
    src: "/Designs/Design-1/assets/Group36.png",
  }),
  night: Object.assign(new Image(), {
    src: "/Designs/Design-1/assets/Group16.png",
  }),
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

      currentTemperature.innerHTML = `${Math.floor(data.main.temp_max)}°`;
      currentWeatherPictureContainer.innerHTML = `
      <img class="currentWeatherImg" src="${emojiObject.cloudy.src}"/>
      `;
      cityName.innerHTML = `${data.name}`;
      currentWeatherStatus.innerHTML = `${data.weather[0].description}`;
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
      🌄${sunriseTime}
      `;
      sunset.innerHTML += `
      🌅${sunsetTime}
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
        <div class="forecast-content" id="emoji"></div>
        <div class="forecast-content" id="temperature"></div>
        </div>`;
      });
    })
    .catch((error) => console.error(error));
};

fetchForecast();

// key: f9773f2491f9348664665c65e8d966c3
