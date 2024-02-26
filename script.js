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

      const weather = data.weather.map((condition) => condition.description)
      const mainKeyValues = Object.values(data.main)
      const temperature = mainKeyValues[0]
      const sunriseTime = data.sys.sunrise

      const sunsetTime = data.sys.sunset
      const sun = new Date(sunriseTime * 1000)

      const hours = sun.getHours()
      const minutes = sun.getMinutes()
      // concatenate the hours and minutes for sunrire and sunset, transformed them into strings and padded with 2 decimals number , covered empty spaces with 0
      const sunrise = `${hours.toString().padStart(2, '0')}: ${minutes
        .toString()
        .padStart(2, '0')} AM `
      const sunS = new Date(sunsetTime * 1000)
      const hoursS = sunS.getHours()
      const minutesS = sunS.getMinutes()
      const sunset = `${hoursS.toString().padStart(2, '0')}:${minutesS
        .toString()
        .padStart(2, '0')} PM`
      console.log(weather)
      console.log(temperature)
      console.log(sunrise)
      // div=actualWeather
      actualWeather.innerHTML = `<h1>${data.name}</h1>
     <h2 class="weather-conditions">${weather} ¦ ${temperature} ° </h2><img src="./icons8-sunrise.gif" alt="sunrise"><p class="sunset-sunrise"> Sunrise ${sunrise}</p><img src="./icons8-sunset.gif" alt="sunrise">
     <p class="sunset-sunrise"> Sunset ${sunset}</p>`
    })
    .catch((error) => console.error(error))
}
weatherZurich()
