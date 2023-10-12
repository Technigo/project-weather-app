const api_base_URL = "https://api.openweathermap.org/data/2.5";
const api_key = "10f8230f6149903425e19587fdc548b8";

async function fetchWeatherAndForecast(cityName) {
  try {
    // Fetch current weather data
    const weatherResponse = await fetch(
      `${api_base_URL}/weather?q=${cityName}&units=metric&APPID=${api_key}`
    );
    const weatherData = await weatherResponse.json();

    // Fetch forecast data
    const forecastResponse = await fetch(
      `${api_base_URL}/forecast?q=${cityName}&units=metric&APPID=${api_key}`
    );
    const forecastData = await forecastResponse.json();

    return { weatherData, forecastData };
  } catch (error) {
    console.log("Fetch error:", error);
    throw error;
  }
}

// Create the geolocation button element
const geolocationButton = document.createElement("button");
geolocationButton.id = "geolocation-button"; // Add an ID for targeting in CSS


// Get the container element for the button
const geolocationButtonContainer = document.getElementById(
  "geolocation-button-container"
);

// Append the button to the container
geolocationButtonContainer.appendChild(geolocationButton);

// Get the icon element
const geolocationIcon = document.querySelector("#geolocation-button i");

// Add an event listener to the icon to trigger geolocation
geolocationIcon.addEventListener("click", fetchWeatherByLocation);

// Using Geolocation API
async function fetchWeatherByLocation() {
  try {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Fetch weather data for the user's location
        const response = await fetch(
          `${api_base_URL}/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${api_key}`
        );
        const weatherData = await response.json();

        // Call the updateDOM function with the user's location data
        updateDOM(weatherData.name);
      });
    } else {
      console.log("Geolocation is not supported in this browser.");
    }
  } catch (error) {
    console.log("Fetch error:", error);
  }
}

function updateTime(cityTimeZoneOffset) {
  let today = new Date();
  let localTime = today.getTime() + today.getTimezoneOffset() * 60000; // Adjust for local time zone offset
  today.setTime(localTime + cityTimeZoneOffset * 1000); // Adjust the time according to the city's time zone offset
  let h = today.getHours();
  let m = today.getMinutes().toString().padStart(2, "0");
  document.getElementById("time").textContent = `Time: ${h}:${m}`;
}

async function updateDOM(cityName) {
  try {
    const { weatherData, forecastData } = await fetchWeatherAndForecast(
      cityName
    );

    // Handle current weather data
    const temperature = Math.round(weatherData.main.temp);
    const feelsLike = Math.round(weatherData.main.feels_like);

    if (temperature <= 15) {
      document.querySelector(".overlay").style.display = "block";
    } else {
      document.querySelector(".overlay").style.display = "none";
    }

    document.getElementById("temperature").textContent = `${temperature}°C`;
    document.getElementById(
      "feelsLike"
    ).textContent = `( Feels like: ${feelsLike} °C )`;
    document.getElementById("city-name").textContent = weatherData.name;

    // Handle weather description and icons for the current weather
    const weatherDescription = weatherData.weather[0].description;
    const capitalizedDescription =
      weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);
    const iconClass = weatherData.weather[0].icon; // Use the icon code provided by the API

    // Create a flex container to display description and icon side by side
    const descriptionContainer = document.getElementById("description");
    descriptionContainer.innerHTML = ""; // Clear existing content

    const desContainer = document.createElement("div");
    desContainer.className = "des-container";

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = capitalizedDescription;

    const iconElement = document.createElement("img");
    iconElement.src = `https://openweathermap.org/img/wn/${iconClass}.png`;
    iconElement.alt = capitalizedDescription;
    iconElement.className = "main-icon";

    desContainer.appendChild(descriptionElement);
    desContainer.appendChild(iconElement);

    descriptionContainer.appendChild(desContainer);

    // Handle sunrise and sunset times if available in the response
    if (weatherData.sys && weatherData.sys.sunrise && weatherData.sys.sunset) {
      const sunriseTime = new Date(
        weatherData.sys.sunrise * 1000
      ).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      });
      const sunsetTime = new Date(
        weatherData.sys.sunset * 1000
      ).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      });

      document.getElementById(
        "sunrise"
      ).textContent = `Sunrise: ${sunriseTime}`;
      document.getElementById("sunset").textContent = `Sunset: ${sunsetTime}`;
    }

    // Handle forecast data
    const forecastSection = document.getElementById("forecast-section");
    forecastSection.innerHTML = "";

    // Handle forecast data
    if (forecastData.list && forecastData.list.length > 0) {
      // Existing code for displaying forecast data
    } else {
      // No forecast data available
      const forecastSection = document.getElementById("forecast-section");
      forecastSection.innerHTML =
        "No forecast data available for this location.";
    }

    // Create a new table for the forecast data
    const forecastTable = document.createElement("table");
    forecastSection.appendChild(forecastTable);

    // Handle the forecast data for the next four days
    let daysDisplayed = 0;
    const daysToDisplay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    forecastData.list.forEach((forecastItem) => {
      const date = new Date(forecastItem.dt * 1000);
      const dayIndex = date.getDay();

      // Calculate the accurate day name for the next day
      const nextDayIndex = (dayIndex + daysDisplayed) % 7;
      const accurateDayIndex = nextDayIndex === 0 ? 6 : nextDayIndex - 1;

      // Check if the time is 12:00:00
      if (date.getUTCHours() === 12) {
        const weatherIcon = forecastItem.weather[0].icon;
        const isDayIcon = weatherIcon.endsWith("d");

        if (daysDisplayed < 4) {
          const row = forecastTable.insertRow();

          const dayCell = row.insertCell();
          dayCell.textContent = daysToDisplay[accurateDayIndex];

          const weatherDescriptionCell = row.insertCell();
          const weatherDescription = forecastItem.weather[0].description;

          // Use "day icon" or "night icon" based on the time of day
          const iconElement = document.createElement("img");
          iconElement.src = `https://openweathermap.org/img/wn/${
            isDayIcon ? weatherIcon : weatherIcon.replace("d", "n")
          }.png`;
          iconElement.alt = weatherDescription;
          iconElement.className = "weather-icon";

          weatherDescriptionCell.appendChild(iconElement);

          const temperatureCell = row.insertCell();
          const roundedTemperature = Math.round(forecastItem.main.temp);
          temperatureCell.textContent = `${roundedTemperature} °C`;

          const windCell = row.insertCell();
          const roundedWind = forecastItem.wind.speed.toFixed(2);
          windCell.textContent = `${roundedWind} m/s`;

          daysDisplayed++;
        }
      }
    });

    // Get the time zone offset from the weather data
    const timeZoneOffset = weatherData.timezone;
    // Adjust the time according to the city's time zone offset
    updateTime(timeZoneOffset);

    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, "0");
    const minutes = currentTime.getMinutes().toString().padStart(2, "0");
    document.getElementById("time").textContent = `Time: ${hours}:${minutes}`;

    console.log("Fetched weather data:", weatherData);
    console.log("Fetched forecast data:", forecastData);
  } catch (error) {
    console.log("Update DOM error:", error);
  }
}

const searchInput = document.querySelector("#search-input");
const searchIcon = document.querySelector(".search-icon");
const searchClose = document.querySelector(".search-close");
const searchButton = document.querySelector("#search-button");

// Event listener to show the search input and hide the icon
searchIcon.addEventListener("click", () => {
  searchInput.style.display = "block"; // Show the search input
  searchButton.style.display = "block"; // Show the search button
  searchClose.style.display = "block"; // Show the close icon
  searchIcon.style.display = "none"; // Hide the search icon
});

// Event listener to hide the search input and show the icon
searchClose.addEventListener("click", () => {
  searchInput.style.display = "none"; // Hide the search input
  searchButton.style.display = "none"; // Hide the search button
  searchClose.style.display = "none"; // Hide the close icon
  searchIcon.style.display = "block"; // Show the search icon
});

searchButton.addEventListener("click", handleSearch);
searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    handleSearch();
  }
});

async function handleSearch() {
  try {
    const cityName = searchInput.value;
    if (!cityName) {
      console.log("Please enter a city name.");
    } else {
      // Call the updateDOM function with the entered city name
      updateDOM(cityName);
    }
  } catch (error) {
    console.log("Fetch error:", error);
  }
}

// Call the initial updateDOM function with a default city
updateDOM("Stockholm");
