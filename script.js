// DOM
const weatherToday = document.getElementById("weather-today");
const weatherForecast = document.getElementById("weather-forecast");
const body = document.querySelector("body");

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

// Filter forecast
const fiterForecast = json => {
  return json.list.filter(obj => obj.dt_txt.includes("12:00"));
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

// Change background if it's night
const setBackground = json => {
  const currentTime = Date.now();
  const sunset = json.sys.sunset * 1000;
  if (currentTime > sunset) {
    body.classList.add("night");
    return "./design/design1/assets/moon.svg";
  } else {
    body.classList.remove("night");
    return "./design/design1/assets/sun.svg";
  }
};

// Convert milliseconds to readable time HH:MM
const convertTime = milliseconds => {
  const date = new Date(milliseconds * 1000); //The time from the API is almost at epoch...
  const hours = date.getHours();
  const mins = date.getMinutes();
  return `${hours}:${mins}`;
};

// function to print current weather to DOM
const printWeather = json => {
  console.log("Weather", json);
  weatherToday.innerHTML = `
  <p class="temp-current">${Math.floor(json.main.temp)}<span>°C</span></p>
  <img
    src="${setBackground(json)}"
    alt="Sun is up!"
    class="weather-img" />
  <p class="city">${json.name}</p>
  <p class="weather-desc">${json.weather[0].description}</p>
  <div class="sun">
    <div id="sunrise">
      <p class="label">sunrise</p>
      <p class="time">${convertTime(json.sys.sunrise)}</p>
    </div>
    <div id="sunset">
      <p class="label">sunset</p>
      <p class="time">${convertTime(json.sys.sunset)}</p>
    </div>
  </div>
  `;
};
// function to print Forecast to DOM
const printForecast = json => {
  console.log(json);
  const list = fiterForecast(json);
  console.log(list);
  weatherForecast.innerHTML = "";
  list.forEach(obj => {
    let day = toWeekday(obj.dt_txt);
    weatherForecast.innerHTML += `
      <div class="forecast-day">
        <p class="forecast-day-label">${day}</p>
        <i class="weather-icon">${pickIcon(obj.weather[0].icon)}</i>
        <p>${Math.floor(obj.main.temp_max)} / ${Math.floor(
      obj.main.temp_min
    )} °C</p>
      </div>
    `;
  });
};

// API for current weather
fetch(
  "https://api.openweathermap.org/data/2.5/weather?lat=57.791667&lon=13.418611&units=metric&appid=22a9947f80352a8e0b470d4aaefb4388"
)
  .then(response => response.json())
  .then(jsonWeather => printWeather(jsonWeather))
  .catch(err => console.log("Error: ", err));

// API for forecast
fetch(
  "https://api.openweathermap.org/data/2.5/forecast?lat=57.791667&lon=13.418611&units=metric&appid=22a9947f80352a8e0b470d4aaefb4388"
)
  .then(response => response.json())
  .then(json => printForecast(json))
  .catch(err => console.log("Error: ", err));
