// Weather today
const container = document.getElementById('containerToday')
let sunrise = document.getElementById('sunrise')
let sunset = document.getElementById('sunset')

const timeFormat = (ms) => {
  let time = new Date(ms * 1000).toLocaleTimeString([], {
    timeStyle: 'short'
  })
  return time;
}

fetch('http://api.openweathermap.org/data/2.5/weather?id=3336568&units=metric&appid=0f30fbe5053a599d0719ec7212d88866')
  .then((response) => {
    return response.json()
  })

  .then((json) => {
    container.innerHTML = `<h1> The weather today in ${json.name} is ${json.weather[0].description} and a temperatur of ${json.main.temp} °C.</h1>`

    sunrise.innerHTML = `<h2> The sun was up at ${timeFormat(json.sys.sunrise)} </h2> `
    sunset.innerHTML = `<h2> and is expected to descend at ${timeFormat(json.sys.sunset)}</h2>`
  });

timeFormat()

//Five days forecast

const forecast = document.getElementById('5daysForecast')

fetch('http://api.openweathermap.org/data/2.5/forecast?id=3336568&units=metric&appid=0f30fbe5053a599d0719ec7212d88866')
  .then((response) => {
    return response.json()
  })

  .then((json) => {
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))

    filteredForecast.forEach((day) => {
      forecast.innerHTML += `<p>The weather ${day.dt_txt}: ${day.weather[0].description} and a temperature of ${day.main.temp}°C</p>`
    });
  })


