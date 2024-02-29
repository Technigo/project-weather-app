//https://api.openweathermap.org/data/2.5/weather?q=Zurich,Switzerland&units=metric&appid=b34ca1ebc43d2420cd2a70a7d29aa6c4

//https://api.openweathermap.org/data/2.5/forecast?q=Zurich,Switzerland&units=metric&appid=b34ca1ebc43d2420cd2a70a7d29aa6c4

// Building the URL
const BASE_URL = "https://api.openweathermap.org/data/2.5/";
const API_KEY = "b34ca1ebc43d2420cd2a70a7d29aa6c4";
const place = "Zurich,Switzerland";
const units = "units=metric";
const dataWeather = "weather";
const dataForecast = "forecast";

const URLWeather = `${BASE_URL}${dataWeather}?q=${place}&${units}&appid=${API_KEY}`;
const URLForecast = `${BASE_URL}${dataForecast}?q=${place}&${units}&appid=${API_KEY}`;

// DOM Selectors
const mainWeather = document.getElementById("main-weather");
const title = document.getElementById("title");
const sun = document.getElementById("sun");
const dates = document.getElementById("dates");
const temp = document.getElementById("temp");

// Everything with the Weather URL
const changeWeather = (json) => {
  const sunriseEpoch = json.sys.sunrise;
  const sunriseHuman = new Date(sunriseEpoch * 1000);
  const sunriseHours = sunriseHuman.getHours().toString().padStart(2, "0");
  const sunriseMinutes = sunriseHuman.getMinutes().toString().padStart(2, "0");

  const sunsetEpoch = json.sys.sunset;
  const sunsetHuman = new Date(sunsetEpoch * 1000);
  const sunsetHours = sunsetHuman.getHours().toString().padStart(2, "0");
  const sunsetMinutes = sunsetHuman.getMinutes().toString().padStart(2, "0");

  mainWeather.innerHTML = `${json.weather[0].main} | ${Math.round(
    json.main.temp
  )}°`;
  title.innerText = `Get your sunnies on. ${json.name} is looking rather great today.`;
  sun.innerHTML = `
    sunrise ${sunriseHours}.${sunriseMinutes} <br>
    sunset ${sunsetHours}.${sunsetMinutes}`;
};

const fetchWeather = () => {
  fetch(URLWeather)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      changeWeather(json);
    })
    .catch((error) => {
      console.log(error);
    });
};

fetchWeather();

// Everything with the Forecast URL
const changeForecast = (json) => {
  const dateEpoch = [];
  const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  const daytimeForecast = json.list.filter((element) => {
    const time = element.dt_txt.split(" ")[1];
    return time === "12:00:00";
  });

  daytimeForecast.forEach((element) => {
    const dayOfWeek = weekdays[new Date(element.dt * 1000).getDay()];
    dates.innerHTML += `<li class="list-style">${dayOfWeek}</li>`;
    temp.innerHTML += `<li class="list-style">${Math.round(
      element.main.temp
    )}°</li>`;
    dateEpoch.push(element.dt);
  });
};

const fetchForecast = () => {
  fetch(URLForecast)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      changeForecast(json);
    })
    .catch((error) => {
      console.log(error);
    });
};

fetchForecast();
