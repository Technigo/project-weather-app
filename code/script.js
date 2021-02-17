const apiUrlToday = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=3340cbe473b3001d4487c919d349bee2'
const apiUrlFiveDays = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=3340cbe473b3001d4487c919d349bee2'
const todaysWeatherSmall = document.getElementById('todays-weather-small')
const todaysWeather = document.getElementById('todays-weather')
const weeksWeather = document.getElementById('weeks-weather')
const cityHeader = document.getElementById('city')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')
// const weekdaysContainer = document.getElementById('weekdays-container')

fetch(apiUrlToday)
  .then((response) => {
    if (response.ok) {
      return response.json()
    } else {
      throw 'Oops, something went wrong!'
    }
  })
  .then((data) => {

    const sunrise = new Date (data.sys.sunrise * 1000).toLocaleTimeString('sv-SE', {
        hour: '2-digit', minute: '2-digit',
      })

    const sunset = new Date (data.sys.sunset * 1000).toLocaleTimeString('sv-SE', {
      hour: '2-digit', minute: '2-digit',
    })

    todaysWeatherSmall.innerHTML = `
      <p>${data.weather[0].description} | ${data.main.temp.toFixed(1)} °C (feels like ${data.main.feels_like.toFixed(1)})</p>
      <p>sunrise: ${sunrise}</p>
      <p>sunset: ${sunset}</p>
    `
    // sunrise.innerHTML = `
    //   ${new Date (data.sys.sunrise * 1000).toLocaleTimeString('sv-SE', {
    //   hour: '2-digit',
    //   minute: '2-digit',
    //   })}
    // `
    // sunset.innerHTML = `
    //   ${new Date (data.sys.sunset * 1000).toLocaleTimeString('sv-SE', {
    //   hour: '2-digit',
    //   minute: '2-digit',
    //   })}
    // `
    
    cityHeader.innerHTML = `
      ${data.name}
    `
  })
  .catch(error => {
    todaysWeather.innerHTML = `
    <h1>${error}</h1>
    `
  })

fetch(apiUrlFiveDays)
  .then((response) => {
    if (response.ok) {
      return response.json()
    } else {
      throw 'Oops, something went wrong!'
    }
  })
  .then((data) => {

    const filteredForecast = data.list.filter(day => day.dt_txt.includes('12:00'))
    filteredForecast.forEach(day => {
      const forecastDay = new Date (day.dt_txt)
      weeksWeather.innerHTML += `
      <div class='weekdays-container'><div class='day'>${forecastDay.toLocaleString('en-us', {weekday: 'short'})}</div><div class='temp-container'>${day.main.temp.toFixed(0)} &#176C</div></div>
    ` 
    })

  })
  .catch(error => {
    weeksWeather.innerHTML = `
    <h1>${error}</h1>
    `
  })