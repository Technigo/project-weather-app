// Decide on class and id names for elements
// DOM selectors
const currentWeather = document.getElementById("currentWeather");
const upcomingWeather = document.getElementById("upcomingWeather");

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
    const roundedTemp = Math.round(json.main.temp * 10) / 10;
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

    const mainWeather = json.weather[0].main;
    const showMainWeatherIcon = () => {
      if (mainWeather === `Snow`) {
        mainIcon = `<img src="./assets/Group16.png"/>`;
      }
      console.log(mainWeather);
      console.log(mainIcon);
    };
    showMainWeatherIcon();

    // This is showing the current weather for the location.
    currentWeather.innerHTML += `
        <div class="main-icon-container">${mainIcon}</div>
        <h1 class="main-temp">${roundedTemp} <span class="celsius">&#8451;</span></h1>
        <h2 class="city-name">${json.name}</h2>
        <p class="weather-type">${mainWeather}</p>
        <div class="rise-set">Sunrise ${sunriseTime} Sunset ${sunsetTime}</div>
         `;
  });
