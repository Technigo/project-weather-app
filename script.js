const actualWeather = document.getElementById('actualWeather')
const weatherDescription = document.getElementById('weatherDescription')
const forecastList = document.getElementById('forecastList')

//variables
let currentDate
let currentDay
let currentTime

const weatherZurich = () => {
  fetch(
    'https://api.openweathermap.org/data/2.5/weather?q=Zurich,Switzerland&units=metric&appid=1c745605f5cf52ece2c729289e47acc7'
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data)

      const weather = data.weather.map((condition) => condition.description)
      const mainKeyValues = Object.values(data.main)
      const temperature = Math.round(mainKeyValues[0])
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
     <h2 class="weather-conditions">${weather} | ${temperature} ° </h2><p class="sunset-sunrise"> Sunrise ${sunrise}<img src="./icons8-sunrise-50.png" alt="sunrise"></p>
     <p class="sunset-sunrise"> Sunset ${sunset}<img src="./icons8-sunset-50.png" alt="sunset"></p>`
    })
    .catch((error) => console.error(error))
}
weatherZurich()

const forecastZurich = () => {
  fetch(
    'https://api.openweathermap.org/data/2.5/forecast?q=Zurich,Switzerland&units=metric&APPID=1c745605f5cf52ece2c729289e47acc7'
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data)

      const weekDayFromTwelve = data.list.filter((item) => {
        const dateTime = item.dt_txt
        const fullDate = new Date(dateTime)
        console.log(fullDate)
        const currentTime = fullDate.getUTCHours()
        const currentDate = fullDate.getDay()
        console.log(currentDate)
        console.log(currentTime)
        return currentTime === 11 // Filter for 11:00:00
      })
      console.log(weekDayFromTwelve)
      const dates = weekDayFromTwelve.map((item) => {
        const dateTime = item.dt_txt
        const fullDate = new Date(dateTime)
        const currentDate = fullDate.getDay()
        let currentDay
        switch (currentDate) {
          case 0:
            currentDay = `Sun`
            break
          case 1:
            currentDay = `Mon`

            break
          case 2:
            currentDay = `Tue`
            break
          case 3:
            currentDay = `Wed`
            break
          case 4:
            currentDay = `Thu`
            break
          case 5:
            currentDay = `Fri`
            break
          case 6:
            currentDay = `Sat`
            break
          default:
            console.log('error')
            break
        }
        return currentDay
      })
      console.log(dates)
      actualTemp = weekDayFromTwelve.map((condition) => {
        let valueTemp = Math.round(condition.main.temp)
        return valueTemp
      })
      // forecastTemperature = actualTemp.forEach((value) => {
      //   let valueTemp = Math.round(value)
      //   console.log(valueTemp)
      // })

      console.log(actualTemp)
      // Clear existing content
      forecastList.innerHTML = ''
      // Loop through dates and actualTemp arrays simultaneously
      for (let i = 0; i < Math.min(dates.length, actualTemp.length); i++) {
        forecastList.innerHTML += `<div class=forecast-container><li>${dates[i]} </li><span> ${actualTemp[i]} °C </span></div>`
      }
    })

    .catch((error) => console.error(error))
}

forecastZurich()
