const temperature = document.getElementById('temperature')
const city = document.getElementById('city')
const condition = document.getElementById('condition')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')
const weeklyForecastContainer = document.getElementById('weekly-forecast-container')
const weekday = document.getElementById('weekday')
const forecastTemp = document.getElementById('forecast-temp')

const currentWeatherApiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID='
// Forecast 
const forecastApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID='
const apiKey = '3addfde144e16d817dcc3a5e9a46ea59' 

// Convert unix to time
const unixToTime = (unix) => {
    const dateObj = new Date(unix * 1000)
    const timeString = dateObj.getHours() + ':' + dateObj.getMinutes()
    return timeString
}

// fetch API
fetch (currentWeatherApiUrl + apiKey) 
    .then ((response) => {
        return response.json()
    })
    .then ((json) => {
        temperature.innerHTML = Math.round(json.main.temp)
        city.innerHTML = json.name
        condition.innerHTML = json.weather[0].description
        sunrise.innerHTML = (unixToTime(json.sys.sunrise))
        sunset.innerHTML = (unixToTime(json.sys.sunset))
        console.log(json)
    })
    .catch ((err) => {
        console.log('caught error', err)
    })

    

fetch (forecastApiUrl + apiKey)
    .then ((response) => {
        return response.json()
    })
    .then ((json) => {
        console.log(json)
        const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
        console.log(filteredForecast[0].main.temp)
        //filteredForecast.forEach(weekday => {
        //const dayOne = weekday.main.temp;
        //})
        const dayOne = filteredForecast[0].main.temp
        const dayTwo = filteredForecast[1].main.temp
        const dayThree = filteredForecast[2].main.temp
        const dayFour = filteredForecast[3].main.temp
        const dayFive = filteredForecast[4].main.temp
        //console.log(dayOne, dayTwo, dayThree)
        weekday.innerHTML += `
        <p>Monday</p>
        `
        forecastTemp.innerHTML += `
        <p>${dayOne}</p>
        `
    })
    .catch ((err) => {
        console.log('caught error', err)
    })

    .catch ((err) => {
        console.log('caught error', err)
    })
