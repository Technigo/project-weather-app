
//Repeatable variables
const BASE_URL = 'https://api.openweathermap.org/data/2.5/'
const weather = ['weather','forecast']
const API_KEY = '1fdca83a9693b3d0d79182ed5ca69207'
let cityName = null

const upperContainer = document.getElementById('upper-container')
const lowerContainer = document.getElementById('lower-container')
const cityForm = document.querySelector('form')

//Eventlistener that invokes daily weather and forecast function
cityForm.addEventListener('submit', event => {

    event.preventDefault()
    lowerContainer.innerHTML = ''

    cityName = cityForm.city.value
    cityForm.reset()

    getWeather(cityName)
    getForecast(cityName)

})

//Daily weather function
const getWeather = (cityName) => {
    
    fetch(`${BASE_URL}${weather[0]}?q=${cityName}&units=metric&APPID=${API_KEY}`)
        .then(response => response.json())
        .then((result) => {

            let temperature = Math.round(result.main.temp * 10)/10
            let timeAM = new Date(result.sys.sunrise * 1000)
            let timePM = new Date(result.sys.sunset * 1000)
            
            upperContainer.innerHTML = `<section class="location-today">${result.name}</section>`
            upperContainer.innerHTML += `<section class="temp-today">${temperature}°C</section>`
            upperContainer.innerHTML += `<section class="cond-today">${result.weather[0].description}</section>`
            upperContainer.innerHTML += `<section class="sunrise-today">Sunrise ${timeAM.toLocaleTimeString('en-US', {hour12: false, hour: '2-digit', minute: '2-digit'})}</section>`
            upperContainer.innerHTML += `<section class="sundown-today">Sundown ${timePM.toLocaleTimeString('en-US', {hour12: false,  hour: '2-digit', minute: '2-digit'})}</section>`

        })
        .catch(err => console.error(err))
}

//Forecast function
const getForecast = (cityName) => {

    fetch(`${BASE_URL}${weather[1]}?q=${cityName}&units=metric&APPID=${API_KEY}`)
        .then(response => response.json())
        .then((result) => {
            
    const filteredForecast = result.list.filter(item => item.dt_txt.includes('12:00'))
    
    filteredForecast.forEach((day) => {

        let weekDay = new Date(day.dt*1000)
        let dayName = weekDay.toLocaleDateString('en-US', {weekday: 'long',})
        let temperature = Math.round(day.main.feels_like * 10)/10

        lowerContainer.innerHTML += `<section class="daily-forecast">${dayName} ${temperature}°C</section>`

            })          
        })
        .catch(err => console.error(err))
}