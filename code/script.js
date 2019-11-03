const city = "Bollnas"
const apiKey = "8322e51e2df230498c7f0d4ce04304d6"

//FETCH API FOR BOLLNAS RIGHT NOW IN MAIN-TOP
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`)

  //Get the json from the API
  .then((response) => {
    return response.json()
  })

  //Create HTML content with the json content
  .then((json) => {

    //Declare constants for todays/current weahter
    const mainTop = document.getElementById("main-top-bg")
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

    //Get current time to compare with sunrise & sunset for different bg-img
    const currentTime = new Date().toLocaleTimeString([], { timeStyle: 'short' })

    let dayTime
    if (currentTime > sunriseTime && currentTime < sunsetTime) {
      dayTime
    }

    if (dayTime && window.matchMedia("(max-width: 750px)").matches) {
      mainTop.style.backgroundImage = "url('assets/camp-day-small.jpg')"
    } else if (dayTime && window.matchMedia("(min-width: 750px)").matches) {
      mainTop.style.backgroundImage = "url('assets/camp-day-big.jpg')"
    } else if (!dayTime && window.matchMedia("(max-width: 750px)").matches) {
      mainTop.style.backgroundImage = "url('assets/camp-night-small.jpg')"
    } else if (!dayTime && window.matchMedia("(min-width: 750px)").matches) {
      mainTop.style.backgroundImage = "url('assets/camp-night-big.jpg')"
    }

    //Conditions for showing icons instead of string for weather description
    const weatherId = json.weather[0].id
    let weatherIcon

    if (weatherId === 800 && dayTime) {
      weatherIcon = `<img src=\"assets/clear-sky-day.png\" width=\"80px\"">`
    } else if (weatherId === 800 && !dayTime) {
      weatherIcon = `<img src=\"assets/clear-sky-night.png\" width=\"80px\"">`
    } else if (weatherId === 801 && dayTime) {
      weatherIcon = `<img src=\"assets/few-clouds-day.png\" width=\"80px\"">`
    } else if (weatherId === 801 && !dayTime) {
      weatherIcon = `<img src=\"assets/few-clouds-night.png\" width=\"80px\"">`
    } else if (weatherId === 802) {
      weatherIcon = `<img src=\"assets/scattered-clouds.png\" width=\"80px\"">`
    } else if (weatherId === 803 || weatherId === 804) {
      weatherIcon = `<img src=\"assets/broken-clouds.png\" width=\"80px\"">`
    } else if (weatherId >= 300 && weatherId < 600) {
      weatherIcon = `<img src=\"assets/rain.png\" width=\"80px\"">`
    } else if (weatherId >= 200 && weatherId < 300) {
      weatherIcon = `<img src=\"assets/thunderstorm.png\" width=\"80px\"">`
    } else if (weatherId >= 600 && weatherId < 700) {
      weatherIcon = `<img src=\"assets/snow.png\" width=\"80px\"">`
    } else if (weatherId >= 700 && weatherId < 800) {
      weatherIcon = `<img src=\"assets/mist.png\" width=\"80px\"">`
    }

    //THE WEATHER SHOWN IN MAIN-TODAY
    theCity.innerHTML = `${json.name}`
    theTemp.innerHTML = `${json.main.temp.toFixed(1)} &deg;C`
    theWeather.innerHTML = `${weatherIcon}`
    theSunrise.innerHTML = `<img src=\"assets/sunrise.png\" width=\"50px\""></br>${sunriseTime}`
    theSunset.innerHTML = `<img src=\"assets/sunset.png\" width=\"50px\""></br>${sunsetTime}`

  })

//FETCH API FOR BOLLNAS EVERY THREE (SIX) HOURS IN MAIN-BOTTOM
fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=10&APPID=${apiKey}`)

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

      //Just want to fetch the arrays with even numbers so i get a forecast every 6th hour
      if (index % 2 === 0) {

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
        const shortDate = `${realDate.getDate()} ${months[realDate.getMonth()]}`
        const shortTime = `${addZeros(realDate.getUTCHours())}:${addZeros(realDate.getMinutes())}`
        console.log(shortTime)

        //To get the average temperature for the forecast
        const averageTemp = (forecast.main.temp_max + forecast.main.temp_min) / 2

        //Conditions for showing icons instead of string for weather description - using let for eatherIcon since the conditions assign new values
        const weatherId = forecast.weather[0].id
        let weatherIcon

        if (weatherId === 800) {
          weatherIcon = `<img src=\"assets/clear-sky-day.png\" width=\"25px\"">`
        } else if (weatherId === 801) {
          weatherIcon = `<img src=\"assets/few-clouds-day.png\" width=\"25px\"">`
        } else if (weatherId === 802) {
          weatherIcon = `<img src=\"assets/scattered-clouds.png\" width=\"25px\"">`
        } else if (weatherId === 803 || weatherId === 804) {
          weatherIcon = `<img src=\"assets/broken-clouds.png\" width=\"25px\"">`
        } else if (weatherId >= 300 && weatherId < 600) {
          weatherIcon = `<img src=\"assets/rain.png\" width=\"25px\"">`
        } else if (weatherId >= 200 && weatherId < 300) {
          weatherIcon = `<img src=\"assets/thunderstorm.png\" width=\"25px\"">`
        } else if (weatherId >= 600 && weatherId < 700) {
          weatherIcon = `<img src=\"assets/snow.png\" width=\"25px\"">`
        } else if (weatherId >= 700 && weatherId < 800) {
          weatherIcon = `<img src=\"assets/mist.png\" width=\"25px\"">`
        }

        //Declare forecastBottom
        const forecastBottom = document.getElementById("forecast-bottom")

        //Creates two section with separete divs in themn
        forecastBottom.innerHTML +=
          `<section class="forecast" id="forecast${index}">
              <div class="forecast-date">${shortDate}</div>
              <div class="forecast-time">${shortTime}</div>
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

    // Accordion for forecast details

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