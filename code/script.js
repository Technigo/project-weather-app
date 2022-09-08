// DOM selectors stored as short variables
const city = document.getElementById("city");
const currentWeather = document.getElementById("currentWeather");
const currentTemp = document.getElementById("currentTemp");
const todaysPrompt = document.getElementById("todays-prompt");
const sunriseTime = document.getElementById("sunrise-time");
const sunsetTime = document.getElementById("sunset-time");
const forecast = document.getElementById("forecast");

// Global variables
let URL_WEATHER =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=1ecbebf1161e80b656c352a8c659aec8";
let URL_FORECAST =
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=8802f8b4b2d622931613aace44be57ae";

// Sunrise/sunset
fetch(URL_FORECAST)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    // new variable to filter the table and choose the same time everyday.
    console.log(data);
    city.innerHTML += `${data.city.name}`;
    currentWeather.innerHTML += `${
      data.list[0].weather[0].description
    } | ${data.list[0].main.temp.toFixed(0)}<sup>°C</sup> `;

    // currentWeather.innerHTML += `Current weather: ${data.list[0].weather[0].description}`;
    // currentTemp.innerHTML += `Temperature: ${data.list[0].main.temp.toFixed(1)}<sup>°C</sup>`;

    // toFixed(1) rounds temperature to one decimal
    // Stackoverflow re: <sup> solution: https://stackoverflow.com/c/technigo/questions/750

    /*   if === sunny 
  const animator=()=>{
    fetch(`HTMLt.jahdkjah`)
  }
 */
  });

fetch(URL_WEATHER)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    //Declare variables for the time of sunset and sunrise. new Date () changes the UNIX time to day/date/year/hh:mm:ss/time zone.
    //Convert timestamp to milliseconds with *1000. JavaScript stores Dates in milliseconds.
    //toLocaleTimeString show only the hours and minutes: https://stackoverflow.com/c/technigo/questions/1581
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    //currentTemp.innerHTML = `Sunrise: | Sunset:`;
    sunriseTime.innerHTML = `sunrise ${sunrise}`;
    sunsetTime.innerHTML = `sunset ${sunset}`;

    // https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
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
