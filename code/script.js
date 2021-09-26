const API_WEATHER =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=8bda651aba01a3b8831972e24ed1f675";
const API_URL =
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=8bda651aba01a3b8831972e24ed1f675";
const weatherContainer = document.getElementById("weather-container");
const topBox = document.getElementById("top-box");
const middleBox = document.getElementById("middle-box");
const bottomBox = document.getElementById("bottom-box");
var style = document.createElement("style");
const body = document.getElementById("body");
const icon = document.getElementById("icon");

fetch(API_WEATHER)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    console.log(json);
    json.weather.forEach((weather) => {
      topBox.innerHTML += `<div>
       ${weather.main} | ${json.main.temp.toFixed(1)}°
      </div>`;
      const rise = new Date(json.sys.sunrise * 1000);
      const up = rise.toLocaleTimeString([], {
        timeStyle: "short",
      });
      const set = new Date(json.sys.sunset * 1000);
      const down = set.toLocaleTimeString([], {
        timeStyle: "short",
      });
      topBox.innerHTML += `<div> Sunrise: ${up} <div>
    <div>Sunset: ${down} 
    </div>`;
    });

    const change = () => {
      if (json.weather[0].main === "Clouds") {
        icon.src = "./assets/Clouds.svg";
        middleBox.innerHTML += ` 
        <h1>Weather in ${json.name} is Cloudy, watch a movie and have a cosy day.</h1> `;
        document.body.style.backgroundColor = "#F4F7F8";
        document.body.style.color = "#F47775";
      } else if (json.weather[0].main === "Rain") {
        icon.src = "./assets/Umbrella.svg";
        middleBox.innerHTML += `
        <h1>Weather in ${json.name} is Rainy, don't forget your umbrella and have a great day.</h1> `;
        document.body.style.backgroundColor = "#A3DEF7";
        document.body.style.color = "#164A68";
      } else if (json.weather[0].main === "Clear") {
        icon.src = "./assets/Sunglasses.svg";
        middleBox.innerHTML += `
        <h1>Weather in ${json.name} is Clear, put on your cool sunglasses and have a great day.</h1>`;
        document.body.style.backgroundColor = "#F7E9B9";
        document.body.style.color = "#2A5510";
      } else
        middleBox.innerHTML += `<div>
      <h1> Not any special weather in ${json.name} today, you could expect anything</h1> </div>`;
    };
    change();
  });

fetch(API_URL)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    const filteredForecast = json.list.filter((item) =>
      item.dt_txt.includes("12:00")
    );
    filteredForecast.forEach((item) => {
      const date = new Date(item.dt * 1000);
      bottomBox.innerHTML += `
    <div class="day-style" >
      <p> ${new Date(date).toLocaleDateString("en-US", {
        weekday: "short",
      })} </p>
      <p> ${item.main.temp.toFixed(1)}°  </p>
    </div>
    <hr>
   `;
    });
  });

//.catch((error) => console.error ('ERROR!', error));
