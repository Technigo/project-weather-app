const city = document.getElementById('city')
const temp = document.getElementById('temp')
const weatherType = document.getElementById('weather-type')
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

const BASE_URL= 'https://api.openweathermap.org/data/2.5/'
const API_KEY = 'bc487ba1fa4b42fcfb85443237a7774e'

const URL_WEATHER = 'weather'
const URL_FORECAST = 'forecast'
const cityQuery = 'Stockholm,Sweden'

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
 })
}

const getBasicWeatherInfo = (json) => {
    const cityName = ` ${json.name}`
    city.innerHTML = cityName 
    const mainTemperature = `${Math.round(json.main.temp)}&deg;C`
    temp.innerHTML = mainTemperature
    json.weather.forEach((element) => {
        weatherType.innerHTML = `${element.main}`
    console.log(element.main)
    }) 
}

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
    const dates_text = weatherAt12.map((el) => el.dt_txt) //getting a new array with dates and time
    const DayNumber = dates_text.map((el)=>{ //Converting daynames to number
       return new Date(el).getDay()
    })
    const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    let day1 = weekday[DayNumber[0]];
    let day2 = weekday[DayNumber[1]];
    let day3 = weekday[DayNumber[2]];
    let day4 = weekday[DayNumber[3]];
    let day5 = weekday[DayNumber[4]];
    // forecastSection.innerHTML += `
    //  <div class='forecast-column'>
    //  <p>Day</p>
    //  <p>${day1}:</p>
    //  <p>${day2}:</p>
    //  <p>${day3}:</p>
    //  <p>${day4}:</p>
    //  <p>${day5}:</p>
    //  </div>`

    forecastOne.innerHTML += `
    ${day1}°C
    `
    forecastTwo.innerHTML += `
    ${day2}°C
    `
    forecastThree.innerHTML += `
    ${day3}°C
    `
    forecastFour.innerHTML += `
    ${day4}°C
    `
    forecastFive.innerHTML += `
    ${day5}°C
    `
    
   
}

const gettingIcon = (weatherAt12) => {
    console.log(weatherAt12)
    const iconsAt12 = weatherAt12.map((el)=> el.weather.map((el)=> el.icon))
    console.log(iconsAt12)
    // forecastSection.innerHTML += `
    // <div class='forecast-column'>
    //  <p>Temp</p>
    //  <img src =https://openweathermap.org/img/wn/${iconsAt12[0]}@2x.png></p>
    //  <img src =https://openweathermap.org/img/wn/${iconsAt12[1]}@2x.png></p>
    //  <img src =https://openweathermap.org/img/wn/${iconsAt12[2]}@2x.png></p>
    //  <img src =https://openweathermap.org/img/wn/${iconsAt12[3]}@2x.png></p>
    //  <img src =https://openweathermap.org/img/wn/${iconsAt12[4]}@2x.png></p>
    //   </div> `
    
    forecastOne.innerHTML += `
    <img src =https://openweathermap.org/img/wn/${iconsAt12[0]}@2x.png>
    `
    forecastTwo.innerHTML += `
    <img src =https://openweathermap.org/img/wn/${iconsAt12[1]}@2x.png>
    `
    forecastThree.innerHTML += `
    <img src =https://openweathermap.org/img/wn/${iconsAt12[2]}@2x.png>
    `
    forecastFour.innerHTML += `
    <img src =https://openweathermap.org/img/wn/${iconsAt12[3]}@2x.png>
    `
    forecastFive.innerHTML += `
    <img src =https://openweathermap.org/img/wn/${iconsAt12[4]}@2x.png>
    `
    
}

const gettingTemperatures = (weatherAt12) => {
    const temperaturesAt12 = weatherAt12.map((el) => Math.round(el.main.temp))

    // forecastSection.innerHTML += `
    // <div class='forecast-column'>
    //  <p>Temp</p>
    //  <p>${temperaturesAt12[0]}°C,</p>
    //  <p>${temperaturesAt12[1]}°C,</p>
    //  <p>${temperaturesAt12[2]}°C,</p>
    //  <p>${temperaturesAt12[3]}°C,</p>
    //  <p>${temperaturesAt12[4]}°C,</p>
    //   </div> `

    forecastOne.innerHTML += `
    ${temperaturesAt12[0]}°C
    `
    forecastTwo.innerHTML += `
    ${temperaturesAt12[1]}°C
    `
    forecastThree.innerHTML += `
    ${temperaturesAt12[2]}°C
    `
    forecastFour.innerHTML += `
    ${temperaturesAt12[3]}°C
    `
    forecastFive.innerHTML += `
    ${temperaturesAt12[4]}°C
    `
}

const gettingFeelsLike = (weatherAt12) => {
    const feelsLike = weatherAt12.map((el) => Math.round(el.main.feels_like))
    // forecastSection.innerHTML += `
    // <div class='forecast-column'>
    // <p>Feels like</p>
    // <p>${feelsLike[0]}°C</p>
    // <p>${feelsLike[1]}°C</p>
    // <p>${feelsLike[2]}°C</p>
    // <p>${feelsLike[3]}°C</p>
    // <p>${feelsLike[4]}°C</p>
    // </div> `
    
    forecastOne.innerHTML += `
    ${feelsLike[0]}°C`
    forecastTwo.innerHTML += `
    ${feelsLike[1]}°C`
    forecastThree.innerHTML += `
    ${feelsLike[2]}°C`
    forecastFour.innerHTML += `
    ${feelsLike[3]}°C`
    forecastFive.innerHTML += `
    ${feelsLike[4]}°C`

}




//----fetching json------
fetchForecast();
fetchWeather()
