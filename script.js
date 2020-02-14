const container = document.getElementById("currentWeather")

fetch("http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=8e3b288ccb7e41d96fd2f44603191864")
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    const unixTimestampSunrise = json.sys.sunrise
    const unixTimestampSunset = json.sys.sunset

    const sunrise = new Date(unixTimestampSunrise * 1000)
    const sunset = new Date(unixTimestampSunset * 1000)

    const sunriseTime = sunrise.toLocaleTimeString([], {
      timeStyle: 'short'
    })
    const sunsetTime = sunset.toLocaleTimeString([], {
      timeStyle: 'short'
    })
    const longTemp = json.main.temp
    const shortTemp = longTemp.toFixed(1);

    container.innerHTML = `<h2>The current weather in ${json.name} is ${shortTemp}ºC and the weather is ${json.weather[0].description}. Soluppgång ${sunriseTime}. Solnedgång ${sunsetTime}.`
  })

const week = document.getElementById("cityName")

fetch("https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=8e3b288ccb7e41d96fd2f44603191864")
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
    console.log(filteredForecast)
    filteredForecast.forEach(item => {
      console.log(item.weather[0].description)
    })
    filteredForecast.forEach(item => {
      console.log(item.main.temp)
    })
  });