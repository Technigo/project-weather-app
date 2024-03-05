// DOM-Selectors
const weatherBackground = document.getElementById("weather-background");
const searchInput = document.getElementById("search");
const todaysTemperature = document.getElementById("todays-temperature");
const weatherLocation = document.getElementById("weather-location");
const todaysWeather = document.getElementById("todays-weather");
const todaysSunrise = document.getElementById("todays-sunrise");
const todaysSunset = document.getElementById("todays-sunset");
const todaysTimeOfDay = document.getElementById("todays-time-of-day");
const forecastList = document.getElementById("forecast-list");

// Creating API URL called weatherTodayURL
const BASE_TODAY_URL = "https://api.openweathermap.org/data/2.5/weather?";
let city = "Lundsberg";
const API_KEY = "ebcad7517d4d5102daa2078b4d1b8409";
let weatherTodayURL = `${BASE_TODAY_URL}q=${city}&units=metric&APPID=${API_KEY}`;

// Function to update UI with todays weather
const updateWeatherToday = (weatherTodayData) => {
  /* ............START OF created variables........... */
  if (weatherTodayData.cod === "404") {
    // If city is not found, display an alert
    alert("Sorry, the city was not found. Please try again.");
    return; // Exit the function to prevent further execution
  }
  // If city is found, continue with UI
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
  // Clear the innerHTML before adding new images
  todaysTimeOfDay.innerHTML = "";
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
const fetchWeatherToday = (url) => {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((weatherTodayData) => {
      return updateWeatherToday(weatherTodayData);
    })
    .catch((error) => {
      console.error("Error fetching today's weather", error);
    });
};

// Creating API URL called weatherForecastURL
const BASE_FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast?";

let weatherForecastURL = `${BASE_FORECAST_URL}q=${city}&units=metric&APPID=${API_KEY}`;

// Function to update UI with weather-forecast

const updateWeatherForecast = (weatherForecastData) => {
  // If city is found, continue with updating UI
  const filteredWeatherData = weatherForecastData.list.filter((weatherData) =>
    weatherData.dt_txt.includes("12:00:00")
  );

  //Clear previous forecast data
  forecastList.innerHTML = "";

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
    const iconUrl = `https://openweathermap.org/img/wn/${weatherIconCode}.png`;
    // Get temperature
    const temperature = filteredData.main.temp.toFixed(0);

    forecastList.innerHTML += `
    <div class="forecast-day">
    <p> ${dayOfWeek} </p>
    <img src="${iconUrl}" alt="Weather Icon">
    <p> ${temperature} °C</p>
    </div>
    `;
  });
};

const fetchWeatherForecast = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((weatherForecastData) => {
      updateWeatherForecast(weatherForecastData);
    })
    .catch((error) => {
      console.error("Error fetching weather forecast:", error);
    });
};

// Trying function for the search-bar
const loadSearchResults = (event) => {
  if (event.key === "Enter") {
    const searchValue = searchInput.value.trim().toLowerCase();

    if (searchValue) {
      // Updating city with users input
      city = searchValue;

      // Update API URLs with the new city
      weatherTodayURL = `${BASE_TODAY_URL}q=${city}&units=metric&APPID=${API_KEY}`;
      weatherForecastURL = `${BASE_FORECAST_URL}q=${city}&units=metric&APPID=${API_KEY}`;

      fetchWeatherToday(weatherTodayURL);
      fetchWeatherForecast(weatherForecastURL);
      // Clear search input
      searchInput.value = "";
    } else {
      alert("Please enter a city name.");
    }
  }
};

// Event listener searchinput
searchInput.addEventListener("keypress", loadSearchResults);

// Calling the function to fetch the todaysweather & forecast data
fetchWeatherToday(weatherTodayURL);
fetchWeatherForecast(weatherForecastURL);
