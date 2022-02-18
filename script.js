const dailyWeather = document.getElementById("dailyWeather");
const weeklyWeather = document.getElementById("weeklyWeather");
const typeOfWeather = document.getElementById("typeOfWeather");
const currentTemp = document.getElementById("currentTemp");
const city = document.getElementById("city");
const sunriseAndSunset = document.getElementById("sunriseAndSunset");
const weatherData = document.getElementById("weatherData");
const closeMenu = document.querySelector(".closeMenu");
const burger = document.querySelector(".burger");
const sideMenu = document.querySelector(".sideMenu");
const weatherContainer = document.getElementById("weatherContainer");

const API_WEATHER =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=2daa8713e80e4a10a9123c077820312c";
const API_FORECAST =
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=2daa8713e80e4a10a9123c077820312c";

//This is an object to define emojis based on the 5 day weather forecast
const dayEmoji = {
  Clouds: "./images/cloudy.svg",
  Clear: "./images/day.svg",
  Rain: "./images/rainy-6.svg",
  Snow: "./images/snowy-6.svg",
};

fetch(API_WEATHER)
  .then((res) => res.json())
  .then((data) => {
    console.log("data", data);
    let tempRemoveDecimals = Math.floor(data.main.temp); // To make the number "round" without decimals.
    let sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
      timeStyle: "short",
    });
    let sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
      timeStyle: "short",
    });
    // Here I fetched current time, to later determine if it is day or night
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    weatherData.innerHTML += `
    <h1 id="currentTemp">${tempRemoveDecimals}<span>ºC</span></h1>
    <h2 id="city">${data.name}</h2>
    <h3 id="typeOfWeather">${data.weather[0].description}</h3>
    <h3 id="sunriseAndSunset">sunrise ${sunrise} sunset ${sunset}</h3>
    `;

    // Changing the background based on night / day
    // if (time < sunrise && time > sunset) {
    //   document.dailyWeather.background = "#000";
    // }

    // Changes weather icon depending on actual weather
    let weatherIcon = data.weather[0].main;

    if (weatherIcon === "Clear") {
      weatherData.innerHTML += `
      <img id="mainIcon" class="main-icon" src="./images/day.svg" alt="image of a sun" />`;
    } else if (weatherIcon === "Snow") {
      weatherData.innerHTML += `
      <img id="mainIcon" class="main-icon" src="./images/snowy-1.svg" alt="image of snow" />`;
    } else if (weatherIcon === "Rain") {
      weatherData.innerHTML += `
      <img id="mainIcon" class="main-icon" src="./images/rainy-1.svg" alt="image of rain" />`;
    } else if (weatherIcon === "Thunderstorm") {
      weatherData.innerHTML += `
      <img id="mainIcon" class="main-icon" src="./images/thunder.svg" alt="image of thunder" />`;
    } else if (weatherIcon === "Drizzle") {
      weatherData.innerHTML += `
      <img id="mainIcon" class="main-icon" src="./images/rainy-4.svg" alt="image of drizzle" />`;
    } else if (weatherIcon === "Fog") {
      weatherData.innerHTML += `
      <img id="mainIcon" class="main-icon" src="./images/weather-sprite.svg" alt="image of fog" />`;
    } else if (weatherIcon === "Clouds") {
      weatherData.innerHTML += `
      <img id="mainIcon" class="main-icon" src="./images/cloudy-day-1.svg" alt="image of clouds" />`;
    }
  });

const show = () => {
  sideMenu.style.display = "flex";
  sideMenu.style.top = "0";
  closeMenu.style.display = "block";
};
const close = () => {
  sideMenu.style.top = "-150%";
  closeMenu.style.display = "none";
};

fetch(API_FORECAST)
  .then((res) => res.json())
  .then((forecast) => {
    console.log("forecast", forecast);
    const filteredForecast = forecast.list.filter((day) =>
      day.dt_txt.includes("12:00")
    );

    weeklyWeather.innerHTML = "";

    filteredForecast.forEach((day) => {
      const date = new Date(day.dt * 1000);
      const dayName = date.toLocaleTimeString("en-GB", {
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
      // Just added this above to the dayName const so time only show two digits.
      // But HOW do we change this to show 12 o'clock (since this is Swedish time)?
      const weekTemp = day.main.temp.toFixed(0);

      // In line 108 I used the object from line 19 to generate the emoji dependent on the forecasted weather ( I couldn't add the comment inside the back ticks).
      weeklyWeather.innerHTML += `
      <div id="theWeek">
          <p id="dayName">${dayName}</p>
          <img src = "${dayEmoji[day.weather[0].main]}">
          <p id="weekTemp">${weekTemp}ºC</p>
      </p>
      </div>
      `;
    });
  });

// EventListeners
burger.addEventListener("click", show);
closeMenu.addEventListener("click", close);
