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
    return response.json()
  })
  .then((data) => {

    todaysWeatherSmall.innerHTML = `
    <p>${data.weather[0].description} | ${Math.round(data.main.temp * 10) / 10} °C (feels like ${Math.round(data.main.feels_like * 10) / 10}</p>
    `
    sunrise.innerHTML = `
    ${new Date (data.sys.sunrise * 1000).toLocaleTimeString('sv-SE', {
    hour: '2-digit',
    minute: '2-digit',
    })}
    `
    sunset.innerHTML = `
    ${new Date (data.sys.sunset * 1000).toLocaleTimeString('sv-SE', {
    hour: '2-digit',
    minute: '2-digit',
    })}
    `
    cityHeader.innerHTML = `
    ${data.name}
    `
  })

fetch(apiUrlFiveDays)
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    let noonWeather = data.list.filter(day => day.dt_txt.includes('12:00'))
    noonWeather.forEach(day => {
      console.log(day.main.temp_min)
    })

    weeksWeather.innerHTML = `
    
    `
  })