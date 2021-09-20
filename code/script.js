//DOMs
const WEATHER_API = ('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=5000cd66a9090b2b62f53ce8a59ebd9e')
const weatherContainer = document.getElementById('weather-container')



fetch(WEATHER_API)
    .then((res) => res.json())
    .then((data) => {
        weatherContainer.innerHTML = `
        <h1>${data.name}</h1>
        <h2>${Math.round(data.main.temp * 10) / 10} °C</h2>
        <h3>${data.weather.map(item => item.description)}
    `
    })
    .catch((error) => console.error('AAAAAAH!', error))
    .finally(() => console.log('YAY!'))

