import { iconArr } from "./iconArr.js";

const apiKey = "f9321b12d77c24027e5a25c9f625e63b";

let currentLocation = null;
let currentDt = null;
let currentWeather = null;
const body = document.body;
const themeArr = [
  "clearTheme",
  "cloudsTheme",
  "rainTheme",
  "snowTheme",
  "drizzleTheme",
  "thunderstormTheme",
  "otherTheme",
];

//fetch today's weather
//and trigger displayDailyWeather + getSunTime(weatherData)
const getDailyWeather = (city) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  )
    .then((response) => {
      return response.json();
    })
    .then((weatherData) => {
      displayDailyWeather(weatherData);
      getSunTime(weatherData);
    })
    .catch((err) => {
      console.log(err);
    });
};

getDailyWeather("gothenburg");

//display the data in HTML
//and trigger getTip
const displayDailyWeather = (weatherData) => {
  //deconstruct object
  const { name } = weatherData;
  const { temp } = weatherData.main;
  const { main } = weatherData.weather[0];
  //get currentDt ready for comparing in displayWeelyWeather
  currentDt = weatherData.dt;

  document.querySelector(".temp").innerText = " " + Math.round(temp) + "°";
  document.querySelector(".description").innerText = main + " |";
  currentLocation = name;

  getTip(main);
};

const getTip = (description) => {
  let tip = null;
  let weatherDescription = null;
  let icon = null;

  const removePreviousTheme = () => {
    themeArr.forEach((theme) => {
      body.classList.remove(theme);
    });
  };

  switch (description) {
    case "Clear":
      tip = "Get your sunnies on.";
      weatherDescription = `${currentLocation} is looking rather great today.`;
      icon = iconArr[0].svg;
      currentWeather = "Clear";
      removePreviousTheme();
      body.classList.add("clearTheme");
      break;

    case "Clouds":
      tip = "Light a fire and get cosy.";
      weatherDescription = `${currentLocation} might look grey today.`;
      icon = iconArr[1].svg;
      currentWeather = "Clouds";
      removePreviousTheme();
      body.classList.add("cloudsTheme");
      break;

    case "Rain":
      tip = "Don't forget your umbrella.";
      weatherDescription = `It can get wet in ${currentLocation} today.`;
      icon = iconArr[2].svg;
      currentWeather = "Rain";
      themeArr.forEach((theme) => {
        body.classList.remove(theme);
      });
      body.classList.add("rainTheme");
      break;

    case "Snow":
      tip = "Bundle up and stay warm.";
      weatherDescription = `Snow falls in ${currentLocation} today.`;
      icon = iconArr[3].svg;
      currentWeather = "Snow";
      themeArr.forEach((theme) => {
        body.classList.remove(theme);
      });
      body.classList.add("snowTheme");
      break;

    case "Drizzle":
      tip = "Bring your raincoat.";
      weatherDescription = `${currentLocation} might feel damp today.`;
      icon = iconArr[4].svg;
      currentWeather = "Drizzle";
      themeArr.forEach((theme) => {
        body.classList.remove(theme);
      });
      body.classList.add("drizzleTheme");
      break;

    case "Thunderstorm":
      tip = "Stay indoors and be safe.";
      weatherDescription = `A dramatic show in ${currentLocation} today.`;
      icon = iconArr[5].svg;
      currentWeather = "Thunderstorm";
      themeArr.forEach((theme) => {
        body.classList.remove(theme);
      });
      body.classList.add("thunderstormTheme");
      break;

    default:
      tip = "Slow down, use fog lights.";
      weatherDescription = `Visibility dial turned down in ${currentLocation}.`;
      icon = iconArr[6].svg;
      currentWeather = "Other";
      themeArr.forEach((theme) => {
        body.classList.remove(theme);
      });
      body.classList.add("otherTheme");
  }

  document.querySelector(".tip-text").innerText = `${tip}`;
  document.querySelector(
    ".weather-description"
  ).innerText = `${weatherDescription}`;
  document.querySelector(".tip-icon").innerHTML = icon;
};

const getSunTime = (weatherData) => {
  //deconstruct the sunrise/set data from weatherData
  const { sunrise } = weatherData.sys;
  const { sunset } = weatherData.sys;
  const { timezone } = weatherData;

  // Get the local timezone offset in seconds
  const localTimezoneOffset = new Date().getTimezoneOffset() * 60;

  //convert UTC timeStamp into human-readable data
  const sunriseData = new Date(
    (sunrise + timezone + localTimezoneOffset) * 1000
  );
  const sunsetData = new Date((sunset + timezone + localTimezoneOffset) * 1000);

  //extract the exact time of the day by converting to local time
  //to prevent winter/summer time problem
  const formatTime = (date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const sunriseTime = formatTime(sunriseData);
  const sunsetTime = formatTime(sunsetData);

  document.querySelector(".sunrise").innerText = "sunrise " + sunriseTime;
  document.querySelector(".sunset").innerText = "sunset " + sunsetTime;
};

//fetch the 5-day 3-hour steps weather data
// and trigger displayWeeklyWeather
const getWeeklyWeather = (city) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
  )
    .then((response) => {
      return response.json();
    })
    .then((weatherData) => {
      displayWeeklyWeather(weatherData);
    })
    .catch((err) => {
      console.log(err);
    });
};

const weekday = document.querySelector(".weekday");
const forecastSection = document.querySelector(".forecast-section");
let getFourDayTemp = [];
let forecast = [];

const displayWeeklyWeather = (weatherData) => {
  forecastSection.innerHTML = "";
  //collect each hour's time+temp data from the weatherData
  //as the project requirements asked for : display 4 days forecast
  const getHourlyhWeather = weatherData.list.map((item) => ({
    dt: item.dt,
    dtText: item.dt_txt,
    temp: item.main.temp,
  }));

  //collect everyday's weather before 12:00
  const getNoonTemp = getHourlyhWeather.filter(
    (hour) => hour.dtText.split(" ")[1] === "12:00:00"
  );

  //check if the first day is the current day

  const dateToRemove = getNoonTemp.findIndex((item) => {
    item.dt === currentDt;
  });

  //if it is, then remove the first day
  if (dateToRemove !== -1) {
    getFourDayTemp = getNoonTemp.filter((item, index) => {
      index !== dateToRemove;
    });
  } else {
    //if it isn't, then remove the last day
    getNoonTemp.pop();
    getFourDayTemp = getNoonTemp;
  }

  //convert time data to week day
  const timpStamp = getFourDayTemp.map((item) => item.dt);
  const converDate = timpStamp.map((item) => new Date(item * 1000));
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayIndices = converDate.map((item) => item.getDay());
  const dayOfWeek = dayIndices.map((index) => daysOfWeek[index]);

  getFourDayTemp.forEach((item, index) => {
    forecastSection.innerHTML += `
    <ul class="forecast">
    <li>${dayOfWeek[index]}</li> 
    <li>${Math.round(item.temp)}°</li>
    </ul>
    `;
  });

  //update forecast's style accrodingly
  forecast = forecastSection.querySelectorAll(".forecast");

  forecast.forEach((item) => {
    switch (currentWeather) {
      case "Clear":
        item.classList.add("clearThemeDash");
        break;

      case "Clouds":
        item.classList.add("cloudsThemeDash");
        break;

      case "Rain":
        item.classList.add("rainThemeDash");
        break;

      case "Snow":
        item.classList.add("snowThemeDash");
        break;

      case "Drizzle":
        item.classList.add("drizzleThemeDash");
        break;

      case "Thunderstorm":
        item.classList.add("thunderstormThemeDash");
        break;

      default:
        item.classList.add("otherThemeDash");
    }
  });
};

//display gothenburg's weather when the page is loaded.
getWeeklyWeather("gothenburg");

//Search bar
let userSearch = null;
const searchWeather = () => {
  //assign what the users wrote in the search bar to userSearch
  userSearch = document.querySelector(".search-bar").value;
  getDailyWeather(userSearch);
  getWeeklyWeather(userSearch);
};
//add event listeners
document.querySelector(".searchBtn").addEventListener("click", searchWeather);
document.querySelector(".search-bar").addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    searchWeather();
    const targetElement = document.querySelector(".tip");
    targetElement.scrollIntoView();
  }
});

//Get weather data based on location when the page is loaded
const getBroswerLocation = () => {
  // Check if geolocation is supported by the browser
  if (navigator.geolocation) {
    // built-in getCurrentPosition method
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      getDailyWeatherByLocation(latitude, longitude);
      getWeeklyWeatherByLocation(latitude, longitude);
    });
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
};

const getDailyWeatherByLocation = (latitude, longitude) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
  )
    .then((response) => {
      return response.json();
    })
    .then((weatherData) => {
      displayDailyWeather(weatherData);
      getSunTime(weatherData);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getWeeklyWeatherByLocation = (latitude, longitude) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
  )
    .then((response) => {
      return response.json();
    })
    .then((weatherData) => {
      console.log(weatherData);
      displayWeeklyWeather(weatherData);
    })
    .catch((err) => {
      console.log(err);
    });
};

document
  .querySelector(".my-location-btn")
  .addEventListener("click", getBroswerLocation);

document.addEventListener("DOMContentLoaded", function () {
  const targetElement = document.querySelector(".forecast-section");
  targetElement.scrollIntoView();
});
