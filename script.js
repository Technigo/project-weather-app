// DOM selectors
const currentWeather = document.getElementById("weather-container");
// const weatherForm = document.querySelector(".weatherForm");
// const displayTemp = document.getElementById("temp");
// const displayLocation = document.getElementById("location");
// const displayCondition = document.getElementById("condition");
// const displaySunrise = document.getElementById("sunrise-time");
// const displaySunset = document.getElementById("sunset-time");
const displayForecast = document.getElementById("weather-forecast");

// API
const API_BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "a1f68c4f65b632802ca0dd3405694457";
let place = "bern";
const URL = `${API_BASE_URL}/weather?q=${place}&units=metric&appid=${API_KEY}`;
const FORECAST = `${API_BASE_URL}/forecast?q=${place}&units=metric&appid=${API_KEY}`;

//UNIX TIMESTAMP CONVERTER
const convertDateTime = unixTimestamp => {
  const date = new Date(unixTimestamp * 1000);
  const hours = String(date.getHours()).padStart(2, "0"); // 2 is length of digits and "0" to lead with 0
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

//WEEKDAY DISPLAY FUNCTION
const getWeekdays = date => {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return weekdays[date.getDay()];
};

// TODAY'S WEATHER
const printWeather = async () => {
  try {
    const weatherNow = await fetch(URL);
    const data = await weatherNow.json();
    const currentTemp = data.main.temp.toFixed(1);
    const currentLocation = data.name;
    const currentCondition = data.weather[0].description;
    const icon = data.weather[0].icon;
    const todaySunrise = convertDateTime(data.sys.sunrise);
    const todaySunset = convertDateTime(data.sys.sunset);
    const ICON_URL = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    currentWeather.innerHTML = `
    <section id="current-weather">
    <p class="temp">${currentTemp}<span>&deg;C</span></p>
    <h1 class="location">${currentLocation}</h1>
    <p class="condition">${currentCondition} <img class="icon" src="${ICON_URL}"></p>
    <p class="sunrise">Sunrise ${todaySunrise}</p>
    <p class="sunset">Sunset ${todaySunset}</p>
    </section>`;

    console.log("Data:", data); //NOT FORGET TO DELETE!!
  } catch (error) {
    console.error(error); //in case of an error
  }
};
printWeather();

// 4-DAY WEATHER FORECAST
const printForecast = async () => {
  try {
    const fourDayWeather = await fetch(FORECAST);
    const json = await fourDayWeather.json();

    //data of 12:00 PM
    const forecastData = [...json.list];
    const filteredData = [...forecastData].filter(day => {
      return day.dt_txt.toLowerCase().endsWith("12:00:00");
    });

    console.log("FORECAST JSON DATA", json); //TBDeleted

    filteredData.slice(0, 4).forEach((forecast, index) => {
      const forecastDate = new Date(forecast.dt * 1000);
      const weekday = getWeekdays(forecastDate);
      const icon = forecast.weather[0].icon;

      // LOWEST & HIGHEST TEMPERATURES
      const dailyForecast = filteredData.slice(index * 8, (index + 1) * 8);
      const dailyTemps = dailyForecast.map(item => item.main.temp.toFixed(0));
      const dailyLowestTemp = Math.min(...dailyTemps);
      const dailyHighestTemp = Math.max(...dailyTemps);

      const forecastElement = document.createElement("div");
      forecastElement.innerHTML = `
      <div class="forecast-display">
      <p>${weekday}</p>
      <img class="icon" src="https://openweathermap.org/img/wn/${icon}@2x.png">
      <p>${dailyLowestTemp}&deg; / ${dailyHighestTemp}&deg;C</p>
      </div>`;
      displayForecast.appendChild(forecastElement);
    });
  } catch (error) {
    console.error(error);
  }
};
printForecast();
