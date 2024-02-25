// DOM
const weatherToday = document.getElementById("weather-today");
const body = document.querySelector("body");

// Convert to celcius

// Change background if it's night
const setBackground = json => {
  const currentTime = Date.now();
  if (currentTime > json.sys.sunset) {
    console.log("it's night");
    body.classList.add("night");
    return "./design/design1/assets/moon.svg";
  } else {
    body.classList.remove("night");
    return "./design/design1/assets/sun.svg";
  }
};

// Convert millisecunds to readable time HH:MM
const convertTime = milliseconds => {
  const date = new Date(milliseconds);
  const hours = date.getHours();
  const mins = date.getMinutes();
  return `${hours}:${mins}`;
};

// Print to DOM
const printWeather = json => {
  console.log(json);
  weatherToday.innerHTML = `
  <p class="temp-current">${json.main.temp}<span>°C</span></p>
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

fetch(
  "https://api.openweathermap.org/data/2.5/weather?lat=57.791667&lon=13.418611&appid=22a9947f80352a8e0b470d4aaefb4388"
)
  .then(response => response.json())
  .then(json => printWeather(json))
  .catch(err => console.log("Error: ", err));
