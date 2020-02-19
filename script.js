const temp = document.getElementById('temperature')
const cityName = document.getElementById('city')
const weatherDescription = document.getElementById('description')
const sunriseHour = document.getElementById('sunrise')
const sunsetHour = document.getElementById('sunset')
const weatherIcon = document.getElementById('weatherPic')
const weatherIconSmall = document.getElementById('weatherPicSmall')


fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm&units=metric&appid=daa63c3c6a7ab1c38288ee0bfde25241')
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
      todaysWeather.style.background = 'linear-gradient(#747d8c, #ced6e0)'
    } else if (json.weather[0].id < 804 && json.weather[0].id > 800) {
      //partly cloudy
      weatherPic.innerHTML = '<img src="cloudy.png">'
      todaysWeather.style.background = 'linear-gradient(#70a1ff, #4b6584)'
    } else if (json.weather[0].id < 532 && json.weather[0].id > 499) {
      //rain
      weatherPic.innerHTML = '<img src="rainy.png">'
      todaysWeather.style.background = 'linear-gradient(#2f3640, #7f8fa6)'
    } else if (json.weather[0].id < 623 && json.weather[0].id > 599) {
      //snow
      weatherPic.innerHTML = '<img src="snowy.png">'
      todaysWeather.style.background = 'linear-gradient( #f7f1e3, #d1d8e0)'
    } else if (json.weather[0].id === 800) {
      //clear/sunny
      weatherPic.innerHTML = '<img src="sun.png">'
      todaysWeather.style.background = 'linear-gradient( #9599E2,  #8BC6EC)'
    } else {
      weatherPic.innerHTML = ' '
      todaysWeather.style.background = 'linear-gradient( #9599E2,  #8BC6EC)'
    }
  })


fetch('http://api.openweathermap.org/data/2.5/forecast?q=Stockholm&units=metric&appid=daa63c3c6a7ab1c38288ee0bfde25241')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
    filteredForecast.forEach((day) => {
      const weekday = new Date(day.dt * 1000).toLocaleDateString('sv-SE', { weekday: 'long' })
      fiveDays.innerHTML += `<p>${weekday} ${day.main.temp.toFixed(0)}<sup>&#8451</sup></p>`

      if (day.weather[0].id === 800) {
        //clear/sunny
        weatherPicSmall.innerHTML += '<img src="sun.png">'
      } else if (day.weather[0].id === 804) {
        //clouds
        weatherPicSmall.innerHTML += '<img src="cloud.png">'
      } else if (day.weather[0].id < 532 && day.weather[0].id > 499) {
        //rain
        weatherPicSmall.innerHTML += '<img src="rainy.png">'
      } else if (day.weather[0].id < 623 && day.weather[0].id > 599) {
        //snow
        weatherPicSmall.innerHTML += '<img src="snowy.png">'
      } else if (day.weather[0].id < 804 && day.weather[0].id > 800) {
        //partly cloudy
        weatherPicSmall.innerHTML += '<img src="cloudy.png">'
      }
      else {
        weatherPicSmall.innerHTML += ' '
      }
    })
  })

