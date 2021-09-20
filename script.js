const API_URL = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=7678391e67f390dcfc1cc2681209fd22'

const weatherContainer = document.getElementById("weather-container");

const fetchWeather = () => {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const temperature = Math.round(data.main.temp * 10) / 10
            //const sunrise = new Date(data.sys.sunrise * 1000).getHours().toLocaleString();
            const sunriseHours = new Date(data.sys.sunrise * 1000).getHours().toLocaleString();
            const sunriseMinutes = new Date(data.sys.sunrise * 1000).getMinutes().toLocaleString();
            const sunriseSeconds = new Date(data.sys.sunrise * 1000).getSeconds().toLocaleString();
            // console.log(sunrise)
            //const sunset = new Date(data.sys.sunset * 1000).toLocaleString();
            const sunsetHours = new Date(data.sys.sunset * 1000).getHours().toLocaleString();
            const sunsetMinutes = new Date(data.sys.sunset * 1000).getMinutes().toLocaleString();
            const sunsetSeconds = new Date(data.sys.sunset * 1000).getSeconds().toLocaleString();
            //console.log(data.sys.sunset )
            weatherContainer.innerHTML = `<h1>${data.name}</h1>`
            weatherContainer.innerHTML += `<h3>${temperature}</h3>`
            weatherContainer.innerHTML += `<h3>${data.weather[0].description}</h3>`
            weatherContainer.innerHTML += `<h3>Sunrise: ${sunriseHours}:${sunriseMinutes}:${sunriseSeconds}</h3>`
            weatherContainer.innerHTML += `<h3>Sunset: ${sunsetHours}:${sunsetMinutes}:${sunsetSeconds}</h3>`
        });
}

fetchWeather();