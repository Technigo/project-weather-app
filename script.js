const API_KEY = "f54ca9831c8974c87fd4826fae420a1a"
const API_URL = `http://api.openweathermap.org/data/2.5/weather?q=Malmo,Sweden&units=metric&APPID=${API_KEY}`


const container = document.getElementById('weather')

fetch(API_URL)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        container.innerHTML = `<h1>It is ${json.main.temp.toFixed(1)} in ${json.name} today.</h1>`
    
        json.weather.forEach((weather) => {
        container.innerHTML += `<p>It's a ${weather.description}</p>`
        })
     }) 