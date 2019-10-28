//Declare constants for divs in HTML
const theCity = document.getElementById("city")
const theTemp = document.getElementById("temp")
const theWeather = document.getElementById("weather")
const theSunrise = document.getElementById("sunrise")
const theSunset = document.getElementById("sunset")

const theDayDate = document.getElementById("day-date")
const theDayWeather = document.getElementById("day-weather")
const theDayTemp = document.getElementById("day-temp")


//Fetch API for Bollnas today
fetch("https://api.openweathermap.org/data/2.5/weather?q=Bollnas&units=metric&APPID=8322e51e2df230498c7f0d4ce04304d6")

  //Get the json from the API
  .then((response) => {
    return response.json()
  })

  //Create HTML content with the json content
  .then((json) => {

    //Declare variable for the time of sunrise/sunset
    const unixTimestampSunrise = json.sys.sunrise
    const unixTimestampSunset = json.sys.sunset
    //To get sunrise/sunset time in hours:minutes:seconds
    let sunrise = new Date(unixTimestampSunrise * 1000)
    let sunset = new Date(unixTimestampSunset * 1000)
    //Declare new variable to show only hh:mm
    let sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short' })
    let sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short' })
    console.log(sunriseTime)
    console.log(sunsetTime)

    //THE WEATHER SHOWN IN MAIN-TODAY
    theCity.innerHTML = `<h2>${json.name}</h2>`
    theTemp.innerHTML = `<h1>${json.main.temp.toFixed(1)} &deg;C</h1>`
    theWeather.innerHTML = `${json.weather[0].description}`
    theSunrise.innerHTML = `<img src=\"assets/sunrise.png\" width=\"50px\""></br>${sunriseTime}`
    theSunset.innerHTML = `<img src=\"assets/sunset.png\" width=\"50px\""></br>${sunsetTime}`

    //Show icons instead of string for weather
    if (json.weather[0].description === "clear sky") {
      theWeather.innerHTML = `<img src=\"assets/clear-sky-day.png\" width=\"70px\""></br>`
    } else if (json.weather[0].description === "few clouds") {
      theWeather.innerHTML = `<img src=\"assets/few-clouds-day.png\" width=\"70px\""></br>`
    } else if (json.weather[0].description === "scattered clouds") {
      theWeather.innerHTML = `<img src=\"assets/scattered-clouds.png\" width=\"70px\""></br>`
    } else if (json.weather[0].description === "broken clouds") {
      theWeather.innerHTML = `<img src=\"assets/broken-clouds.png\" width=\"70px\""></br>`
    } else if (json.weather[0].description === "shower rain" || json.weather[0].description === "rain") {
      theWeather.innerHTML = `<img src=\"assets/broken-clouds.png\" width=\"70px\""></br>`
    } else if (json.weather[0].description === "thunderstorm") {
      theWeather.innerHTML = `<img src=\"assets/thunderstorm.png\" width=\"70px\""></br>`
    } else if (json.weather[0].description === "snow") {
      theWeather.innerHTML = `<img src=\"assets/snow.png\" width=\"70px\""></br>`
    } else if (json.weather[0].description === "mist") {
      theWeather.innerHTML = `<img src=\"assets/mist.png\" width=\"70px\""></br>`
    }

    //Get current time to compare with sunrise & sunset for different bg-img
    let currentTime = new Date().toLocaleTimeString([], { timeStyle: 'short' })
    console.log(currentTime)
    const mainTop = document.getElementById("main-top-bg")

    if (currentTime < sunsetTime && window.innerWidth < 667) {
      mainTop.style.backgroundImage = "url('assets/mountain-day-small.jpg')"
    } else if (currentTime < sunsetTime && window.innerWidth > 668) {
      mainTop.style.backgroundImage = "url('assets/mountain-day-big.jpg')"
    } else if (currentTime > sunsetTime && window.innerWidth < 667) {
      mainTop.style.backgroundImage = "url('assets/mountain-night-small.jpg')"
    } else if (currentTime > sunsetTime && window.innerWidth > 668) {
      mainTop.style.backgroundImage = "url('assets/mountain-night-big.jpg')"
    }

  })

//Fetch API for Bollnäs forecast every 3 hours
fetch("https://api.openweathermap.org/data/2.5/forecast?q=Bollnas&units=metric&cnt=5&APPID=8322e51e2df230498c7f0d4ce04304d6")

  //Get the json from the API
  .then((response) => {
    return response.json()
  })

  //Create HTML content with the json content
  .then((json) => {



    //Loop to go through the 5 forecasts in API
    json.list.forEach(forecast => {

      //To shorten the datestring
      const dateDay = forecast.dt_txt
      const shortDate = dateDay.substring(0, dateDay.length - 3)

      //Show icons instead of string for weather
      const weatherDay = forecast.weather[0].description
      let weatherIcon

      if (weatherDay === "clear sky") {
        weatherIcon = `<img src=\"assets/clear-sky-day.png\" width=\"20px\""></br>`
      } else if (weatherDay === "few clouds") {
        weatherIcon = `<img src=\"assets/few-clouds-day.png\" width=\"20px\""></br>`
      } else if (weatherDay === "scattered clouds") {
        weatherIcon = `<img src=\"assets/scattered-clouds.png\" width=\"20px\""></br>`
      } else if (weatherDay === "broken clouds") {
        weatherIcon = `<img src=\"assets/broken-clouds.png\" width=\"20px\""></br>`
      } else if (weatherDay === "shower rain" || weatherDay === "rain") {
        weatherIcon = `<img src=\"assets/broken-clouds.png\" width=\"20px\""></br>`
      } else if (weatherDay === "thunderstorm") {
        weatherIcon = `<img src=\"assets/thunderstorm.png\" width=\"20px\""></br>`
      } else if (weatherDay === "snow") {
        weatherIcon = `<img src=\"assets/snow.png\" width=\"20px\""></br>`
      } else if (weatherDay === "mist") {
        weatherIcon = `<img src=\"assets/mist.png\" width=\"20px\""></br>`
      }

      theDayDate.innerHTML += `${shortDate}</br>`
      theDayWeather.innerHTML += `${weatherIcon}`
      theDayTemp.innerHTML += `${forecast.main.temp_max.toFixed(1)} &deg;C / ${forecast.main.temp_min.toFixed(1)} &deg;C</br>`

    })

  })






