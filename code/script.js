const header = document.getElementById("header");
const headerList = document.getElementById("header-list");
const conditionTemp = document.getElementById("condition-temp");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const message = document.getElementById("message");
const messageImg = document.getElementById("message-img");
const messageText = document.getElementById("message-text");
const forecast = document.getElementById("forecast");
const day = document.getElementById("day");
const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

let units = "metric";
let apiKey = "5cdf47ce276dd7dd42146ec93c23e3a6";
let apiEndpointWeather =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden";
let apiEndpointForecast =
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden";
let apiUrlWeather = `${apiEndpointWeather}&appid=${apiKey}&units=${units}`;
let apiUrlForecast = `${apiEndpointForecast}&appid=${apiKey}&units=${units}`;

const fetchWeatherData = () => {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=5cdf47ce276dd7dd42146ec93c23e3a6"
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);
      conditionTemp.innerHTML = `
        ${Math.round(json.main.temp)}
      `;
    });
  // catch((error) => console.error(error));

  //Forecast
  fetch(`${apiUrlForecast}`)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      //Filters the response to an array for each day (five days). Data from 12:00 o'clock each day.
      const filteredForecast = json.list.filter((item) =>
        item.dt_txt.includes("12:00")
      );
      console.log(filteredForecast);
      day.innerHTML = "";

      filteredForecast.map((forecastDay) => {
        console.log(forecastDay.weather[0].description);
        let weekday = new Date(forecastDay.dt_txt).getDay();
        console.log(weekdays[weekday]);

        day.innerHTML += `
    <div id="forecastSection" class="forecast-section">
      <div id="weekdaySection" class="weekday-section">
      <li>${weekdays[weekday]}</li>
      </div>
      <div id="temperature" class="temperature">
           <li>${forecastDay.main.temp.toFixed(0)}°</li>
           </div>
    
    `;
      });
    });
};
fetchWeatherData();
