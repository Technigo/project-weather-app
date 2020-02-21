const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=d563e29445b827968160d0c39a96cdcd'
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=d563e29445b827968160d0c39a96cdcd'
const weatherSection = document.getElementById('weatherSection')
const weatherContainer = document.getElementsByClassName('weatherContainer')
const weatherIcon = document.getElementsByClassName('weatherIcon')


//------------------Weather----------------------------//
fetch(weatherUrl)
  .then(res => res.json())

  .then(weatherJson => {
    console.log(weatherJson)
    //console.log(weather.name)


    //------------------Sunrise/down----------------------------//


    const timecodeSunrise = weatherJson.sys.sunrise
    const timecodeSunset = weatherJson.sys.sunset

    let sunrise = new Date(timecodeSunrise * 1000)
    let sunset = new Date(timecodeSunset * 1000)

    let sunriseTime = sunrise.toLocaleTimeString('sv', {
      timeStyle: 'short',
      hour12: false
    })
    let sunsetTime = sunset.toLocaleTimeString('sv', {
      timeStyle: 'short',
      hour12: false
    })

    //------------------Main Weather----------------------------//

    weatherSection.innerHTML = `
      <h1 class="weather-header">The weather in: ${weatherJson.name}</h1>
      <p class="temperature">temp: ${weatherJson.main.temp.toFixed(1)}</p>
      <div class="sun"><p >sunrise: ${sunriseTime}</p><p>sunset: ${sunsetTime}</p></div>
      `

    //_______________CODE NOT WORKING!!!______________________________//
    if (weather.main.temp < 10) {
      weatherContainer.classList.toggle("cold")
    } else {
      weatherContainer.classList.toggle("warm")
    }
    //___________________________________________________________//


    //------------------Weather icons----------------------------//


    //_______________CODE NOT WORKING!!!________________________//
    const rainImg = {
      image: './assets/rain.png'
    }
    const clearImg = {
      image: './assets/sun.png'
    }
    const snowImg = {
      image: './assets/snow.png'
    }
    const thunderImg = {
      image: './assets/thunder.png'
    }
    const cloudImg = {
      image: './assets/clouds.png'
    }

    const whatKindOfWeather = () => {
      if (weatherJson.weather[0].main === 'Clouds') {
        weatherIcon.innerHTML = `<img src="${cloudImg.image} >`
      } else if (weatherJson.weather[0].main === 'Clouds') {
        weatherIcon.innerHTML = `<img src="${cloudyImg.image}>`
      } else if (weatherJson.weather[0].main === 'Clear') {
        weatherIcon.innerHTML = `<img src="${clearImg.image}>`
      } else if (weatherJson.weather[0].main === 'Snow') {
        weatherIcon.innerHTML = `<img src="${snowImg.image}>`
      } else if (weatherJson.weather[0].main === 'Rain') {
        weatherIcon.innerHTML = `<img src="${rainImg.image}>`
      }
    }

    whatKindOfWeather()
  })
//_____________________________________________________//




//------------------Forcast----------------------------//

fetch(forecastUrl)
  .then((respons) => {
    return respons.json()
  })
  .then((json) => {
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
    console.log(filteredForecast)

    filteredForecast.forEach(day => {

      const weekday = new Date(day.dt_txt.replace())
      const weekdayName = weekday.toLocaleDateString('en-GB', {
        weekday: 'long'
      })
      console.log(weekdayName)
      const forecastTemp = (day.main.temp)
      const weatherSection = document.getElementById('weatherSection')
      weatherSection.innerHTML +=
        `<section id="day-temp">
        <div id="day"><p>${weekdayName}</p></div>
        <div id="temp"><p>${forecastTemp.toFixed(1)}</p></div>
        </section>`

    })
  })