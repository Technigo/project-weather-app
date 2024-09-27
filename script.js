/* *********************************
  Global variables
********************************* */

let apiQueryCity = "London";
let displayedCityName = "London";
let weatherTypeToday = "";

/* *********************************
  Constants
********************************* */

const API_KEY = "f1eb0732aa36b48c85267620f68aa926";
let API_URL_WEATHER_NOW = `https://api.openweathermap.org/data/2.5/weather?q=${apiQueryCity}&units=metric&APPID=${API_KEY}`;
let API_URL_WEATHER_FORECAST = `https://api.openweathermap.org/data/2.5/forecast?q=${apiQueryCity}&units=metric&APPID=${API_KEY}`;

/* *********************************
  DOM selectors
********************************* */

const app = document.getElementById("app");
const weatherTodayContainer = document.getElementById("weather-today");
const weatherForecastContainer = document.getElementById("weather-forecast");

/* *********************************
  Weather types
********************************* */

const weatherTypes = {
  clouds: {
    className: "is-cloudy",
    mainTitle: (city) =>
      `Light a fire and get cosy. ${city} is looking grey today.`,
    imgSrc: "./assets/images/cloudy.svg",
    imgAlt: "Clouds",
  },
  clear: {
    className: "is-clear",
    mainTitle: (city) =>
      `Get your sunnies on. ${city} is looking rather great today.`,
    imgSrc: "./assets/images/sunny.svg",
    imgAlt: "Sunglasses",
  },
  drizzle: {
    className: "is-drizzly",
    mainTitle: (city) =>
      `There's a light drizzle in ${city}. Keep your raincoat handy!`,
    imgSrc: "./assets/images/drizzle.svg",
    imgAlt: "Raincoat",
  },
  rain: {
    className: "is-rainy",
    mainTitle: (city) =>
      `Get your umbrella! ${city} is looking rather rainy today.`,
    imgSrc: "./assets/images/rainy.svg",
    imgAlt: "Umbrella",
  },
  snow: {
    className: "is-snowy",
    mainTitle: (city) =>
      `Time for snow boots! ${city} is a winter wonderland today.`,
    imgSrc: "./assets/images/snowy.svg",
    imgAlt: "Snowflake",
  },
  thunderstorm: {
    className: "is-thunderstorm",
    mainTitle: (city) =>
      `Stay safe indoors! ${city} is rumbling with a thunderstorm today.`,
    imgSrc: "./assets/images/thunderstorm.svg",
    imgAlt: "Thunder and clouds",
  },
  default: {
    className: "",
    mainTitle: (city) =>
      `The weather in ${city} can't be determined today. Just go outside and have a look.`,
    imgSrc: "./assets/images/window.svg",
    imgAlt: "Window",
  },
};

/* *********************************
  Functions
********************************* */

const fetchWeather = async (weatherUrl) => {
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

// Function for having different content based on current weather
const typeOfWeather = (weatherType, cityName) => {
  const type = weatherTypes[weatherType.toLowerCase()] || weatherTypes.default;
  app.classList.add(type.className);

  return {
    mainTitle: type.mainTitle(cityName),
    imgSrc: type.imgSrc,
    imgAlt: type.imgAlt,
  };
};

// 1. Function to render current weather
const currentWeather = async () => {
  try {
    const weatherRightNow = await fetchWeather(API_URL_WEATHER_NOW);

    if (!weatherRightNow) {
      weatherTodayContainer.innerHTML = `
        <h1>Rain check on the weather!</h1>
        <p>Looks like today’s forecast is a no-show. Check back in a bit!</p>
      `;
      return;
    }

    displayedCityName = weatherRightNow.name;
    weatherTypeToday = weatherRightNow.weather[0].main;
    const temp = Math.round(weatherRightNow.main.temp);
    const sunrise = new Date(
      weatherRightNow.sys.sunrise * 1000
    ).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const sunset = new Date(
      weatherRightNow.sys.sunset * 1000
    ).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    // Get mainTitle, imgSrc and imgAlt from typeOfWeather
    const { mainTitle, imgSrc, imgAlt } = typeOfWeather(
      weatherTypeToday,
      displayedCityName
    );

    weatherTodayContainer.innerHTML = `
        <div class="weather-today__meta">
          <p id="todays-temp">${weatherTypeToday} — ${temp}°</p>
          <p id="todays-sunrise">Sunrise ${sunrise}</p>
          <p id="todays-sunset">Sunset ${sunset}</p>
        </div>

        <div id="weather-today__greeting" class="weather-today__greeting">
            <img
              alt="${imgAlt}"
              src="${imgSrc}"
            />
            <h1>${mainTitle}</h1>
          </div>
      `;
  } catch (error) {
    console.log(error);
    weatherTodayContainer.innerHTML = `
        <h1>Oh no!</h1>
        <p class="error-message">${error.message}</p>
      `;
  }
};

currentWeather();

// 2. Function to render forecast
const forecastedWeather = async () => {
  try {
    const forecastData = await fetchWeather(API_URL_WEATHER_FORECAST);

    if (!forecastData) {
      weatherForecastContainer.innerHTML = `
      <p>The forecast is no where to be seen.</p>
      `;
      return;
    }

    // Step 1: Get today's date in 'YYYY-MM-DD' format
    const today = new Date().toISOString().split("T")[0]; // This gives 'YYYY-MM-DD'

    // Step 2: Filter out entries that have today's date
    const forecastArray = forecastData.list.filter(
      (item) => item.dt_txt.slice(0, 10) !== today
    );

    // Initialize an array to store the results for each day
    let dailyTemperatures = [];

    // Loop over forecastArray in steps of 8 to process each day
    for (let i = 0; i < forecastArray.length; i += 8) {
      // Initialize variables to store the lowest temp_min and highest temp_max for the day
      let lowestTempMin = Infinity;
      let highestTempMax = -Infinity;

      // Log weekday
      const date = new Date(forecastArray[i].dt_txt);
      const weekdayNumber = date.getDay();
      const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
      const weekday = weekdays[weekdayNumber];

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
        lowestTempMin: lowestTempMin,
        highestTempMax: highestTempMax,
      });
    }

    const forecastList = document.getElementById("weather-forecast__list");
    const forecastListItem = document.createDocumentFragment();

    dailyTemperatures.forEach((day) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span class="list-section">
          <h2>${day.weekday}</h2>
        </span>
        <span class="list-section">
          <p>${Math.round(day.highestTempMax)}°</p>
          <span>/</span>
          <p>${Math.round(day.lowestTempMin)}°</p>
        </span>
      `;
      forecastListItem.appendChild(li);
    });

    forecastList.innerHTML = ""; // Clear previous list items
    forecastList.appendChild(forecastListItem);
  } catch (error) {
    weatherForecastContainer.innerHTML = `
      <p>Couldn't catch the forecast</p>
    `;
  }
};

forecastedWeather();

// Function to handle the search functionality
const handleSearch = () => {
  event.preventDefault();

  let city = document.getElementById("city-input").value.trim();

  apiQueryCity = city;
  // Update API URLs with the new city
  updateApiUrls(city);
  // Fetch new data
  currentWeather();
  forecastedWeather();
};

// Listen for click on the search button
document
  .getElementById("search-button")
  .addEventListener("click", handleSearch);

// Listen for Enter key press in the input field
document.getElementById("city-input").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleSearch();
  }
});

const updateApiUrls = (city) => {
  API_URL_WEATHER_NOW = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${API_KEY}`;
  API_URL_WEATHER_FORECAST = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${API_KEY}`;
};
