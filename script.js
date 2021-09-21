const cityName = document.getElementById('city')
const temperature = document.getElementById('temperature')
const typeOfWeather = document.getElementById('typeOfWeather')
const minTemp = document.getElementById('min-temp')
const maxTemp = document.getElementById('max-temp') 
const bottomSection = document.getElementById('bottom-section')

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=147b874875d53e0e9f84cbacd0567b99'
    fetch(API_LINK)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        cityName.innerHTML = json.name
        temperature.innerHTML = json.main.temp.toFixed(1)
        typeOfWeather.innerHTML = json.weather[0].description
        
    })

const API_LINK_FORECAST = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=147b874875d53e0e9f84cbacd0567b99'
    fetch(API_LINK_FORECAST)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))

        const weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",];

        filteredForecast.forEach((day) => {
            const date = new Date(day.dt * 1000) //converted numbers to right format, in this case Weekdays.
            
            bottomSection.innerHTML += `<p>${weekDays[date.getDay()]}</p> 
            <p>Min: ${day.main.temp_min.toFixed(1)}°C</p> 
            <p>Max: ${day.main.temp_max.toFixed(1)}°C</p> `
            
 
        })


        console.log(json)
    })