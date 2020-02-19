//API
const todayURL = `https://api.openweathermap.org/data/2.5/weather?q=Majorna,Sweden&units=metric&APPID=150f4ff6ea1bf24cf1f0e1bdecefa90f`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=Majorna,Sweden&units=metric&APPID=150f4ff6ea1bf24cf1f0e1bdecefa90f`;


//DOM
const todaysWeather = document.getElementById('todaysWeather')
const containerFiveDays = document.getElementById('fiveDaysWeather')


fetch(todayURL)
  .then((response) => {
    return response.json()
  })
  .then((json) => {

    todaysWeather.innerHTML = `<h1>Todays weather in: ${json.name}</h1>`

    const temp = json.main.temp
    const tempRounded = temp.toFixed(0.1)

    json.weather.forEach((today) => {
      todaysWeather.innerHTML += `<p>${tempRounded} °C ${today.description}</p>`
    })

    /**********SUNRISE & SUNSET**********/

    //To get sunrise/sunset time in hours:minutes:seconds
    const sunrise = new Date(json.sys.sunrise * 1000)
    const sunset = new Date(json.sys.sunset * 1000)

    //Declare new variable to show only hh:mm
    const sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short' })
    const sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short' })

    todaysWeather.innerHTML += `<p>Sunrise: ${sunriseTime}<p>`
    todaysWeather.innerHTML += `<p>Sunset: ${sunsetTime}<p>`

  })

//Five days forecast

fetch('https://api.openweathermap.org/data/2.5/forecast?q=Majorna,Sweden&units=metric&APPID=150f4ff6ea1bf24cf1f0e1bdecefa90f')
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))

    filteredForecast.forEach((day) => {

      let date = new Date(day.dt * 1000)
      let dayName = date.toLocaleDateString("en-US", { weekday: "short" })

      console.log(dayName)

      const dayTemp = day.main.temp
      const weekTemp = dayTemp.toFixed(0.1)

      containerFiveDays.innerHTML += `<p>${dayName}: ${weekTemp} °C</p>`
    })
  })

