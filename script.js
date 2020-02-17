// const container = document.getElementById("main");
// const launchCountHeader = document.getElementById("launchCount");

const apiCurrent = 'http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&appid=8174b34f755933df367987fbb0eefd50';
const apiForecast = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=8174b34f755933df367987fbb0eefd50';
const weatherCurrent = document.getElementById("weather-current");
const weatherForecast = document.getElementById("weather-forecast");
const city = document.getElementById("city");
const temperatureMin = document.getElementById("temperature-min");
const temperatureMax = document.getElementById("temperature-max");
const description = document.getElementById("description-today");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const fiveDayForecast = document.getElementById("five-day-forecast");
const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']



fetch(apiCurrent)
  .then((response) => {
    return response.json()
  .then((json) => {
    console.log(json)
    console.log(weather.city = json.name)
    console.log(weather.temperatureMin = json.main.temp_min)
    console.log(weather.temperatureMax = json.main.temp_max)
    console.log(weather.description = json.weather[0].description)
    console.log(weather.main = json.weather[0].main)
    console.log(weather.sunrise = new Date(json.sys.sunrise * 1000).toLocaleTimeString([], { timeStyle: 'short' }))
    console.log(weather.sunset = new Date(json.sys.sunset * 1000).toLocaleTimeString([], { timeStyle: 'short' }))
    city.innerHTML = weather.city
    temperatureMin.innerHTML += `Min ${weather.temperatureMin} °C`
    temperatureMax.innerHTML += `Max ${weather.temperatureMax} °C`
    description.innerHTML += `${weather.main} (${weather.description})`
    sunrise.innerHTML += `Sunrise: ${weather.sunrise} o'clock`
    sunset.innerHTML += `Sunset: ${weather.sunset} o'clock`
  })
  }) 


fetch(apiForecast)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
      console.log(filteredForecast)
      filteredForecast.forEach((day) => {
        const date = new Date(day.dt * 1000)
        let dayName = week[date.getDay()]
        console.log(dayName)
        fiveDayForecast.innerHTML += `<p>${dayName}: ${day.main.temp} °C</p>`
    })
    })

