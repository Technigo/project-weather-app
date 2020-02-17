const container = document.getElementById('weatherAPI')
const tempOfTheDay = document.getElementById('tempOfTheDay')
const city = document.getElementById('city')
const weatherDescription = document.getElementById('description')

fetch('https://api.openweathermap.org/data/2.5/weather?q=Reykjavik,Iceland&units=metric&APPID=3ecdc5b9e327b76e7806233ffc0a935f')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    
    console.log(json)
  
    const timestampSunrise = json.sys.sunrise
    const timestampSunset = json.sys.sunset

    let sunrise = new Date (timestampSunrise * 1000)
    let sunset = new Date (timestampSunset * 1000)

    let sunriseTime = sunrise.toLocaleTimeString('is',{ timeStyle: 'short',hour12: false})
    let sunsetTime = sunset.toLocaleTimeString('is',{timeStyle: 'short', hour12: false})

    container.innerHTML = `<p>Sunrise: ${sunriseTime}</p>`
    container.innerHTML += `<p>Sunset: ${sunsetTime}</p>`

    tempOfTheDay.innerHTML = `<p>${json.main.temp.toFixed(1)} // ${json.main.feels_like}</p>`

    city.innerHTML = `<p>${json.name}</p>`

    weatherDescription.innerHTML = `<p>${json.weather[0].description}</p>`
  })

   

  // ******* 5 DAY FORECAST ********

  const forecast = document.getElementById('forecast')

  fetch('https://api.openweathermap.org/data/2.5/forecast?q=Reykjav%C3%ADk,Iceland&units=metric&APPID=3ecdc5b9e327b76e7806233ffc0a935f')
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      
      const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
      console.log(filteredForecast)

      filteredForecast.forEach(day => {
        const weekday = new Date(day.dt_txt)
        console.log(weekday)
        const weekdayName = weekday.toLocaleDateString('is', {weekday: 'short'})

        const temp = (day.main.temp)
        const feelsLike = (day.main.feels_like)
      

      forecast.innerHTML += `<p>${weekdayName} ${temp.toFixed(1)}° // ${feelsLike.toFixed(1)}</p>` 
      })

    })
 