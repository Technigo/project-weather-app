/* *********************************
   Constants
********************************* */

// API key for OpenWeatherMap API
const API_KEY = "f1eb0732aa36b48c85267620f68aa926";

// Base URLs for current weather and forecast APIs
const BASE_URL_WEATHER = "https://api.openweathermap.org/data/2.5/weather";
const BASE_URL_FORECAST = "https://api.openweathermap.org/data/2.5/forecast";

// Array of weekdays for easy reference
const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

/* *********************************
   Global Variables
********************************* */

// Default city for initial weather display
let apiQueryCity = "Stockholm";

// Displayed city name (may differ in case or spelling)
let displayedCityName = "Stockholm";

// Current weather type (e.g., "Clouds", "Clear")
let weatherTypeToday = "";

// User input city name during a search
let userCityInput = "";

/* *********************************
   Testing Configuration
********************************* */

// Set to true to use mock data instead of real API data
const useMockData = false; // Change to false to use real data
const simulateNighttime = false; // Set to true to force nighttime for testing

/* *********************************
   DOM Selectors
********************************* */

// Main app container
const app = document.getElementById("app");

// Container for today's weather
const weatherTodayContainer = document.getElementById("weather-today");

// Container for weather forecast
const weatherForecastContainer = document.getElementById("weather-forecast");

// List element for the forecast data
const forecastList = document.getElementById("weather-forecast__list");

/* *********************************
   Weather Types
********************************* */

// Object containing data for different weather conditions
const weatherTypes = {
  clouds: {
    className: "is-cloudy",
    dayMessage: "Light a fire and get cosy. {city} is looking grey today.",
    dayImgSrc: "./assets/animated/cloudy.svg",
    dayImgAlt: "Clouds",
    nightMessage:
      "The clouds linger over {city}, creating a calm, moody night.",
    nightImgSrc: "./assets/animated/partly-cloudy-night.svg",
    nightImgAlt: "Clouds",
  },
  clear: {
    className: "is-clear",
    dayMessage: "Get your sunnies on. {city} is looking rather great today.",
    dayImgSrc: "./assets/animated/clear-day.svg",
    dayImgAlt: "Sun spinning",
    nightMessage: "It's a clear and beautiful night in {city}.",
    nightImgSrc: "./assets/animated/clear-night.svg",
    nightImgAlt: "Clear night",
  },
  drizzle: {
    className: "is-drizzly",
    dayMessage: "There's a light drizzle in {city}. Keep your raincoat handy!",
    dayImgSrc: "./assets/animated/drizzle.svg",
    dayImgAlt: "Drizzle",
    nightMessage: "A soft drizzle falls over {city} this night.",
    nightImgSrc: "./assets/animated/extreme-night-drizzle.svg",
    nightImgAlt: "Drizzle",
  },
  rain: {
    className: "is-rainy",
    dayMessage: "Get your umbrella! {city} is looking rather rainy today.",
    dayImgSrc: "./assets/animated/raindrops.svg",
    dayImgAlt: "Raindrops",
    nightMessage: "The rain pours down in {city} – a perfect night to stay in.",
    nightImgSrc: "./assets/animated/extreme-night-rain.svg",
    nightImgAlt: "Raindrops",
  },
  snow: {
    className: "is-snowy",
    dayMessage: "Time for snow boots! {city} is a winter wonderland today.",
    dayImgSrc: "./assets/animated/snow.svg",
    dayImgAlt: "Cloud with snow",
    nightMessage: "Snow falls on {city} tonight. A peaceful winter night.",
    nightImgSrc: "./assets/animated/extreme-night-snow.svg",
    nightImgAlt: "Cloud with snow",
  },
  thunderstorm: {
    className: "is-thunderstorm",
    dayMessage:
      "Stay safe indoors! {city} is rumbling with a thunderstorm today.",
    dayImgSrc: "./assets/animated/thunderstorms-rain.svg",
    dayImgAlt: "Thunder and clouds",
    nightMessage: "Thunder rolls through the night sky in {city}.",
    nightImgSrc: "./assets/animated/thunderstorms-night-extreme-rain.svg",
    nightImgAlt: "Thunder and clouds",
  },
  mist: {
    className: "is-misty",
    dayMessage: "It's foggy in {city} today.",
    dayImgSrc: "./assets/animated/mist.svg",
    dayImgAlt: "Mist",
    nightMessage:
      "A thick mist settles over {city} on this mysterious and quiet night.",
    nightImgSrc: "./assets/animated/mist-night.svg",
    nightImgAlt: "Mist",
  },
  default: {
    className: "is-default",
    dayMessage: "The weather in {city} can't be determined today.",
    dayImgSrc: "./assets/animated/compass.svg",
    dayImgAlt: "Compass",
    nightMessage:
      "It's hard to tell what the weather is like tonight in {city}.",
    nightImgSrc: "./assets/animated/compass-night.svg",
    nightImgAlt: "Compass",
  },
};

const weatherClassNames = [
  "is-cloudy",
  "is-clear",
  "is-drizzly",
  "is-rainy",
  "is-snowy",
  "is-thunderstorm",
  "is-misty",
  "is-default",
];

/* *********************************
   Mock Data for Testing
********************************* */

// Mock data for different weather types
const mockWeatherData = {
  clear: {
    weather: [{ main: "Clear" }],
    main: { temp: 25 },
    sys: {
      sunrise: Math.floor(Date.now() / 1000) - 7200, // 2 hours ago
      sunset: Math.floor(Date.now() / 1000) - 3600, // 1 hour ago, it's night
    },
    name: "Mock City",
  },
  clouds: {
    weather: [{ main: "Clouds" }],
    main: { temp: 18 },
    sys: {
      sunrise: Math.floor(Date.now() / 1000) - 7200, // 2 hours ago
      sunset: Math.floor(Date.now() / 1000) - 3600, // 1 hour ago, it's night
    },
    name: "Mock City",
  },
  rain: {
    weather: [{ main: "Rain" }],
    main: { temp: 15 },
    sys: {
      sunrise: Math.floor(Date.now() / 1000) - 7200, // 2 hours ago
      sunset: Math.floor(Date.now() / 1000) - 3600, // 1 hour ago, it's night
    },
    name: "Mock City",
  },
  snow: {
    weather: [{ main: "Snow" }],
    main: { temp: -5 },
    sys: {
      sunrise: Math.floor(Date.now() / 1000) - 7200, // 2 hours ago
      sunset: Math.floor(Date.now() / 1000) - 3600, // 1 hour ago, it's night
    },
    name: "Mock City",
  },
  thunderstorm: {
    weather: [{ main: "Thunderstorm" }],
    main: { temp: 20 },
    sys: {
      sunrise: Math.floor(Date.now() / 1000) - 7200, // 2 hours ago
      sunset: Math.floor(Date.now() / 1000) - 3600, // 1 hour ago, it's night
    },
    name: "Mock City",
  },
  drizzle: {
    weather: [{ main: "Drizzle" }],
    main: { temp: 17 },
    sys: {
      sunrise: Math.floor(Date.now() / 1000) - 7200, // 2 hours ago
      sunset: Math.floor(Date.now() / 1000) - 3600, // 1 hour ago, it's night
    },
    name: "Mock City",
  },
  mist: {
    weather: [{ main: "Mist" }],
    main: { temp: 12 },
    sys: {
      sunrise: Math.floor(Date.now() / 1000) - 7200, // 2 hours ago
      sunset: Math.floor(Date.now() / 1000) - 3600, // 1 hour ago, it's night
    },
    name: "Mock City",
  },
  default: {
    weather: [{ main: "Default" }],
    main: { temp: 12 },
    sys: {
      sunrise: Math.floor(Date.now() / 1000) - 7200, // 2 hours ago
      sunset: Math.floor(Date.now() / 1000) - 3600, // 1 hour ago, it's night
    },
    name: "Mock City",
  },
};

/* *********************************
   Helper Functions
********************************* */

/**
 * Generates the API URL for current weather of a given city
 * @param {string} city - The city name
 * @returns {string} - The API URL for fetching current weather
 */
const getWeatherUrl = (city) => {
  return `${BASE_URL_WEATHER}?q=${city}&units=metric&APPID=${API_KEY}`;
};

/**
 * Generates the API URL for weather forecast of a given city
 * @param {string} city - The city name
 * @returns {string} - The API URL for fetching weather forecast
 */
const getForecastUrl = (city) => {
  return `${BASE_URL_FORECAST}?q=${city}&units=metric&APPID=${API_KEY}`;
};

/**
 * Converts a date string to a weekday abbreviation
 * @param {string} dateString - The date string to convert
 * @returns {string} - The abbreviated weekday (e.g., "mon")
 */
const getWeekdayAbbreviation = (dateString) => {
  const date = new Date(dateString);
  const weekdayNumber = date.getDay();
  return weekdays[weekdayNumber];
};

/**
 * Formats the temperature value by appending ° symbol if it's a number
 * @param {number|string} temp - The temperature value
 * @returns {string} - Formatted temperature string
 */
const formatTemperature = (temp) => {
  return typeof temp === "number" ? `${temp}°` : temp;
};

/**
 * Updates the width of the input field based on its content's pixel width.
 * @param {HTMLInputElement} inputElement - The input element to resize.
 */
function updateInputWidth(inputElement) {
  const temporarySpan = document.createElement("span");
  temporarySpan.style.visibility = "hidden";
  temporarySpan.style.position = "absolute";
  temporarySpan.style.whiteSpace = "pre"; // Preserves spaces and prevents wrapping
  temporarySpan.style.font = getComputedStyle(inputElement).font;
  temporarySpan.textContent =
    inputElement.value || inputElement.placeholder || "";
  document.body.appendChild(temporarySpan);
  const width = temporarySpan.getBoundingClientRect().width + 2; // Add some padding
  document.body.removeChild(temporarySpan);
  inputElement.style.width = width + "px";
}

/**
 * Fetches weather data from the given API URL or returns mock data for testing
 * @param {string} weatherUrl - The API URL for fetching weather data
 * @param {string} [mockType] - The weather type to mock (optional)
 * @returns {Promise<object>} - The weather data as a JavaScript object
 */
const fetchWeather = async (weatherUrl, mockType = null) => {
  // If mockType is provided, return the corresponding mock data
  if (useMockData && mockType && mockWeatherData[mockType]) {
    // Simulate async operation with a Promise
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockWeatherData[mockType]);
      }, 100); // Simulate a short delay
    });
  }

  // Existing fetch logic
  try {
    const response = await fetch(weatherUrl);

    if (!response.ok) {
      let errorMessage = `HTTP error! Status: ${response.status}`;

      // Attempt to parse the error response
      try {
        const errorData = await response.json();
        if (errorData && errorData.message) {
          errorMessage = errorData.message;
        }
      } catch (parseError) {
        // If parsing fails, keep the default message
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error.name === "TypeError" && error.message === "Failed to fetch") {
      // Network error
      throw new Error("Network error. Please check your internet connection.");
    } else {
      throw error; // Re-throw the error to be handled later
    }
  }
};

/**
 * Creates the city input field in the DOM.
 * @param {HTMLElement} parentElement - The parent element to append the input to.
 * @param {string} inputValue - The value to set in the input field.
 */
const createCityInput = (parentElement, inputValue = displayedCityName) => {
  // Create the input element
  const cityInput = document.createElement("input");
  cityInput.type = "text";
  cityInput.id = "city-input";
  cityInput.value = inputValue;
  cityInput.autocomplete = "off";

  // Append the input to the parentElement before measuring width
  parentElement.appendChild(cityInput);

  // Event listener for 'input' to adjust the width dynamically
  cityInput.addEventListener("input", () => {
    updateInputWidth(cityInput);
  });

  // Event listener for 'keydown' to handle Enter key press
  cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      handleSearch(event); // Update the city when Enter is pressed
    }
  });

  // Event listener for 'click' to select the entire text in the input field
  cityInput.addEventListener("click", () => {
    cityInput.select();
  });

  // Event listener for 'blur' to handle when the input loses focus
  cityInput.addEventListener("blur", (event) => {
    handleSearch(event); // Update the city when input loses focus
  });

  // Wait for fonts to be loaded before adjusting the width
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      updateInputWidth(cityInput);
    });
  } else {
    // Fallback for browsers that do not support document.fonts
    window.addEventListener("load", () => {
      updateInputWidth(cityInput);
    });
  }
};

/**
 * Determines the type of weather and returns corresponding data
 * @param {string} weatherType - The current weather type (e.g., "Clouds")
 * @param {boolean} isDaytime - Whether it's currently daytime
 * @returns {object} - An object containing the main title, image source, and image alt text
 */
const typeOfWeather = (weatherType, isDaytime) => {
  const type = weatherTypes[weatherType.toLowerCase()] || weatherTypes.default;

  // Remove all previous weather classes
  app.classList.remove(...weatherClassNames);

  // Add the new weather class if it exists
  if (type.className) {
    app.classList.add(type.className);
  }

  // Add is-nighttime as class on the app container when sun is down
  isDaytime
    ? app.classList.remove("is-nighttime")
    : app.classList.add("is-nighttime");

  // Select message and image based on isDaytime
  const mainTitle = isDaytime ? type.dayMessage : type.nightMessage;
  const imgSrc = isDaytime ? type.dayImgSrc : type.nightImgSrc;
  const imgAlt = isDaytime ? type.dayImgAlt : type.nightImgAlt;

  return {
    mainTitle,
    imgSrc,
    imgAlt,
  };
};

/**
 * Handles the search functionality when the user inputs a city name.
 * @param {Event} event - The event object.
 */
const handleSearch = (event) => {
  event.preventDefault();

  const inputElement = event.target;
  let city = inputElement.value.trim();

  // Save user's input to a global variable
  userCityInput = city;

  if (city && city !== apiQueryCity) {
    apiQueryCity = city;

    // Fetch new data
    currentWeather();
    forecastedWeather();
  }
};

/* *********************************
   Main Functions
********************************* */

/**
 * Fetches and displays the current weather for the selected city
 */
const currentWeather = async (mockType = null) => {
  try {
    // Fetch current weather data for the city
    const weatherUrl = getWeatherUrl(apiQueryCity);
    const weatherRightNow = await fetchWeather(weatherUrl, mockType);

    if (!weatherRightNow) {
      weatherTodayContainer.innerHTML = `
        <h1>Rain check on the weather!</h1>
        <p>Looks like today’s forecast is a no-show. Check back in a bit!</p>
      `;
      return;
    }

    // Update global variables with the new data
    displayedCityName = weatherRightNow.name;
    weatherTypeToday = weatherRightNow.weather[0].main;
    const temp = Math.round(weatherRightNow.main.temp);

    // Create Date objects for sunrise and sunset times
    const sunriseTime = new Date(weatherRightNow.sys.sunrise * 1000);
    const sunsetTime = new Date(weatherRightNow.sys.sunset * 1000);

    // Format sunrise and sunset times to local time strings
    const sunrise = sunriseTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const sunset = sunsetTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    // Determine if it's currently daytime
    const currentTime = new Date();
    const isDaytime =
      useMockData && simulateNighttime === false
        ? true // Force daytime during mock testing if simulateNighttime is false
        : currentTime >= sunriseTime && currentTime < sunsetTime;

    // Get mainTitle, imgSrc, and imgAlt from typeOfWeather
    const { mainTitle, imgSrc, imgAlt } = typeOfWeather(
      weatherTypeToday,
      isDaytime
    );

    // Set the innerHTML of weatherTodayContainer
    weatherTodayContainer.innerHTML = `
      <div class="weather-today__meta">
        <p id="todays-temp">${weatherTypeToday} <span>/</span> ${temp}°</p>
        <p id="todays-sunrise">Sunrise ${sunrise}</p>
        <p id="todays-sunset">Sunset ${sunset}</p>
      </div>

      <div id="weather-today__greeting" class="weather-today__greeting">
        <img width="192" height="192" alt="${imgAlt}" src="${imgSrc}" />
        <h1></h1>
      </div>
    `;

    const h1 = weatherTodayContainer.querySelector(
      "#weather-today__greeting h1"
    );

    // Split the mainTitle at the '{city}' placeholder and insert the input dynamically
    let parts = mainTitle.split("{city}");
    h1.innerHTML = "";
    h1.appendChild(document.createTextNode(parts[0]));
    createCityInput(h1); // Append the city input field
    h1.appendChild(document.createTextNode(parts[1]));
  } catch (error) {
    // Handle the error by displaying a message and keeping the input in the <h1>
    weatherTodayContainer.innerHTML = `
      <div id="weather-today__greeting" class="weather-today__greeting">
        <h1>Oh no! City not found. Try another: </h1>
      </div>
    `;

    const h1 = weatherTodayContainer.querySelector(
      "#weather-today__greeting h1"
    );
    createCityInput(h1, userCityInput); // Use helper to append input
  }
};

/**
 * Fetches and displays the weather forecast for the selected city
 */
const forecastedWeather = async (mockType = null) => {
  // Inline helper function to generate the forecast list
  const generateForecastList = (dailyTemperatures) => {
    const forecastListItem = document.createDocumentFragment();

    dailyTemperatures.forEach((day) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span class="list-section">
          <h2>${day.weekday}</h2>
        </span>
        <span class="list-section">
          <p>${formatTemperature(day.highestTempMax)}</p>
          <span>/</span>
          <p>${formatTemperature(day.lowestTempMin)}</p>
        </span>
      `;
      forecastListItem.appendChild(li);
    });

    forecastList.innerHTML = ""; // Clear previous list items
    forecastList.appendChild(forecastListItem);
  };

  try {
    // Fetch weather forecast data for the city
    const forecastUrl = getForecastUrl(apiQueryCity);
    const forecastData = await fetchWeather(forecastUrl, mockType);

    if (!forecastData) {
      // If no data, generate days with dashes directly
      const today = new Date();
      let dailyTemperatures = [];

      for (let i = 1; i <= 5; i++) {
        let nextDay = new Date(today);
        nextDay.setDate(today.getDate() + i);
        const weekday = getWeekdayAbbreviation(nextDay.toISOString());
        dailyTemperatures.push({
          weekday: weekday,
          lowestTempMin: "–",
          highestTempMax: "–",
        });
      }

      generateForecastList(dailyTemperatures);
      return;
    }

    // Get today's date in 'YYYY-MM-DD' format
    const todayDateString = new Date().toISOString().split("T")[0];

    // Filter out entries that have today's date
    const forecastArray = forecastData.list.filter(
      (item) => item.dt_txt.slice(0, 10) !== todayDateString
    );

    // Initialize an array to store the results for each day
    let dailyTemperatures = [];

    // Loop over forecastArray in steps of 8 to process each day
    for (let i = 0; i < forecastArray.length; i += 8) {
      // Initialize variables to store the lowest temp_min and highest temp_max for the day
      let lowestTempMin = Infinity;
      let highestTempMax = -Infinity;

      // Get the weekday
      const weekday = getWeekdayAbbreviation(forecastArray[i].dt_txt);

      // Loop through each of the 8 items for the current day
      for (let j = i; j < i + 8 && j < forecastArray.length; j++) {
        let tempMin = forecastArray[j].main.temp_min;
        let tempMax = forecastArray[j].main.temp_max;

        // Update the lowest temp_min if a lower value is found
        if (tempMin < lowestTempMin) {
          lowestTempMin = tempMin;
        }

        // Update the highest temp_max if a higher value is found
        if (tempMax > highestTempMax) {
          highestTempMax = tempMax;
        }
      }

      // Store the results for the current day
      dailyTemperatures.push({
        weekday: weekday,
        lowestTempMin: Math.round(lowestTempMin),
        highestTempMax: Math.round(highestTempMax),
      });
    }

    // Generate the forecast list with actual data
    generateForecastList(dailyTemperatures);
  } catch (error) {
    // Generate days with dashes
    const today = new Date();
    let dailyTemperatures = [];

    for (let i = 1; i <= 5; i++) {
      let nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);
      const weekday = getWeekdayAbbreviation(nextDay.toISOString());
      dailyTemperatures.push({
        weekday: weekday,
        lowestTempMin: "–",
        highestTempMax: "–",
      });
    }

    // Generate the forecast list with placeholders
    generateForecastList(dailyTemperatures);
  }
};

/* *********************************
   Initial Function Calls
********************************* */

if (useMockData) {
  // Test with different weather types
  const testWeatherType = "thunderstorm"; // Change to test different types
  currentWeather(testWeatherType);
  forecastedWeather(testWeatherType);
} else {
  // Use real API data
  currentWeather();
  forecastedWeather();
}
