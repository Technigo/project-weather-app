// const apiKey = "c2889b12ee617ea787319a19a98a5906"

const city = 'Toronto, Canada'
const cityName = document.getElementById('city')
const currentWeather = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=c2889b12ee617ea787319a19a98a5906`
const weatherForecast = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=c2889b12ee617ea787319a19a98a5906`

//Fetch with JSON
fetch(currentWeather)
    .then((response) => {
        return response.json()
    })
    .then((theSix) => {
        console.log(theSix)
        cityName.innerHTML = city
    })