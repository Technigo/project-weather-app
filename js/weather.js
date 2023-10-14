/**
 * Weather-related functions
 */
import { getForecast } from "./geolocation.js";

const headerbackground = document.querySelector(".header-background");

// Function that outputs weatherData
export const generateWeatherHTML = (data) => {
  console.log(data);
  // Locals
  const sunriseUTC = new Date(data.sys.sunrise * 1000);
  const sunsetUTC = new Date(data.sys.sunset * 1000);
  const weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  // Variables for current time HH:MM
  const currentHours = getUTCTime(data.timezone)
    .getUTCHours()
    .toString()
    .padStart(2, "0");
  const currentMinutes = getUTCTime(data.timezone)
    .getUTCMinutes()
    .toString()
    .padStart(2, "0");

  weatherContainer.innerHTML = `
    <h1>
    ${parseInt(data.main.temp)}
    </h1>
    <h2>${data.name}</h2>
    <span>Time: ${currentHours}:${currentMinutes}</span>
    <div class="flex-left">
      <p>${data.weather[0].description}</p>
      <img id="header-weather-icon" src="${weatherIcon}" alt="current image icon" width="60px" height="60" />
    </div>
    <div class="flex-space-between">
        <p>sunrise ${formateTime(sunriseUTC, data.timezone)}</p>
        <p>sunset ${formateTime(sunsetUTC, data.timezone)}</p>
    </div>
    `;

  getForecast(data.coord.lat, data.coord.lon);
  // Update background according to time
  changeHeaderBackground(currentHours);
};

// Function that adjusts for timezone in the API object
const getUTCTime = (secondsToAdd) => {
  let millisecondsToAdd = secondsToAdd * 1000;
  const currentTimeUTC = new Date();
  const adjustTime = new Date(
    currentTimeUTC.setMilliseconds(
      currentTimeUTC.getMilliseconds() + millisecondsToAdd
    )
  );
  return adjustTime;
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

// Function to add day/night background to header
function changeHeaderBackground(currentHours) {
  if (currentHours >= "06" && currentHours < "20") {
    headerbackground.classList.add("background-mask-day");
    headerbackground.classList.remove("background-mask-night");
  } else {
    headerbackground.classList.add("background-mask-night");
    headerbackground.classList.remove("background-mask-day");
  }
}
