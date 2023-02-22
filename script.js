// Annikas Key:
"http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=d37e49016232d41da09ab7080df2faa7";

const main = document.getElementById("main");
const todaysHeaderForecast = document.getElementById("todaysHeaderForecast");
const symbolImage = document.getElementById("symbol");
const textForecast = document.getElementById("textForecast");
const weeklyForecast = document.getElementById("weeklyForecast");

// This makes the URL easier to read in the code
let urlWeather =
  "http://api.openweathermap.org/data/2.5/weather?q=Kiruna,Sweden&units=metric&APPID=d37e49016232d41da09ab7080df2faa7";
let urlForecast =
  "https://api.openweathermap.org/data/2.5/forecast?q=Kiruna,Sweden&units=metric&APPID=d37e49016232d41da09ab7080df2faa7";

fetch(urlWeather)
  // Fetches the data from the API into our daily weather description
  .then((response) => {
    return response.json();
  })
  .then((wData) => {
    //console.log(wData.weather[0].description);

    // Using math.round in the template literal for temperature to make it an equal number.
    todaysHeaderForecast.innerHTML = `<p>The weather is ${
      wData.weather[0].description
    } in ${wData.name}.</p> <p>
    The current temperature is ${Math.round(
      wData.main.temp
    )}</p> <p> Feels like ${Math.round(wData.main.feels_like)}</p>
    <p>Sunrise: ${wData.sys.sunrise}</p> 
    <p>Sunset: ${wData.sys.sunset}</p> `;

    let todaysWeatherMain = wData.weather[0].main;
    //console.log("Today's main weather test", todaysWeatherMain);
    // Create conditional statement that inserts symbol and weather description depending on the weather (ex: "Clouds")
    if (todaysWeatherMain === "Clouds") {
      textForecast.innerHTML = `
      <img src="Designs/Design-1/assets/Group16.png">
    <p>Oj det är moln idag</p>`;
    } else if (todaysWeatherMain === "Snow") {
      `<img src=""
      <p>Today it's snowing!</p>`;
    } else {
      `<img src=""
      <p>Okänt väder idag</p>`;
    }
    //osv
  });

// 5-day forecast
fetch(urlForecast)
  .then((response) => {
    return response.json();
  })
  .then((fData) => {
    console.log("test fData");

    // filteredForecast is now an array with only the data from 12:00 each day.
    const filteredForecast = fData.list.filter((item) =>
      item.dt_txt.includes("12:00")
    );
    console.log(filteredForecast);

    // Make a variable that is a function that stores the date and converts it to the name of the weekday
    // This is a function that converts the date (dt) from the API from milliseconds into name of the weekday
    const weekday = (data) => {
      const currentDate = new Date(data * 1000); // sets to millisec.
      return currentDate.toLocaleDateString("en-GB", {
        weekday: "short",
      });
    };

    weeklyForecast.innerHTML = ` 
  <div class="day-temp">
    <div class="day">${weekday(filteredForecast[0].dt)}</div>
    <div class="temp">${Math.round(filteredForecast[0].main.temp)}°</div>
  </div>
  <div class="day-temp">
    <div class="day">${weekday(filteredForecast[1].dt)}</div>
    <div class="temp">${Math.round(filteredForecast[1].main.temp)}°</div>
  </div>
  <div class="day-temp">
    <div class="day">${weekday(filteredForecast[2].dt)}</div>
    <div class="temp">${Math.round(filteredForecast[2].main.temp)}°</div>
  </div>
  <div class="day-temp">
    <div class="day">${weekday(filteredForecast[3].dt)}</div>
    <div class="temp">${Math.round(filteredForecast[3].main.temp)}°</div>
  </div>
  <div class="day-temp">
    <div class="day">${weekday(filteredForecast[4].dt)}</div>
    <div class="temp">${Math.round(filteredForecast[4].main.temp)}°</div>
  </div>`;
  });
