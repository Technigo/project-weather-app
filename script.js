/* *********************************
   Constants
********************************* */

// API key for OpenWeatherMap API
const API_KEY = "f1eb0732aa36b48c85267620f68aa926";

// Base URLs for current weather and forecast APIs
const BASE_URL_WEATHER = "https://api.openweathermap.org/data/2.5/weather";
const BASE_URL_FORECAST = "https://api.openweathermap.org/data/2.5/forecast";

// Array of weekdays for easy reference
const weekdaysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const weekdaysLong = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/* *********************************
   Global Variables
********************************* */

let apiQueryCity = "Stockholm"; // Default city for initial weather display
let displayedCityName = "Stockholm"; // Displayed city name (may differ in case or spelling)
let weatherTypeToday = ""; // Current weather type (e.g., "Clouds", "Clear")
let weatherDescriptionToday = ""; // Current weather description
let userCityInput = ""; // User input city name during a search
let userHasInteracted = false; // Flag to track if the user has interacted
let idx = 0; // Global index to count number of instances of an element

/* *********************************
   Testing Configuration
********************************* */

// Set to true to use mock data instead of real API data
const useMockData = false; // Change to false to use real data
const simulateNighttime = false; // Set to true to force nighttime for testing

/* *********************************
   DOM Selectors
********************************* */

const app = document.getElementById("app"); // Main app container
const weatherTodayContainer = document.getElementById("weather-today"); // Container for today's weather
const weatherForecastTitle = document.getElementById("weather-forecast__title"); // Container for weather forecast title
const forecastList = document.getElementById("weather-forecast__list"); // List element for the forecast data

/* *********************************
   Weather Types
********************************* */

/**
 * An object mapping weather types to their corresponding UI classes and messages.
 * Each key represents a weather condition and contains properties for class names,
 * messages, and image sources for day and night.
 */
const weatherTypes = {
  clouds: {
    className: "is-cloudy",
    dayMessage: "Light a fire and get cozy. {city} is looking grey today.",
    dayImgSrc: "./assets/animated/cloudy.svg",
    nightMessage: "The clouds linger over {city} creating a calm, moody night.",
    nightImgSrc: "./assets/animated/partly-cloudy-night.svg",
  },
  clear: {
    className: "is-clear",
    dayMessage: "Get your sunnies on. {city} is looking rather great today.",
    dayImgSrc: "./assets/animated/clear-day.svg",
    nightMessage: "It's a clear and beautiful night in {city}.",
    nightImgSrc: "./assets/animated/clear-night.svg",
  },
  drizzle: {
    className: "is-drizzly",
    dayMessage: "There's a light drizzle in {city}. Keep your raincoat handy!",
    dayImgSrc: "./assets/animated/drizzle.svg",
    nightMessage: "A soft drizzle falls over {city} this night.",
    nightImgSrc: "./assets/animated/extreme-night-drizzle.svg",
  },
  rain: {
    className: "is-rainy",
    dayMessage: "Get your umbrella! {city} is looking rather rainy today.",
    dayImgSrc: "./assets/animated/rain.svg",
    nightMessage: "The rain pours down in {city}. A perfect night to stay in.",
    nightImgSrc: "./assets/animated/extreme-night-rain.svg",
  },
  snow: {
    className: "is-snowy",
    dayMessage: "Time for snow boots! {city} is a winter wonderland today.",
    dayImgSrc: "./assets/animated/snow.svg",
    nightMessage: "Snow falls on {city} tonight. A peaceful winter night.",
    nightImgSrc: "./assets/animated/extreme-night-snow.svg",
  },
  thunderstorm: {
    className: "is-thunderstorm",
    dayMessage:
      "Stay safe indoors! {city} is rumbling with a thunderstorm today.",
    dayImgSrc: "./assets/animated/thunderstorms-day-overcast-rain.svg",
    nightMessage: "Thunder rolls through the night sky in {city}.",
    nightImgSrc: "./assets/animated/thunderstorms-night-extreme-rain.svg",
  },
  mist: {
    className: "is-misty",
    dayMessage: "It's foggy in {city} today.",
    dayImgSrc: "./assets/animated/mist.svg",
    nightMessage: "A thick mist settles over {city} on this mysterious night.",
    nightImgSrc: "./assets/animated/mist-night.svg",
  },
  default: {
    className: "is-default",
    dayMessage: "The weather in {city} can't be determined today.",
    dayImgSrc: "./assets/animated/compass.svg",
    nightMessage:
      "It's hard to tell what the weather is like tonight in {city}.",
    nightImgSrc: "./assets/animated/compass-night.svg",
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
/**
 * Generates the API URL for current weather of a given city.
 *
 * @param {string} city - The name of the city.
 * @returns {string} The complete API URL for fetching current weather data.
 */
const getWeatherUrl = (city) => {
  return `${BASE_URL_WEATHER}?q=${encodeURIComponent(
    city
  )}&units=metric&APPID=${API_KEY}`;
};

/**
 * Generates the API URL for weather forecast of a given city.
 *
 * @param {string} city - The name of the city.
 * @returns {string} The complete API URL for fetching weather forecast data.
 */
const getForecastUrl = (city) => {
  return `${BASE_URL_FORECAST}?q=${encodeURIComponent(
    city
  )}&units=metric&APPID=${API_KEY}`;
};

/**
 * Updates the document title to include the currently displayed city name.
 */
const updateDocumentTitle = () => {
  document.title = `Weatherington – Currently showing the weather in ${displayedCityName}`;
};

/**
 * Returns the weekday name for a given date string.
 * @param {string} dateString - The date string to convert.
 * @param {boolean} [isLong=false] - Whether to return the full weekday name.
 * @returns {string} - The weekday name.
 */
const getWeekdayName = (dateString, isLong = false) => {
  const date = new Date(dateString);
  if (isNaN(date)) return ""; // Handle invalid date
  const options = { weekday: isLong ? "long" : "short" };
  return date.toLocaleDateString("en-US", options);
};

/**
 * Formats the temperature by appending the degree symbol.
 * @param {number|string} temp - The temperature value.
 * @returns {string} - The formatted temperature.
 */
const formatTemperature = (temp) => {
  const temperature = parseFloat(temp);
  return isNaN(temperature) ? "-" : `${Math.round(temperature)}°`;
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
 * Updates the ARIA live region to announce changes to screen reader users.
 * @param {string} message - The message to announce.
 */
const updateAriaNotification = (message) => {
  if (!userHasInteracted) {
    // Do not announce if the user hasn't interacted yet
    return;
  }

  const ariaNotification = document.getElementById("aria-notification");
  if (ariaNotification) {
    // Clear the content to ensure the screen reader detects the change
    ariaNotification.textContent = "";
    setTimeout(() => {
      ariaNotification.textContent = message;
    }, 100);
  }
};

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
  idx++;
  // Create the input element
  const cityInput = document.createElement("input");
  cityInput.type = "text";
  cityInput.id = `city-input-${idx}`;
  cityInput.value = inputValue;
  cityInput.autocomplete = "off";
  cityInput.setAttribute("aria-label", "Change city to update weather");

  // Disable common Password Managers from injecting themselves in the input field
  cityInput.setAttribute("data-1p-ignore", "");
  cityInput.setAttribute("data-bwignore", "");
  cityInput.setAttribute("data-lpignore", "true");
  cityInput.setAttribute("data-form-type", "other");

  // Append the input and hidden city name to the parentElement
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

  return {
    mainTitle,
    imgSrc,
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

    // Set the flag indicating the user has interacted
    userHasInteracted = true;

    // Fetch new data
    getCurrentWeather();
    getForecast();
  }
};

/* *********************************
   Main Functions
********************************* */

/**
 * Fetches and displays the current weather for the selected city
 */
const getCurrentWeather = async (mockType = null) => {
  // Get current time (in UTC)
  const currentTimeUTC = new Date();

  // Format for human-readable date
  const humanReadableDate = currentTimeUTC.toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Format for machine-readable date (ISO 8601)
  const isoDate = currentTimeUTC.toISOString().split("T")[0]; // 'YYYY-MM-DD'

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
    weatherDescriptionToday = weatherRightNow.weather[0].description;
    const temp = Math.round(weatherRightNow.main.temp);

    // Update the document title
    updateDocumentTitle();

    // Get local sunrise timestamp
    const localSunriseTimestamp =
      weatherRightNow.sys.sunrise + weatherRightNow.timezone;
    const localSunsetTimestamp =
      weatherRightNow.sys.sunset + weatherRightNow.timezone;

    // Create Date objects for sunrise and sunset times
    const localSunrise = new Date(localSunriseTimestamp * 1000);
    const localSunset = new Date(localSunsetTimestamp * 1000);

    // Format sunrise and sunset times to local time strings
    const sunrise = localSunrise.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "UTC",
    });
    const sunset = localSunset.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "UTC",
    });

    // Calculate local current time based on city's timezone
    const currentTimeLocal = new Date(currentTimeUTC.getTime() * 1000);

    // Determine if it's currently daytime in the selected city
    const isDaytime =
      currentTimeLocal >= localSunrise && currentTimeLocal < localSunset;

    // Get mainTitle and imgSrc from typeOfWeather
    const { mainTitle, imgSrc } = typeOfWeather(weatherTypeToday, isDaytime);

    const sunriseIcon = `
    <svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M1.25 16C1.25 15.5858 1.58579 15.25 2 15.25H22C22.4142 15.25 22.75 15.5858 22.75 16C22.75 16.4142 22.4142 16.75 22 16.75H2C1.58579 16.75 1.25 16.4142 1.25 16ZM4.25 19C4.25 18.5858 4.58579 18.25 5 18.25H19C19.4142 18.25 19.75 18.5858 19.75 19C19.75 19.4142 19.4142 19.75 19 19.75H5C4.58579 19.75 4.25 19.4142 4.25 19ZM7.25 22C7.25 21.5858 7.58579 21.25 8 21.25H16C16.4142 21.25 16.75 21.5858 16.75 22C16.75 22.4142 16.4142 22.75 16 22.75H8C7.58579 22.75 7.25 22.4142 7.25 22Z" fill="#164A68"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 5.25C10.7009 5.24994 9.4294 5.62475 8.33807 6.32945ZM12 6.75C10.9895 6.74994 10.0006 7.04146 9.15176 7.58957C8.30293 8.13768 7.6303 8.91909 7.21459 9.84002C6.79888 10.761 6.65776 11.7823 6.80815 12.7814C6.94216 13.6717 7.30254 14.5107 7.85231 15.219H16.1477C16.6975 14.5107 17.0578 13.6717 17.1918 12.7814C17.3422 11.7823 17.2011 10.761 16.7854 9.84002C16.3697 8.91909 15.6971 8.13768 14.8482 7.58957C13.9994 7.04146 13.0104 6.74994 12 6.75ZM12 5.25C13.299 5.24994 14.5706 5.62475 15.6619 6.32945C16.7533 7.03416 17.6181 8.03882 18.1526 9.22288C18.6871 10.4069 18.8685 11.7201 18.6751 13.0047C18.4818 14.2893 17.9218 15.4909 17.0625 16.4651L16.8385 16.719H7.16148L6.93754 16.4651C6.07819 15.4909 5.51823 14.2893 5.32486 13.0047C5.1315 11.7201 5.31294 10.4069 5.84743 9.22288C6.38191 8.03882 7.24672 7.03416 8.33807 6.32945" fill="#164A68"/>
      <path d="M12 10L12.53 9.47C12.3894 9.32955 12.1988 9.25066 12 9.25066C11.8013 9.25066 11.6106 9.32955 11.47 9.47L12 10ZM13.47 12.53C13.5387 12.6037 13.6215 12.6628 13.7135 12.7038C13.8055 12.7448 13.9048 12.7668 14.0055 12.7686C14.1062 12.7704 14.2062 12.7518 14.2996 12.7141C14.393 12.6764 14.4778 12.6203 14.549 12.549C14.6203 12.4778 14.6764 12.393 14.7141 12.2996C14.7518 12.2062 14.7704 12.1062 14.7686 12.0055C14.7668 11.9048 14.7448 11.8055 14.7038 11.7135C14.6628 11.6215 14.6037 11.5387 14.53 11.47L13.47 12.53ZM9.47 11.47C9.39631 11.5387 9.33721 11.6215 9.29622 11.7135C9.25523 11.8055 9.23319 11.9048 9.23141 12.0055C9.22963 12.1062 9.24816 12.2062 9.28588 12.2996C9.3236 12.393 9.37974 12.4778 9.45096 12.549C9.52218 12.6203 9.60702 12.6764 9.7004 12.7141C9.79379 12.7518 9.89382 12.7704 9.99452 12.7686C10.0952 12.7668 10.1945 12.7448 10.2865 12.7038C10.3785 12.6628 10.4613 12.6037 10.53 12.53L9.47 11.47ZM12.75 16V10H11.25V16H12.75ZM11.47 10.53L13.47 12.53L14.53 11.47L12.53 9.47L11.47 10.53ZM11.47 9.47L9.47 11.47L10.53 12.53L12.53 10.53L11.47 9.47Z" fill="#164A68"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C12.4142 1.25 12.75 1.58579 12.75 2V3C12.75 3.41421 12.4142 3.75 12 3.75C11.5858 3.75 11.25 3.41421 11.25 3V2C11.25 1.58579 11.5858 1.25 12 1.25ZM4.39867 4.39867C4.69156 4.10578 5.16644 4.10578 5.45933 4.39867L5.85233 4.79167C6.14522 5.08456 6.14522 5.55944 5.85233 5.85233C5.55944 6.14522 5.08456 6.14522 4.79167 5.85233L4.39867 5.45933C4.10578 5.16644 4.10578 4.69156 4.39867 4.39867ZM19.5997 4.39899C19.8929 4.69151 19.8935 5.16639 19.601 5.45965L19.209 5.85265C18.9165 6.14592 18.4416 6.14652 18.1483 5.854C17.8551 5.56149 17.8545 5.08661 18.147 4.79335L18.539 4.40035C18.8315 4.10708 19.3064 4.10647 19.5997 4.39899ZM1.25 12C1.25 11.5858 1.58579 11.25 2 11.25H3C3.41421 11.25 3.75 11.5858 3.75 12C3.75 12.4142 3.41421 12.75 3 12.75H2C1.58579 12.75 1.25 12.4142 1.25 12ZM20.25 12C20.25 11.5858 20.5858 11.25 21 11.25H22C22.4142 11.25 22.75 11.5858 22.75 12C22.75 12.4142 22.4142 12.75 22 12.75H21C20.5858 12.75 20.25 12.4142 20.25 12Z" fill="#164A68"/>
    </svg>
    `;

    const sunsetIcon = `
    <svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.25 22C7.25 21.5858 7.58579 21.25 8 21.25H16C16.4142 21.25 16.75 21.5858 16.75 22C16.75 22.4142 16.4142 22.75 16 22.75H8C7.58579 22.75 7.25 22.4142 7.25 22Z" fill="#164A68"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M4.25 19C4.25 18.5858 4.58579 18.25 5 18.25H19C19.4142 18.25 19.75 18.5858 19.75 19C19.75 19.4142 19.4142 19.75 19 19.75H5C4.58579 19.75 4.25 19.4142 4.25 19Z" fill="#164A68"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M1.25 16C1.25 15.5858 1.58579 15.25 2 15.25H22C22.4142 15.25 22.75 15.5858 22.75 16C22.75 16.4142 22.4142 16.75 22 16.75H2C1.58579 16.75 1.25 16.4142 1.25 16Z" fill="#164A68"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.75C9.10051 6.75 6.75 9.10051 6.75 12C6.75 13.2135 7.16093 14.3296 7.85208 15.2187H16.1479C16.8391 14.3296 17.25 13.2135 17.25 12C17.25 9.10051 14.8995 6.75 12 6.75ZM5.25 12C5.25 8.27208 8.27208 5.25 12 5.25C15.7279 5.25 18.75 8.27208 18.75 12C18.75 13.7114 18.1121 15.2756 17.0623 16.465L16.8384 16.7187H7.16162L6.9377 16.465C5.88786 15.2756 5.25 13.7114 5.25 12Z" fill="#164A68"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.4697 13.5303C11.7626 13.8232 12.2374 13.8232 12.5303 13.5303L14.5303 11.5303C14.8232 11.2374 14.8232 10.7626 14.5303 10.4697C14.2374 10.1768 13.7626 10.1768 13.4697 10.4697L12.75 11.1893V6C12.75 5.58579 12.4142 5.25 12 5.25C11.5858 5.25 11.25 5.58579 11.25 6V11.1893L10.5303 10.4697C10.2374 10.1768 9.76256 10.1768 9.46967 10.4697C9.17678 10.7626 9.17678 11.2374 9.46967 11.5303L11.4697 13.5303Z" fill="#164A68"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C12.4142 1.25 12.75 1.58579 12.75 2V3C12.75 3.41421 12.4142 3.75 12 3.75C11.5858 3.75 11.25 3.41421 11.25 3V2C11.25 1.58579 11.5858 1.25 12 1.25Z" fill="#164A68"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M22.75 12C22.75 12.4142 22.4142 12.75 22 12.75H21C20.5858 12.75 20.25 12.4142 20.25 12C20.25 11.5858 20.5858 11.25 21 11.25H22C22.4142 11.25 22.75 11.5858 22.75 12Z" fill="#164A68"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M3.75 12C3.75 12.4142 3.41421 12.75 3 12.75H2C1.58579 12.75 1.25 12.4142 1.25 12C1.25 11.5858 1.58579 11.25 2 11.25H3C3.41421 11.25 3.75 11.5858 3.75 12Z" fill="#164A68"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M19.6011 4.39887C19.894 4.69176 19.894 5.16664 19.6011 5.45953L19.2083 5.85237C18.9154 6.14526 18.4405 6.14526 18.1476 5.85237C17.8547 5.55947 17.8547 5.0846 18.1476 4.79171L18.5405 4.39887C18.8334 4.10598 19.3082 4.10598 19.6011 4.39887Z" fill="#164A68"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M5.85211 5.85211C5.55921 6.145 5.08434 6.145 4.79145 5.85211L4.39861 5.45927C4.10572 5.16638 4.10572 4.6915 4.39861 4.39861C4.6915 4.10572 5.16638 4.10572 5.45927 4.39861L5.85211 4.79145C6.145 5.08434 6.145 5.55921 5.85211 5.85211Z" fill="#164A68"/>
    </svg>

    `;

    // Set the innerHTML of weatherTodayContainer
    weatherTodayContainer.innerHTML = `
      <div id="weather-today__greeting" class="weather-today__greeting">
        <img width="100" height="100" alt="" src="${imgSrc}" />
        <p>
          <time datetime="${isoDate}">${humanReadableDate}</time>
        </p>
        <h1>
          <span id="h1-visual" aria-hidden="true"></span>
          <span id="h1-screen" class="sr-only"></span>
        </h1>
        <p class="text-large" id="todays-temp">It is ${temp}° and ${weatherDescriptionToday}.</p>
      </div>
      <div class="weather-today__meta">
        <p class="sr-only">Time of sunrise today is ${sunrise}</p>
        <p class="badge" id="todays-sunrise" aria-hidden="true">
          ${sunriseIcon} ${sunrise}
        </p>
        <p class="sr-only">Time of sunset today is ${sunset}</p>
        <p class="badge" id="todays-sunset" aria-hidden="true">
          ${sunsetIcon} ${sunset}
        </p>
      </div>
    `;

    // Split the mainTitle at the '{city}' placeholder and insert the input dynamically
    let parts = mainTitle.split("{city}");

    // Create the visual H1 with the input field
    const visualH1 = document.getElementById("h1-visual");
    visualH1.innerHTML = "";
    visualH1.appendChild(document.createTextNode(parts[0]));
    createCityInput(visualH1); // Append the city input field
    visualH1.appendChild(document.createTextNode(parts[1]));

    // Create the title for screen readers and append the input field after the title
    let screenH1 = document.getElementById("h1-screen");
    screenH1.appendChild(
      document.createTextNode(`${parts[0]}${displayedCityName}${parts[1]}`)
    );
    createCityInput(screenH1); // Append the city input field

    // Announce the updated weather information to screen reader users
    const announcement = `Weather updated for ${displayedCityName}. It is ${temp} degrees and ${weatherDescriptionToday}.`;
    updateAriaNotification(announcement);
  } catch (error) {
    console.log(error);
    // Handle the error by displaying a message and keeping the input in the <h1>
    weatherTodayContainer.innerHTML = `
      <div id="weather-today__greeting" class="weather-today__greeting">
        <img width="100" height="100" alt="" src="./assets/animated/alert-avalanche-danger.svg" />
        <p>
          <time datetime="${isoDate}">${humanReadableDate}</time>
        </p>
        <h1>Sorry, we couldn't find a matching city. Please try another: </h1>
        <p class="text-large">We pray the weather gods are with you this time.</p>
      </div>
    `;

    const h1 = weatherTodayContainer.querySelector(
      "#weather-today__greeting h1"
    );
    createCityInput(h1, userCityInput); // Use helper to append input

    // Update the document title to indicate an error
    document.title = `Weatherington – City not found`;

    updateAriaNotification(
      `Error: Unable to find a city with the name ${userCityInput}. Please try another.`
    );
  }
};

/**
 * Fetches and displays the weather forecast for the selected city
 */
const getForecast = async (mockType = null) => {
  // Inline helper function to generate the forecast list
  const generateForecastList = (dailyTemperatures) => {
    const forecastListItem = document.createDocumentFragment();

    dailyTemperatures.forEach((day) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span class="list-section">
          <h3 aria-hidden="true">${day.weekdayShort}</h2>
          <h3 class="sr-only">${day.weekdayLong}</h2>
        </span>
        <span class="list-section">
          <p aria-hidden="true">${formatTemperature(day.highestTempMax)}</p>
          <p class="sr-only">Highest temp of the day is ${formatTemperature(
            day.highestTempMax
          )}</p>
          <span aria-hidden="true">/</span>
          <p aria-hidden="true">${formatTemperature(day.lowestTempMin)}</p>
          <p class="sr-only">Lowest temp of the day is ${formatTemperature(
            day.lowestTempMin
          )}</p>
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

    // Add the forecast title
    const forecastTitle = document.createElement("h2");
    forecastTitle.textContent = "5-day forecast";
    weatherForecastTitle.innerHTML = ""; // Clear previous content
    weatherForecastTitle.prepend(forecastTitle);

    if (!forecastData) {
      // If no data, generate days with dashes directly
      const today = new Date();
      let dailyTemperatures = [];

      for (let i = 1; i <= 5; i++) {
        let nextDay = new Date(today);
        nextDay.setDate(today.getDate() + i);
        const weekdayShort = getWeekdayName(nextDay.toISOString());
        const weekdayLong = getWeekdayName(nextDay.toISOString(), true);
        dailyTemperatures.push({
          weekdayShort: weekdayShort,
          weekdayLong: weekdayLong,
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
      const weekdayShort = getWeekdayName(forecastArray[i].dt_txt);
      const weekdayLong = getWeekdayName(forecastArray[i].dt_txt, true);

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
        weekdayShort: weekdayShort,
        weekdayLong: weekdayLong,
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
      const weekdayShort = getWeekdayName(nextDay.toISOString());
      const weekdayLong = getWeekdayName(nextDay.toISOString(), true);
      dailyTemperatures.push({
        weekdayShort: weekdayShort,
        weekdayLong: weekdayLong,
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
  const testWeatherType = "snow"; // Change to test different types
  getCurrentWeather(testWeatherType);
  getForecast(testWeatherType);
} else {
  // Use real API data
  getCurrentWeather();
  getForecast();
}
