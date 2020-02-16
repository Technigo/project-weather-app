const text = document.getElementById('weather')
const information = document.getElementById('information')
const week = document.getElementById('week')

fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=ed6c467c63ec2c7c04687ba8b5eb0732')
  .then((response) => {
    return response.json()
  })
  .then((json) => {

    const sunrise = new Date(json.sys.sunrise * 1000)
    const sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short' })

    const sunset = new Date(json.sys.sunset * 1000)
    const sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short' })

    const temp = Math.round(json.main.temp * 10) / 10

    information.innerHTML = `<h1>${json.weather[0].description} | ${temp}°</h1>`
    information.innerHTML += `<h1>sunrise ${sunriseTime}</h1>`
    information.innerHTML += `<h1>sunset ${sunsetTime}</h1>`
    text.innerHTML = `<h1>Light a fire and get cosy. ${json.name} is looking grey today.</h1>`
  })


fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=ed6c467c63ec2c7c04687ba8b5eb0732')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))

    filteredForecast.forEach((weekday) => {
      week.innerHTML += `<p>DAY ${weekday.dt}    TEMPERATUR ${weekday.main.temp}</p>`
    })

  })
