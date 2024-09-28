// Preload images
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

  imagePaths.forEach((path) => {
    const img = new Image();
    img.src = path;
  });
};

// Show or hide elements based on loading state
const showLoading = () => {
  document.getElementById("loadingMessage").style.display = "block";
  document.getElementById("appContent").style.display = "none";
};

const hideLoading = () => {
  document.getElementById("loadingMessage").style.display = "none";
  document.getElementById("appContent").style.display = "block";
};

// Call the preloadImages function to start preloading images
preloadImages();

// Show loading message initially
showLoading();

// Select DOM elements
const tempToday = document.getElementById("tempToday");
const cityName = document.getElementById("cityName");
const localTime = document.getElementById("localTime");
const weatherDescription = document.getElementById("weatherDescription");
const sunriseText = document.getElementById("sunriseText");
const sunsetText = document.getElementById("sunsetText");
const inputField = document.getElementById("inputField");
const searchBtn = document.getElementById("searchBtn");
const searchMenuBtn = document.getElementById("searchMenuBtn");
const forecastContainer = document.getElementById("weatherForecast");
const mainWrapper = document.querySelector(".mainWrapper");

// Function to fetch current weather data
const fetchWeatherData = async (city) => {
  try {
    const API_KEY = "0c5116ff347d8ce8d78e8d3c18029dd7";
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${API_KEY}`;
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`City ${city} not found`);
    }

    const data = await response.json();
    displayWeatherData(data);
  } catch (error) {
    alert(error.message);
  }
};

// Function to fetch weather forecast data
const fetchWeatherForecast = async (city) => {
  try {
    const API_KEY = "0c5116ff347d8ce8d78e8d3c18029dd7";
    const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${API_KEY}`;
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`City ${city} not found`);
    }

    const data = await response.json();
    displayWeatherForecast(data);
  } catch (error) {
    alert(error.message);
  }
};

// Function to update the background image based on the weather condition
const updateBackgroundImage = (weatherDescription) => {
  if (!mainWrapper) return;

  const weather = weatherDescription.toLowerCase();

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
    mainWrapper.style.backgroundImage = 'url("./images/default.png")';
  }
};

// Function to display fetched current weather data
const displayWeatherData = (data) => {
  if (tempToday) tempToday.textContent = `${Math.round(data.main.temp)}°C`;
  if (cityName) cityName.textContent = data.name;
  if (weatherDescription) {
    weatherDescription.textContent = capitalizeFirstLetter(
      data.weather[0].description
    );
  }

  updateBackgroundImage(data.weather[0].description);

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

  hideLoading(); // Hide loading message and show content
};

// Function to display fetched weather forecast data
const displayWeatherForecast = (data) => {
  if (!forecastContainer) return;

  forecastContainer.innerHTML = "";

  const forecastList = data.list.filter((forecast) =>
    forecast.dt_txt.includes("12:00:00")
  );

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
    forecastContainer.appendChild(forecastRow);
  });
};

// Function to capitalize the first letter of the description
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Event listener for the search button to fetch both current weather and forecast data
if (searchBtn) {
  searchBtn.addEventListener("click", () => {
    const city = inputField.value.trim();
    if (city) {
      showLoading();
      fetchWeatherData(city);
      fetchWeatherForecast(city);
      inputField.value = "";
    } else {
      alert("Please enter a city name.");
    }
  });
}

// Event listener to open the search bar
if (searchMenuBtn) {
  searchMenuBtn.addEventListener("click", () => {
    toggleSearchBar();
  });
}

// Event listener to close the search bar
if (searchMenu) {
  searchMenu.addEventListener("click", () => {
    toggleSearchBar();
  });
}

// Function to get the user's location and fetch weather data
const getWeatherForCurrentLocation = () => {
  if (navigator.geolocation) {
    showLoading();
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
};

// Success callback function for geolocation
const successCallback = async (position) => {
  const { latitude, longitude } = position.coords;

  try {
    const reverseGeocodeUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=0c5116ff347d8ce8d78e8d3c18029dd7`;
    const response = await fetch(reverseGeocodeUrl);

    if (!response.ok) {
      throw new Error("Unable to fetch location data.");
    }

    const data = await response.json();
    if (data.length > 0) {
      const city = data[0].name;
      fetchWeatherData(city);
      fetchWeatherForecast(city);
    } else {
      alert(
        "City not found for your location. Please enable location access in your browser settings and refresh the page."
      );
    }
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
};

// Error callback function for geolocation
const errorCallback = (error) => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
  hideLoading(); // Hide loading if geolocation fails
};

// Call the function to get weather for current location on page load
getWeatherForCurrentLocation();
