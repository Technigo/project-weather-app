const container = document.getElementById('astros')

fetch('http://api.openweathermap.org/data/2.5/weather?q=Marbella,Spain&units=metric&APPID=329f2a2705f51547d2ed78a937fa0051')
  .then((response) => {
    return response.json()

  })
  .then((json) => {

    city.innerHTML = json.name
    temp.innerHTML = `${json.main.temp.toFixed(1)} °`
    description.innerHTML = json.weather[0].description

    const sunriseConversion = new Date(json.sys.sunrise * 1000)
    const sunsetConversion = new Date(json.sys.sunset * 1000)

    const sunriseTime = sunriseConversion.toLocaleTimeString([], {
      timeStyle: 'short'
    })
    const sunsetTime = sunsetConversion.toLocaleTimeString([], {
      timeStyle: 'short'
    })

    sunrise.innerHTML = `Sunrise: ${sunriseTime}`
    sunset.innerHTML = `Sunset: ${sunsetTime}`
  })

fetch('http://api.openweathermap.org/data/2.5/forecast?q=marbella,spain&appid=329f2a2705f51547d2ed78a937fa0051')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'));
    containerFiveDays.innerHTML = "";
    filteredForecast.forEach(day => {
      const date = new Date(day.dt * 1000)
      const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      let dayOfWeek = weekdays[date.getDay()];
      containerFiveDays.innerHTML += `<p> ${dayOfWeek} ${day.main.temp.toFixed(0)} ° </p>`
    })


  })