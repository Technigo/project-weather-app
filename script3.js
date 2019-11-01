
const apiKey = '84a3e2c91df6843f5cc1f61e17add9d0'
const location = 'Stockholm,SE'

const handle5DayForecast = (json) => {
  const forecastUl = document.getElementById('forecast')
  const dates = {}

  json.list.forEach((weather) => {
    const date = weather.dt_txt.split(' ')[0]
    if (dates[date]) {
      dates[date].push(weather)
    } else {
      dates[date] = [weather]
    }
  })

  Object.entries(dates).forEach((item) => {
   

    const date = item[0]
    const weatherValues = item[1]

    const temps = weatherValues.map((value) => value.main.temp)
    const minTemp = Math.min(...temps)
    const maxTemp = Math.max(...temps)

    forecastUl.innerHTML += `<li>${date} - min: ${minTemp.toFixed(1)}, max: ${maxTemp.toFixed(
      1
    )}</li>`
  })
}

fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`)
  .then((res) => res.json())
  .then(handle5DayForecast)



  const apiKey = '84a3e2c91df6843f5cc1f61e17add9d0'
  const location = 'Stockholm,SE'

const handle5DayForecast = (json) => {
const forecastUl = document.getElementById('forecast')
const dates = {}

json.list.forEach((weather) => {
  const date = weather.dt_txt.split(' ')[0]
  if (dates[date]) {
    dates[date].push(weather)
  } else {
    dates[date] = [weather]
  }
})

  Object.entries(dates).forEach((item) => {
 

  const date = item[0]
  const weatherValues = item[1]

  const temps = weatherValues.map((value) => value.main.temp)
  const minTemp = Math.min(...temps)
  const maxTemp = Math.max(...temps)

   const date = new Date ()
   const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']


  document.getElementById("forecast").innerHTML += `${dayNames[date.getDay()]} - min: ${minTemp.toFixed(1)}, max: ${maxTemp.toFixed(1)}`
  document.getElementById("forecast").style.listStyleType = "none"
  document.getElementById("forecast").style.background = "white"
  document.getElementById("daysForecast").style.paddingBottom = "10px"
  document.getElementById("forecast").style.borderRadius = "16px"
})

}

fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`)
.then((res) => res.json())
.then(handle5DayForecast)




})
