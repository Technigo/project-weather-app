// DOM
const weatherToday = document.getElementById("weather-today");
const weatherForecast = document.getElementById("weather-forecast");
const weatherBackground = document.querySelector(".weather-background");

// global var
const appID = "22a9947f80352a8e0b470d4aaefb4388";
const apiURL = "https://api.openweathermap.org";
const latitude = 57.791667; // Ulricehamn
const longitude = 13.418611; // Ulricehamn

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
const setNight = json => {
  const currentTime = Date.now();
  const sunset = convertTime(json.sys.sunset);
  if (currentTime > sunset) {
    weatherBackground.classList.add("night");
    return "./design/design1/assets/moon.svg";
  } else {
    weatherBackground.classList.remove("night");
    return "./design/design1/assets/sun.svg";
  }
};

// Filter forecast
const fiterNoons = json => {
  return json.list.filter(obj => obj.dt_txt.includes("12:00"));
};

// Get max for entire day from forecast json
const getMax = (day, json) => {
  const date = convertTime(day.dt).getDate(); // Convert milliseconds to a date
  const max = json.list
    .filter(entry => entry.dt_txt.includes(date))
    .sort((a, b) => b.main.temp_max - a.main.temp_max)[0];
  return Math.floor(max.main.temp_max);
};

// Get min for entire day from forecast json
const getMin = (day, json) => {
  const date = convertTime(day.dt).getDate(); // Convert milliseconds to a date
  const min = json.list
    .filter(entry => entry.dt_txt.includes(date))
    .sort((a, b) => a.main.temp_min - b.main.temp_min)[0];
  return Math.floor(min.main.temp_min);
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

// Convert milliseconds to readable time HH:MM
const convertTime = milliseconds => {
  return new Date(milliseconds * 1000); //The time from the API is missing zeros and is almost at epoch...
};

// function to print current weather to DOM
const printWeather = json => {
  const sunriseTime = convertTime(json.sys.sunrise);
  const sunsetTime = convertTime(json.sys.sunset);
  weatherToday.innerHTML = `
  <p class="temp-current">${Math.floor(json.main.temp)}<span>°C</span></p>
  <img
    src="${setNight(json)}"
    alt="Sun is up!"
    class="weather-img" />
  <p class="city">${json.name}</p>
  <p class="weather-desc">${json.weather[0].description}</p>
  <div class="sun">
    <div id="sunrise">
      <p class="label">sunrise</p>
      <p class="time">${sunriseTime.getHours()}:${sunriseTime.getMinutes()}</p>
    </div>
    <div id="sunset">
      <p class="label">sunset</p>
      <p class="time">${sunsetTime.getHours()}:${sunsetTime.getMinutes()}</p>
      </div></p>
    </div>
  </div>
  `;
};
// function to print Forecast to DOM
const printForecast = json => {
  const list = fiterNoons(json);
  weatherForecast.innerHTML = "";
  list.forEach(obj => {
    const maxTemp = getMax(obj, json);
    const minTemp = getMin(obj, json);
    const day = toWeekday(obj.dt_txt);
    weatherForecast.innerHTML += `
      <div class="forecast-day">
        <p class="forecast-day-label">${day}</p>
        <i class="weather-icon">${pickIcon(obj.weather[0].icon)}</i>
        <p>${maxTemp} / ${minTemp} °C</p>
      </div>
    `;
  });
};

// fetch API for Geocoding
const fetchGeocode = async cityName => {
  try {
    const response = await fetch(
      `${apiURL}/geo/1.0/direct?q=${cityName}&limit=1&appid=${appID}`
    );
    const json = await response.json();
    return json;
  } catch (err) {
    console.log("Error: ", err);
  }
};

// fetch API for forecast
const fetchForecast = async (lat, long) => {
  fetch(
    `${apiURL}/data/2.5/forecast?lat=${lat}&lon=${long}&units=metric&appid=${appID}`
  )
    .then(response => response.json())
    .then(json => printForecast(json))
    .catch(err => console.log("Error: ", err));
};

// fetch API for current weather
const fetchWeather = async (lat, long) => {
  fetch(
    `${apiURL}/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${appID}`
  )
    .then(response => response.json())
    .then(json => {
      printWeather(json);
      return json;
    })
    .catch(err => console.log("Error: ", err));
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

// Handle search value city
const searchCity = async city => {
  try {
    let result = await fetchGeocode(city);
    console.log(result);
    fetchWeather(result[0].lat, result[0].lon);
    fetchForecast(result[0].lat, result[0].lon);
  } catch (error) {
    console.log(error, "Something went wrong");
  }
};

fetchWeather(latitude, longitude);
fetchForecast(latitude, longitude);
