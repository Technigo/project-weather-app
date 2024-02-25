const actualWeather = document.getElementById('actualWeather')
const weatherDescription = document.getElementById('weatherDescription')
const forecastList = document.getElementById('forecastList')

const weatherZurich = () => {
  fetch(
    'https://api.openweathermap.org/data/2.5/weather?q=Zurich,Switzerland&units=metric&appid=1c745605f5cf52ece2c729289e47acc7'
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      //   const weatherIcon = data.weather.map((condition) => condition.icon)
      const weather = data.weather.map((condition) => condition.description)
      const mainKeyValues = Object.values(data.main)
      const temperature = mainKeyValues[0]
      console.log(weather)
      console.log(temperature)
      //   console.log(weatherIcon)
      actualWeather.innerHTML = `<h1>${data.name}</h1>
     <h2 class="weather-conditions">${weather} ¦ ${temperature} ° </h2><h2 class="sunset-sunrise"></h2>`
    })
    .catch((error) => console.error(error))
}
weatherZurich()
