const container = document.getElementById('myWeather')

fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=82792eb4459b56038cc8a4b53d2f5c3d')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        container.innerHTML = `<h1>The weather in ${json.name} today is: ${json.weather[0].main} Temp: ${Math.round(json.main.temp)} degrees with a humidity of:${json.main.humidity} percent Sunrise</h1>`

    })