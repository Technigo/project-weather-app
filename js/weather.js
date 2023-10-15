/**
 * Weather-related functions
 */
import { getForecast, getAirPollution } from "./geolocation.js";

const headerbackground = document.querySelector(".header-background");
const backgroundMask = document.querySelector("#background-mask");

// Function that outputs weatherData
export const generateWeatherHTML = (data) => {
  // Locals
  const sunriseUTC = new Date(data.sys.sunrise * 1000);
  const sunsetUTC = new Date(data.sys.sunset * 1000);
  const weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
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
      <p class="description">${data.weather[0].description}</p>
      <img id="header-weather-icon" src="${weatherIcon}" alt="current image icon" width="60px" height="60" />
    </div>
    <div class="flex-space-between">
        <p>sunrise ${formateTime(sunriseUTC, data.timezone)}</p>
        <p>sunset ${formateTime(sunsetUTC, data.timezone)}</p>
    </div>
    
    `;

  getAirPollution(data.coord.lat, data.coord.lon);
  getForecast(data.coord.lat, data.coord.lon);
  // Update background according to time
  changeHeaderBackground(currentHours, data.weather[0].description);
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
function changeHeaderBackground(currentHours, weatherDescription) {
  // Statement that changes the background-mask depending on the time
  let linearGradiant = "";
  let backgroundImg = "";

  if (currentHours >= "06" && currentHours < "20") {
    linearGradiant =
      "linear-gradient(90deg, rgba(133, 137, 255, 0.7) 0%, rgba(232, 233, 255, 0.7) 100%)";
  } else {
    linearGradiant =
      "linear-gradient(270deg, rgba(98, 100, 162, 0.7) 0%, rgba(34, 35, 80, 0.7) 100%)";
  }

  // Statement that changes the background-image depending on the weather description
  if (weatherDescription.includes("clouds")) {
    backgroundImg = "url('assets/clouds.jpg')";
  } else if (weatherDescription.includes("snow")) {
    backgroundImg = "url('assets/snow.jpg')";
  } else if (weatherDescription.includes("rain")) {
    backgroundImg = "url('assets/rain.jpg')";
  } else {
    backgroundImg = "url('assets/clear-sky.jpg')";
  }

  // Add styling to background image
  headerbackground.style.background = `${linearGradiant}, ${backgroundImg}`;
  headerbackground.style.backgroundSize = "cover";
  headerbackground.style.backgroundPosition = "center";
}
