const city = document.querySelector('#city')
const temperature = document.querySelector('#temperature')
const description = document.querySelector('#description')
const wind = document.querySelector('#wind')
const sunrise = document.querySelector('#sunrise')
const sunset = document.querySelector('#sunset')
const forecast = document.querySelector('#forecast')


const timeFormat = (ms) => {
  let time = new Date(ms * 1000).toLocaleTimeString([], {
    timeStyle: 'short'
  })
  return time;
}


fetch('http://api.openweathermap.org/data/2.5/weather?q=Malmo,Sweden&units=metric&APPID=302165d90858a8a500d4198d9bc63d2b')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    city.innerHTML = json.name
    description.innerHTML = json.weather[0].description
    temperature.innerHTML = `${json.main.temp.toFixed(1)}°`
    wind.innerHTML = `${json.wind.speed.toFixed(1)} m/s`

    sunrise.innerHTML = timeFormat(json.sys.sunrise)
    sunset.innerHTML = timeFormat(json.sys.sunset)

  })
  .catch((err) => {
    console.log("oops error", err)
  })


fetch('http://api.openweathermap.org/data/2.5/forecast?q=Malmo&units=metric&appid=302165d90858a8a500d4198d9bc63d2b')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('06:00'))

    filteredForecast.forEach(day => {
      console.log(`${day.dt_txt} – ${day.main.temp.toFixed(1)}° – ${day.wind.speed.toFixed(1)}m/s`)
    })

  })
  .catch((err) => {
    console.log("oops error", err)
  })