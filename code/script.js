// DOM selectors stored as short variables
const city = document.getElementById("city");
const currentWeather = document.getElementById("currentWeather");
const currentTemp = document.getElementById("currentTemp");
const forecast = document.getElementById("forecast");

// Global variables
const URL_FORECAST =
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=8802f8b4b2d622931613aace44be57ae";

// Fetch
fetch(URL_FORECAST)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    // new variable to filter the table and choose the same time everyday.
    console.log(data);
    city.innerHTML += `City: ${data.city.name}`;
    currentWeather.innerHTML += `Current weather: ${data.list[0].weather[0].description} `;
    currentTemp.innerHTML += `Temperature: ${data.list[0].main.temp.toFixed(
      0
    )}<sup>°C</sup>`;
    // toFixed(1) rounds temperature to one decimal. Stackoverflow re: <sup> solution: https://stackoverflow.com/c/technigo/questions/750
  });

//Forecast

const weekday = (data) => {
  const currentDate = new Date(data * 1000); // sets to millisec.
  return currentDate.toLocaleDateString("en-GB", {
    weekday: "short",
  });
};
fetch(URL_FORECAST)
  .then((res) => {
    return res.json();
  })
  .then((json) => {
    // new variable to filter the table and choose the same time everyday.
    const filteredForecast = json.list.filter((item) =>
      item.dt_txt.includes("12:00")
    );
    console.log(filteredForecast);
    forecast.innerHTML += `
      <div class="day">${weekday(filteredForecast[0].dt)}</div>
      <div class="temp"> ${filteredForecast[0].main.temp.toFixed(0)}</div>
      <div class="day">${weekday(filteredForecast[1].dt)}</div>
      <div class="temp"> ${filteredForecast[1].main.temp.toFixed(0)}</div>
      <div class="day">${weekday(filteredForecast[2].dt)}</div>
      <div class="temp"> ${filteredForecast[2].main.temp.toFixed(0)}</div>
      <div class="day">${weekday(filteredForecast[3].dt)}</div>
      <div class="temp"> ${filteredForecast[3].main.temp.toFixed(0)}</div>
      <div class="day">${weekday(filteredForecast[4].dt)}</div>
      <div class="temp"> ${filteredForecast[4].main.temp.toFixed(0)}</div>
      `;
  });

// All the event listeners

// Stackoverflow asked question: https://stackoverflow.com/c/technigo/questions/4001

// Code from Daniel re day
/* const getDayName = (dayNumber) => {
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  return dayNames [dayNumber]
} */
