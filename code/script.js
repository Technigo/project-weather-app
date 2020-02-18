const container = document.getElementById('forecast')
const sunriseContainer = document.getElementById('sunrise')
const sunsetContainer = document.getElementById('sunset')
const fiveDayForecastContainer = document.getElementById('fiveDaysForecast')

//To display the weather right now
fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=6f2155bea70058c9c702a90730859c85')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    container.innerHTML = `<h3>Today´s weather in:</h3> <h1> ${json.name}</h1> <h1>${json.main.temp.toFixed(1)} °C </h1 > `

    json.weather.forEach((element) => {
      container.innerHTML += `<h3> ${element.description}</h3>`
    })

    //Declare variable for the time of sunrise/sunset
    const timeSunrise = json.sys.sunrise
    const timeSunset = json.sys.sunset

    //To get sunrise/sunset time in hours:minutes:seconds
    let sunrise = new Date(timeSunrise * 1000);
    let sunset = new Date(timeSunset * 1000);

    //Declare new variable to show only hh:mm
    let sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short' })
    let sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short' })

    sunsetContainer.innerHTML = `<h5> Sunset: ${sunsetTime} </h5>`
    sunriseContainer.innerHTML = `<h5> Sunrise: ${sunriseTime} </h5>`
  });

//To dislay 5 days forecast 
fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=6f2155bea70058c9c702a90730859c85')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))


    filteredForecast.forEach((day) => {
      let date = new Date(day.dt * 1000)
      let dayName = date.toLocaleDateString("en-US", { weekday: "short" })
      fiveDayForecastContainer.innerHTML += `<p>${dayName} ${day.main.temp} °C</p>`
    })
  })