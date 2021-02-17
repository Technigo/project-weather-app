//DOM selectors
let cityName = document.getElementById('cityname')
let temperature = document.getElementById('temperature')
let typeOfWeather = document.getElementById('type-of-weather')
let sunrise = document.getElementById('sunrise')
let sunriseAndSunset = document.getElementById('sunrise-and-sunset')
let forecast = document.getElementById('forecast')

// Functions
let time = (unix) => {
    let milliseconds = new Date(unix * 1000) /*changing unix unit to milliseconds and using new Date to transformt to date*/
    let hours = milliseconds.getUTCHours() /*using method getUTCHours to get the time*/
    let minutes = milliseconds.getUTCMinutes() /*using method getUTCMinutes to get the time*/
    let clock = hours.toString() + ':' + minutes.toString() /*adding the two together to get a clock*/
    return clock
}

// Getting day of week
let daysOfWeek = (millisec) => {
    var x = new Date(millisec*1000);
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var dayOfWeek = days[x.getDay()]  
    return dayOfWeek
}




// Global variable
let APIurl = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=7d9c815de89c599852c7f57690e69d99'
let forecastAPIUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=7d9c815de89c599852c7f57690e69d99'

fetch(APIurl)
    .then((response) => {
        return response.json()
    })
    .then((weatherData) => {

        cityName.innerHTML = `${weatherData.name}`
        temperature.innerHTML = `${(weatherData.main.temp).toFixed(1)}&#8451`
        typeOfWeather.innerHTML = `${weatherData.weather[0].description}`


        let sunriseTime = time(weatherData.sys.sunrise) /*calling the time function with each sunrise and sunset time*/
        let sunsetTime = time(weatherData.sys.sunset)

        sunriseAndSunset.innerHTML = `
        <h4>Sunrise: ${sunriseTime}</h4>
        <h4>Sunset: ${sunsetTime}</h4>
        `
    })

    fetch(forecastAPIUrl)
    .then((response) => {
        return response.json()
    })
    .then((forecastData) => {
        const filteredForecast = forecastData.list.filter(item => item.dt_txt.includes('12:00')) /*function taken from hint-section to filter out forecasts from 12:00 PM*/
        const threeDayForecast = filteredForecast.slice(0,3) //Forecast for three days (mobile view)
 


        /*a forEach that interates through the filtered array extracting the min and max temp of the comming 5 days*/
        threeDayForecast.forEach((forecastSingle) => {
            forecast.innerHTML += `
                <div class="forecast">
                <div class="forecast-elements">
                <p class="days-of-week">${daysOfWeek(forecastSingle.dt)}</p>
                <img class="icons" src="/assets/snowflake.png" alt="">
                <p class="forecast-temp">${(forecastSingle.main.temp_max).toFixed(0)} &#8451 </p>
                </div>
                </div>
            `
        })
    })
