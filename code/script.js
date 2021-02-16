const apiDailyWeather = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=2ecf28ca2c29fa0578cb610c6c66c223'
const apiWeeklyWeather = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=2ecf28ca2c29fa0578cb610c6c66c223'
const mainWeather = document.getElementById('mainWeather')

fetch (apiDailyWeather)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
        const fetchedWeather = data.weather.map(
            (weatherData) => {
                //console.log(weatherData.main)
                return weatherData.main
            })
            mainWeather.innerHTML = `${fetchedWeather}`
    })