// DOM selectors
const currentWeather = document.getElementById("weather-container");
// const displayTemp = document.getElementById("temp");
// const displayLocation = document.getElementById("location");
// const displayCondition = document.getElementById("condition");
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
    const todaySunrise = convertDateTime(data.sys.sunrise, data.timezone);
    const todaySunset = convertDateTime(data.sys.sunset, data.timezone);
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
    const forecastData = json.list
      .filter((item, index) => (index - 1) % 8 === 0)
      .slice(0, 4); // Filter for every 8th item, which represents once every day

    console.log("FORECAST JSON DATA", json); //NOT TO FORGET TO DELETE

    //To get the correct temperature for each of the day in the forecast
    forecastData.forEach((forecast, index) => {
      const startIdx = index * 8; // Starting index of the forecast day
      const endIdx = startIdx + 8; // Ending index of the forecast day

      // Extract temperatures for the current forecast day
      const temperatures = json.list
        .slice(startIdx, endIdx)
        .map(item => item.main.temp);

      // Calculate lowest and highest temperatures for the current forecast day
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
printForecast();
