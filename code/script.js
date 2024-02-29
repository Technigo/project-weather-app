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
const img = document.getElementById("img");
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
      changeTitle(json, title);
      changeImg(img);
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
  const list = document.querySelectorAll(".list-style");
  if (styleMainWeather === "Clear") {
    container.classList.add("clear");
    mainWeather.classList.add("clear");
    title.classList.add("clear");
    sun.classList.add("clear");
    img.classList.add("clear");
    dates.classList.add("clear");
    temp.classList.add("clear");
    list.forEach((element) => {
      element.classList.add("clear");
    });
    console.log("Clear");
  } else if (styleMainWeather === "Clouds") {
    container.classList.add("clouds");
    mainWeather.classList.add("clouds");
    title.classList.add("clouds");
    img.classList.add("clouds");
    sun.classList.add("clouds");
    dates.classList.add("clouds");
    temp.classList.add("clouds");
    list.forEach((element) => {
      element.classList.add("clouds");
    });
    console.log("Clouds");
  } else if (styleMainWeather === "Rain") {
    container.classList.add("rain");
    mainWeather.classList.add("rain");
    title.classList.add("rain");
    img.classList.add("rain");
    sun.classList.add("rain");
    dates.classList.add("rain");
    temp.classList.add("rain");
    list.forEach((element) => {
      element.classList.add("rain");
    });
    console.log("Rain");
  } else if (styleMainWeather === "Snow") {
    container.classList.add("snow");
    mainWeather.classList.add("snow");
    title.classList.add("snow");
    img.classList.add("snow");
    sun.classList.add("snow");
    dates.classList.add("snow");
    temp.classList.add("snow");
    list.forEach((element) => {
      element.classList.add("snow");
    });
    console.log("Snow");
  } else if (styleMainWeather) {
    container.classList.add("default");
    mainWeather.classList.add("default");
    title.classList.add("default");
    img.classList.add("default");
    sun.classList.add("default");
    dates.classList.add("default");
    temp.classList.add("default");
    list.forEach((element) => {
      element.classList.add("default");
    });
    console.log("We don't have that weather yet");
  }
};

const changeTitle = (json, title) => {
  if (title.classList.contains("clear")) {
    title.innerText = `Get your sunnies on. ${json.name} is looking rather great today.`;
    console.log("clear");
  } else if (title.classList.contains("clouds")) {
    title.innerText = `Light a fire and get cosy. ${json.name} is looking grey today.`;
    console.log("clouds");
  } else if (title.classList.contains("rain")) {
    title.innerText = `Don't forget your umbrella. It's wet in ${json.name} today.`;
    console.log("rain");
  } else if (title.classList.contains("snow")) {
    title.innerText = `Don't forget your hat. It's quite cold in ${json.name} today.`;
    console.log("snow");
  } else if (title.classList.contains("default")) {
    title.innerText = `Enjoy your day with the current ${json.name} weather.`;
    console.log("We don't have that weather yet.");
  }
};

const changeImg = (img) => {
  if (img.classList.contains("clear")) {
    img.src = "/design/design2/icons/noun_Sunglasses_2055147.png";
    console.log("imgclear");
  } else if (img.classList.contains("clouds")) {
    img.src = "/design/design2/icons/noun_Cloud_1188486.png";
    console.log("imgclouds");
  } else if (img.classList.contains("rain")) {
    img.src = "/design/design2/icons/noun_Umbrella_2030530.png";
    console.log("imgrain");
  } else if (img.classList.contains("snow")) {
    img.src = "/design/design2/icons/snow.png";
    console.log("imgsnow");
  } else if (img.classList.contains("default")) {
    img.src = "/design/design2/icons/default.png";
    console.log("XXXX");
  }
};
