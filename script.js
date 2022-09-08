//DOM selectors
const body = document.getElementById('body')
const header = document.getElementById('header')
const currentWeather = document.getElementById('currentWeather')
const temperature = document.getElementById('temperature')
const city = document.getElementById('city')
const clearOrClody = document.getElementById('clearOrCloudy')
const sunriseSunset = document.getElementById('sunriseSunset')
const weatherWeek = document.getElementById('weatherWeek')
const weekday = document.getElementById('weekday')

fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=98bd2fbedad0f13ae05ed8e49698fda1')
    .then((response) => {
        return response.json()
    })
    .then ((json) => {
        console.log(json)
        city.innerHTML += json.name
    })
    .catch((err) => {
        console.log('caught error', err)
    })
    console.log