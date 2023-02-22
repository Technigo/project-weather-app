// Matildas Key
"https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=7309e4a5829fafe809df835ad95f18ea";

// Annikas Key:
"http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=d37e49016232d41da09ab7080df2faa7";

const main = document.getElementById("main");
const todaysForecast = document.getElementById("todaysForecast");
const symbolImage = document.getElementById("symbol");
const weatherText = document.getElementById("weatherText");
const weeklyForecast = document.getElementById("weeklyForecast");

let urlWeather =
  "http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=d37e49016232d41da09ab7080df2faa7";
let urlForecast =
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=d37e49016232d41da09ab7080df2faa7";

//this guy makes the URL easier to read
fetch(urlWeather)
  // Fetches the data from the API into our dayly weather description
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data.weather[0].description);

    todaysForecast.innerHTML = `<p>The weather is ${
      data.weather[0].description
    } in ${data.name}. 
    The current temperature is ${Math.round(data.main.temp)}</p>
    <p> Sunrise: ${data.sys.sunrise}</p>`;
  });
//using math.round in the template literal for temperature to make it an equal number.

// (Math.round(data.main.temp)))

//the city name
//the temperature
