const container = document.getElementById('forecast')
const sunriseContainer = document.getElementById('sunrise')
const sunsetContainer = document.getElementById('sunset')

fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=6f2155bea70058c9c702a90730859c85')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    container.innerHTML = `<h2> In ${json.name} the temperature is ${json.main.temp.toFixed(1)} degrees </h2 > `

    json.weather.forEach((element) => {
      container.innerHTML += `<h2>and has ${element.description}.</h2>`
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

    sunsetContainer.innerHTML = `<h2> Sunset: ${sunsetTime} </h2>`
    sunriseContainer.innerHTML = `<h2> Sunrise: ${sunriseTime} </h2>`

  });