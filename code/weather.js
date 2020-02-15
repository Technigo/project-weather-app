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
const londonWeatherToday = document.getElementById("london")
const barcelonaWeatherToday = document.getElementById("barcelona")
const weatherIcon = document.getElementById("whatWeather")
const cold = "img/snowy.png"
const both = "img/semi.png"
const warm = "img/sunny.png"



// My API links with API keys
const weatherNow = "http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=01b7bdc37404b6f3860ddce923c61a11"
const weatherForecast = "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=01b7bdc37404b6f3860ddce923c61a11"
const londonWeather = "http://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&APPID=01b7bdc37404b6f3860ddce923c61a11"
const barcelonaWeather = "http://api.openweathermap.org/data/2.5/weather?q=Barcelona,esp&units=metric&APPID=01b7bdc37404b6f3860ddce923c61a11"


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
  

// const londonWeather = "http://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&APPID=01b7bdc37404b6f3860ddce923c61a11"

fetch(londonWeather)
  .then(response => {
    return response.json()

  .then(json => {
    console.log(json)
    console.log(weather.sunrise = new Date(json.sys.sunrise * 1000).toLocaleTimeString([], { timeStyle: 'short' }))
    console.log(weather.sunset = new Date(json.sys.sunset * 1000).toLocaleTimeString([], { timeStyle: 'short' }))
    console.log(weather.temp = (Math.round(json.main.temp * 10) / 10))
    console.log(weather.feels_like = (Math.round(json.main.feels_like * 10) / 10))
    let nextCity = json.name

    londonWeatherToday.innerHTML = `<p>${nextCity}: ${weather.temp}°C // feels like: ${weather.feels_like}°C</p>`
  })
  })

  fetch(barcelonaWeather)
  .then(response => {
    return response.json()

  .then(json => {
    console.log(json)
    console.log(weather.sunrise = new Date(json.sys.sunrise * 1000).toLocaleTimeString([], { timeStyle: 'short' }))
    console.log(weather.sunset = new Date(json.sys.sunset * 1000).toLocaleTimeString([], { timeStyle: 'short' }))
    console.log(weather.temp = (Math.round(json.main.temp * 10) / 10))
    console.log(weather.feels_like = (Math.round(json.main.feels_like * 10) / 10))
    let nextCity = json.name

    barcelonaWeatherToday.innerHTML = `<p>${nextCity}: ${weather.temp}°C // feels like: ${weather.feels_like}°C</p>`
  })
  })

  function myIcon() {
    var elem = document.getElementById("whatWeather");   
    var pos = 0;
    var id = setInterval(frame, 10);
    function frame() {
      if (pos == 200) {
        clearInterval(id);
      } else {
        pos++; 
        elem.style.top = pos + 'px'; 
        elem.style.right = pos + 'px'; 
      }
    }
  }
  myIcon()