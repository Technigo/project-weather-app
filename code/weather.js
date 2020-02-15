// My variables
const forecast = []
const weather = {}
const city = document.getElementById("city");
const temp = document.getElementById("temp");
const feels = document.getElementById("feels")
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const week = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']
const forecastDiv = document.getElementById('weekday')
const fiveDayForecast = document.getElementById("fiveDayForecast")
const weatherIcon = document.getElementById("whatWeather")
const cold = "img/Group16.png"
const both = "img/Group34.png"
const warm = "img/Group37.png"



// My API links with API keys
const weatherNow = "http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=01b7bdc37404b6f3860ddce923c61a11"
const weatherForecast = "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=01b7bdc37404b6f3860ddce923c61a11"


// Todays weather 
fetch(weatherNow)
  .then(response => {
    return response.json()
  
  .then(json => {
    console.log(json)
    console.log(weather.sunrise = new Date(json.sys.sunrise * 1000).toLocaleTimeString([], { timeStyle: 'short' }))
    console.log(weather.sunset = new Date(json.sys.sunset * 1000).toLocaleTimeString([], { timeStyle: 'short' }))
    console.log(weather.temp = (Math.round(json.main.temp * 10) / 10))
    console.log(weather.feels_like = (Math.round(json.main.feels_like * 10) / 10))
    console.log(weather.city = json.name)
    city.innerHTML = weather.city
    temp.innerHTML = weather.temp
    feels.innerHTML = weather.feels_like
    sunrise.innerHTML = weather.sunrise
    sunset.innerHTML = weather.sunset

    if(weather.temp > 5) {
        document.getElementById("whatWeather").src = warm
    } else if(weather.temp > 0) {
        document.getElementById("whatWeather").src = both
    } else {
        document.getElementById("whatWeather").src = cold
    }
  })

  })

// 5 day forecast
fetch(weatherForecast) 
  .then(response => {
    return response.json()

  .then(json => {
    console.log(json)
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
    console.log(filteredForecast)
    
    filteredForecast.forEach(day => {
      let temperature = (Math.round(day.main.temp * 10) / 10)
      let feelsLike = (Math.round(day.main.feels_like * 10) / 10)
      const date = new Date(day.dt * 1000)
      let whatDay = week[date.getDay()]
      console.log(whatDay)
      fiveDayForecast.innerHTML += `<p>${whatDay}: ${temperature}°C // feels like: ${feelsLike}°C`
  })
  })
  })
  

  