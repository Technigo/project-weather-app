const container1 = document.getElementById("todaysWeather")
const theTemperature = document.getElementById("temperature")
const theCity = document.getElementById("city")
const theImage = document.getElementById("weatherImage")
const sunriseAndSunset = document.getElementById("sunUpSunDown")

fetch(
  "http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=8c93692e6dae295a7a97fe22cff8e23c"
)
  .then(response => {
    return response.json()
  })

  .then(json => {
    //Declare variable for the time of sunrise/sunset
    const unixTimestampSunrise = json.sys.sunrise
    const unixTimestampSunset = json.sys.sunset

    //To get sunrise/sunset time in hours:minutes:seconds
    let sunrise = new Date(unixTimestampSunrise * 1000)
    let sunset = new Date(unixTimestampSunset * 1000)

    //Declare new variable to show only hh:mm
    let sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: "short" })
    let sunsetTime = sunset.toLocaleTimeString([], { timeStyle: "short" })

    theTemperature.innerHTML += `${json.main.temp}° | ${json.weather[0].main}`
    theCity.innerHTML += `${json.name}`
    container1.innerHTML += `<p>Sunrise at ${sunriseTime} | Sunset at ${sunsetTime}</p>`
  })
