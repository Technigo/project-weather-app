// DOM-Selectors
const weatherBackground = document.getElementById("weather-background");
const todaysTemperature = document.getElementById("todays-temperature");
const weatherLocation = document.getElementById("weather-location");
const todaysWeather = document.getElementById("todays-weather");
const todaysSunrise = document.getElementById("todays-sunrise");
const todaysSunset = document.getElementById("todays-sunset");
const todaysTimeOfDay = document.getElementById("todays-time-of-day");
const forecastDay = document.getElementById("forecast-day");
const forecastWeather = document.getElementById("forecast-weather");
const forecastTemperature = document.getElementById("forecast-temperature");

// Creating API URL called weatherTodayURL
const BASE_TODAY_URL = "https://api.openweathermap.org/data/2.5/weather?";
const city = "Lundsberg";
const API_KEY = "ebcad7517d4d5102daa2078b4d1b8409";
const weatherTodayURL = `${BASE_TODAY_URL}q=${city}&units=metric&APPID=${API_KEY}`;

// Function to update UI with todays weather
const updateWeatherToday = (weatherTodayData) => {
  /* ............START OF created variables........... */
  const temperatureTodayRounded = weatherTodayData.main.temp.toFixed(1);
  const weatherTodayLocation = weatherTodayData.name;
  // Creating a weatherTodayDescription with capital starting-letter
  const weatherTodayDescription = weatherTodayData.weather
    .map(
      (weather) =>
        `${weather.description
          .charAt(0)
          .toUpperCase()}${weather.description.slice(1)}`
    )
    .join("");

  // Converting sunrise date from unix timestamps to milliseconds
  const sunriseTimeMilliseconds = new Date(weatherTodayData.sys.sunrise * 1000);

  // Converting sunrise date from unix timestamps to milliseconds
  const sunsetTimeMilliseconds = new Date(weatherTodayData.sys.sunset * 1000);

  // Formating sunrisetime to a readable format in Swedish
  const sunriseTimeFormatted = sunriseTimeMilliseconds.toLocaleTimeString(
    "sv-SE",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  // Formating sunsettime to a readable format in Swedish
  const sunsetTimeFormatted = sunsetTimeMilliseconds.toLocaleTimeString(
    "sv-SE",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  // Convert the data timestamp to milliseconds and adjust for the timezone shift
  const dataTimestampMilliseconds =
    (weatherTodayData.dt + weatherTodayData.timezone) * 1000;

  // Create a Date object for the adjusted data timestamp
  const localTime = new Date(dataTimestampMilliseconds);

  //Adjust for the timezone offset considering potential daylight saving time adjustments
  const timezoneOffsetMilliseconds = localTime.getTimezoneOffset() * 60000; // Convert minutes to milliseconds
  const localTimeCorrected = new Date(
    localTime.getTime() + timezoneOffsetMilliseconds
  );

  //Format the corrected local time in Swedish locale
  const formattedLocalTime = localTimeCorrected.toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  /* ............START OF INNER-HTML-additions........... */
  // Todays temperature
  todaysTemperature.innerHTML = `
   <p class=temperature> ${temperatureTodayRounded} </p>
   <p class=degrees> °C </p> `;

  // Todays weather-location
  weatherLocation.innerHTML = `
   <p> ${weatherTodayLocation} </p>`;

  // Todays weather with description
  todaysWeather.innerHTML = `
    <p> ${weatherTodayDescription} </p>`;

  sunrise.innerHTML = `
   <p> sunrise ${sunriseTimeFormatted} </p>`;

  sunset.innerHTML = `
   <p> sunset ${sunsetTimeFormatted} </p>`;

  // Applying different images/icons based on time of day
  if (
    formattedLocalTime >= sunriseTimeFormatted &&
    formattedLocalTime <= sunsetTimeFormatted
  ) {
    // Display sun image in html
    todaysTimeOfDay.innerHTML += `<img src="./design/assets/Big-sun.png" alt="Big sun image">`;
    // Add a class for day mode to the weatherBackground
    weatherBackground.classList.add("day-mode");
  } else {
    // Display moon-image in html
    todaysTimeOfDay.innerHTML += `<img src="./design/assets/Big-moon.png" alt="Big moon image">`;
    // Add a class for night mode to the weatherBackground
    weatherBackground.classList.add("night-mode");
  }
};

// The fetching-function
const fetchWeatherToday = () => {
  fetch(weatherTodayURL)
    .then((response) => {
      return response.json();
    })
    .then((weatherTodayData) => {
      return updateWeatherToday(weatherTodayData);
    });
};

fetchWeatherToday();

// Creating API URL called weatherForecastURL
const BASE_FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast?";

const weatherForecastURL = `${BASE_FORECAST_URL}q=${city}&units=metric&APPID=${API_KEY}`;

// Function to update UI with weather-forecast

const updateWeatherForecast = (weatherForecastData) => {
  const filteredWeatherData = weatherForecastData.list.filter((weatherData) =>
    weatherData.dt_txt.includes("12:00:00")
  );

  // Clear existing content
  forecastDay.innerHTML = "";
  forecastWeather.innerHTML = "";
  forecastTemperature.innerHTML = "";

  let forecastDayHTML = "";
  let forecastWeatherHTML = "";
  let forecastTemperatureHTML = "";

  filteredWeatherData.forEach((filteredData) => {
    // Convert to millieseconds
    const timestamp = filteredData.dt * 1000;
    // Get date
    const date = new Date(timestamp);
    // Get day of week
    const dayOfWeek = date.toLocaleString("en-GB", {
      weekday: "long",
    });
    // Get icon-code for weather
    const weatherIconCode = filteredData.weather[0].icon;
    // Construct icon URL
    const iconUrl = `http://openweathermap.org/img/wn/${weatherIconCode}.png`;
    // Get temperature
    const temperature = filteredData.main.temp.toFixed(0);

    forecastDayHTML += `<p> ${dayOfWeek} </p>`;
    forecastWeatherHTML += `<img src="${iconUrl}" alt="Weather Icon">`;
    forecastTemperatureHTML += `<p> ${temperature} °C</p>`;
  });
  forecastDay.innerHTML = forecastDayHTML;
  forecastWeather.innerHTML = forecastWeatherHTML;
  forecastTemperature.innerHTML = forecastTemperatureHTML;
};

const fetchWeatherForecast = () => {
  fetch(weatherForecastURL)
    .then((response) => response.json())
    .then((weatherForecastData) => {
      updateWeatherForecast(weatherForecastData);
    });
};

// Calling the function to fetch the forecast data
fetchWeatherForecast();
