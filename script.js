// DOM selectors
const currentWeather = document.getElementById("weather-container");
const cityDropdown = document.getElementById("city-dropdown");
const displayForecast = document.getElementById("weather-forecast");

// API
const API_BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "a1f68c4f65b632802ca0dd3405694457";

// UNIX TIMESTAMP CONVERTER
const convertDateTime = unixTimestamp => {
  const date = new Date(unixTimestamp * 1000);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

// WEEKDAY DISPLAY FUNCTION
const getWeekdays = date => {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return weekdays[date.getDay()];
};

// TODAY'S WEATHER
const printWeather = async weatherURL => {
  try {
    const weatherNow = await fetch(weatherURL);
    const data = await weatherNow.json();
    const currentTemp = data.main.temp.toFixed(1);
    const currentLocation = data.name;
    const currentCondition = data.weather[0].description;
    const icon = data.weather[0].icon;
    const todaySunrise = convertDateTime(data.sys.sunrise, data.timezone);
    const todaySunset = convertDateTime(data.sys.sunset, data.timezone);
    const ICON_URL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    const currentTimezoneOffset = data.timezone;

    const currentTime = new Date(
      new Date().getTime() + currentTimezoneOffset * 1000
    );
    const hours = currentTime.getHours();
    let backgroundClass;

    if (hours >= 18 || hours < 6) {
      backgroundClass = "night-background";
    } else {
      backgroundClass = "day-background";
    }

    const currentWeather = document.getElementById("current-weather");
    currentWeather.className = backgroundClass;

    currentWeather.innerHTML = `
    <div id="today-weather-backgroundr">
    <p class="temp">${currentTemp}<span>&deg;C</span></p>
    <h1 class="location">${currentLocation}</h1>
    <p class="condition">${currentCondition} <img class="icon" src="${ICON_URL}"></p>
    <div class="sun-time">
    <p class="sunrise">Sunrise ${todaySunrise}</p>
    <p class="sunset">Sunset ${todaySunset}</p>
    </div>
    </div>`;
  } catch (error) {
    console.error(error); //in case of an error
  }
};

// 4-DAY WEATHER FORECAST
const printForecast = async forecastURL => {
  try {
    const fourDayWeather = await fetch(forecastURL);
    const json = await fourDayWeather.json();
    const forecastData = json.list
      .filter((item, index) => (index - 1) % 8 === 0)
      .slice(0, 4);

    forecastData.forEach((forecast, index) => {
      const startIdx = index * 8;
      const endIdx = startIdx + 8;

      const temperatures = json.list
        .slice(startIdx, endIdx)
        .map(item => item.main.temp);

      const lowestTemp = Math.min(...temperatures).toFixed(0);
      const highestTemp = Math.max(...temperatures).toFixed(0);

      const forecastDate = new Date(forecast.dt * 1000);
      const weekday = getWeekdays(forecastDate);
      const icon = forecast.weather[0].icon;

      const forecastElement = document.createElement("div");
      forecastElement.innerHTML = `
      <div class="forecast-display">
      <p>${weekday}</p>
      <img class="icon" src="https://openweathermap.org/img/wn/${icon}@2x.png">
      <p>${lowestTemp}&deg; / ${highestTemp}&deg;C</p>
      </div>`;
      displayForecast.appendChild(forecastElement);
    });
  } catch (error) {
    console.error(error);
  }
};

// EVENTLISTENER
cityDropdown.addEventListener("change", () => {
  const newCity = cityDropdown.value;
  const newWeatherURL = `${API_BASE_URL}/weather?q=${newCity}&units=metric&appid=${API_KEY}`;
  const newForecastURL = `${API_BASE_URL}/forecast?q=${newCity}&units=metric&appid=${API_KEY}`;

  currentWeather.innerHTML = "";
  displayForecast.innerHTML = "";

  printWeather(newWeatherURL);
  printForecast(newForecastURL);
});

// Initial call
const initialWeatherURL = `${API_BASE_URL}/weather?q=bern&units=metric&appid=${API_KEY}`;
const initialForecastURL = `${API_BASE_URL}/forecast?q=bern&units=metric&appid=${API_KEY}`;

printWeather(initialWeatherURL);
printForecast(initialForecastURL);
