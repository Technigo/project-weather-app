const apiDailyWeather = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=2ecf28ca2c29fa0578cb610c6c66c223'
const apiWeeklyWeather = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=2ecf28ca2c29fa0578cb610c6c66c223'
const city = document.getElementById('location')
const mainWeather = document.getElementById('mainWeather')

// fetch daily weather URL
fetch (apiDailyWeather)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
        //console.log(data.main.temp)
        // get todays weather in weatehr-array using map to iterate and find right object and then return the value
        const fetchedWeather = data.weather.map(
            (weatherData) => {
                //console.log(weatherData.main)
                return weatherData.main
            })

        // add function to get the time right here?

            city.innerHTML = `The wather in ${data.name}:`
            mainWeather.innerHTML = `${fetchedWeather}`
            dailyForecast.innerHTML = `${data.main.temp}`
    })