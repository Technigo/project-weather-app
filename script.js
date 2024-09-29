// Function to preload weather images into the browser's cache
// This helps in displaying images quickly.
const preloadImages = () => {
  const imagePaths = [
    "./images/thunderstorm.png",
    "./images/rain.png",
    "./images/snowy.png",
    "./images/mist.png",
    "./images/dust.png",
    "./images/cloudy.png",
    "./images/sunny.png",
    "./images/default.png",
  ];

  // Loop through each image path and load it into the browser's memory
  imagePaths.forEach((path) => {
    const img = new Image();
    img.src = path;
  });
};

// Show a loading message while data is being fetched
const showLoading = () => {
  document.getElementById("loadingMessage").style.display = "flex"; // Show the loading message
  document.getElementById("appContent").style.display = "none"; // Hide the main content
};
// Hide the loading message when data is fetched
const hideLoading = () => {
  document.getElementById("loadingMessage").style.display = "none"; // Hide the loading message
  document.getElementById("appContent").style.display = "block"; // Show the main content
};

// Show a loading message specifically for location permission (geolocation)
const showLocationLoading = () => {
  document.getElementById("loadingMessage").style.display = "flex"; // Show loading message for location
  document.getElementById("appContent").style.display = "none"; // Hide the main content
};
// Hide the loading message after location is fetched
const hideLocationLoading = () => {
  document.getElementById("loadingMessage").style.display = "none"; // Hide loading message
  document.getElementById("appContent").style.display = "block"; // Show main content
};

// Call the preloadImages function to start preloading images
preloadImages();

// Select DOM elements
const tempToday = document.getElementById("tempToday");
const cityName = document.getElementById("cityName");
const localTime = document.getElementById("localTime");
const weatherDescription = document.getElementById("weatherDescription");
const sunriseText = document.getElementById("sunriseText");
const sunsetText = document.getElementById("sunsetText");
const inputField = document.getElementById("inputField");
const searchBtn = document.getElementById("searchBtn");
const forecastContainer = document.getElementById("weatherForecast");
const mainWrapper = document.querySelector(".mainWrapper");

// Centralized error handling function to show a single error message and reload the page
const handleError = (message) => {
  alert(message); // Display a simple alert message
  window.location.reload(); // Refresh the page after the alert
};

// Function to fetch current weather data from the OpenWeatherMap API
// The 'city' parameter is the name of the city entered by the user
const fetchWeatherData = async (city) => {
  try {
    const API_KEY = "0c5116ff347d8ce8d78e8d3c18029dd7"; // My OpenWeatherMap API key
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${API_KEY}`;
    const response = await fetch(API_URL); // API request to get the weather data

    if (!response.ok) {
      throw new Error(`City "${city}" not found.`); // If the city is not found, throw an error
    }

    const data = await response.json(); // Convert the response to JSON format
    displayWeatherData(data); // Display the fetched weather data
    return true; // Return true to indicate that the fetch was successful
  } catch (error) {
    handleError(error.message); // Call centralized error handler
    return false; // Return false to indicate that fetch failed
  }
};

// Function to fetch the 5-day weather forecast
const fetchWeatherForecast = async (city) => {
  try {
    const API_KEY = "0c5116ff347d8ce8d78e8d3c18029dd7";
    const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${API_KEY}`;
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Forecast not available for city "${city}".`); // If no forecast is available, throw an error
    }

    const data = await response.json();
    displayWeatherForecast(data);
  } catch (error) {
    // Log the error but do not show another alert to avoid duplicate messages
    console.error("Error fetching weather forecast:", error.message);
  }
};

// Function to update the background image based on the weather description
const updateBackgroundImage = (weatherDescription) => {
  if (!mainWrapper) return;

  const weather = weatherDescription.toLowerCase(); // Convert weather description to lowercase
  // Check which weather condition matches and update the background image accordingly
  if (weather.includes("thunderstorm")) {
    mainWrapper.style.backgroundImage = 'url("./images/thunderstorm.png")';
  } else if (
    weather.includes("drizzle") ||
    weather.includes("rain") ||
    weather.includes("freezing rain")
  ) {
    mainWrapper.style.backgroundImage = 'url("./images/rain.png")';
  } else if (weather.includes("sleet") || weather.includes("snow")) {
    mainWrapper.style.backgroundImage = 'url("./images/snowy.png")';
  } else if (
    weather.includes("mist") ||
    weather.includes("haze") ||
    weather.includes("fog") ||
    weather.includes("smoke")
  ) {
    mainWrapper.style.backgroundImage = 'url("./images/mist.png")';
  } else if (
    weather.includes("dust") ||
    weather.includes("sand") ||
    weather.includes("ash")
  ) {
    mainWrapper.style.backgroundImage = 'url("./images/dust.png")';
  } else if (weather.includes("squall") || weather.includes("clouds")) {
    mainWrapper.style.backgroundImage = 'url("./images/cloudy.png")';
  } else if (weather.includes("tornado")) {
    mainWrapper.style.backgroundImage = 'url("./images/thunderstorm.png")';
  } else if (weather.includes("clear")) {
    mainWrapper.style.backgroundImage = 'url("./images/sunny.png")';
  } else {
    mainWrapper.style.backgroundImage = 'url("./images/default.png")'; // Default image
  }
};

// Function to display the fetched weather data on the webpage
const displayWeatherData = (data) => {
  if (tempToday) tempToday.textContent = `${Math.round(data.main.temp)}°C`; // Displays current temperature
  if (cityName) cityName.textContent = data.name; // Display the city name
  if (weatherDescription) {
    // Display the weather description
    weatherDescription.textContent = capitalizeFirstLetter(
      data.weather[0].description
    );
  }

  updateBackgroundImage(data.weather[0].description); // Update the background image
  // Calculate and display local time based on the city's timezone
  const timezoneOffset = data.timezone;
  const utcTime = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
  const localTimeDate = new Date(utcTime + timezoneOffset * 1000);
  if (localTime) {
    localTime.textContent = localTimeDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (mainIcon) {
    const iconCode = data.weather[0].icon;
    mainIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${data.weather[0].description}" />`;
  }
  // Display sunrise and sunset times
  const sunriseTime = new Date((data.sys.sunrise + data.timezone) * 1000);
  const sunsetTime = new Date((data.sys.sunset + data.timezone) * 1000);
  if (sunriseText) {
    sunriseText.textContent = `Sunrise: ${sunriseTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }
  if (sunsetText) {
    sunsetText.textContent = `Sunset: ${sunsetTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }
};

// Function to display the 5-day weather forecast
const displayWeatherForecast = (data) => {
  if (!forecastContainer) return;

  forecastContainer.innerHTML = ""; // Clear the previous forecast

  const forecastList = data.list.filter((forecast) =>
    forecast.dt_txt.includes("12:00:00")
  );
  // Display the forecast for the next 5 days
  forecastList.slice(0, 5).forEach((forecast) => {
    const date = new Date(forecast.dt_txt).toLocaleDateString(undefined, {
      weekday: "short",
    });
    const temp = `${Math.round(forecast.main.temp)}°C`;
    const windSpeed = `${forecast.wind.speed.toFixed(1)} m/s`;
    const iconCode = forecast.weather[0].icon;

    const forecastRow = document.createElement("tr");
    forecastRow.innerHTML = `
      <td class="forecast-category">${date}</td>
      <td class="forecast-category icon">
        <img src="https://openweathermap.org/img/wn/${iconCode}.png" alt="${forecast.weather[0].description}">
      </td>
      <td class="forecast-category">${temp}</td>
      <td class="forecast-category">${windSpeed}</td>
    `;
    forecastContainer.appendChild(forecastRow); // Add forecast row to the table
  });
};

// Helper function to capitalize the first letter of the weather description
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Add event listener to the search button to fetch weather data based on the user's input
if (searchBtn) {
  searchBtn.addEventListener("click", async () => {
    const city = inputField.value.trim(); // Get the city name from the input field
    if (city) {
      const weatherDataFetched = await fetchWeatherData(city); // Fetch the weather data for the entered city
      if (weatherDataFetched) {
        await fetchWeatherForecast(city); // Fetch the forecast if weather data is successfully fetched
      }
      inputField.value = ""; // Clear the input field after search
    } else {
      alert("Please enter a city name."); // Show an alert if no city is entered
    }
  });
}

// Function to get the user's current location and fetch weather data if location access is granted
const getWeatherForCurrentLocation = () => {
  if (navigator.geolocation) {
    showLocationLoading(); // Show loading message while waiting for location permission
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback); // Get current location
  } else {
    handleError("Geolocation is not supported by this browser."); // Show error if geolocation is not supported
  }
};

// Callback function for successful geolocation
const successCallback = async (position) => {
  const { latitude, longitude } = position.coords; // Extract latitude and longitude from position

  try {
    const reverseGeocodeUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=0c5116ff347d8ce8d78e8d3c18029dd7`;
    const response = await fetch(reverseGeocodeUrl); // Fetch city name based on latitude and longitude

    if (!response.ok) {
      throw new Error("Unable to fetch location data.");
    }

    const data = await response.json();
    if (data.length > 0) {
      const city = data[0].name; // Get the city name from the response
      const weatherDataFetched = await fetchWeatherData(city); // Fetch weather data for the city
      if (weatherDataFetched) {
        await fetchWeatherForecast(city); // Fetch forecast only if weather data was fetched successfully
      }
    } else {
      handleError(
        "City not found for your location. Please enable location access in your browser settings and refresh the page."
      );
    }
  } catch (error) {
    handleError(`Error: ${error.message}`);
  } finally {
    hideLocationLoading(); // Hide loading message after location permission is handled
  }
};

// Error callback function for geolocation errors
const errorCallback = (error) => {
  let errorMessage = "An unknown error occurred."; // Default error message
  switch (error.code) {
    case error.PERMISSION_DENIED:
      errorMessage = "User denied the request for Geolocation."; // Handle permission denied error
      break;
    case error.POSITION_UNAVAILABLE:
      errorMessage = "Location information is unavailable."; // Handle unavailable location error
      break;
    case error.TIMEOUT:
      errorMessage = "The request to get user location timed out."; // Handle timeout error
      break;
  }
  handleError(errorMessage); // Show error message to the user
  hideLocationLoading(); // Hide loading message after location permission is handled
};

// Call the function to get weather data for current location on page load
getWeatherForCurrentLocation();
