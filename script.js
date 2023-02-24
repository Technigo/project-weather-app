// DOM selectors stored as short variables
const todaysPrompt = document.getElementById("todaysPrompt");
const header = document.getElementById("header");
const forecast = document.getElementById("forecast");

// Global variables
let Url_Weather =
    "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=8d52cc54754c8e2d8fdde460f4c20fb6";

let Url_Forecast =
    "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=8802f8b4b2d622931613aace44be57ae";

// fetching the weather data, temperature, sunrise and sunset
fetch(Url_Weather)
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        console.log(json)
        const todaysWeather = json.weather[0].description
        let todaysMainWeather = json.weather[0].main;
        const todaysTemperature = json.main.temp.toFixed(0); // toFixed(1) rounds temperature to one decimal
        //Declare variables for the time of sunset and sunrise. new Date () changes the UNIX time to day/date/year/hh:mm:ss/time zone.
        const sunrise = new Date(json.sys.sunrise * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          const sunset = new Date(json.sys.sunset * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
            //Convert timestamp to milliseconds with *1000. JavaScript stores Dates in milliseconds.
            //toLocaleTimeString show only the hours and minutes: https://stackoverflow.com/c/technigo/questions/1581
            // https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
          

          header.innerHTML += `${todaysWeather} | ${todaysTemperature}°<br>sunrise ${sunrise}<br> sunset ${sunset}`;

          if (todaysMainWeather === "Clear") {
            todaysPrompt.innerHTML = `<div class= "Clear">
                      <img class= "sunny" src=""/>
                      <h1> Get your sunnies on. ${json.name} is looking rather great today.</h1>
                      </div>`;
            document.body.style.backgroundColor = "#F7E9B9";
            document.body.style.color = "#2A5510";
          } else if (todaysMainWeather === "Rain") {
            todaysPrompt.innerHTML = `<div class= "rain">
                      <img class= "rain" src=""/>
                      <h1> Get your umbrella. ${json.name} is crying today.</h1>
                      </div>`;
            document.body.style.backgroundColor = "#A3DEF7";
            document.body.style.color = "#164A68";
          } else if (todaysMainWeather === "Clouds") {
            todaysPrompt.innerHTML = `<div class= "clouds">
                      <img class= "clouds" src=""/> 
                      <h1> Oh no, ${json.name} is looking rather grey today.</h1>
                      </div>`;
            document.body.style.backgroundColor = "#F4F7F8";
            document.body.style.color = "#F47775";
          }
    });
    //insert all the icons for the images in the inner.HTML 
// Forecast section
const weekday = (data) => {
  const currentDate = new Date(data * 1000); // Date object are always measured in millisecond so need to multiply * 1000.
  return currentDate.toLocaleDateString("en-GB", {
    weekday: "short",
    timezone: "Europe/Stockholm",
  });
};
fetch(Url_Forecast)
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
       <div class="forecast">
         <div class="day">${weekday(filteredForecast[0].dt)}</div>
         <div class="temp"> ${filteredForecast[0].main.temp.toFixed(0)}°</div>
       </div>
       <div class="forecast">
         <div class="day">${weekday(filteredForecast[1].dt)}</div>
         <div class="temp"> ${filteredForecast[1].main.temp.toFixed(0)}°</div>
       </div>
       <div class="forecast">
         <div class="day">${weekday(filteredForecast[2].dt)}</div>
         <div class="temp"> ${filteredForecast[2].main.temp.toFixed(0)}°</div>
       </div>
       <div class="forecast">
         <div class="day">${weekday(filteredForecast[3].dt)}</div>
         <div class="temp"> ${filteredForecast[3].main.temp.toFixed(0)}°</div>
       </div>
       <div class="forecast">
         <div class="day">${weekday(filteredForecast[4].dt)}</div>
         <div class="temp"> ${filteredForecast[4].main.temp.toFixed(0)}°</div>
       </div>`;
  });

