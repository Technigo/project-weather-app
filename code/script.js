const apiUrlToday = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=3340cbe473b3001d4487c919d349bee2'
const apiUrlFiveDays = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=3340cbe473b3001d4487c919d349bee2'
const todaysWeatherSmall = document.getElementById('todays-weather-small')
const todaysWeather = document.getElementById('todays-weather')
const weeksWeather = document.getElementById('weeks-weather')
const cityHeader = document.getElementById('city')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')

fetch(apiUrlToday)
  .then((response) => {
    return (response.ok ? response.json() : 'Oops, something went wrong!')
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

    const weatherMain = data.weather[0].main

    switch (weatherMain) {
      case 'clear':
        document.body.style.backgroundColor = '#F7E9B9'
        document.body.style.color ='#2A5510'
        todaysWeather.innerHTML = `
          <img class="weather-image" src=${'./assets/sunglasses.svg'} alt=${'a pair of sunglasses'} />
          <h1>Get your sunnies on. ${data.name} is looking rather great today.</h1>
        `
        break
      case 'rain':
        document.body.style.backgroundColor = '#A3DEF7'
        document.body.style.color = '#164A68'
        todaysWeather.innerHTML = `
          <img class="weather-image" src=${'./assets/umbrella.svg'} alt=${'an umbrella'} />
          <h1>Don't forget your umbrella. It's wet in ${data.name}today.</h1>
        `
        break
      default:
      document.body.style.backgroundColor = '#F4F7F8'
      document.body.style.color = '#F47775'
      todaysWeather.innerHTML = `
          <img class="weather-image" src=${'./assets/cloud.svg'} alt=${'a cloud'} />
          <h1>Light a fire and get cosy. ${data.name} is looking grey today.</h1>
          
        `
    }

  })
  .catch(error => {
    todaysWeather.innerHTML = `
    <h1>${error}</h1>
    `
  })

fetch(apiUrlFiveDays)
  .then((response) => {
    return (response.ok ? response.json() : 'Oops, something went wrong!')
  })
  .then((data) => {
    
    const filteredForecast = data.list.filter(day => day.dt_txt.includes('12:00'))
    filteredForecast.forEach(day => {
      const forecastDay = new Date (day.dt_txt)
      weeksWeather.innerHTML += `
      <div class='weekdays-container'><div class='day-container'>${forecastDay.toLocaleString('en-us', {weekday: 'short'})}</div><div class='temp-container'>${day.main.temp.toFixed(0)} &#176C</div></div>
    ` 
    })
  })
  .catch(error => {
    weeksWeather.innerHTML = `
    <h1>${error}</h1>
    `
  })