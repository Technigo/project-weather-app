// DOM selectors stored as short variables
//const currentWeather = document.getElementById("currentWeather");
//const sunriseTime = document.getElementById("sunrise-time");
//const sunsetTime = document.getElementById("sunset-time");
const todaysPrompt = document.getElementById("todays-prompt");
const header = document.getElementById("header");
const forecast = document.getElementById("forecast");
/* const icon = document.getElementById("icon"); */

// Global variables
let URL_WEATHER =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=1ecbebf1161e80b656c352a8c659aec8";
let URL_FORECAST =
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=8802f8b4b2d622931613aace44be57ae";

// Sunrise & Sunset

fetch(URL_WEATHER)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
    const todaysWeather = data.weather[0].description;
    const todaysMainWeather = data.weather[0].main;
    const todaysTemperature = data.main.temp.toFixed(0); // toFixed(1) rounds temperature to one decimal
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    header.innerHTML += `${todaysWeather} | ${todaysTemperature}°<br>sunrise ${sunrise}<br> sunset ${sunset}`;
    todaysPrompt.innerHTML = `${data.name}`;

    //Declare variables for the time of sunset and sunrise. new Date () changes the UNIX time to day/date/year/hh:mm:ss/time zone.
    //Convert timestamp to milliseconds with *1000. JavaScript stores Dates in milliseconds.
    //toLocaleTimeString show only the hours and minutes: https://stackoverflow.com/c/technigo/questions/1581
    // https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
    console.log(todaysWeather);
    // Today's prompt
    if (todaysMainWeather === "Clear") {
      //icon.src = "./Designs/Design-2/icons/noun_Sunglasses_2055147.svg";
      todaysPrompt.innerHTML = `<h1>Sunny in ${data.name} today!</h1>`;
      document.body.style.backgroundColor = "#F7E9B9";
      document.body.style.color = "#2A5510";
    } else if (todaysMainWeather === "Rain") {
      // icon.src = "./Designs/Design-2/icons/noun_Umbrella_2030530.svg";
      todaysPrompt.innerHTML = `<h1>Rainy in ${data.name} today!</h1>`;
      document.body.style.backgroundColor = "#A3DEF7";
      document.body.style.color = "#164A68";
    } else if (todaysMainWeather === "Clouds") {
      //icon.src = "./Designs/Design-2/icons/noun_Cloud_1188486.svg";
      todaysPrompt.innerHTML = `<h1>Cloudy in ${data.name} today!</h1>`;
      document.body.style.backgroundColor = "#F4F7F8";
      document.body.style.color = "#F47775";
    }
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
      <div class="d1">  
        <div class="day">${weekday(filteredForecast[0].dt)}</div>
        <div class="temp"> ${filteredForecast[0].main.temp.toFixed(0)}°</div>
      </div>
      <div class="d2">  
        <div class="day">${weekday(filteredForecast[1].dt)}</div>
        <div class="temp"> ${filteredForecast[1].main.temp.toFixed(0)}°</div>
      </div>
      <div class="d3">  
        <div class="day">${weekday(filteredForecast[2].dt)}</div>
        <div class="temp"> ${filteredForecast[2].main.temp.toFixed(0)}°</div>
      </div>
      <div class="d4">  
        <div class="day">${weekday(filteredForecast[3].dt)}</div>
        <div class="temp"> ${filteredForecast[3].main.temp.toFixed(0)}°</div>
      </div>
      <div class="d5">   
        <div class="day">${weekday(filteredForecast[4].dt)}</div>
        <div class="temp"> ${filteredForecast[4].main.temp.toFixed(0)}°</div>
      </div>
      `;
  });
// All the event listeners

// Stackoverflow asked question: https://stackoverflow.com/c/technigo/questions/4001

// Code from Daniel re day
/* const getDayName = (dayNumber) => {
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  return dayNames [dayNumber]
} */
