import { weatherData } from "./data.js";

// Globals
const main = document.getElementById("main");
const footer = document.getElementById("footer");
const currentWeatherSection = document.getElementById(
  "section__current-weather"
);

// Function that handles the theme colors depending on the current weather
const handleColorTheme = (currentWeatherType) => {
  const theme = weatherData[currentWeatherType];

  if (!theme) {
    console.log("Load default theme");
    return false;
  }

  // Set main theme for weather app
  main.style.backgroundColor = theme.bgColor;
  main.style.color = theme.color;
  // Set opacity to footer
  footer.style.backgroundColor = `${theme.color}33`;
};

// Function that will get the correct time for sunset and sunrise
const formateTime = (dateUTC, timezone) => {
  // Timezone offset in minutes
  // UTC offset is the difference in hours and minutes between
  const timezoneOffset = timezone / 60;
  // Adjust local time based on the timezone and summertime if necessary
  const dateLocal = new Date(
    dateUTC.getTime() +
      (timezoneOffset + new Date().getTimezoneOffset()) * 60 * 1000 // New date
  );
  // Adjusting time 00:00 to this format
  return dateLocal.toTimeString().split(" ")[0].substring(0, 5);
};

const generateCurrentWeatherHTML = (currentWeatherType, data) => {
  const sunriseUTC = new Date(data.sys.sunrise * 1000);
  const sunsetUTC = new Date(data.sys.sunset * 1000);
  console.log(data);
  let fahrenheit = data.main.temp;
  let celsius = ((fahrenheit - 32) * 5) / 9;
  console.log(celsius);
  // Get the obect with matching weatherType
  const weatherInfo = weatherData[currentWeatherType];

  currentWeatherSection.innerHTML += `
  <div class="current-weather-container">
    <div class="current-weather">
        <p>${weatherInfo.main} | ${Math.ceil(data.main.temp)}&deg;</p>
        <p>sunrise ${formateTime(sunriseUTC, data.timezone)}</p>
        <p>sunset ${formateTime(sunsetUTC, data.timezone)}</p>
        </div>
        <img
        src="${weatherInfo.icon}"
        alt="${weatherInfo.alt}"
        width="80"
        height="80"
        />
    </div>
    <div class="forecast-title">
        <h1>${weatherInfo.text.replace("Stockholm", data.name)}</h1>
    </div>
    `;
};

// Function that handles all the logic
export const handleWeatherData = (data) => {
  const currentWeatherType = data.weather[0].main;

  // Get the right color theme depending on weather
  handleColorTheme(currentWeatherType);

  generateCurrentWeatherHTML(currentWeatherType, data);
  // getFiveDaysForecastHTML
};
