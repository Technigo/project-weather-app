import { weatherData } from "./data.js";

// Globals
const main = document.getElementById("main");
const footer = document.getElementById("footer");
const currentWeatherSection = document.getElementById(
  "section__current-weather"
);
const forecastSection = document.getElementById("section__forecast");
let currentTheme = [];
let currentTemp = "";

// Function that handles the theme colors depending on the current weather
const handleColorTheme = (currentWeatherType, currentTemp) => {
  // Set weatherType as the key to the weatherData object to get the color theme.
  // Set default as empty object.
  currentTheme = weatherData[currentWeatherType] || {};

  if (!currentTheme) {
    console.log("Load default theme");
    return false;
  } else {
    // Set main theme for weather app
    main.style.backgroundColor =
      currentTemp > 15 ? currentTheme.bgColor : currentTheme.color;
    main.style.color =
      currentTemp > 15 ? currentTheme.color : currentTheme.bgColor;

    // Set opacity to footer
    footer.style.backgroundColor =
      currentTemp > 15 ? currentTheme.color : "rgb(68, 68, 68)";
  }
};

// Function to get the current weather theme based on the weather type
export const getCurrentTheme = () => {
  return currentTheme;
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

// Function that handels color theme
export const handleWeatherData = async (data) => {
  // Getting the weather type from api
  const currentWeatherType = data.weather[0].main;
  currentTemp = data.main.temp;

  // Pass the weather type as an argument to handle the theme colors
  handleColorTheme(currentWeatherType, currentTemp);

  const sunriseUTC = new Date(data.sys.sunrise * 1000);
  const sunsetUTC = new Date(data.sys.sunset * 1000);

  // Get the object with matching weatherType
  const weatherInfo = weatherData[currentWeatherType];

  currentWeatherSection.innerHTML += `
  <div class="current-weather-container">
    <div class="current-weather">
        <p>${weatherInfo.main} | ${Math.round(currentTemp * 10) / 10}&deg;</p>
        <p>sunrise ${formateTime(sunriseUTC, data.timezone)}</p>
        <p>sunset ${formateTime(sunsetUTC, data.timezone)}</p>
        </div>
        <img
        src="${currentTemp > 15 ? weatherInfo.coldIcon : weatherInfo.warmIcon}"
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

// Make function async to wait for the respons
export const handleForecastData = async (data) => {
  // Get forecast list
  const forecastArray = [...data.list];

  // Filter forcast for 12 o'clock
  const filteredArray = forecastArray.filter((day) => {
    return day.dt_txt.toLowerCase().endsWith("12:00:00");
  });

  filteredArray.forEach((day) => {
    // Get the shorter version of weekday -> mon, tue
    const date = new Date(day.dt_txt);
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "short" });

    forecastSection.innerHTML += `
      <div class="forecast-container">
        <div class="forecast-wrapper" style="border-bottom: 1px dashed ${
          currentTheme.color
        }">
          <p>${dayOfWeek}</p>
          <span>${Math.round(day.main.temp * 10) / 10}&deg;</span>
        </div>
      </div>
    `;
  });
};
