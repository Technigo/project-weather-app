//DOM selectors
const theCurrent = document.getElementById('current')
const theForecast = document.getElementById('forecast')
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
    //Creating the weather fields and populate them with data from current weather API
    weather.temp = (Math.round(json.main.temp * 10) / 10).toFixed(1)
    weather.city = json.name
    weather.id = json.weather[0].id
    weather.sunrise = new Date(json.sys.sunrise * 1000).toLocaleTimeString([], { timeStyle: 'short' })
    weather.sunset = new Date(json.sys.sunset * 1000).toLocaleTimeString([], { timeStyle: 'short' })
    weather.day = new Date(json.dt * 1000).getDay()
    //Building DOM for Current Weather
    printWeather()
  })

fetch(forecastWeatherAPI)
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    //Building array of single days 
    let index = 0
    while (index < json.list.length) {
      //Adding amount of used items to build day object to index to skip no 1 item but all items from that day
      index += createForecast(index, json)
    }
    printForecast()
  })

//Template for current weather section
const printWeather = () => {
  theCurrent.innerHTML = ` 
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

//Creating every single day and adding to array 
const createForecast = (index, json) => {
  //Extracting day from json
  let day = new Date(json.list[index].dt * 1000).getDay()
  //Creating min and max temperature from first item for that day
  let minTemp = json.list[index].main.temp_min
  let maxTemp = json.list[index].main.temp_max
  //Looping thru all item for that day 
  let i = 0;
  while ((index + i) < json.list.length && (new Date(json.list[index + i].dt * 1000).getDay()) === day) {
    //Finding minimum temperature
    if (minTemp > json.list[index + i].main.temp_min) {
      minTemp = json.list[index + i].main.temp_min
    }
    //Finding maximum temperature
    if (minTemp > json.list[index + i].main.temp_min) {
      minTemp = json.list[index + i].main.temp_min
    }
    i++
  }
  //Building object and adding it to array
  forecast.push({
    day: day,
    minTemp: (Math.round(minTemp * 10) / 10).toFixed(1),
    maxTemp: (Math.round(maxTemp * 10) / 10).toFixed(1),
    id: json.list[index+Math.floor(i/2)].weather[0].id // weather icon for that day is from middle of the day
  })
  //Returning how many items from list array we used to build that day object 
  return i
}

//Template for weather forecast section
const printForecast = () => {
  theForecast.innerHTML = `
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
