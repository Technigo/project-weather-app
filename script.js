// DOM
const body = document.querySelector("body");
const weatherToday = document.getElementById("weather-today");
const weatherForecast = document.getElementById("weather-forecast");
const weatherBackground = document.querySelector(".weather-background");
const menuBtn = document.getElementById("menu-btn");
const menuClose = document.getElementById("close");
const navWrapper = document.querySelector(".nav");
const navItems = document.querySelectorAll(".nav-item");
const navCities = document.querySelectorAll(".nav-city");
const navGeo = document.querySelector(".nav-item.geo");
const searchInput = document.getElementById("location-search");
const scrollArrow = document.getElementById("scroll-arrow");

// global var
const APP_ID = "22a9947f80352a8e0b470d4aaefb4388";
const API_URL = "https://api.openweathermap.org";
let currentLocation = "Ulricehamn";
const latitude = 57.791667; // default
const longitude = 13.418611; // default

// Print fetch error
const printFetchError = error => {
  const errorMessage = document.createElement("div");
  errorMessage.innerHTML = `<p class="error">Unfortunately, something went wrong and we could not find your location.</p>`;
  weatherBackground.insertBefore(errorMessage, weatherToday);
};

// --API'S
// fetch API for Geocoding
const fetchGeocode = async location => {
  try {
    const response = await fetch(
      `${API_URL}/geo/1.0/direct?q=${location}&limit=1&appid=${APP_ID}`
    );
    const json = await response.json();
    // console.log("geo", json);
    const { lat, lon } = json[0];
    return { lat, lon };
  } catch (error) {
    printFetchError(error);
    console.log("Error: ", err);
  }
};

// fetch API for current weather
const fetchWeather = async location => {
  // try to call on function to fetch coordinates for location name
  try {
    coordinates = await fetchGeocode(location);
  } catch (error) {
    throw ("Geo coding error", error);
  }
  console.log("Cord", coordinates);
  try {
    // Fetch current weather
    response = await fetch(
      `${API_URL}/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${APP_ID}`
    );
    // construct json
    const weatherData = await response.json();
    console.log("weatherData: ", weatherData);
    const {
      name: locationName,
      main: { temp },
      sys: { sunrise },
      sys: { sunset },
      timezone,
      weather: [{ description }],
      weather: [{ icon }],
    } = weatherData;
    return { locationName, temp, sunrise, sunset, timezone, description, icon };
  } catch (error) {
    printFetchError(error);
    console.log("Fetch error: ", error);
    throw error;
  }
};

// fetch API for forecast
const fetchForecast = async location => {
  try {
    coordinates = await fetchGeocode(location);
  } catch (error) {
    throw ("Geo coding error", error);
  }
  try {
    response = await fetch(
      `${API_URL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${APP_ID}`
    );
    const forecastData = await response.json();
    console.log("Forecast data", forecastData);
    const {
      city: { timezone },
      list,
    } = forecastData;
    return { timezone, list };
  } catch (error) {
    printFetchError(error);
    throw error;
  }
};

// -- Styling
// Toggle class hidden
const toggleHide = el => el.classList.toggle("hidden");

// Toggle class fullscreen
const toggleFullscreen = el => el.classList.toggle("fullscreen");

// Pick icon
const pickIcon = iconId => {
  switch (iconId) {
    case "02d":
      return "🌤️";
      break;
    case "03d":
      return "⛅️";
      break;
    case "04d":
      return "☁️";
      break;
    case "09d":
      return "🌧️";
      break;
    case "10d":
      return "🌦️";
      break;
    case "11d":
      return "⛈️";
      break;
    case "13d":
      return "❄️";
      break;
    case "50d":
      return "😶‍🌫️";
      break;

    default:
      return "☀️";
      break;
  }
};

// Change background and image if it's night
const setNight = weatherData => {
  const currentTime = convertTime(Date.now() / 1000, weatherData.timezone);
  const sunset = convertTime(weatherData.sunset, weatherData.timezone);
  const sunrise = convertTime(weatherData.sunrise, weatherData.timezone);
  if (currentTime > sunset || currentTime < sunrise) {
    weatherBackground.classList.add("night");
    return "./design/design1/assets/moon.svg";
  } else {
    weatherBackground.classList.remove("night");
    return "./design/design1/assets/sun.svg";
  }
};

// convert to weekday
const toWeekday = date => {
  const day = new Date(date).getDay();
  switch (day) {
    case 1:
      return "Mon";
      break;
    case 2:
      return "Tue";
      break;
    case 3:
      return "Wed";
      break;
    case 4:
      return "Thu";
      break;
    case 5:
      return "Fri";
      break;
    case 6:
      return "Sat";
      break;
    default:
      return "Sun";
      break;
  }
};

// -- Functionality
// Filter forecast, one entry per day
const getNoons = forecastData => {
  return forecastData.list.filter(obj => obj.dt_txt.includes("12:00"));
};

// Convert milliseconds to readable time HH:MM, converted to local time
const convertTime = (seconds, timezone) => {
  const local = seconds + timezone;
  return new Date(local * 1000);
};

// Construct minutes and hours with two digits UTC
const constructHours = time =>
  time.getUTCHours() < 10 ? "0" + time.getUTCHours() : time.getUTCHours();

const constructMinutes = time =>
  time.getUTCMinutes() < 10 ? "0" + time.getUTCMinutes() : time.getUTCMinutes();

// Get max temp for entire day from forecast json
const getMaxTemp = (day, data) => {
  console.log(data);
  const date = convertTime(day.dt, data.timezone).getDate(); // Convert milliseconds to a date
  const max = data.list
    .filter(entry => entry.dt_txt.includes(date))
    .sort((a, b) => b.main.temp_max - a.main.temp_max)[0];
  return Math.floor(max.main.temp_max);
};

// Get min temp for entire day from forecast json
const getMinTemp = (day, data) => {
  const date = convertTime(day.dt, data.timezone).getDate(); // Convert milliseconds to a date
  const min = data.list
    .filter(entry => entry.dt_txt.includes(date))
    .sort((a, b) => a.main.temp_min - b.main.temp_min)[0];
  return Math.floor(min.main.temp_min);
};

// Print current weather to DOM
const printWeather = async location => {
  const weatherData = await fetchWeather(location);
  const sunriseTime = convertTime(weatherData.sunrise, weatherData.timezone);
  const sunsetTime = convertTime(weatherData.sunset, weatherData.timezone);
  const localTime = convertTime(Date.now() / 1000, weatherData.timezone);
  weatherToday.innerHTML = `
  <p class="temp-current">${Math.floor(weatherData.temp)}<span>°C</span></p>
  <img
    src="${setNight(weatherData)}"
    class="weather-img" />
  <p class="city">${weatherData.locationName}</p>
  <p class="weather-desc">${weatherData.description}</p>
  <div class="local-time">
    <time datetime="${localTime}" class="time">
    ${constructHours(localTime)}:${constructMinutes(localTime)}
    </time>
  </div>
  <div class="sun">
    <div id="sunrise">
      <p class="label">sunrise</p>
      <time datetime="${sunriseTime}" class="time">
      ${constructHours(sunriseTime)}:${constructMinutes(sunriseTime)}
      </time>
    </div>
    <div id="sunset">
      <p class="label">sunset</p>
      <time datetime="${sunsetTime}" class="time">
      ${constructHours(sunsetTime)}:${constructMinutes(sunsetTime)}
      </time>
    </div>
  </div>
  `;
};

// Print Forecast to DOM
const printForecast = async location => {
  const forecastData = await fetchForecast(location);
  console.log(forecastData);
  const noons = getNoons(forecastData);
  weatherForecast.innerHTML = "";
  noons.forEach(obj => {
    const maxTemp = getMaxTemp(obj, forecastData);
    const minTemp = getMinTemp(obj, forecastData);
    const day = toWeekday(obj.dt_txt);
    weatherForecast.innerHTML += `
      <div class="forecast-day">
        <p class="forecast-day-label">${day}</p>
        <i class="weather-icon">${pickIcon(obj.weather[0].icon)}</i>
        <p class="forecast-temp">${maxTemp} / ${minTemp} °C</p>
      </div>
    `;
  });
};

// Geolocation API
const getLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(resolve);
    } else {
      console.log("No geolocation available");
      reject("REJECTED");
    }
  });
};

// -- Functionality
// Handle Geolocation
const showLocalWeather = async () => {
  try {
    const location = await getLocation();
    lat = location.coords.latitude;
    long = location.coords.longitude;
    await fetchWeather(lat, long);
  } catch (error) {
    console.log(error, "Something went wrong");
  }
};

// Handle city
const handleLocation = async city => {
  try {
    let result = await fetchGeocode(city);
    fetchWeather(result[0].lat, result[0].lon);
    fetchForecast(result[0].lat, result[0].lon);
  } catch (error) {
    console.log(error, "Something went wrong");
  }
};

// Search
const handleSearch = event => {
  event.preventDefault();
  console.log(event.target.value);
  console.log(event);
  handleLocation(event.target.value);
};

// -- Event listeners
menuBtn.addEventListener("click", () => toggleHide(navWrapper));
menuClose.addEventListener("click", () => toggleHide(navWrapper));
navGeo.addEventListener("click", () => {
  toggleHide(navWrapper);
  showLocalWeather();
});
navItems.forEach(city =>
  city.addEventListener("click", event => {
    toggleHide(navWrapper);
    console.log(event);
    handleLocation(event.target.firstChild.nodeValue);
  })
);
scrollArrow.addEventListener("click", () => {
  toggleFullscreen(body);
  toggleHide(weatherForecast);
});

searchInput.addEventListener("change", handleSearch);

// load site
printWeather("Ulricehamn");
printForecast("Ulricehamn");
