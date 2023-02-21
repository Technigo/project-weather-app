const API = "http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=0885d110db76ae5dbaae0c2672772fdf"

//DOM Selectors
const temperature = document.getElementById("temperature")
const city = document.getElementById("city")
const weatherDescription = document.getElementById("weather-description")
const sunrise = document.getElementById("sunrise")
const sunset = document.getElementById("sunset")



fetch(API)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        //temperature
        let rawTemp = json.main.temp 
        let roundedTemp = rawTemp.toFixed(0)
        temperature.innerHTML = `<h1>${roundedTemp}&deg;C</h1>`
        //city
        let currentCity = json.name
        city.innerHTML = `<h2>${currentCity}</h2>`
        //weather description
        let weatherDes = json.weather.map((element) => (element.weather.description))
        weatherDescription.innerHTML = `<h2>${weatherDes}</h2>`
    })

    