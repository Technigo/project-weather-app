// DOM-Selectors
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
const city = "Lundsberg,Sweden";
const API_KEY = "ebcad7517d4d5102daa2078b4d1b8409";
const weatherTodayURL = `${BASE_TODAY_URL}q=${city}&units=metric&APPID=${API_KEY}`;

// Function to update the UI with todays weather information
const updateWeatherToday = (weatherTodayData) => {
  /* ............START OF created variables........... */
  // A varieble temperatureTodayRounded (todays temperature, 1 decimal)
  const temperatureTodayRounded = weatherTodayData.main.temp.toFixed(1);
  // Creating a weatherTodayLocation variable
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
  console.log(sunriseTimeMilliseconds);

  // Converting sunrise date from unix timestamps to milliseconds
  const sunsetTimeMilliseconds = new Date(weatherTodayData.sys.sunset * 1000);
  console.log(sunsetTimeMilliseconds);

  // Formating sunrisetime to a readable format in Swedish
  const sunriseTimeFormatted = sunriseTimeMilliseconds.toLocaleTimeString(
    "sv-SE",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );
  // Testing formatted sunrise-time
  console.log("Formatted sunrise time:", sunriseTimeFormatted);

  // Formating sunsettime to a readable format in Swedish
  const sunsetTimeFormatted = sunsetTimeMilliseconds.toLocaleTimeString(
    "sv-SE",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );
  console.log("Formatted sunset time:", sunsetTimeFormatted);

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
  console.log("Local time at specified location", formattedLocalTime);

  /* ............START OF INNER-HTML-additions........... */
  // Todays temperature
  todaysTemperature.innerHTML = `
   <p> ${temperatureTodayRounded} </p>
   <p> °C </p> `;

  // testing todaysTemperature
  console.log(`"todays temperature:", ${temperatureTodayRounded}`);

  // Todays weather-location
  weatherLocation.innerHTML = `
   <p> ${weatherTodayLocation} </p>`;

  // testing the weatherLocation-name
  console.log(`"name:", ${weatherTodayLocation}`);

  // Todays weather with description
  todaysWeather.innerHTML = `
    <p> ${weatherTodayDescription} </p>`;

  // testing the todaysWeather
  console.log(`"weather description:", ${weatherTodayDescription}`);

  console.log("Weatherdata:", weatherTodayData);

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
    todaysTimeOfDay.innerHTML = `<img src="./design/assets/Big-sun.png" alt="Big sun image">`;
  } else {
    // Display moon-image in html
    todaysTimeOfDay.innerHTML = `<img src="./design/assets/Big-moon.png" alt="Big moon image">`;
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

console.log("weather forecast:", weatherForecastURL);

// Function to update the UI with todays weather information
const updateWeatherForecast = (weatherForecastData) => {
  const filteredWeatherData = weatherForecastData.list
    .filter((item) => item.dt_txt.includes("12:00:00"))
    .map((item) => {
      const timestamp = item.dt * 1000; // Convert milliseconds
      const date = new Date(timestamp);
      const dayOfWeek = date.toLocaleString("sv-SE", { weekday: "long" }); // Get day of week
      const weatherIconCode = item.weather[0].icon; // Get icon code from weather
      const createIconUrl = `http://openweathermap.org/img/wn/${weatherIconCode}.png`; // Construct icon URL
      const Temperature = item.main.temp.toFixed(0); // get temperature
      return {
        dayOfWeek,
        createIconUrl,
        Temperature,
      };
    });
  console.log(filteredWeatherData);

  /* ............START OF INNER-HTML-additions........... */
  forecastDay.innerHTML = filteredWeatherData
    .map((forecast) => `<p> ${forecast.dayOfWeek} </p>`)
    .join("");
  forecastWeather.innerHTML = filteredWeatherData
    .map(
      (forecast) => `<img src="${forecast.createIconUrl}" alt="Weather Icon">`
    )
    .join("");
  forecastTemperature.innerHTML = filteredWeatherData
    .map((forecast) => `<p>${forecast.Temperature}°C</p>`)
    .join("");
};

const fetchWeatherForecast = () => {
  fetch(weatherForecastURL)
    .then((response) => response.json())
    .then((weatherForecastData) => {
      updateWeatherForecast(weatherForecastData); // Corrected the function call
    })
    .catch((error) => {
      console.error("Error fetching weather forecast:", error);
    });
};

// Calling the function to fetch the forecast data
fetchWeatherForecast();
