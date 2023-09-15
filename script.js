const city = document.getElementById('city')
const temp = document.getElementById('temp')
const weatherType = document.getElementById('weather-type')
const weatherTypeText = document.getElementById('weather-type-text')
const mainWeatherSection = document.getElementById('main-weather')
const sunSection = document.getElementById('sun')
const forecastSection = document.getElementById('forecast')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')
const forecastOne = document.getElementById('forecast-1')
const forecastTwo = document.getElementById('forecast-2')
const forecastThree = document.getElementById('forecast-3')
const forecastFour = document.getElementById('forecast-4')
const forecastFive = document.getElementById('forecast-5')
const forecastLabel = document.getElementById('forecast-label')
const weatherIcon = document.getElementById('weather-icon')


const BASE_URL= 'https://api.openweathermap.org/data/2.5/'
const API_KEY = 'bc487ba1fa4b42fcfb85443237a7774e'

const URL_WEATHER = 'weather'
const URL_FORECAST = 'forecast'
const cityQuery = 'Glasgow, UK'

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
    console.log (icon)
}

const getBasicWeatherInfo = (json) => {
    const cityName = ` ${json.name}`
    city.innerHTML = cityName 
    const mainTemperature = `${Math.round(json.main.temp)}`
    temp.innerHTML = mainTemperature
    json.weather.forEach((element) => {
        weatherTypeText.innerHTML = `${element.main}`
    console.log(element.main)
    }) 
}

//&deg;C

const calculateSunrise = (json) => {
    const unixTimestamp = json.sys.sunrise //seconds
    const timezone = json.timezone 
    const offset = new Date().getTimezoneOffset() * 60 //Gets the difference between time on local computer and UCT
    const sunriseInSeconds = unixTimestamp + timezone + offset //Represents the local time of sunrise in seconds since the Unix epoch.
    const sunriseInMilliseconds = sunriseInSeconds * 1000 //seconds
    const sunriseLocalDate = new Date(sunriseInMilliseconds) //gives date
    const localtimeSunrise = `${sunriseLocalDate.getHours().toString()}:${sunriseLocalDate.getMinutes().toString()}`; //gives only time
    insertSunrise (localtimeSunrise)
}

const calculateSunset = (json) => {
    const unixTimestamp = json.sys.sunset //seconds
    const timezone = json.timezone 
    const offset = new Date().getTimezoneOffset() * 60 //Gets the difference between time on local computer and UCT
    const sunsetInSeconds = unixTimestamp + timezone + offset //Represents the local time of sunrise in seconds since the Unix epoch.
    const sunsetInMilliseconds = sunsetInSeconds * 1000 //seconds
    const sunsetLocalDate = new Date(sunsetInMilliseconds) //gives date
    const localtimeSunset = `${sunsetLocalDate.getHours().toString()}:${sunsetLocalDate.getMinutes().toString()}`; //gives only time
    insertSunset (localtimeSunset)
}

const insertSunrise = (localtimeSunrise) => {
    sunrise.innerHTML += `${localtimeSunrise}`
}
const insertSunset = (localtimeSunset) => {
    sunset.innerHTML += `${localtimeSunset}`
}

//Declaring global variables
let iconsAt12=""
let temperaturesAt12=""
let feelsLike =""
let days =""


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
    gettingFeelsLike(weatherAt12)
    gettingIcon(weatherAt12)
}

const gettingDays = (weatherAt12) => {

    const options = { weekday: 'short' }; // Define the options for formatting the day name

    days = weatherAt12.map((el) => {
        const date = new Date(el.dt_txt);
        return date.toLocaleDateString('en-US', options); // Format the day name
    });
    insertInnerHTML (days, temperaturesAt12, iconsAt12, feelsLike)
}

const gettingIcon = (weatherAt12) => {
    console.log(weatherAt12)
    iconsAt12 = weatherAt12.map((el)=> el.weather.map((el)=> el.icon))

    insertInnerHTML (days, temperaturesAt12, iconsAt12, feelsLike)
    
}

const gettingTemperatures = (weatherAt12) => {
    temperaturesAt12 = weatherAt12.map((el) => Math.round(el.main.temp))
    insertInnerHTML (days, temperaturesAt12, iconsAt12, feelsLike)
   

}

const gettingFeelsLike = (weatherAt12) => {
    feelsLike = weatherAt12.map((el) => Math.round(el.main.feels_like))
    insertInnerHTML (days, temperaturesAt12, iconsAt12, feelsLike)

}

const insertInnerHTML = (days, temperatures, icons, feelsLikePl) => {

    forecastOne.innerHTML = `
    ${days[0]}
    <img src =https://openweathermap.org/img/wn/${icons[0]}@2x.png>
    ${temperatures[0]}°C
    ${feelsLikePl[0]}°C
    `

    forecastTwo.innerHTML = `
    ${days[1]}
    <img src =https://openweathermap.org/img/wn/${icons[1]}@2x.png>
    ${temperatures[1]}°C
    ${feelsLikePl[1]}°C
    `

    forecastThree.innerHTML = `
    ${days[2]}
    <img src =https://openweathermap.org/img/wn/${icons[2]}@2x.png>
    ${temperatures[2]}°C
    ${feelsLikePl[2]}°C
    `

    forecastFour.innerHTML = `
    ${days[3]}
    <img src =https://openweathermap.org/img/wn/${icons[3]}@2x.png>
    ${temperatures[3]}°C
    ${feelsLikePl[3]}°C
    `

    forecastFive.innerHTML = `
    ${days[4]}
    <img src =https://openweathermap.org/img/wn/${icons[4]}@2x.png>
    ${temperatures[4]}°C
    ${feelsLikePl[4]}°C
    `
;
   
}





//----fetching json------
fetchForecast();
fetchWeather()
