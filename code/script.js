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
    const sunrise = new Date(unixTimestampSunrise * 1000)
    const sunset = new Date(unixTimestampSunset * 1000)
    //Declare new variable to show only hh:mm
    const sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short' })
    const sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short' })

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
    const currentTime = new Date().toLocaleTimeString([], { timeStyle: 'short' })
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

    //Set index to 1 for creating ids for each forecast-div
    index = 1

    //Loop to go through the 5 forecasts in API
    json.list.forEach(forecast => {

      //To shorten the datestring
      const dateDay = forecast.dt_txt
      const shortDate = dateDay.substring(0, dateDay.length - 3)

      //Show icons instead of string for weather - using let for eatherIcon since the conditions assign new values
      const weatherDay = forecast.weather[0].description
      let weatherIcon

      if (weatherDay === "clear sky") {
        weatherIcon = `<img src=\"assets/clear-sky-day.png\" width=\"20px\"">`
      } else if (weatherDay === "few clouds") {
        weatherIcon = `<img src=\"assets/few-clouds-day.png\" width=\"20px\"">`
      } else if (weatherDay === "scattered clouds" || weatherDay === "overcast clouds") {
        weatherIcon = `<img src=\"assets/scattered-clouds.png\" width=\"20px\"">`
      } else if (weatherDay === "broken clouds") {
        weatherIcon = `<img src=\"assets/broken-clouds.png\" width=\"20px\"">`
      } else if (weatherDay.includes("rain") || weatherDay.includes("drizzle")) {
        weatherIcon = `<img src=\"assets/broken-clouds.png\" width=\"20px\"">`
      } else if (weatherDay.includes("thunderstorm")) {
        weatherIcon = `<img src=\"assets/thunderstorm.png\" width=\"20px\"">`
      } else if (weatherDay.includes("snow")) {
        weatherIcon = `<img src=\"assets/snow.png\" width=\"20px\"">`
      } else if (weatherDay === "mist" || weatherDay === "fog") {
        weatherIcon = `<img src=\"assets/mist.png\" width=\"20px\"">`
      }

      const averageTemp = (forecast.main.temp_max + forecast.main.temp_min) / 2
      const forecastFive = document.getElementById("forecast-five")
      //Creates a section with separete divs for date, icon, temp
      forecastFive.innerHTML +=
        `<section class="forecast" id="forecast${index}">
        <div class="forecast-date">${shortDate}</div>
        <div class="forecast-icon">${weatherIcon}</div>
        <div class="forecast-temp">${averageTemp.toFixed(1)} &deg;C</div>
        </section>
        
        <section class="forecast-details">
        <p>Weather: ${forecast.weather[0].description}</p>
        <p>Wind: ${forecast.wind.speed.toFixed(0)} m/s</p>
        <p>Max temperature: ${forecast.main.temp_max.toFixed(1)} &deg;C</p>
        <p>Min temperature: ${forecast.main.temp_min.toFixed(1)} &deg;C</p>

        </section>`

      //Index increases for every loop
      index++
    })

    // ACCORDION FOR FORECAST DETAILS
    // A function that adds and remove the class "active" when you click
    function toggle() {
      this.classList.toggle("active")
    }
    // Selects an HTML element, and calls a the toggle-function when clicked
    document.getElementById("forecast1").onclick = toggle
    document.getElementById("forecast2").onclick = toggle
    document.getElementById("forecast3").onclick = toggle
    document.getElementById("forecast4").onclick = toggle
    document.getElementById("forecast5").onclick = toggle

  })







