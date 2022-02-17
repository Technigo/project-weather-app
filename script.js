const dailyWeather = document.getElementById("dailyWeather");
const weeklyWeather = document.getElementById("weeklyWeather");
const typeOfWeather = document.getElementById("typeOfWeather");
const currentTemp = document.getElementById("currentTemp");
const city = document.getElementById("city");
const sunriseAndSunset = document.getElementById("sunriseAndSunset");
const weatherData = document.getElementById('weatherData')

const API_WEATHER =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=16decfbdca757a425e796503a595bad8";
const API_FORECAST =
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=2daa8713e80e4a10a9123c077820312c";

fetch(API_WEATHER)
  .then((res) => res.json())
  .then((data) => {
    console.log('data', data);
    let tempRemoveDecimals = Math.floor(data.main.temp); // To make the number "round" without decimals.
    let sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
      timeStyle: "short",
    });
    let sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
      timeStyle: "short",
    });

    weatherData.innerHTML += `
    <h1 id="currentTemp">${tempRemoveDecimals}</h1>
    <h2 id="city">${data.name}</h2>
    <h3 id="typeOfWeather">${data.weather[0].description}</h3>
    <h3 id="sunriseAndSunset">sunrise ${sunrise} sunset ${sunset}</h3>
    `;
  });

fetch(API_FORECAST)
  .then((res) => res.json())
  .then((forecast) => {
    console.log('forecast', forecast);
    const filteredForecast = forecast.list.filter((day) =>
      day.dt_txt.includes("12:00")
    );

    weeklyWeather.innerHTML = "";

    filteredForecast.forEach((day) => {
      const date = new Date(day.dt * 1000);
      const dayName = date.toLocaleTimeString("en-GB", { 
      weekday: "short", 
      hour: "2-digit", 
      minute: "2-digit" 
      });
      // Just added this above to the dayName const so time only show two digits. 
      // But HOW do we change this to show 12 o'clock (since this is Swedish time)?
      const weekTemp = day.main.temp.toFixed(0);

      weeklyWeather.innerHTML += `
        <tr>
            <td>${dayName}</td>
            <td>${weekTemp}ºC</td>
        </tr>
        `;
    });
  });


