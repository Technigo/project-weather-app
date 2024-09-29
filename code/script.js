const container = document.getElementById("container");
const temperature = document.getElementById("temperature");
const city = document.getElementById("city");
const weatherCondition = document.getElementById("weather-condition");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const list = document.getElementById("list");
const time = document.getElementById("time");
const changeCityButton = document.getElementById("changeCity");

// Array of cities with their lat and lon
const cities = [
  { name: "Paris", lat: 48.86, lon: 2.35 },
  { name: "New York", lat: 40.71, lon: -74.01 },
  { name: "Tokyo", lat: 35.69, lon: 139.69 },
  { name: "Sydney", lat: -33.87, lon: 151.21 },
  { name: "Cape Town", lat: -33.93, lon: 18.42 },
];

let currentCityIndex = 0;

function updateTime() {
  const now = new Date();
  time.innerHTML = `Time: ${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`;
}

function formatTime(timestamp) {
  const date = new Date(timestamp * 1000);
  return `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;
}

function getWeatherIconUrl(iconCode) {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

function fetchWeatherData(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=f2241eeae1b16c2b8bc74e61d2517ef6`
  )
    .then((response) => response.json())
    .then((data) => {
      temperature.innerHTML = `${Math.round(data.main.temp)}<sup>°C</sup>`;
      city.innerHTML = `${data.name}`;
      weatherCondition.innerHTML = `${data.weather[0].main}`;
      sunrise.innerHTML = `sunrise ${formatTime(data.sys.sunrise)}`;
      sunset.innerHTML = `sunset ${formatTime(data.sys.sunset)}`;

      document.querySelector(".weather-image").innerHTML =
        `<img src="${getWeatherIconUrl(data.weather[0].icon)}" alt="${data.weather[0].description}">`;

      updateTime();
      setInterval(updateTime, 60000); // Update time every minute
    });

  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=f2241eeae1b16c2b8bc74e61d2517ef6`
  )
    .then((response) => response.json())
    .then((data) => {
      const forecastAtNoon = data.list
        .filter((item) => item.dt_txt.endsWith("12:00:00"))
        .slice(0, 4);
      const forecastHTML = forecastAtNoon
        .map((forecast) => {
          const forecastDate = new Date(forecast.dt * 1000);
          const dayName = forecastDate.toLocaleDateString("en-US", {
            weekday: "short",
          });
          return `
                  <li>
                      <span>${dayName}</span>
                      <img src="${getWeatherIconUrl(forecast.weather[0].icon)}" alt="${forecast.weather[0].description}">
                      <span>${Math.round(forecast.main.temp)}<sup>°C</sup></span>
                      <span>${forecast.wind.speed.toFixed(2)}m/s</span>
                  </li>`;
        })
        .join("");
      list.innerHTML = forecastHTML;
    });
}

// Initial weather fetch
fetchWeatherData(cities[currentCityIndex].lat, cities[currentCityIndex].lon);

// Add click event listener to the button
changeCityButton.addEventListener("click", () => {
  currentCityIndex = (currentCityIndex + 1) % cities.length;
  fetchWeatherData(cities[currentCityIndex].lat, cities[currentCityIndex].lon);
});
