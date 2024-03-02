//DOM selectors
const body = document.getElementById("body")
const sunInfo = document.getElementById("sun-info")
const main = document.getElementById("main")
const forcastContainer = document.getElementById("container")
const selectStockholm = document.getElementById("select-stockholm")
const selectGothenburg = document.getElementById("select-gothenburg")
const selectMalmoe = document.getElementById("select-malmoe")
const selectKalmar = document.getElementById("select-kalmar")

//URLs
const URL_BASE = "https://api.openweathermap.org/data/2.5/"
const QUERY_TYPE_WEATHER = "weather?q="
const QUERY_TYPE_FORECAST = "forecast?q="
const APP_KEY = ",Sweden&units=metric&APPID=8be7a87323d320c7bae11d84fa0a7c61"

//Variables
let city = ""
let weatherType = ""
let temperatureNow = ""
let sunriseData = ""
let sunsetData = ""
let weekday = ""
let dayForecast = ""
let timeForecast = ""
let temperatureForecast = ""

//Array to help show the day of the week correctly
const daysOfTheWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat,"]

//Fetches current weather data
const fetchWeatherData = (urlCity) => {
  fetch(`${URL_BASE}${QUERY_TYPE_WEATHER}${urlCity}${APP_KEY}`)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      city = json.name;
      weatherType = json.weather[0].main
      temperatureNow = json.main.temp.toFixed(1)
      printMainInfo(json)
      printHeaderInfo(json)
    })
    .catch((error) => {
      console.log(error)
    })
}
//Fetches forecast data
const fetchForecast = (urlCity) => {
  fetch(`${URL_BASE}${QUERY_TYPE_FORECAST}${urlCity}${APP_KEY}`)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      container.innerHTML = ""
      json.list.forEach((update) => {
        printForecast(update)
      })
    })
}
//Prints information in the header
const printHeaderInfo = (json) => {
  //Converts sunrise in milliseconds to readable format
  sunriseData = json.sys.sunrise
  const sunriseHour = new Date(sunriseData * 1000).getHours()
  const sunriseMinute = new Date(sunriseData * 1000).getMinutes()
  let sunriseMinuteAdjusted = ""
  if (sunriseMinute < 10) {
    sunriseMinuteAdjusted = `0${sunriseMinute}`
  } else {
    sunriseMinuteAdjusted = sunriseMinute
  }
  const sunriseTime = `${sunriseHour}:${sunriseMinuteAdjusted}`
  //Converts sunset in milliseconds to readable format
  sunsetData = json.sys.sunset
  const sunsetHour = new Date(sunsetData * 1000).getHours()
  const sunsetMinute = new Date(sunsetData * 1000).getMinutes()
  let sunsetMinuteAdjusted = ""
  if (sunsetMinute < 10) {
    sunsetMinuteAdjusted = `0${sunsetMinute}`
  } else {
    sunsetMinuteAdjusted = sunsetMinute
  }
  const sunsetTime = `${sunsetHour}:${sunsetMinuteAdjusted}`
  //Prints weather, temperature, sunrise-time and sunset-time
  sunInfo.innerHTML = `
      <p>${weatherType} | ${temperatureNow}°</p>
      <p>sunrise ${sunriseTime}</p>
      <p>sunset ${sunsetTime}</p>
    `
}
//Changes the main info box depending on weather type
const printMainInfo = () => {
  switch (weatherType) {
    case "Clouds":
      body.setAttribute("class", "red-cloudy")
      main.innerHTML = `
            <img src="./icons/icon-cloud.svg" alt="Icon showing a cloud">
            <h1>Light a fire and get cosy. ${city} is looking grey today.</h1>
            `
      break
    case "Clear":
      body.setAttribute("class", "green-yellow-sunny")
      main.innerHTML = `
            <img src="./icons/icon-sunglasses.svg" alt="Icon showing a pair of sunglasses">
            <h1>Get your sunnies on. ${city} is looking rather great today.</h1>
            `
      break
    case "Rain":
      body.setAttribute("class", "blue-rainy")
      main.innerHTML = `
            <img src="./icons/icon-umbrella.svg" alt="Icon showing an umbrella">
            <h1>Don't forget your umbrella. It's wet in ${city} today.</h1>
            `
      break
    case "Thunderstorm":
      body.setAttribute("class", "red-yellow-lightning")
      main.innerHTML = `
            <p><i class="fa-solid fa-cloud-bolt fa-2xl" style="color: #c03321;"></i></p>
            <h1>People in ${city} - better take cover! Lightning is about to strike.</h1>
            `
      break
    case "Snow":
      body.setAttribute("class", "blue-snowy")
      main.innerHTML = `
            <p><i class="fa-regular fa-snowflake fa-2xl" style="color: #43bbef;"></i></p>
            <h1>Get your mittens on. ${city} is getting some snow today.</h1>
            `
      break
    case "Drizzle":
      body.setAttribute("class", "blue-drizzle")
      main.innerHTML = `
            <p><i class="fa-solid fa-cloud-sun-rain fa-2xl" style="color: #2c6c8a;"></i></p>
            <h1>Raincheck? Relax, in ${city}, it's just drizzle...</h1>
            `;
      break
    case "Fog":
      body.setAttribute("class", "grey-foggy")
      main.innerHTML = `
            <p><i class="fa-regular fa-compass fa-2xl" style="color: #5f6063;"></i></p>
            <h1>Better not get lost. The fog is gathering in ${city}.</h1>
            `
      break
    case "Mist":
      body.setAttribute("class", "blue-mist")
      main.innerHTML = `
      <p><i class="fa-solid fa-spray-can-sparkles fa-2xl" style="color: #166568;"></i></p>
            <h1>Todays weather in ${city}. Mist!</h1>
            `
      break
    default:
      body.setAttribute("class", "grey-neutral")
      main.innerHTML = `
            <p><i class="fa-solid fa-volcano fa-2xl" style="color: #404040;"></i></p>
            <h1>There is definitely some kind of weather in ${city} today. Look out the window and you might find out what it is.</h1>
            `
      document.querySelector("h1").setAttribute("class", "smaller-font")
  }
}


//Prints the weather forecast
const printForecast = (update) => {
  dayForecast = new Date(update.dt * 1000).getDay()
  weekday = daysOfTheWeek[dayForecast]
  const today = new Date().getDay()
  temperatureForecast = update.main.temp.toFixed(1)
  timeForecast = new Date(update.dt * 1000).getHours()
  if (today !== dayForecast && timeForecast === 13) {
    forcastContainer.innerHTML += `
        <p>${weekday} ${temperatureForecast}°</p>
        `
  } else {
  }
}

//Fetches both todays weather and the forecast for the correct city
const fetchAllData = (chosenCity) => {
  fetchWeatherData(chosenCity)
  fetchForecast(chosenCity)
}

//Functions to handle choice of city
const handleCitySelectStockholm = () => {
  fetchAllData ("Stockholm")
}
const handleCitySelectGothenburg = () => {
  fetchAllData("Gothenburg")
}
const handleCitySelectMalmoe = () => {
  fetchAllData("Malmoe")
}
const handleCitySelectKalmar = () => {
  fetchAllData("Kalmar")
}

//Start by showing Kalmar's weather
const loadPage = () => {
  fetchAllData("Kalmar")
}

//Event-listeners
selectStockholm.addEventListener("click", handleCitySelectStockholm)
selectGothenburg.addEventListener("click", handleCitySelectGothenburg)
selectMalmoe.addEventListener("click", handleCitySelectMalmoe)
selectKalmar.addEventListener("click", handleCitySelectKalmar)


loadPage()