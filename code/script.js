const placeContainer = document.getElementById('place')
const descriptionTemperatureContainer = document.getElementById('description-and-temperature')
const sunriseContainer = document.getElementById('sunrise')
const sunsetContainer = document.getElementById('sunset')
const forecastContainer = document.getElementById('forecast-container')
const forecastTemperature = document.getElementById('forecast-temperature')
const forecastDay = document.getElementById('forecast-day')
const weatherIcon = document.getElementById('weather-icon')
const bigContainer = document.getElementById('big-container')
const forecastBorder = document.getElementById('forecast')

const sunny = {
  backgroundColor: 'linear-gradient(315deg, #e8af39 0%, #f9d976 74%)',
  color: '#2A5510',
  icon: 'icons/sunglasses.svg',
}
const cloudy = {
  backgroundColor: 'linear-gradient(315deg, #d9d9d9 0% , #f6f2f2 74%)',
  color: '#F47775',
  icon: 'icons/cloud.svg',
  border: 'dashed 1px #F47775',
}

const rainy = {
  backgroundColor: 'linear-gradient(315deg, #b1bfd8 0%, #6782b4 74%)',
  color: '#164A68',
  icon: 'icons/umbrella.svg',
}

const snowy = {
  backgroundColor: 'linear-gradient(315deg, #aee1f9 0%, #f6ebe6 74%)',
  color: '#376072',
  icon: 'icons/snow.svg',
}

const thunderstorm = {
  backgroundColor: 'linear-gradient(315deg, #485461 0%, #28313b 74%);',
  color: '#fbe65e',
  icon: 'icons/electricity.svg',
}

const otherWeather = {
  icon: 'icons/weather.svg'
}


fetch('http://api.openweathermap.org/data/2.5/weather?q=Malmoe,Sweden&units=metric&APPID=224e607ac22e4aef9578da3aaa6f0b85')
  .then((response) => {
    return response.json()
  })
  .then((json) => {

    descriptionTemperatureContainer.innerHTML = `<h3>${json.weather[0].description} | ${json.main.temp.toFixed(1)}°C</h3>`

    const sunrise = new Date(json.sys.sunrise * 1000)
    const sunriseTime = sunrise.toLocaleTimeString([], {
      timeStyle: 'short'
    });

    sunriseContainer.innerHTML = `<h3>sunrise ${sunriseTime}</h3>`

    const sunset = new Date(json.sys.sunset * 1000)
    const sunsetTime = sunset.toLocaleTimeString([], {
      timeStyle: 'short'
    });

    sunsetContainer.innerHTML = `<h3>sunset ${sunsetTime}</h3>`

    if (json.weather[0].main === "Rain" || json.weather[0].main === "Drizzle") {
      // This styling could maybe be put in a variable in some way or toggle classes instead and do the styling in different classes in the css. I don't know which is better. 
      placeContainer.innerHTML = `<h1>Don't forget your umbrella, it is wet in ${json.name}.</h1>`
      weatherIcon.src = rainy.icon
      bigContainer.style.background = rainy.backgroundColor
      bigContainer.style.color = rainy.color

    } else if (json.weather[0].main === "Clear") {
      placeContainer.innerHTML = `<h1>Get your sunnies on. ${json.name} is looking rather great today.</h1>`
      weatherIcon.src = sunny.icon
      bigContainer.style.background = sunny.backgroundColor
      bigContainer.style.color = sunny.color

    } else if (json.weather[0].main === "Clouds") {
      placeContainer.innerHTML = `<h1>Get cosy. ${json.name} is looking grey today.</h1>`
      weatherIcon.src = cloudy.icon
      bigContainer.style.backgroundImage = cloudy.backgroundColor
      bigContainer.style.color = cloudy.color
      forecastContainer.style.borderBottom = cloudy.border

    } else if (json.weather[0].main === "Snow") {
      placeContainer.innerHTML = `<h1>Put on a scarf. It is snowing in ${json.name} today.</h1>`
      weatherIcon.src = snowy.icon
      bigContainer.style.backgroundImage = snowy.backgroundColor
      bigContainer.style.color = snowy.color

    } else if (json.weather[0].main === "Thunderstorm") {
      placeContainer.innerHTML = `<h1>Stay inside, there is thunder in ${json.name} today.</h1>`
      weatherIcon.src = thunderstorm.icon
      bigContainer.style.backgroundImage = thunderstorm.backgroundColor
      bigContainer.style.color = thunderstorm.color

    } else {
      placeContainer.innerHTML = `<h1>This is today's weather in ${json.name}.</h1>`
    }
  })


fetch('https://api.openweathermap.org/data/2.5/forecast?q=Malmo,Sweden&units=metric&APPID=224e607ac22e4aef9578da3aaa6f0b85')
  .then((response) => {
    return response.json()
  })
  .then((json) => {

    const filteredForecast = json.list.filter(item => item.dt_txt.includes('09:00'))

    filteredForecast.forEach((weatherForecast) => {

      let day = new Date(weatherForecast.dt * 1000).toLocaleDateString('en-US', {
        weekday: 'short'
      });
      let temperatureDay = weatherForecast.main.temp.toFixed(1)

      // I should've been able to just add the h2 but I could not make the styling work if I only added the h2s inside an already made div in the HTML.
      forecastContainer.innerHTML += `<div class="forecast"><h2>${day.toLowerCase()}</h2><h2>${temperatureDay}°</h2></div>`

    });

  })