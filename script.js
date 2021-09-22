const cityName = document.getElementById('city')
const temperature = document.getElementById('temperature')
const typeOfWeather = document.getElementById('typeOfWeather')
const mainIcon = document.getElementById('main-icon')

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=147b874875d53e0e9f84cbacd0567b99'
    fetch(API_LINK)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        cityName.innerHTML = json.name
        mainIcon.src = `./`
        temperature.innerHTML = `${json.main.temp.toFixed(1)} °C`
        typeOfWeather.innerHTML = json.weather[0].description
        console.log(json)
    })


    