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
    document.getElementById("description").innerHTML = `${json.weather[0].description}`
    document.getElementById("todayTemp").innerHTML = `${shortTemp}˚`
    document.getElementById("currentCondition").innerHTML += `<img src="https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png" alt="" />`
    //document.getElementById("currentWeather").innerHTML = `<h2>The current weather in ${json.name} is ${shortTemp}ºC and the weather is ${json.weather[0].description}. Soluppgång ${sunriseTime}. Solnedgång ${sunsetTime}.</h2>`
    document.getElementById("sr").innerHTML = `${sunriseTime}`
    document.getElementById("ss").innerHTML = `${sunsetTime}`
  })


//const week = document.getElementById("city")

fetch("https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=8e3b288ccb7e41d96fd2f44603191864")
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
    console.log(filteredForecast)

    const containerFiveDays = document.getElementById("weekWeather")

    containerFiveDays.innerHTML = "";
    filteredForecast.forEach(day => {
      const date = new Date(day.dt * 1000)
      const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      let dayOfWeek = weekdays[date.getDay()];
      containerFiveDays.innerHTML += `<div class="dayRow"><div class="dayLabel">${dayOfWeek}</div> <div class="dayTemp">${day.main.temp.toFixed(0)} °C </div></div>`
    })
    console.log(containerFiveDays)
  })

/*filteredForecast.forEach(item => {
  console.log(item.weather[0].description)
  console.log(item.main.temp)
})

filteredForecast.forEach(item => {
  console.log(item.main.temp)
  console.log(item.main.temp)

filteredForecast.forEach(item => {
  console.log(item.main.temp_min)
  console.log(item.main.temp_max)
})
*/