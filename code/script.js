console.log('hej')

const dailyWeather = document.getElementById('dailyWeather')
const greeting = document.getElementById('greeting')
const forecast = document.getElementById('forecast')

 const API_URLD = ('http://api.openweathermap.org/data/2.5/weather?q=Berlin,de&APPID=d423e9bdbd74d4fcdd3804322b8767eb')
 const API_URLF = ('https://api.openweathermap.org/data/2.5/forecast?q=Berlin,de&APPID=d423e9bdbd74d4fcdd3804322b8767eb')
    // First API - gives us Daily weather
    fetch(API_URLD)
    // fetch('http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=d423e9bdbd74d4fcdd3804322b8767eb')
    .then((res) => res.json())
    .then((json) => {
        // console.log('data', data)
        console.log(json.main.temp)
        console.log(json.weather[0].main)
        console.log(json.sys.sunrise)
        console.log(json.sys.sunset)
    })

    // Second API - gives us 5 days forcast
    fetch(API_URLF)
    .then((res) => res.json())
    .then((data) => {
        console.log('data', data)
        // console.log(json.main.temp)
        // console.log(json.weather[0].main)
        // console.log(json.sys.sunrise)
        // console.log(json.sys.sunset)
    })

   

 