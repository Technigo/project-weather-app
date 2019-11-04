const currentWeather = document.getElementById("currentWeather")
const currentLocation = document.getElementById("currentLocation")
const currentTemp = document.getElementById("currentTemp")
const currentCondition = document.getElementById("currentCondition")
const theSunrise = document.getElementById("theSunrise")
const theSunset = document.getElementById("theSunset")
const theImage = document.getElementById("currentImg")

fetch("http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=395e18f0b5a692062416becf9c89b0c7")
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    const sunrise = new Date(json.sys.sunrise * 1000)
    const sunset = new Date(json.sys.sunset * 1000)
    const sunriseTime = sunrise.toLocaleTimeString("sv-SE", { timeStyle: 'short' })
    const sunsetTime = sunset.toLocaleTimeString("sv-SE", { timeStyle: 'short' })

    currentLocation.innerHTML += `<h3>${json.name}</h3>`
    currentTemp.innerHTML += `<h1>${Math.round(json.main.temp)}°C </h1>`
    currentCondition.innerHTML += `<h2>${json.weather[0].description}</h2>`
    theSunrise.innerHTML += `<p>Sunrise: ${sunriseTime}</p>`
    theSunset.innerHTML += `<p>Sunset: ${sunsetTime}</p>`



    const id = json.weather[0].id
    switch (true) {
      case id >= 200 && id <= 232:
        currentImg.src = "http://openweathermap.org/img/wn/11d@2x.png"
        currentCondition.innerHTML = `<h2>"Thunder is your inner beauty and lightening is your loving spark."</h2>`
        break;
      case id >= 300 && id <= 321 || id >= 500 && id <= 531:
        currentImg.src = "http://openweathermap.org/img/wn/09d@2x.png"
        currentCondition.innerHTML = `<h2>A rainy day is the perfect time for Javascript!</h2>`
        break;
      case id >= 600 && id <= 622:
        currentImg.src = "http://openweathermap.org/img/wn/13d@2x.png"
        currentCondition.innerHTML = `<h2>Snow</h2>`
        break;
      case id >= 701 && id <= 781:
        currentImg.src = "http://openweathermap.org/img/wn/50d@2x.png"
        currentCondition.innerHTML = `<h2>Mist</h2>`
        break;
      case id === 800:
        currentImg.src = "http://openweathermap.org/img/wn/01d@2x.png"
        currentCondition.innerHTML = `<h2>"Sunlight! The most precious gold to be found on Earth."</h2>`
        break;
      case id === 801:
        currentImg.src = "http://openweathermap.org/img/wn/02d@2x.png"
        currentCondition.innerHTML = `<h2>Few clouds. Aren't the clouds beautiful? They look like big balls of cotton... I could just lie here all day, and watch them drift by... while coding</h2>`
        break;
      case id === 802:
        currentImg.src = "http://openweathermap.org/img/wn/03d@2x.png"
        currentCondition.innerHTML = `<h2>Scattered clouds.</h2>`
        break;
      case id === 803 || 804:
        currentImg.src = "http://openweathermap.org/img/wn/04d@2x.png"
        currentCondition.innerHTML = `<h2>Broken clouds. There are no rules of architecture for a castle in the clouds...</h2>`
      default:
    }

  }).catch((error) => {
    return error.json()
  })


//  Five day forecast
const theWeekdays = document.getElementById("theWeekdays")
const weekdayCondition = document.getElementById("weekdayCondition")
const weekdayTemp = document.getElementById("weekdayTemp")

fetch(
    "http://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=395e18f0b5a692062416becf9c89b0c7"
  )
  .then(response => {
    return response.json()
  })

.then(json => {
  console.log(json)
  json.list.forEach(day => {
    const time = new Date(day.dt * 1000)

    if (time.getUTCHours() === 12) {
      const weekday = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(time)

      theWeekdays.innerHTML += `<p>${weekday}</p>`
      weekdayTemp.innerHTML += `<p>${Math.floor(
          day.main.temp
        )}°C</p>`
      weekdayCondition.innerHTML += `<p>${day.weather[0].main}</p>`
    }
  })
})