
const container = document.getElementById('weatherContainer');
const sunup = document.getElementById('sunrise');
const sundown = document.getElementById('sunset');
const weekDays = document.getElementById('week');

const apiUrl1 = 'http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=af5a0362fe5ef8c9629c3d3323931ba3'
const apiUrl2 = 'http://api.openweathermap.org/data/2.5/forecast?q=Stockholm&&Sweden&units=metric&appid=af5a0362fe5ef8c9629c3d3323931ba3'

fetch(apiUrl1)
  .then((response) => {
    return response.json()
})
  .then((json) => {
          
    container.innerHTML =  `<h1> ${json.name} ${Math.round(json.main.temp)} °C </h1>
    `

            
    const sunriseTime = new Date(json.sys.sunrise * 1000)
    sunup.innerHTML = ` <h3>Sunrise: ${sunriseTime.toLocaleTimeString([], { timeStyle: 'short' })}</h3> `
    
    const sunsetTime = new Date(json.sys.sunset * 1000)
    sundown.innerHTML += `<h3>Sunset: ${sunsetTime.toLocaleTimeString([], { timeStyle: 'short' })} </h3>`
    });

fetch(apiUrl2)
  .then((response) => {
    return response.json()
})

  .then((json) => {
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('9:00'))

    filteredForecast.forEach((day) => {
      let date = new Date(day.dt * 1000)
      let dayName = date.toLocaleDateString("en-US", {weekday: "long"})
      const dayTemp = day.main.temp
      const weekTemp= dayTemp.toFixed(0.1)

      weekDays.innerHTML += `<p>${dayName} | ${weekTemp} °C</p>`
    })
  })