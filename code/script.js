// URL
const apiDailyWeather = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=2ecf28ca2c29fa0578cb610c6c66c223'
const apiWeeklyWeather = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=2ecf28ca2c29fa0578cb610c6c66c223'
// All the DOM selectors stored as short variables
const city = document.getElementById('location')
const mainWeather = document.getElementById('mainWeather')

// fetch daily weather
fetch (apiDailyWeather)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log("main api", data)
        //console.log(data.main.temp)

        // variable to round temperature
        const temp = data.main.temp
        const roundedTemp = temp.toFixed() // no decimal since () is empty
        //console.log(roundedTemp)

        // sunrise and sunset
        

        // get todays weather in weatehr-array using map to iterate and find right object and then return the value
        const fetchedWeather = data.weather.map(
            (weatherData) => {
            //console.log(weatherData.main)
            return weatherData.main
            })

        // add function to get the time right here?

            //inner HTML for main forcast section
            city.innerHTML = `The wather in ${data.name}:`
            mainWeather.innerHTML = `${fetchedWeather}`
            dailyForecast.innerHTML = `${roundedTemp}`
    })

    // fetch weekly weather
    fetch (apiWeeklyWeather)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log("weekly api",data)
        })