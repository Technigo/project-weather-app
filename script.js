const temperature = document.getElementById('temperature')
const city = document.getElementById('city')
const description = document.getElementById('description')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')
const weatherPic = document.getElementById('weatherPic')


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

    let weatherIcon
    if (json.weather[0].id === 804) {
      //clouds
      weatherIcon = '<img src="cloud.png"></img>'
    } else if (json.weather[0].id < 804 && json.weather[0].id > 800) {
      //partly cloudy
      weatherIcon = '<img src="cloudy.png"></img>'
    } else if (json.weather[0].id < 532 && json.weather[0].id > 499) {
      //rain
      weatherIcon = '<img src="rainy.png"></img>'
    } else if (json.weather[0].id < 623 && json.weather[0].id > 599) {
      //snow
      weatherIcon = '<img src="snowy.png"></img>'
    } else if (json.weather[0].id === 800) {
      //clear/ sunny
      weatherIcon = '<img src="sun.png"></img>'
    } else {
      weatherIcon = ' '
    }
    weatherPic.innerHTML = `${weatherIcon}`
  })


fetch('http://api.openweathermap.org/data/2.5/forecast?q=Stockholm&units=metric&appid=daa63c3c6a7ab1c38288ee0bfde25241')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '00:00'))
    filteredForecast.forEach((day) => {
      const days = new Date(day.dt * 1000).toLocaleDateString('sv-SE', { weekday: 'long' })
      fiveDays.innerHTML += `<p>${days} ${day.main.temp.toFixed(0)}<sup>&#8451</sup></p>`
    })
  })

