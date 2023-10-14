// Globals
const apiKey = "00cf2e54cabfd29c16426be71518c00a";
const suffix = `&units=metric&APPID=${apiKey}`;
const container = document.getElementsByClassName("container");
const weatherBtn = document.getElementById("btn-next-city");

// FETCHING DATA
// Get data from Openweather API by using city or coordinates
const fetchWeatherDataByCity = async (cityOrCoords) => {
  let URL;

  // Building the URL depepending on city or coordinates
  if (typeof cityOrCoords === "string") {
    const city = cityOrCoords;
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=";

    URL = `${apiURL}${city}${suffix}`;
  } else if (typeof cityOrCoords === "object") {
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?";
    const lat = cityOrCoords.coords.latitude;
    const lon = cityOrCoords.coords.longitude;

    URL = `${apiURL}lat=${lat}&lon=${lon}${suffix}`;
  } else {
    constainer.innerText = "Invalid input";
    return;
  }

  try {
    const response = await fetch(URL);
    const weatherData = await response.json();
    console.log(weatherData);

    generateWeatherHTML(weatherData);
    return;
  } catch (error) {
    container.innerText = "Fetch error: " + error;
  }
};

// Check if geolocation is available in browser
const fetchUserLocation = () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      fetchWeatherDataByCity(position);
    });
  } else {
    container.innerText = "Geolocation is not available";
  }
};
// TODO: Om city inte finns så ska location köras
fetchUserLocation();

// GENERAL HTML
// Generate HTML output for weatherData
const generateWeatherHTML = (data) => {
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
    <p>${data.weather[0].main}</p>
    <img id="header-weather-icon" src="${weatherIcon}" alt="current image icon" />
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

// Get forecast for the coming 4 days (Sebastian)
//Make a function that takes 2 arguments, latitude and longitude
const getForecast = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}${suffix}`
    );
    const data = await response.json();
    // Get an array of the forecasts
    const forecastArray = [...data.list];

    // Filter out only forecasts for 9 ó clock
    const filteredArray = forecastArray.filter((day) => {
      return day.dt_txt.toLowerCase().endsWith("09:00:00");
    });
    // Loop over the filteredArray get the day of the week from dt and save it as a variable called "dayOfTheWeek"
    filteredArray.forEach((day, index) => {
      if (index < 4) {
        let timestamp = day.dt;
        let date = new Date(timestamp * 1000);
        let dayOfTheWeek = date.toLocaleDateString("en-US", {
          weekday: "short",
        });
        // Render the needed data on the page
        document.querySelector(".forecast__container").innerHTML += `
        <div class="forecast__single-day-flex">
          <span class="forecast__day">${dayOfTheWeek}</span>
          <span class="forecast__image"><img src="https://openweathermap.org/img/wn/${
            day.weather[0].icon
          }@2x.png" alt="" /></span>
          <span class="forecast__temp">${parseInt(day.main.temp)} °C</span>
          <span class="forecast__wind">${day.wind.speed}m/s</span>
        </div>      
        `;
      } else return;
    });
  } catch (error) {
    console.log("Could not contact the weather forecast API", error);
  }
};

// GENERAL FUNCTIONS
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
    headerbackground.classList.remove("background-mask-night");
    headerbackground.classList.add("background-mask-day");
  } else {
    headerbackground.classList.add("background-mask-night");
    headerbackground.classList.remove("background-mask-day");
  }
}
