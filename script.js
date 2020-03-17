const temp = document.getElementById('temperature')
const cityName = document.getElementById('city')
const weatherDescription = document.getElementById('description')
const sunriseHour = document.getElementById('sunrise')
const sunsetHour = document.getElementById('sunset')
const weatherIcon = document.getElementById('weatherPic')
const weatherIconSmall = document.getElementById('weatherPicSmall')
const fiveDayForcastContainer = document.getElementById('fiveDayForcast')


// TODAYS WEATHER SECTION

fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm&units=metric&appid=daa63c3c6a7ab1c38288ee0bfde25241')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    temperature.innerHTML = `${json.main.temp.toFixed(0)}<sup>&#8451</sup>`
    city.innerHTML = json.name
    description.innerHTML = json.weather[0].description
    const sunriseTime = new Date(json.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    sunrise.innerHTML = `sunrise ${sunriseTime}`
    const sunsetTime = new Date(json.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    sunset.innerHTML = `sunset ${sunsetTime}`

    if (json.weather[0].id === 804) {
      //clouds
      weatherPic.innerHTML = '<img src="cloud.png">'
      todaysWeather.classList.toggle('clouds')
    } else if (json.weather[0].id < 804 && json.weather[0].id > 800) {
      //partly cloudy
      weatherPic.innerHTML = '<img src="cloudy.png">'
      todaysWeather.classList.toggle('partlyCloudy')
    } else if (json.weather[0].id < 532 && json.weather[0].id > 499) {
      //rain
      weatherPic.innerHTML = '<img src="rainy.png">'
      todaysWeather.classList.toggle('rain')
    } else if (json.weather[0].id < 623 && json.weather[0].id > 599) {
      //snow
      weatherPic.innerHTML = '<img src="snowy.png">'
      todaysWeather.classList.toggle('snow')
    } else if (json.weather[0].id === 800) {
      //clear/sunny
      weatherPic.innerHTML = '<img src="sun.png">'
      todaysWeather.classList.toggle('sun')
    } else {
      weatherPic.innerHTML = ' '
      todaysWeather.classList.toggle('other')
    }
  })

// FIVE DAYS FORECAST

fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm&units=metric&appid=daa63c3c6a7ab1c38288ee0bfde25241')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
    filteredForecast.forEach((day) => {



      const weekday = new Date(day.dt * 1000).toLocaleDateString('sv-SE', { weekday: 'long' })
      const temperature = day.main.temp.toFixed(0)
      let weatherIcon

      if (day.weather[0].id === 800) {
        //clear/sunny
        weatherIcon = 'sun.png'
      } else if (day.weather[0].id === 804) {
        //clouds
        weatherIcon = 'cloud.png'
      } else if (day.weather[0].id < 532 && day.weather[0].id > 499) {
        //rain
        weatherIcon = 'rainy.png'
      } else if (day.weather[0].id < 623 && day.weather[0].id > 599) {
        //snow
        weatherIcon = 'snowy.png'
      } else if (day.weather[0].id < 804 && day.weather[0].id > 800) {
        //partly cloudy
        weatherIcon = 'cloudy.png'
      }
      else {
        weatherIcon = ' '
      }

      fiveDayForcastContainer.innerHTML += `
        <div>
          <p>${weekday} ${temperature}<sup>&#8451</sup></p>
          <img src="${weatherIcon}" alt="Idag är det ${temperature} grader">
        </div>
      `
    })
  })

