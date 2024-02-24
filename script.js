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
  <p>${json.main.temp}</p>
  <img src="${setBackground(json)}"/>
  <p>${json.name}</p>
  <p>${json.weather[0].description}</p>
  <p>Sunrise: ${convertTime(json.sys.sunrise)}</p>
  <p>Sunset: ${convertTime(json.sys.sunset)}</p>
  `;
};

fetch(
  "https://api.openweathermap.org/data/2.5/weather?lat=57.791667&lon=13.418611&appid=22a9947f80352a8e0b470d4aaefb4388"
)
  .then(response => response.json())
  .then(json => printWeather(json))
  .catch(err => console.log("Error: ", err));
