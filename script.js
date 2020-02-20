const text = document.getElementById('weather')
const information = document.getElementById('information')
const week = document.getElementById('week')
const color = document.getElementById('color')
const todaysWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=ed6c467c63ec2c7c04687ba8b5eb0732`
const forecastWeatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=ed6c467c63ec2c7c04687ba8b5eb0732`


fetch(todaysWeatherURL)
  .then((response) => {
    return response.json()
  })
  .then((json) => {

    const sunrise = new Date(json.sys.sunrise * 1000)
    const sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short' })

    const sunset = new Date(json.sys.sunset * 1000)
    const sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short' })

    const temp = Math.round(json.main.temp * 10) / 10

    information.innerHTML = `<h1>${json.weather[0].description} | ${temp}°</h1>`
    information.innerHTML += `<h1>sunrise ${sunriseTime}</h1>`
    information.innerHTML += `<h1>sunset ${sunsetTime}</h1>`


    const todaysWeather = json.weather[0].main

    const icon = `Designs/Design-2/icons/noun_${todaysWeather}.svg`

    image.innerHTML = `<img src= ${icon}>`

    if (todaysWeather === "Clouds")
      text.innerHTML = `<h1>Light a fire and get cosy. ${json.name} is looking grey today.</h1>`
    else if (todaysWeather === "Clear")
      text.innerHTML = `<h1>Get your sunnies on. ${json.name} is looking rather great today.</h1>`
    else text.innerHTML = `<h1>Don't forget your umbrella. It's wet in ${json.name}  today.</h1>`

    if (todaysWeather === "Clouds")
      document.getElementById("color").className = "clouds"
    else if (todaysWeather === "Clear")
      document.getElementById("color").className = "clear"
    else document.getElementById("color").className = "rain"

  })


fetch(forecastWeatherURL)
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))

    containerFiveDays.innerHTML = ""
    filteredForecast.forEach(day => {
      const date = new Date(day.dt * 1000)
      console.log(date)
      let dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' })

      containerFiveDays.innerHTML += `<p> ${dayOfWeek} ${day.main.temp.toFixed(0)} °C </p>`
    })

  })

