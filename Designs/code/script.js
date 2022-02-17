// Decide on class and id names for elements
// DOM selectors
const currentWeather = document.getElementById("currentWeather");
const upcomingWeather = document.getElementById("upcomingWeather");
const currentWeatherWrapper = document.getElementById('current-weather-wrapper')

//const APP_ID = '94506b4af0e0a236471b8ee0da3c2281'

// Global variable
let mainIcon = "";

fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=Rovaniemi,Finland&units=metric&APPID=94506b4af0e0a236471b8ee0da3c2281"
)
  .then((response) => {
    return response.json();
  })

  .then((json) => {
    console.log(json);
    // This is showing the current temperature rounded to an integer.
    const roundedTemp = 10
    //Math.round(json.main.temp * 10) / 10;
    // This is showing local time for sunrise transformed into 2-digit form for hours and minutes.
    let sunriseTime = new Date(
      (json.sys.sunrise + json.timezone + new Date().getTimezoneOffset() * 60) *
        1000
    ).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // This is showing local time for sunrise transformed into 2-digit form for hours and minutes.
    let sunsetTime = new Date(
      (json.sys.sunset + json.timezone + new Date().getTimezoneOffset() * 60) *
        1000
    ).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // This is the weather condition icons that are showing depending on the weather
    const mainWeather = json.weather[0].main;

    const showMainWeatherIcon = () => {
      if (mainWeather === `Snow` ) {
        mainIcon = `<img src="./assets/snow.png"/>`
      } else if (mainWeather === `Rain` || mainWeather === `Drizzle`) {
        mainIcon = `<img src="./assets/rain.png" />`
      } else if (mainWeather === `Thunderstorm`) {
        mainIcon = `<img src="./assets/thunderstorm.png" />`
      } else if (mainWeather === `Clear`) {
        mainIcon = `<img src="./assets/clear.png" />`
      } else if (mainWeather === `Clouds`) {
        mainIcon = `<img src="./assets/cloudy.png" />`
      } else if (mainWeather === `Squall`) {
        mainIcon = `<img src="./assets/squall.png" />`
      } else if (mainWeather === `Tornado`) {
        mainIcon = `<img src="./assets/tornado.png" />`
      } else if (mainWeather === `Fog` || mainWeather === `Mist` || mainWeather === `Haze`) {
        mainIcon = `<img src="./assets/fog.png" />`
      } else if (mainWeather === `Dust` || mainWeather === `Sand` || mainWeather === `Smoke` || mainWeather === `Ash`) {
        mainIcon = `<img src="./assets/dust.png" />`
      }

    };
    showMainWeatherIcon();
    const changeTempBackground = () => {
        if (roundedTemp < 5) {
            currentWeatherWrapper.style.background =
            'linear-gradient(50deg, #663399 0%, #b9bfff 50%, #22277A 100%)'
        } else if (roundedTemp > 5 && roundedTemp < 19) {
            currentWeatherWrapper.style.background =
            'linear-gradient(50deg, #1c9bf6e8 0%, #d8d8d8 60%, #1c9cf6e8 100%)'
        } else {
            currentWeatherWrapper.style.background =
            'linear-gradient(50deg, #F6412D 0%, #FFF682 60%, #FF5607 100%)'
        } 
    }
    changeTempBackground()

    // This is showing the current weather for the location.
    currentWeather.innerHTML += `
        <div class="main-icon-container">
          <div class = "main-icon"> ${mainIcon}</div>
        </div>
        <h1 class="main-temp">${roundedTemp} <span class="celsius">&#8451;</span></h1>
        <h2 class="city-name">${json.name}</h2>
        <p class="weather-type">${mainWeather}</p>
        <div class="rise-set">
          <p class="sunrise">Sunrise ${sunriseTime}</p>
          <p class="sunset">Sunset ${sunsetTime}</p>
        </div>
         `;
  });
