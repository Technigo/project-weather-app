// Current weather request by city name
// https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid={API key}
// BASE_URL
// https://api.openweathermap.org/data/2.5/weather?
// word?
// q={city name},{country code}
// q=stockholm,se
// API_KEY
// &appid={API key}
// &appid=5660c7e2a75e2c204e4b057312e71c93
// URL we used
// https://api.openweathermap.org/data/2.5/weather?q=stockholm,se&units=metric&appid=5660c7e2a75e2c204e4b057312e71c93
// https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&appid=5660c7e2a75e2c204e4b057312e71c93
// New URL for current weather in Stockholm
// https://api.openweathermap.org/data/2.5/weather?q=stockholm,se&appid=5660c7e2a75e2c204e4b057312e71c93
//const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?";
const API_KEY = "5660c7e2a75e2c204e4b057312e71c93"; // Query param
let cityName = "Stockholm"; // Path param
//const URL = ${BASE_URL}${word}${API_KEY};
//console.log(URL);

const currentWeather = document.getElementById("currentWeather");
const tempContainer = document.getElementById("temperature");
const city = document.getElementById("city");
const time = document.getElementById("time");
const weather = document.getElementById("weather");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const weatherForecast = document.getElementById("weatherForecast");

const fetchStockholmWeather = () => {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&appid=5660c7e2a75e2c204e4b057312e71c93"
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);

      const temperature = json.main.temp;
      const roundedTemperature = temperature.toFixed(1); // This will round to one decimal place
      console.log(roundedTemperature);

      tempContainer.innerHTML = `${roundedTemperature}`;
      city.innerHTML = `${json.name}`;
      //time.innerHTML = `${}`

      const weatherDescription = json.weather[0].description;
      weather.innerHTML = `${weatherDescription}`;
      //sunrise.innerHTML = `${}`
      //sunset.innerHTML = `${}`
    });
};

fetchStockholmWeather();

// const fiveDayForecast = () => {
//     fetch("https://api.openweathermap.org/data/2.5/forecast?q=stockholm,se&units=metric&appid=5660c7e2a75e2c204e4b057312e71c93")
//         .then((response) => {
//             return response.json()
//         })
//         .then((json) => {
//             console.log(json)
//             })
//         .catch((error) => console.log("Error ⛔", error))
//         }

const fiveDayForecast = () => {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}`
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      const filteredData = json.list.filter((dayWeather) => {
        // Check if the time is 12:00 (noon)
        return dayWeather.dt_txt.includes("12:00");
      });

      console.log(filteredData);
      // You can now use filteredData to display the weather at 12:00 PM every day
      showWeatherData(filteredData);
    })
    .catch((error) => console.log("Error ⛔", error));
};
fiveDayForecast();

const showWeatherData = (filteredData) => {
  let otherDayForecast = "";

  console.log(otherDayForecast);
  filteredData.forEach((day, idx) => {
    if (idx >= 0 && idx <= 4) {
      const { main, wind, weather } = day;
      const { temp } = main;
      const icon = weather[0].icon;
      const { speed: wind_speed } = wind; // Access wind speed from the wind object
      // Use toFixed(0) to round the temperature to a whole number
      const roundedTemp = temp.toFixed(0);
      
      otherDayForecast += `
 <div class="day" id="day">
      <div class="day">${new Date(day.dt * 1000).toLocaleDateString("en-US", {
        weekday: "short",
      })}</div>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
      <div class="temp">${roundedTemp}&#176;C</div>
      <div class="wind">${wind_speed} m/s</div>
  </div>
 `;
    }
  });

  weatherForecast.innerHTML = otherDayForecast;
};

//     weatherForecast.innerHTML =
//         `<div class="today" id="today">
//     <div class="day">Today</div>
//     <img src="" alt="Weather icon" class=""weather-icon>
//     <div class="temp">${temp}&#176;C</div>
//     <div class="wind">${wind_speed} m/s</div>
//  </div>
//  <div class="day-two" id="day-two">
//      <div class="day">${(day.dt*1000).format('ddd')}</div>
//      <img src="" alt="Weather icon" class=""weather-icon>
//      <div class="temp">${temp}&#176;C</div>
//      <div class="wind">${wind_speed} m/s</div>
//  </div>
//  <div class="day-three" id="day-three">
//      <div class="day">Day three</div>
//      <img src="" alt="Weather icon" class=""weather-icon>
//      <div class="temp">${temp}&176;C</div>
//      <div class="wind">${wind_speed} m/s</div>
//  </div>
//  <div class="day-four" id="day-four">
//      <div class="day">Day f#our</div>
//      <img src="" alt="Weather icon" class=""weather-icon>
//      <div class="temp">${temp}&#176;C</div>
//      <div class="wind">${wind_speed} m/s</div>
//  </div>
//  <div class="day-five" id="day-five">
//      <div class="day">Day five</div>
//      <img src="" alt="Weather icon" class=""weather-icon>
//      <div class="temp">${temp}&#176;C</div>
//      <div class="wind">${wind_speed} m/s</div>
//  </div>`
