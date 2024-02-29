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
const container = document.getElementById("container");
const mainWeather = document.getElementById("main-weather");
const title = document.getElementById("title");
const sun = document.getElementById("sun");
const dates = document.getElementById("dates");
const temp = document.getElementById("temp");
let styleMainWeather;

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

  styleMainWeather = json.weather[0].main;
  mainWeather.innerHTML = `${styleMainWeather} | ${json.main.temp.toFixed(1)}°`;
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
      changeStyle(styleMainWeather);
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

// Change Styling depending on Weather

const changeStyle = (styleMainWeather) => {
  if (styleMainWeather === "Clear") {
    container.classList.add("clear");
    mainWeather.classList.add("clear");
    title.classList.add("clear");
    sun.classList.add("clear");
    dates.classList.add("clear");
    temp.classList.add("clear");
    console.log("Clear");
  } else if (styleMainWeather === "Clouds") {
    container.classList.add("clouds");
    mainWeather.classList.add("clouds");
    title.classList.add("clouds");
    sun.classList.add("clouds");
    dates.classList.add("clouds");
    temp.classList.add("clouds");
    console.log("Clouds");
  } else if (styleMainWeather === "Rain") {
    container.classList.add("rain");
    mainWeather.classList.add("rain");
    title.classList.add("rain");
    sun.classList.add("rain");
    dates.classList.add("rain");
    temp.classList.add("rain");
    console.log("Rain");
  } else if (styleMainWeather === "Snow") {
    container.classList.add("snow");
    mainWeather.classList.add("snow");
    title.classList.add("snow");
    sun.classList.add("snow");
    dates.classList.add("snow");
    temp.classList.add("snow");
    console.log("Snow");
  } else if (styleMainWeather) {
    container.classList.add("default");
    mainWeather.classList.add("default");
    title.classList.add("default");
    sun.classList.add("default");
    dates.classList.add("default");
    temp.classList.add("default");
    console.log("We don't have that weather yet");
  }
};

changeStyle(styleMainWeather);
