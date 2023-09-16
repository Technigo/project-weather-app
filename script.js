const city = document.getElementById('city')
const temp = document.getElementById('temp')
const weatherType = document.getElementById('weather-type')
const weatherTypeText = document.getElementById('weather-type-text')
const mainWeatherSection = document.getElementById('main-weather')
const forecastSection = document.getElementById('forecast')
const sunrise = document.getElementById('sunrise-p')
const sunset = document.getElementById('sunset-p')
const forecastOne = document.getElementById('forecast-1')
const forecastTwo = document.getElementById('forecast-2')
const forecastThree = document.getElementById('forecast-3')
const forecastFour = document.getElementById('forecast-4')
const forecastFive = document.getElementById('forecast-5')
const weatherIcon = document.getElementById('weather-icon')
const headerBackground = document.querySelector('.header-background')
const search = document.querySelector('.search-display')

const BASE_URL= 'https://api.openweathermap.org/data/2.5/'
const API_KEY = 'bc487ba1fa4b42fcfb85443237a7774e'

const URL_WEATHER = 'weather'
const URL_FORECAST = 'forecast'
const cityQuery = 'Helsingborg,Sweden'

//Global variables
let iconsAt12=""
let temperaturesAt12=""
let windAt12=""
let days =""
let localtimeSunrise=""
let localtimeSunset=""
let weatherTypes=""

//------Fetching today's weather-----
const fetchWeather = () => {
fetch(`${BASE_URL}${URL_WEATHER}?q=${cityQuery}&units=metric&APPID=${API_KEY}`)
.then((response)=> {
    return response.json()
})
.then ((json) => {
    console.log (json)
    getBasicWeatherInfo(json)
    calculateSunrise(json)
    calculateSunset(json)
    gettingIconWeather(json)
 })
}

const gettingIconWeather = (json) => {
    console.log(json)
    const icon = json.weather.map ((el) => el.icon)
    weatherType.innerHTML += `
    <img class= "weatherIcon" src = "https://openweathermap.org/img/wn/${icon[0]}@2x.png"> `
}

const getBasicWeatherInfo = (json) => {
    const cityName = ` ${json.name}`
    city.innerHTML = cityName 
    const mainTemperature = `${Math.round(json.main.temp)}`
    temp.innerHTML = mainTemperature
    weatherTypes = json.weather[0].main
    weatherTypeText.innerHTML = weatherTypes
}

const calculateSunrise = (json) => {
    const unixTimestamp = json.sys.sunrise //seconds
    const timezone = json.timezone 
    console.log(timezone)
    const offset = new Date().getTimezoneOffset() * 60 //Gets the difference between time on local computer and UCT
    console.log(offset)
    const sunriseInSeconds = unixTimestamp + timezone + offset //Represents the local time of sunrise in seconds since the Unix epoch.
    const sunriseInMilliseconds = sunriseInSeconds * 1000 //seconds
    const sunriseLocalDate = new Date(sunriseInMilliseconds) //gives date
    localtimeSunrise = `${sunriseLocalDate.getHours().toString()}:${sunriseLocalDate.getMinutes().toString()}`; //gives only time
    insertSunrise (localtimeSunrise)
    checkIfDay(localtimeSunrise, localtimeSunset)
}

const calculateSunset = (json) => {
    const unixTimestamp = json.sys.sunset //seconds
    const timezone = json.timezone 
    const offset = new Date().getTimezoneOffset() * 60 //Gets the difference between time on local computer and UCT
    const sunsetInSeconds = unixTimestamp + timezone + offset //Represents the local time of sunrise in seconds since the Unix epoch.
    const sunsetInMilliseconds = sunsetInSeconds * 1000 //seconds
    const sunsetLocalDate = new Date(sunsetInMilliseconds) //gives date
    localtimeSunset = `${sunsetLocalDate.getHours().toString()}:${sunsetLocalDate.getMinutes().toString()}`; //gives only time
    insertSunset (localtimeSunset)
    checkIfDay(localtimeSunrise, localtimeSunset)
}

const insertSunrise = (localtimeSunrise) => {
    sunrise.innerHTML += `${localtimeSunrise}`
}
const insertSunset = (localtimeSunset) => {
    sunset.innerHTML += `${localtimeSunset}`
}


const checkIfDay = (localtimeSunrise, localtimeSunset) => {
    const todaysDate = new Date(); //gets todays date
    const currentTime = todaysDate.getHours()*100 + todaysDate.getMinutes();
    const timeSunriseEdited = localtimeSunrise.replace(':',''); 
    const timeSunsetEdited = localtimeSunset.replace(':','');
    const isDaytime = currentTime >= timeSunriseEdited && currentTime <= timeSunsetEdited
    showDayMode(isDaytime)
    console.log(isDaytime)
}


const showDayMode = (isDaytime) => {

if(isDaytime) {
    if (weatherTypes === "Clear"){
    console.log("det är clear")
    headerBackground.style.backgroundImage = "url('../images/Sunny-cropped.png')";
    }
    else if(weatherTypes === "Rain"){
    headerBackground.style.backgroundImage = "url('../images/rain-cropped.png')";
    }       
    else { 
    headerBackground.style.backgroundImage = "url('../images/cloudy-cropped_2.png')";
    console.log("det är varken eller")
    }
    console.log("day")
} else {
   if (weatherTypes === "Rain")
    headerBackground.style.backgroundImage = "url('../images/rain-dark-cropped.png')"; 
    else {
    headerBackground.style.backgroundImage = "url('../images/night-clear-cropped.png')";
    }      
}
}

//----Fetching for 5 days forecast
const fetchForecast = () => {
fetch(`${BASE_URL}${URL_FORECAST}?q=${cityQuery}&units=metric&APPID=${API_KEY}`)
.then((response)=> {
    return response.json()
})
.then((json) => {
    console.log (json)
    getWeatherAt12(json)
    })
 }

const getWeatherAt12 = (json) => {
    const weatherAt12 = json.list.filter((el) => el.dt_txt.includes("12:00:00")); //Filtering for timestamps
    gettingDays(weatherAt12)
    gettingTemperatures(weatherAt12)
    gettingIcon(weatherAt12)
    gettingWind(weatherAt12)
}

const gettingDays = (weatherAt12) => {
    const options = { weekday: 'short' }; // Define the options for formatting the day name
    days = weatherAt12.map((el) => {
        const date = new Date(el.dt_txt);
        return date.toLocaleDateString('en-US', options); // Format the day name
    });

    insertInnerHTML (days, temperaturesAt12, iconsAt12, windAt12)
}

const gettingIcon = (weatherAt12) => {
    console.log(weatherAt12)
    iconsAt12 = weatherAt12.map((el)=> el.weather.map((el)=> el.icon))
    insertInnerHTML (days, temperaturesAt12, iconsAt12, windAt12)
}

const gettingTemperatures = (weatherAt12) => {
    temperaturesAt12 = weatherAt12.map((el) => Math.round(el.main.temp))
    insertInnerHTML (days, temperaturesAt12, iconsAt12, windAt12)
}

const gettingWind = (weatherAt12) => {
    windAt12 = weatherAt12.map((el) => Math.round(el.wind.speed))
    insertInnerHTML(days, temperaturesAt12, iconsAt12, windAt12)
    console.log(windAt12)
}

const insertInnerHTML = (days, temperatures, icons, wind) => {

    forecastOne.innerHTML = `
    ${days[0]}
    <img src =https://openweathermap.org/img/wn/${icons[0]}@2x.png>
    <p>${temperatures[0]}°C</p>
    <p>${wind[0]}m/s</p>
    `

    forecastTwo.innerHTML = `
    ${days[1]}
    <img src =https://openweathermap.org/img/wn/${icons[1]}@2x.png>
    <p>${temperatures[1]}°C</p>
    <p>${wind[1]}m/s</p>
    `

    forecastThree.innerHTML = `
    ${days[2]}
    <img src =https://openweathermap.org/img/wn/${icons[2]}@2x.png>
    <p>${temperatures[2]}°C</p>
    <p>${wind[2]}m/s</p>
    `

    forecastFour.innerHTML = `
    ${days[3]}
    <img src =https://openweathermap.org/img/wn/${icons[3]}@2x.png>
    <p>${temperatures[3]}°C</p>
    <p>${wind[3]}m/s</p>
    `

    forecastFive.innerHTML = `
    ${days[4]}
    <img src =https://openweathermap.org/img/wn/${icons[4]}@2x.png>
    <p>${temperatures[4]}°C</p>
    <p>${wind[4]}m/s</p>
    `
;
}


//----fetching json------
fetchForecast();
fetchWeather()
