const API_URL = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=7678391e67f390dcfc1cc2681209fd22'

const weatherContainer = document.getElementById("weather-container");

const fetchWeather = () => {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const temperature = Math.round(data.main.temp * 10) / 10
            weatherContainer.innerHTML = `<h1>${data.name}</h1>`
            weatherContainer.innerHTML += `<h3>${temperature}</h3>`
            weatherContainer.innerHTML += `<h3>${data.weather[0].description}</h3>`
        });
}

fetchWeather();