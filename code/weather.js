// Week array
const week = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']

// DOM
const city = document.getElementById("city");
const temp = document.getElementById("temp");
const feels = document.getElementById("feels")
const sunrise = document.getElementById("sunrise")
const sunset = document.getElementById("sunset")
const fiveDayForecast = document.getElementById("fiveDayForecast")
const londonWeatherToday = document.getElementById("london")
const barcelonaWeatherToday = document.getElementById("barcelona")
const osloWeatherToday = document.getElementById("oslo")
const weatherIcon = document.getElementById("whatWeather")

// Icon pics
const cold = "img/snowy.png"
const both = "img/semi.png"
const warm = "img/sunny.png"


// API links with API keys
const weatherNow = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=01b7bdc37404b6f3860ddce923c61a11"
const weatherForecast = "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=01b7bdc37404b6f3860ddce923c61a11"
const londonWeather = "https://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&APPID=01b7bdc37404b6f3860ddce923c61a11"
const barcelonaWeather = "https://api.openweathermap.org/data/2.5/weather?q=Barcelona,esp&units=metric&APPID=01b7bdc37404b6f3860ddce923c61a11"
const osloWeather = "https://api.openweathermap.org/data/2.5/weather?q=Oslo&units=metric&APPID=01b7bdc37404b6f3860ddce923c61a11"


// Todays weather local
fetch(weatherNow)
  .then(response => {
    return response.json()
  
  .then(json => {
    weather.sunrise = new Date(json.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    weather.sunset = new Date(json.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    weather.temp = (Math.round(json.main.temp * 10) / 10)
    weather.feels_like = (Math.round(json.main.feels_like * 10) / 10)
    weather.city = json.name
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

// 5 day forecast local
fetch(weatherForecast) 
  .then(response => {
    return response.json()

  .then(json => {
    console.log(json)
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))

    filteredForecast.forEach(day => {
      const date = new Date(day.dt * 1000)
      let newDay = date.getDay()
      let whatDay = week[newDay]
      let temperature = (Math.round(day.main.temp * 10) / 10)
      let feelsLike = (Math.round(day.main.feels_like * 10) / 10)
      
      fiveDayForecast.innerHTML += `<p>${whatDay}: ${temperature}°C // feels like: ${feelsLike}°C` 
      })
    })
  })
  


// Forecasting three extra cities - London, Barcelona, Oslo
fetch(londonWeather)
  .then(response => {
    return response.json()

  .then(json => {
    weather.temp = (Math.round(json.main.temp * 10) / 10)
    weather.feels_like = (Math.round(json.main.feels_like * 10) / 10)
    let nextCity = json.name

    londonWeatherToday.innerHTML = `<p>${nextCity}: ${weather.temp}°C </p>`
    })
  })

  fetch(barcelonaWeather)
  .then(response => {
    return response.json()

  .then(json => {
    weather.temp = (Math.round(json.main.temp * 10) / 10)
    weather.feels_like = (Math.round(json.main.feels_like * 10) / 10)
    let nextCity = json.name

    barcelonaWeatherToday.innerHTML = `<p>${nextCity}: ${weather.temp}°C</p>`
    })
  })

  fetch(osloWeather)
  .then(response => {
    return response.json()

  .then(json => {
    weather.temp = (Math.round(json.main.temp * 10) / 10)
    weather.feels_like = (Math.round(json.main.feels_like * 10) / 10)
    let nextCity = json.name

    osloWeatherToday.innerHTML = `<p>${nextCity}: ${weather.temp}°C</p>`
    })
  })


  
// Animation for weather icon
function myIcon() {
  var elem = document.getElementById("whatWeather")
  var pos = 0
  var id = setInterval(frame, 10)
  function frame() {
    if (pos == 200) {
      clearInterval(id)
    } else {
      pos++
      elem.style.top = pos + 'px'
      elem.style.right = pos + 'px'
    }
  }
}
myIcon()