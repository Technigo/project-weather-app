//////////////// DOM SELECTORS //////////////////
const currentWeatherError = document.getElementById("current-weather-error");
const forecastError = document.getElementById("forecast-error");
const currentWeather = document.getElementById("current-weather");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const icon = document.getElementById("icon");
const promptText = document.getElementById("prompt-text");
const forecastTable = document.getElementById("forecast-table");

//////////////// GLOBAL VARIABLES ///////////////
const MY_API_KEY = "31320abec19306a046f96f4c46f01157";
const BASE_URL = "https://api.openweathermap.org/data/2.5";
let currentWeatherMain = "";
let city = "";

////// Function to get user's coordinates //////

const getCoordinates = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${MY_API_KEY}`
      )
        .then((response) => response.json())
        .then((json) => {
          city = json[0].name;
          fetchCurrentWeather(latitude, longitude);
        });
    });
  } else {
    currentWeatherError.innerHTML =
      "Geolocation is not supported by this browser.";
  }
};
getCoordinates();

///////////// Functions to fetch weather //////////////

const fetchForecast = (latitude, longitude) => {
  const URL = `${BASE_URL}/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${MY_API_KEY}`;
  fetch(URL)
    .then((response) => response.json())
    .then((forecastData) => handleForecastData(forecastData))
    .catch((error) => {
      forecastError.innerHTML = "Couldn't fetch forecast";
    });
};

const fetchCurrentWeather = (latitude, longitude) => {
  const URL = `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${MY_API_KEY}`;
  fetch(URL)
    .then((response) => response.json())
    .then((currentWeatherData) => handleCurrentWeatherData(currentWeatherData))
    // fetch forecast after fetching current weather data:
    .then(() => fetchForecast(latitude, longitude))
    .catch((error) => {
      currentWeatherError.innerHTML = "Couldn't fetch current weather";
    });
};

////// Function to format time //////

const formatTime = (seconds) => {
  return new Date(seconds * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

////// Functions to update HTML //////

const updatePrompt = (currentWeatherData) => {
  icon.setAttribute("src", getWeatherIconURL(currentWeatherMain));
  switch (currentWeatherMain) {
    case "Clear":
      icon.setAttribute("alt", "Sunglasses");
      icon.className = "clear-icon";
      promptText.innerHTML = `Get your sunnies on. ${city} is looking rather great today.`;
      document.body.className = "clear";
      break;
    case "Clouds":
    case "Atmosphere":
    case "Mist":
    case "Smoke":
    case "Haze":
    case "Dust":
    case "Fog":
    case "Sand":
    case "Dust":
    case "Ash":
    case "Squall":
    case "Tornado":
      icon.setAttribute("alt", "Cloud");
      icon.className = "clouds-icon";
      promptText.innerHTML = `Light a fire and get cosy. ${city} is looking grey today.`;
      document.body.className = "clouds";
      break;
    case "Rain":
    case "Drizzle":
      icon.setAttribute("alt", "Umbrella");
      icon.className = "rain-icon";
      promptText.innerHTML = `Don't forget your umbrella. It's wet in ${city} today.`;
      document.body.className = "rain";
      break;
    case "Snow":
      icon.setAttribute("alt", "Snowflake");
      icon.className = "snow-icon";
      promptText.innerHTML = `Slide right into your slippers. It's snowing in ${city} today.`;
      document.body.className = "snow";
      break;
    case "Thunderstorm":
      icon.setAttribute("alt", "Thunderstorm");
      icon.className = "thunderstorm-icon";
      promptText.innerHTML = `Light your candles. A thunderstorm is rolling in over ${city} today.`;
      document.body.className = "thunderstorm";
      break;
    default:
      icon.removeAttribute("src");
      icon.removeAttribute("alt");
      promptText.innerHTML = city;
  }
};

const updateCurrentWeather = (currentWeatherData) => {
  // format current weather:
  const weatherDescription = currentWeatherData.weather[0].main.toLowerCase();
  const currentTemp = Math.round(currentWeatherData.main.temp * 10) / 10;
  currentWeather.innerHTML = `${weatherDescription} | ${currentTemp}°`;
  // format sunrise time:
  const sunriseTime = formatTime(currentWeatherData.sys.sunrise);
  sunrise.innerHTML = `sunrise ${sunriseTime}`;
  // format sunset time:
  const sunsetTime = formatTime(currentWeatherData.sys.sunset);
  sunset.innerHTML = `sunset ${sunsetTime}`;
};

const updateForecast = (filteredForecastList) => {
  forecastTable.innerHTML = "";
  filteredForecastList.forEach((listItem) => {
    const date = new Date(listItem.dt * 1000);
    const weekday = getWeekday(date);
    const iconURL = getForecastIconURL(listItem.weather[0].main);
    const temp = Math.round(listItem.main.temp * 10) / 10;
    const weather = currentWeatherMain.toLowerCase();
    forecastTable.innerHTML += `
      <tr>
        <td>${weekday}</td>
        <td><img id="forecast-icon" class="${weather}-icon" src="${iconURL}"></td>
        <td id="forecast-temp">${temp}°</td>
      </tr>`;
  });
};

////// Functions to handle weather data //////

const handleCurrentWeatherData = (currentWeatherData) => {
  currentWeatherMain = currentWeatherData.weather[0].main;
  // Activate to set a certain type of weather condition, e.g. "Clear":
  //currentWeatherMain = "Clear";
  updateCurrentWeather(currentWeatherData);
  updatePrompt(currentWeatherData);
};

const handleForecastData = (forecastData) => {
  const filteredForecast = forecastData.list.filter((listItem) => {
    // filter list items:
    const date = new Date(listItem.dt * 1000); // convert to milliseconds and create date object
    if (
      date.getUTCHours() === 12 &&
      date > getFirstDateOfForecast() &&
      date < getLastDateOfForecast()
    ) {
      return true;
    } else {
      return false;
    }
  });
  updateForecast(filteredForecast);
};

////// Functions to recieve dates and weekdays for forecast //////

const getFirstDateOfForecast = () => {
  let date = new Date();
  date.setUTCDate(date.getUTCDate() + 1);
  date.setUTCHours(0, 0, 0, 0);
  return date;
};
getFirstDateOfForecast();

const getLastDateOfForecast = () => {
  let date = new Date();
  date.setUTCDate(date.getUTCDate() + 5);
  date.setUTCHours(0, 0, 0, 0);
  return date;
};
getLastDateOfForecast();

const getWeekday = (date) => {
  const weekdayArr = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const index = date.getDay();
  return weekdayArr[index];
};

////// Functions to get icons //////

const getWeatherIconURL = (weather) => {
  switch (weather) {
    case "Clear":
      return "./icons/noun_Sunglasses_2055147.svg";
    case "Clouds":
    case "Mist":
    case "Smoke":
    case "Haze":
    case "Dust":
    case "Fog":
    case "Sand":
    case "Dust":
    case "Ash":
    case "Squall":
    case "Tornado":
      return "./icons/noun_Cloud_1188486.svg";
    case "Rain":
    case "Drizzle":
      return "./icons/noun_Umbrella_2030530.svg";
    case "Snow":
      return "./icons/snowman.png";
    case "Thunderstorm":
      return "./icons/thunderbolt.png";
    default:
      return "";
  }
};

const getForecastIconURL = (weather) => {
  switch (weather) {
    case "Clear":
      return "./icons/sun.png";
    case "Clouds":
    case "Mist":
    case "Smoke":
    case "Haze":
    case "Dust":
    case "Fog":
    case "Sand":
    case "Dust":
    case "Ash":
    case "Squall":
    case "Tornado":
      return "./icons/noun_Cloud_1188486.svg";
    case "Rain":
    case "Drizzle":
      return "./icons/rainy.png";
    case "Snow":
      return "./icons/snowflake.png";
    case "Thunderstorm":
      return "./icons/storm.png";
    default:
      return "";
  }
};
