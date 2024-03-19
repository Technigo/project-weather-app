const BASE_URL =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=343b966846b558ccc45becaa3d348154";

const FORECAST_URL =
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=343b966846b558ccc45becaa3d348154";

const typeOfWeather = document.getElementById("typeOfWeather");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const fiveDays = document.getElementById("fiveDays");
const weatherText = document.getElementById("container");
const body = document.getElementById("body");

const getWeatherData = () => {
  fetch(`${BASE_URL}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //variables for sunrise
      const sunriseData = data.sys.sunrise;
      const sunriseHour = new Date(sunriseData * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const sunriseTime = `${sunriseHour}`;

      //variables for sunset
      const sunsetData = data.sys.sunset;
      const sunsetHour = new Date(sunsetData * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const sunsetTime = `${sunsetHour}`;

      typeOfWeather.innerHTML = `${data.weather[0].main}`;
      temperature.innerHTML = `${data.main.temp.toFixed(1)}°`;
      sunrise.innerHTML = `sunrise ${sunriseTime}`;
      sunset.innerHTML = `sunset ${sunsetTime}`;

      cityName.innerHTML = `${data.name}`;

      //else if statement for different weather types
      const todaysWeather = data.weather[0].main;

      if (todaysWeather === "Clear") {
        body.style.background = "#F7E9B9";
        body.style.color = "#2A5510";
        container.innerHTML = `
        <img src="./icons-images-new/noun_Sunglasses_2055147.svg">
        <h1>Get your sunnies on.<br> 
        ${data.name} is looking rather great today.</h1>`;
      } else if (todaysWeather === "Rain") {
        body.style.background = "#A3DEF7";
        body.style.color = "#164A68";
        container.innerHTML = `
        <img src="./icons-images-new/noun_Umbrella_2030530.svg">
        <h1>Don't forget your umbrella.<br> 
        It's wet in ${data.name} today.</h1>`;
      } else if (todaysWeather === "Clouds") {
        body.style.background = "##F4F7F8";
        fiveDays.style.color = "#F47775";
        container.innerHTML = `
        <img src="./icons-images-new/noun_Cloud_1188486.svg">
        <h1>Light a fire and get cosy. ${data.name} is looking grey today.</h1>
        `;
      } else if (todaysWeather === "Snow") {
        body.style.background = "##F4F7F8";
        fiveDays.style.color = "#F47775";
        container.innerHTML = `
        <img src="./icons-images-new/noun_Cloud_1188486.svg">
        <h1>Light a fire and get cosy.<br> 
        ${data.name} is looking grey today.</h1>
        `;
      }
      console.log(data);
    });
};
getWeatherData();

//Five days weather forecast

const getWeatherForecast = () => {
  fetch(`${FORECAST_URL}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const weekday = [...data.list].filter((data) => {
        return data.dt_txt.endsWith("12:00:00");
      });

      weekday.forEach((data) => {
        const fromUnix = data.dt * 1000;
        const currentDate = new Date(fromUnix);
        const fiveDaysList = currentDate.toLocaleDateString("en-US", {
          weekday: "short",
        });
        const temperatureFiveDays = data.main.temp.toFixed(0);

        fiveDays.innerHTML += `
        <div id="forecast">
        <div>${fiveDaysList}</div>
        <div>${temperatureFiveDays}°</div>
        </div>`;
      });
    });
};
getWeatherForecast();
