// Annikas Key:
//"http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=d37e49016232d41da09ab7080df2faa7";

const main = document.getElementById("main");
const todaysHeaderForecast = document.getElementById("todaysHeaderForecast");
const textForecast = document.getElementById("textForecast");
const weeklyForecast = document.getElementById("weeklyForecast");

// Variables that makes the URL shorter to write in the code
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
    const sunrise = new Date(wData.sys.sunrise * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const sunset = new Date(wData.sys.sunset * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Using math.round in the template literal for temperature to make it an equal number.
    todaysHeaderForecast.innerHTML = `<p>${
      wData.weather[0].description
    } | ${Math.round(wData.main.temp)}°</p>
    <p>Sunrise | ${sunrise}</p> 
    <p>Sunset | ${sunset}</p> `;

    //-------------------------------//

    // Create conditional statement that inserts symbol and weather description depending on the weather (ex: "Clouds")
    let todaysWeatherMain = wData.weather[0].main; //This is what in the API is called "Clouds", "Snow" etc
    //console.log("Today's main weather test", todaysWeatherMain);

    if (todaysWeatherMain === "Clear") {
      textForecast.innerHTML = `
      <img class="icon" src="flaticon-dreamstale/clear-sun.png">
    <p> It's a beautiful day in ${wData.name}. The sun is shining, get out your sunglasses!</p>`;
    } else if (todaysWeatherMain === "Clouds") {
      textForecast.innerHTML = `
      <img class="icon" src="flaticon-dreamstale/clouds2.png">
      <p>Make a cup of tea and get cosy. ${wData.name} is looking grey today.</p>`;
      // Change colors depending on the current weather
      document.body.style.backgroundColor = "#F4F7F8";
      // document.body.style.color = "#F47775"; Unsure, does this change text color?
    } else if (todaysWeatherMain === "Drizzle") {
      textForecast.innerHTML = `
      <img class="icon" src="flaticon-dreamstale/drizzle.png">
      <p>There is light rain in ${wData.name} today. Maybe bring your umbrella?</p>`;
    } else if (todaysWeatherMain === "Rain") {
      textForecast.innerHTML = `
      <img class="icon" src="flaticon-dreamstale/rain.png">
      <p>It's raining in ${wData.name} today! Better bring your umbrella!</p>`;
    } else if (todaysWeatherMain === "Mist") {
      textForecast.innerHTML = `
      <img class="icon" src="flaticon-dreamstale/mist.png">
      <p>Oh, it's misty in ${wData.name} today. Better watch where you are going!</p>`;
    } else if (todaysWeatherMain === "Snow") {
      textForecast.innerHTML = `
      <img class="icon" src="flaticon-dreamstale/snow.png">
      <p><It's snowing in ${wData.name} today! Put on warm clothes and go for a nice walk.</p>`;
    } else if (todaysWeatherMain === "Thunderstorm") {
      textForecast.innerHTML = `
      <img class="icon" src="flaticon-dreamstale/thunderstorm.png">
      <p>Be careful! There is a thunderstorm in ${wData.name} today.</p>`;
    } else {
      textForecast.innerHTML = `
      <img class="icon" src="flaticon-dreamstale/weather.png">
      <p>Unsure how to describe the weather in ${wData.name} today. What would you say?</p>`;
    }

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
