const StockholmAPI = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=1f53b6ca8e6cbcf1c51848ca6c257778'
const StockholmForecastAPI = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=1f53b6ca8e6cbcf1c51848ca6c257778'
const weatherContainer = document.getElementById('weatherContainer')
const forecastContainer = document.getElementById('forecastContainer')


console.log('API fetch starting') //can take away later

const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

fetch(StockholmAPI)
  .then((response) => {
    if (response.ok) {
      return response.json()
    } else {
      throw "Something went wrong"
    }
  })
  .then((data) => {
    const temp = data.main.temp
    const tempRounded = Math.round(temp * 10) / 10 
    const date = new Date((data.dt) * 1000);
    const sunriseDate = new Date((data.sys.sunrise) * 1000);
    const sunsetDate = new Date((data.sys.sunset) * 1000);
    const icon = 'http://openweathermap.org/img/wn/' + data.weather[0].icon +'@4x.png'
      weatherContainer.innerHTML += `<div>
        <div class="weather-today">
        <h2>Today's weather in: ${data.name}</h2> 
        </div>
        <div class="temp-icon">
        <div class="temp">
        <h1>${tempRounded}°<h1/>
        </div>
        <div class="icon">
        <img src="${icon}" alt="weather icon">
        </div>
        </div>
        <div class="weather-description">
        <h3>${data.weather[0].description}</h3>         
        <p>${date.toLocaleDateString('sv-SE', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</p>
        <p>${date.getHours()}:${date.getMinutes()}</p>
        </div>
        <div class="sunrise-sunset">
        <p>Sunrise: ${sunriseDate.getHours()}:${sunriseDate.getMinutes()}</p>
        <p>Sunset: ${sunsetDate.getHours()}:${sunsetDate.getMinutes()}</p>
        </div>
        </div>`
  }) 
  .catch(error => {
      weatherContainer.innerHTML = `${error}`
    })


fetch(StockholmForecastAPI)
  .then((response) => {
    if (response.ok) {
      return response.json()
    } else {
      throw "Something went wrong"
    } 
  })
  .then((data) => {
    console.log(data)
    const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00'))
      console.log(filteredForecast)

      filteredForecast.forEach((day) => {
        let temp = day.main.temp
        let tempRounded = Math.round(temp)

        let feelsLike = day.main.feels_like
        let feelsLikeRounded = Math.round(feelsLike)
        let icon = 'http://openweathermap.org/img/wn/' + day.weather[0].icon +'.png' 

        console.log(tempRounded, feelsLikeRounded)

        let nextDays = new Date(day.dt_txt)
        let weekdayInteger = nextDays.getDay()
        console.log(day.dt_txt)
        console.log(weekday[weekdayInteger])

        forecastContainer.innerHTML += `<div class="forecast-days">
        <div class="weekday">
        <p>${weekday[weekdayInteger]}<p>
        <div class="forecast-temp-feels-like">
        <img src="${icon}" alt="weather icon">
        <p>Temp: ${tempRounded}° </p>           
        <p>/ Feels like: ${feelsLikeRounded}°</p>      
        </div>
        </div>
        </div>
        `
      })
  })
  .catch(error => {
    forecastContainer.innterHTML = `<h1>${error}</h1>`
  })