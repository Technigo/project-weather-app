//DOM selectors
const widgetCurrent = document.getElementById('current')
const widgetForecast = document.getElementById('forecast')
//Data storage
const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
const weather = {}
const forecast = []
//APIs links
const currentWeatherAPI = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=1414a6efca06b1a059358146eb43c6cd'
const forecastWeatherAPI = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=1e07f71700d3a03e9b1f8dce52359602'

fetch(currentWeatherAPI)
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    weather.temp = (Math.round(json.main.temp * 10) / 10).toFixed(1)
    weather.city = json.name
    weather.id = json.weather[0].id
    weather.sunrise = new Date(json.sys.sunrise * 1000).toLocaleTimeString([], { timeStyle: 'short' })
    weather.sunset = new Date(json.sys.sunset * 1000).toLocaleTimeString([], { timeStyle: 'short' })
    weather.day = new Date(json.dt * 1000).getDay()
    printWeather()
  })

fetch(forecastWeatherAPI)
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    let index = 0
    while (index < json.list.length) {
      index += createForecast(index, json)
    }
    printForecast()
  })

const printWeather = () => {
  widgetCurrent.innerHTML = ` 
    <div class="current-top">
      <div class="current-city">
        <h2>${weather.city}</h2>
        <p>${days[weather.day]}</p>
      </div>
      <div class="current-icon">
        <i class="wi wi-owm-${weather.id}"></i>
      </div>
    </div>
    <div class="current-details">
      <div class="current-temperature">
        ${weather.temp}<i class="wi wi-celsius"></i>
      </div>
      <div class="current-sun">
        <span><i class="wi wi-sunrise"></i> ${weather.sunrise}</span>
        <span><i class="wi wi-sunset"></i> ${weather.sunset}</span>
      </div>
    </div>      
    </div>
  `
}

const createForecast = (index, json) => {
  let day = new Date(json.list[index].dt * 1000).getDay()
  let minTemp = json.list[index].main.temp_min
  let maxTemp = json.list[index].main.temp_max
  let i = 0;
  while ((index + i) < json.list.length && (new Date(json.list[index + i].dt * 1000).getDay()) === day) {
    if (minTemp > json.list[index + i].main.temp_min) {
      minTemp = json.list[index + i].main.temp_min
    }
    if (minTemp > json.list[index + i].main.temp_min) {
      minTemp = json.list[index + i].main.temp_min
    }
    i++
  }
  forecast.push({
    day: day,
    minTemp: (Math.round(minTemp * 10) / 10).toFixed(1),
    maxTemp: (Math.round(maxTemp * 10) / 10).toFixed(1),
    id: json.list[index+Math.floor(i/2)].weather[0].id
  })
  return i
}

const printForecast = () => {
  widgetForecast.innerHTML = `
    ${forecast.map((day) => {
      return `
        <div class="day">
          <div class="day-name">
            <h4>${days[day.day]} <i class="wi wi-owm-${day.id}"></i></h4>
          </div>
          <div class="temperatures">
            <div class="minimum">
              <span>${day.minTemp}<i class="wi wi-celsius"></i></span>
            </div> 
            <div class="maximum">           
              <span>${day.maxTemp}<i class="wi wi-celsius"></i></span>
            </div>
          </div>
        </div>`
    }).join("")}
  `
}
