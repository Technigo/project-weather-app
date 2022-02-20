const dailyWeather = document.getElementById("dailyWeather");
const weeklyWeather = document.getElementById("weeklyWeather");
const typeOfWeather = document.getElementById("typeOfWeather");
const currentTemp = document.getElementById("currentTemp");
const sunriseAndSunset = document.getElementById("sunriseAndSunset");
const currentCity = document.getElementById("currentCity");
const weatherData = document.getElementById("weatherData");
const closeMenu = document.querySelector(".closeMenu");
const burger = document.querySelector(".burger");
const sideMenu = document.querySelector(".sideMenu");
const weatherContainer = document.getElementById("weatherContainer");
const inputLocation = document.getElementById("inputLocation");
const submitBtn = document.getElementById("submitBtn");
const searchForm = document.getElementById("searchForm");

let city = "Stockholm";

// show is added to how burger menu appears
const show = () => {
  sideMenu.style.display = "flex";
  sideMenu.style.top = "0";
  closeMenu.style.display = "block";
};
const close = () => {
  sideMenu.style.top = "-150%";
  closeMenu.style.display = "none";
};

//dayEmoji defines emoji based on 5 day weather forecast
const dayEmoji = {
  Clouds: "./images/cloudy.svg",
  Clear: "./images/day.svg",
  Rain: "./images/rainy-6.svg",
  Snow: "./images/snowy-6.svg",
};

// getWeather fetches info from current city in header
const getWeather = (city) => {
  API_WEATHER = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=2daa8713e80e4a10a9123c077820312c`;
  API_FORECAST = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=2daa8713e80e4a10a9123c077820312c`;

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
    <h2 id="currentCity">${data.name}</h2>
    <h3 id="typeOfWeather">${data.weather[0].description}</h3>
    <h3 id="sunriseAndSunset">sunrise ${sunrise} sunset ${sunset}</h3>
    `;

      // Changing the background based on night / day
      const dayToNight = () => {
        if (time < sunrise && time > sunset) {
          weatherContainer.style.background = `
      linear-gradient(
       180deg,
        #323667 0%,
        #6B6EA8 100%
      `;
        }
      };
      dayToNight();

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
      <img id="mainIcon" class="main-icon" src="./images/fog.svg" alt="image of fog" />`; //Added fog
    } else if (weatherIcon === "Clouds") {
      weatherData.innerHTML += `
      <img id="mainIcon" class="main-icon" src="./images/cloudy-day-1.svg" alt="image of clouds" />`;
      }
    });

  // getForecast fetches 5 days weather
  fetch(API_FORECAST)
    .then((res) => res.json())
    .then((forecast) => {
      console.log("forecast", forecast);
      let filteredForecast = forecast.list.filter((day) =>
        day.dt_txt.includes("12:00")
      );

      weeklyWeather.innerHTML = "";

      filteredForecast.forEach((day) => {
        const weekTemp = day.main.temp.toFixed(0);

        // In line 108 I used the object from line 19 to generate the emoji dependent on the forecasted weather ( I couldn't add the comment inside the back ticks).
        weeklyWeather.innerHTML += `
      <div id="theWeek">
      <p>${new Date(day.dt_txt).toLocaleDateString("en-US", {
        weekday: "short",
      })} </p>
          <img src ="${dayEmoji[day.weather[0].main]}">
          <p id="weekTemp">${weekTemp}ºC</p>
      
      </div>
      `;
      });
    });
};

getWeather(city);

// eventListeners
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  weatherData.innerHTML = ``;
  weeklyWeather.innerHTML = ``;
  city = inputLocation.value;
  console.log("city:", city);
  getWeather(city);
});

burger.addEventListener("click", show);
closeMenu.addEventListener("click", close);
searchForm.addEventListener("submit", close);
