//DOM selectors
const body = document.getElementById("body");
const sunInfo = document.getElementById("sun-info");
const main = document.getElementById("main");
const container = document.getElementById("container");
const selectStockholm = document.getElementById("select-stockholm");
const selectGothenburg = document.getElementById("select-gothenburg");
const selectMalmoe = document.getElementById("select-malmoe");
const selectKalmar = document.getElementById("select-kalmar");

//URLs
const URL_BASE = "https://api.openweathermap.org/data/2.5/";
const QUERY_TYPE_WEATHER = "weather?q=";
const QUERY_TYPE_FORECAST = "forecast?q=";
const APP_KEY = ",Sweden&units=metric&APPID=8be7a87323d320c7bae11d84fa0a7c61";

//Variables
let urlCity = "Kalmar";
let city = "";
let weatherType = "";
let temperatureNow = "";
let sunriseData = "";
let sunsetData = "";
let weekday = "";
let dayForecast = "";
let timeForecast = "";
let temperatureForecast = "";

//Fetches current weather data
const fetchWeatherData = (urlCity) => {
  fetch(`${URL_BASE}${QUERY_TYPE_WEATHER}${urlCity}${APP_KEY}`)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      city = json.name;
      weatherType = json.weather[0].main;
      temperatureNow = json.main.temp.toFixed(1);
      printMainInfo(json);
      printHeaderInfo(json);
    })
    .catch((error) => {
      console.log(error);
    });
};
//Fetches forecast data
const fetchForecast = (urlCity) => {
  fetch(`${URL_BASE}${QUERY_TYPE_FORECAST}${urlCity}${APP_KEY}`)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log (json)
      container.innerHTML = ""
      json.list.forEach((update) => {
        printForecast(update);
      });
    });
};
//Prints information in the header
const printHeaderInfo = (json) => {
  sunriseData = json.sys.sunrise;
  const sunriseHour = new Date(sunriseData * 1000).getHours();
  const sunriseMinute = new Date(sunriseData * 1000).getMinutes();
  let sunriseMinuteAdjusted = ""
  if (sunriseMinute < 10) {
    sunriseMinuteAdjusted = `0${sunriseMinute}`
  } else {
    sunriseMinuteAdjusted = sunriseMinute
  }
  const sunriseTime = `${sunriseHour}:${sunriseMinuteAdjusted}`;
  sunsetData = json.sys.sunset;
  const sunsetHour = new Date(sunsetData * 1000).getHours();
  const sunsetMinute = new Date(sunsetData * 1000).getMinutes();
   let sunsetMinuteAdjusted = "";
   if (sunsetMinute < 10) {
     sunsetMinuteAdjusted = `0${sunsetMinute}`;
   } else {
     sunsetMinuteAdjusted = sunsetMinute;
   }
  const sunsetTime = `${sunsetHour}:${sunsetMinuteAdjusted}`;
  sunInfo.innerHTML = `
      <p>${weatherType} | ${temperatureNow}°</p>
      <p>sunrise ${sunriseTime}</p>
      <p>sunset ${sunsetTime}</p>
    `;
};
//Changes the main info box depending on weather type
const printMainInfo = () => {
  switch (weatherType) {
    case "Clouds":
      body.setAttribute("class", "red-cloudy");
      main.innerHTML = `
            <img src="./icons/icon-cloud.svg" alt="Icon showing a cloud">
            <h1>Light a fire and get cosy. ${city} is looking grey today.</h1>
            `;
      break;
    case "Clear":
      body.setAttribute("class", "green-yellow-sunny");
      main.innerHTML = `
            <img src="./icons/icon-sunglasses.svg" alt="Icon showing a pair of sunglasses">
            <h1>Get your sunnies on. ${city} is looking rather great today.</h1>
            `;
      break;
    case "Rain":
      body.setAttribute("class", "blue-rainy");
      main.innerHTML = `
            <img src="./icons/icon-umbrella.svg" alt="Icon showing an umbrella">
            <h1>Don't forget your umbrella. It's wet in ${city} today.</h1>
            `;
      break;
    case "Thunderstorm":
      body.setAttribute("class", "red-yellow-lightning");
      main.innerHTML = `
            <p><i class="fa-solid fa-cloud-bolt fa-2xl" style="color: #c03321;"></i></p>
            <h1>People in ${city} - better take cover! Lightning is about to strike.</h1>
            `;
      break;
    case "Snow":
      body.setAttribute("class", "blue-snowy");
      main.innerHTML = `
            <p><i class="fa-regular fa-snowflake fa-2xl" style="color: #43bbef;"></i></p>
            <h1>Get your mittens on. ${city} is getting some snow today.</h1>
            `;
      break;
    case "Drizzle":
      body.setAttribute("class", "blue-drizzle");
      main.innerHTML = `
            <p><i class="fa-solid fa-cloud-sun-rain fa-2xl" style="color: #8ed5f6;"></i></p>
            <h1>Raincheck? Relax, it's just some drizzle in ${city}.</h1>
            `;
      break;
    case "Fog":
      body.setAttribute("class", "grey-foggy");
      main.innerHTML = `
            <p><i class="fa-regular fa-compass fa-2xl" style="color: #5f6063;"></i></p>
            <h1>Better not get lost. The fog is gathering in ${city}.</h1>
            `;
      break;
    default:
      body.setAttribute("class", "grey-neutral");
      main.innerHTML = `
            <p><i class="fa-solid fa-volcano fa-2xl" style="color: #404040;"></i></p>
            <h1>There is definately some kind of weather in ${city} today. Look out the window and you might find out what it is.</h1>
            `;
  }
};
//Prints the day of the week correctly
const createDay = (day) => {
  switch (day) {
    case 0:
      weekday = "sun";
      break;
    case 1:
      weekday = "mon";
      break;
    case 2:
      weekday = "tue";
      break;
    case 3:
      weekday = "wed";
      break;
    case 4:
      weekday = "thu";
      break;
    case 5:
      weekday = "fri";
      break;
    case 6:
      weekday = "sat";
      break;
    default:
      weekday = "day";
  }
};
//Prints the weather forecast
const printForecast = (update) => {
  dayForecast = new Date(update.dt * 1000).getDay();
  createDay(dayForecast);
  const today = new Date().getDay();
  temperatureForecast = update.main.temp.toFixed(1);
  timeForecast = new Date(update.dt * 1000).getHours();
  if (today !== dayForecast && timeForecast === 13) {
    container.innerHTML += `
        <p>${weekday} ${temperatureForecast}°</p>
        `;
  } else {
  }
};

const fetchAndShowData = (chosenCity) => {
  fetchWeatherData(chosenCity);
  fetchForecast(chosenCity);
  console.log (chosenCity)
}

const handleCitySelectStockholm = () => {
  fetchAndShowData ("Stockholm")
}
const handleCitySelectGothenburg = () => {
  fetchAndShowData("Gothenburg");
};
const handleCitySelectMalmoe = () => {
  fetchAndShowData("Malmoe");
};
const handleCitySelectKalmar = () => {
  fetchAndShowData("Kalmar");
};

const loadPage = () => {
  fetchAndShowData("Kalmar");
}

//Event-listeners
selectStockholm.addEventListener("click", handleCitySelectStockholm);
selectGothenburg.addEventListener("click", handleCitySelectGothenburg);
selectMalmoe.addEventListener("click", handleCitySelectMalmoe);
selectKalmar.addEventListener("click", handleCitySelectKalmar);


loadPage()