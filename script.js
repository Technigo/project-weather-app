const userLocation = document.getElementById('location')
const tempDegees = document.getElementById('tempDegrees')
const tempDescription = document.getElementById('tempDescription')
const tempFeelsLike = document.getElementById('tempFeelsLike')
const theCurrentIcon = document.getElementById('currentIcon');
const weatherBackground = document.getElementById('todaysWeather')
const minMax = document.getElementById('minMax')

// TODAYS WEATHER

fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=10c15495461885dfddf7c2f3846d4e30')
  .then((response) => {
    return response.json()
  })

  .then((json) => {
    console.log(json)
    userLocation.innerHTML = `${json.name}`
    tempDegrees.innerHTML = `${json.main.temp.toFixed(1)}°C`
    minMax.innerHTML = `Min: ${json.main.temp_min.toFixed(1)}°C | Max: ${json.main.temp_min.toFixed(1)}°C`
    tempFeelsLike.innerHTML += `${json.main.feels_like.toFixed(1)}°C`
    theCurrentIcon.innerHTML += `<img src="https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png"  alt="icon for weather" />`

    json.weather.forEach((weather) => {
      tempDescription.innerHTML = `${weather.description}`

    })

    // SUNSET AND SUNRISE TIME 
    let sunriseTime = new Date(json.sys.sunrise * 1000).toLocaleTimeString([], {
      hour: '2-digit', minute: '2-digit'
    })
    let sunsetTime = new Date(json.sys.sunset * 1000).toLocaleTimeString([], {
      hour: '2-digit', minute: '2-digit'
    })
    whenSunrise.innerHTML += `${sunriseTime}`
    whenSunset.innerHTML += `${sunsetTime}`
  })

//WEATHER FORECAST 

const handle5DayForecast = (json) => {
  const forecastDiv = document.getElementById('forecast')
  const dates = {}

  json.list.forEach((weather) => {
    const date = weather.dt_txt.split(' ')[0]
    if (dates[date]) {
      dates[date].push(weather)
    } else {
      dates[date] = [weather]
    }
  })

  Object.entries(dates).forEach((item, index) => {
    if (index === 0) {
      return
    }

    const date = item[0]
    const weatherValues = item[1]
    const temps = weatherValues.map((value) => value.main.temp)
    const minTemp = Math.min(...temps)
    const maxTemp = Math.max(...temps)
    const dates = new Date(item[0])
    const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const icons = weatherValues[4].weather[0].icon

    forecastDiv.innerHTML += `<div class="week_days">
    <div>${dayName[dates.getDay()]}</div> 
    <div><img src="https://openweathermap.org/img/wn/${icons}@2x.png" id="icon" alt="icons for weather" /></div>
    <div>${minTemp.toFixed(1)}°c</div>
    </div>`
  })
}
fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&appid=80c5dd84564bfbfbbae5184faea61c48&units=metric')
  .then((res) => res.json())
  .then(handle5DayForecast)

