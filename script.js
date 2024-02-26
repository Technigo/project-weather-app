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

const forecastZurich = () => {
  fetch(
    'https://api.openweathermap.org/data/2.5/forecast?q=Zurich,Switzerland&units=metric&APPID=1c745605f5cf52ece2c729289e47acc7'
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      // filter the list for results only from 12 o clock
      const weekDayFromTwelve = data.list.filter((item) => {
        let weekDay = item.dt_txt
        return weekDay.includes('12:00:00')
      })
      const dates = weekDayFromTwelve.map((item) => {
        let weekDay = item.dt_txt
        let date = new Date(weekDay)
        let day = date.getDay()
        console.log(day)

        switch (day) {
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
            currentDay = `Sun`
            break
        }
        return currentDay
      })
      const actualTemp = data.list.map((condition) => condition.main.temp)

      forecastList.innerHTML += `<li> ${currentDay}  ${actualTemp}</li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>`
    })

    .catch((error) => console.error(error))
}
forecastZurich()
