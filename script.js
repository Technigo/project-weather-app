const cityName = document.getElementById('city')
const temperature = document.getElementById('temperature')
const typeOfWeather = document.getElementById('typeOfWeather')
const minTemp = document.getElementById('min-temp')
const maxTemp = document.getElementById('max-temp') 

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
        console.log(filteredForecast)
        filteredForecast.forEach((element) => {
            minTemp.innerHTML = element.main.temp_min
            maxTemp.innerHTML = element.main.temp_max
            console.log(element)
        })

        console.log(json)
    })