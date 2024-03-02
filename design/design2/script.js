//////////////// DOM SELECTORS //////////////////
const errorDiv = document.getElementById("error");
const currentWeather = document.getElementById("current-weather");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const icon = document.getElementById("icon");
const promptText = document.getElementById("prompt-text");
const forecastTable = document.getElementById("forecast-table");

//////////////// GLOBAL VARIABLES ///////////////
const MY_API_KEY = "31320abec19306a046f96f4c46f01157";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const coordinates = {
  lat: 57.721595,
  lon: 12.0253,
};

const city = "Göteborg";

///////////// Functions to fetch weather //////////////

const fetchCurrentWeather = () => {
  const URL = `${BASE_URL}/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${MY_API_KEY}`;
  fetch(URL)
    .then((response) => response.json())
    .then((currentWeatherData) => handleCurrentWeatherData(currentWeatherData))
    .catch((error) => {
      console.log(error);
      errorDiv.innerHTML = "Something went wrong";
    });
};
fetchCurrentWeather();

const fetchForecast = () => {
  const URL = `${BASE_URL}/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${MY_API_KEY}`;
  fetch(URL)
    .then((response) => response.json())
    .then((forecastData) => handleForecastData(forecastData))
    .catch((error) => {
      console.log(error);
      errorDiv.innerHTML = "Something went wrong";
    });
};
fetchForecast();

///////////// Function to format time //////////////

const formatTime = (seconds) => {
  return new Date(seconds * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

///////// Functions to update prompt section /////////

const updatePrompt = (currentWeatherData) => {
  switch (currentWeatherData.weather[0].main) {
    case "Clear":
      icon.setAttribute("src", "./icons/noun_Sunglasses_2055147.svg");
      icon.setAttribute("alt", "Sunglasses");
      promptText.innerHTML = `Get your sunnies on. ${city} is looking rather great today.`;
      break;
    case "Clouds":
      icon.setAttribute("src", "./icons/noun_Cloud_1188486.svg");
      icon.setAttribute("alt", "Cloud");
      promptText.innerHTML = `Light a fire and get cosy. ${city} is looking grey today.`;
      break;
    case "Rain":
      icon.setAttribute("src", "./icons/noun_Umbrella_2030530.svg");
      icon.setAttribute("alt", "Umbrella");
      promptText.innerHTML = `Don't forget your umbrella. It's wet in ${city} today.`;
      break;
    default:
      icon.removeAttribute("src");
      icon.removeAttribute("alt");
      promptText.innerHTML = city;
  }
};

//////// Functions to update HTML ////////

const updateCurrentWeather = (currentWeatherData) => {
  // format current weather:
  const weatherDescription = currentWeatherData.weather[0].main.toLowerCase();
  console.log(weatherDescription);
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
    const iconURL = getWeatherIconURL(listItem.weather[0].main);
    const temp = Math.round(listItem.main.temp * 10) / 10;
    forecastTable.innerHTML += `
    <tr>
    <td>${weekday}</td>
    <td><img src="${iconURL}"></td>
    <td>${temp}°</td>
  </tr>`;
  });
};

///////////// Function to update HTML //////////////

const handleCurrentWeatherData = (currentWeatherData) => {
  updateCurrentWeather(currentWeatherData);
  updatePrompt(currentWeatherData);
  console.log(currentWeatherData);
};

const handleForecastData = (forecastData) => {
  console.log("forecast data", forecastData);
  const filteredForecast = forecastData.list.filter((listItem) => {
    //filter list items
    const date = new Date(listItem.dt * 1000); //convert to milliseconds and create date object
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
  console.log(filteredForecast);
  updateForecast(filteredForecast);
};

// functions to recieve days for forecast
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
  const weekdayArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const index = date.getDay();
  return weekdayArr[index];
};

const getWeatherIconURL = (weather) => {
  switch (weather) {
    case "Clear":
      return "./icons/noun_Sunglasses_2055147.svg";
    case "Clouds":
      return "./icons/noun_Cloud_1188486.svg";
    case "Rain":
      return "./icons/noun_Umbrella_2030530.svg";
    default:
      return "";
  }
};
