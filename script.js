// DOM
const todaysWeather = document.getElementById("weather-today");

// Convert to celcius

// Convert millisecunds to readable time HH:MM
const convertTime = milliseconds => {
  const date = new Date(milliseconds);
  const hours = date.getHours();
  const mins = date.getMinutes();
  return `${hours}:${mins}`;
};

// Print to DOM
const printToDOM = json => {
  console.log(json);
  todaysWeather.innerHTML = `
  <p>${json.main.temp}</p>
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
  .then(json => printToDOM(json))
  .catch(err => console.log("Error: ", err));
