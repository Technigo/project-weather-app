fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=b913ce9c82eec1ad0ab3597f17f5d5db')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    console.log(json)
    const temp = json.main.temp
    const tempOneDec = temp.toFixed(1)
    document.getElementById("temperature").innerHTML += `${tempOneDec}°`
    document.getElementById("city").innerHTML = `${json.name}`
    
    const description = json.weather[0].description
    document.getElementById("description").innerHTML += `${description}`

    const sunriseUTC = json.sys.sunrise
    const newSunriseDate = new Date(sunriseUTC * 1000).getHours()
    document.getElementById("sunrise").innerHTML += `Sunrise: ${newSunriseDate}.00`
    const sunsetUTC = json.sys.sunset
    const newSunsetDate = new Date(sunsetUTC * 1000).getHours()
    document.getElementById("sunset").innerHTML += `Sunset: ${newSunsetDate}.00`
  })

  const handle5DayForecast = (json) => {
    console.log(json)
    const forecastUl = document.getElementById("fiveDaysForecast")
    const dates = {}

    json.list.forEach((weather) => {
      const date = weather.dt_txt.split(' ')[0]
      console.log(date)
      if (dates[date]) {
        dates[date].push(weather)
      }else {
        dates[date] = [weather]
      }
    })

    Object.entries(dates).forEach((item) => {
      const date = item[0]

      const weatherValues = item[1]

      console.log(date, weatherValues)
      const temps = weatherValues.map((value) => {
        return value.main.temp
      })
      
      console.log(temps)
      const minTemp = Math.min(...temps)
      const maxTemp = Math.max(...temps)
      


      forecastUl.innerHTML += `<li>${date} - min: ${minTemp.toFixed(0.1)}, max: ${maxTemp}</li>`
  })


  fetch(`http://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=b913ce9c82eec1ad0ab3597f17f5d5db`)
    .then((res) => res.json())
    .then(handle5DayForecast)
    console.log(json)

/* Ny

const apiKey = `b913ce9c82eec1ad0ab3597f17f5d5db`
const location = `Stockholm,SE`

const handle5DayForecast = (json) => {
  console.log(json)
}

fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&APPID=${apiKey}`)
  .then((res) => res.json())
  .then(handle5DayForecast)


  /* Gammal
    
  fetch('http://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&cnt=7&APPID=b913ce9c82eec1ad0ab3597f17f5d5db')
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      console.log(json)
      