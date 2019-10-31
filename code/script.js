//FETCH API FOR BOLLNAS RIGHT NOW IN MAIN-TOP
fetch(`https://api.openweathermap.org/data/2.5/weather?q=Bollnas&units=metric&APPID=8322e51e2df230498c7f0d4ce04304d6`)

  //Get the json from the API
  .then((response) => {
    return response.json()
  })

  //Create HTML content with the json content
  .then((json) => {

    //Declare constants for todays/current weahter
    const theCity = document.getElementById("city")
    const theTemp = document.getElementById("temp")
    const theWeather = document.getElementById("weather")
    const theSunrise = document.getElementById("sunrise")
    const theSunset = document.getElementById("sunset")

    //Declare variable for the time of sunrise/sunset in HH:MM:SS
    const sunrise = new Date(json.sys.sunrise * 1000)
    const sunset = new Date(json.sys.sunset * 1000)
    //Declare new variable to show only HH:MM
    const sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short' })
    const sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short' })

    //THE WEATHER SHOWN IN MAIN-TODAY
    theCity.innerHTML = `<h2>${json.name}</h2>`
    theTemp.innerHTML = `<h1>${json.main.temp.toFixed(1)} &deg;C</h1>`
    theWeather.innerHTML = `${json.weather[0].description}`
    theSunrise.innerHTML = `<img src=\"assets/sunrise.png\" width=\"50px\""></br>${sunriseTime}`
    theSunset.innerHTML = `<img src=\"assets/sunset.png\" width=\"50px\""></br>${sunsetTime}`

    //Conditions for showing icons instead of string for weather description
    if (json.weather[0].description === "clear sky") {
      theWeather.innerHTML = `<img src=\"assets/clear-sky-day.png\" width=\"80px\""></br>`
    } else if (json.weather[0].description === "few clouds") {
      theWeather.innerHTML = `<img src=\"assets/few-clouds-day.png\" width=\"80px\""></br>`
    } else if (json.weather[0].description === "scattered clouds" || json.weather[0].description === "overcast clouds") {
      theWeather.innerHTML = `<img src=\"assets/scattered-clouds.png\" width=\"80px\""></br>`
    } else if (json.weather[0].description === "broken clouds") {
      theWeather.innerHTML = `<img src=\"assets/broken-clouds.png\" width=\"70px\""></br>`
    } else if (json.weather[0].description.includes("rain") || json.weather[0].description.includes("drizzle")) {
      theWeather.innerHTML = `<img src=\"assets/broken-clouds.png\" width=\"80px\""></br>`
    } else if (json.weather[0].description.includes("thunderstorm")) {
      theWeather.innerHTML = `<img src=\"assets/thunderstorm.png\" width=\"80px\""></br>`
    } else if (json.weather[0].description.includes("snow")) {
      theWeather.innerHTML = `<img src=\"assets/snow.png\" width=\"80px\""></br>`
    } else if (json.weather[0].description === "mist" || json.weather[0].description === "fog") {
      theWeather.innerHTML = `<img src=\"assets/mist.png\" width=\"80px\""></br>`
    }

    //Get current time to compare with sunrise & sunset for different bg-img
    const currentTime = new Date().toLocaleTimeString([], { timeStyle: 'short' })
    const mainTop = document.getElementById("main-top-bg")

    if (currentTime < sunsetTime && currentTime > sunriseTime && window.matchMedia("(max-width: 600px)").matches) {
      mainTop.style.backgroundImage = "url('assets/camp-day-small.jpg')"
    } else if (currentTime < sunsetTime && currentTime > sunriseTime && window.matchMedia("(min-width: 600px)").matches) {
      mainTop.style.backgroundImage = "url('assets/camp-day-big.jpg')"
    } else if (currentTime > sunsetTime && window.matchMedia("(max-width: 600px)").matches) {
      mainTop.style.backgroundImage = "url('assets/camp-night-small.jpg')"
    } else if (currentTime > sunsetTime && window.matchMedia("(min-width: 600px)").matches) {
      mainTop.style.backgroundImage = "url('assets/camp-night-big.jpg')"
    }

  })

//FETCH API FOR BOLLNAS EVERY THREE (SIX) HOURS IN MAIN-BOTTOM
fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Bollnas&units=metric&cnt=10&APPID=8322e51e2df230498c7f0d4ce04304d6`)

  //Get the json from the API
  .then((response) => {
    return response.json()
  })

  //Create HTML content with the json content
  .then((json) => {

    //Set index for creating id:s for each forecast-section
    index = 1

    //Loop to go through the forecasts in API
    json.list.forEach((forecast, index) => {

      if (index % 2 === 0) {

        //Conditions for showing icons instead of string for weather description - using let for eatherIcon since the conditions assign new values
        const weatherDay = forecast.weather[0].description
        let weatherIcon

        if (weatherDay === "clear sky") {
          weatherIcon = `<img src=\"assets/clear-sky-day.png\" width=\"25px\"">`
        } else if (weatherDay === "few clouds") {
          weatherIcon = `<img src=\"assets/few-clouds-day.png\" width=\"25px\"">`
        } else if (weatherDay === "scattered clouds" || weatherDay === "overcast clouds") {
          weatherIcon = `<img src=\"assets/scattered-clouds.png\" width=\"25px\"">`
        } else if (weatherDay === "broken clouds") {
          weatherIcon = `<img src=\"assets/broken-clouds.png\" width=\"25px\"">`
        } else if (weatherDay.includes("rain") || weatherDay.includes("drizzle")) {
          weatherIcon = `<img src=\"assets/broken-clouds.png\" width=\"25px\"">`
        } else if (weatherDay.includes("thunderstorm")) {
          weatherIcon = `<img src=\"assets/thunderstorm.png\" width=\"25px\"">`
        } else if (weatherDay.includes("snow")) {
          weatherIcon = `<img src=\"assets/snow.png\" width=\"25px\"">`
        } else if (weatherDay === "mist" || weatherDay === "fog") {
          weatherIcon = `<img src=\"assets/mist.png\" width=\"25px\"">`
        }

        //To add a zero if the hour or minute is under 10, getHours() and getMinutes() is passed as arugment later on
        const addZeros = (time) => {
          if (time <= 9) {
            return "0" + time;
          }
          return time
        }

        //To fix the datestring in format DD Mon kl HH:MM
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const date = forecast.dt
        const realDate = new Date(date * 1000)
        let shortDate
        //Conditions depending on screen width
        if (window.matchMedia("(min-width: 900px)").matches) {
          shortDate = `${realDate.getDate()} ${months[realDate.getMonth()]} </br> ${addZeros(realDate.getUTCHours())}:${addZeros(realDate.getMinutes())}`
        } else {
          shortDate = `${realDate.getDate()} ${months[realDate.getMonth()]} ${addZeros(realDate.getUTCHours())}:${addZeros(realDate.getMinutes())}`
        }

        //To get the average temperature for the forecast
        const averageTemp = (forecast.main.temp_max + forecast.main.temp_min) / 2

        //Declare forecastBottom
        const forecastBottom = document.getElementById("forecast-bottom")

        //Creates a section with separete divs for date, icon, temp
        forecastBottom.innerHTML +=
          `<section class="forecast" id="forecast${index}">
        <div class="forecast-date">${shortDate}</div>
        <div class="forecast-icon">${weatherIcon}</div>
        <div class="forecast-temp">${averageTemp.toFixed(1)} &deg;C</div>
        </section>
        
        <section class="forecast-details">
        <p>Weather: ${forecast.weather[0].description}</p>
        <p>Wind: ${forecast.wind.speed.toFixed(0)} m/s</p>
        <p>Max temp: ${forecast.main.temp_max.toFixed(1)} &deg;C</p>
        <p>Min temp: ${forecast.main.temp_min.toFixed(1)} &deg;C</p>

        </section>`

        //Index increases for every loop
        index++
      }
    })

    // ACCORDION FOR FORECAST DETAILS

    // A function that adds and remove the class "active" when you click
    function toggle() {
      this.classList.toggle("active")
    }
    // Selects an HTML element, and calls a the toggle-function when clicked
    document.getElementById("forecast0").onclick = toggle
    document.getElementById("forecast2").onclick = toggle
    document.getElementById("forecast4").onclick = toggle
    document.getElementById("forecast6").onclick = toggle
    document.getElementById("forecast8").onclick = toggle

  })

