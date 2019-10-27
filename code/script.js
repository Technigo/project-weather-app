//Declare constants for divs in HTML
const theCity = document.getElementById("city")
const theTemp = document.getElementById("temp")
const theWeather = document.getElementById("weather")
const theSunrise = document.getElementById("sunrise")
const theSunset = document.getElementById("sunset")

const theForecastFive = document.getElementById("forecast-five")
const theDayDate = document.getElementById("day-date")
const theDayWeather = document.getElementById("day-weather")
const theDayTemp = document.getElementById("day-temp")


//Fetch API for Bollnas today
fetch("http://api.openweathermap.org/data/2.5/weather?q=Bollnas&units=metric&APPID=8322e51e2df230498c7f0d4ce04304d6")

  //Get the json from the API
  .then((response) => {
    return response.json()
  })

  //Create HTML content with the json content
  .then((json) => {
    theCity.innerHTML = `<h2>${json.name}</h2>`
    theTemp.innerHTML = `<h1>${json.main.temp.toFixed(1)} &deg;C</h1>`
    theWeather.innerHTML = `${json.weather[0].description}`
    theSunrise.innerHTML = `<img src=\"assets/sunrise.png\" width=\"50px\""></br>${sunriseTime}`
    theSunset.innerHTML = `<img src=\"assets/sunset.png\" width=\"50px\""></br>${sunsetTime}`


    if (json.weather[0].description === "clear sky") {
      theWeather.innerHTML = `<img src=\"assets/clear-sky-day.svg\" width=\"70px\""></br>`
    } else if (json.weather[0].description === "few clouds") {
      theWeather.innerHTML = `<img src=\"assets/few-clouds-day.svg\" width=\"70px\""></br>`
    } else if (json.weather[0].description === "scattered clouds") {
      theWeather.innerHTML = `<img src=\"assets/scattered-clouds.svg\" width=\"70px\""></br>`
    } else if (json.weather[0].description === "broken clouds") {
      theWeather.innerHTML = `<img src=\"assets/broken-clouds.svg\" width=\"70px\""></br>`
    } else if (json.weather[0].description === "shower rain" || json.weather[0].description === "rain") {
      theWeather.innerHTML = `<img src=\"assets/broken-clouds.svg\" width=\"70px\""></br>`
    } else if (json.weather[0].description === "thunderstorm") {
      theWeather.innerHTML = `<img src=\"assets/thunderstorm.svg\" width=\"70px\""></br>`
    } else if (json.weather[0].description === "snow") {
      theWeather.innerHTML = `<img src=\"assets/snow.svg\" width=\"70px\""></br>`
    } else if (json.weather[0].description === "mist") {
      theWeather.innerHTML = `<img src=\"assets/mist.svg\" width=\"70px\""></br>`
    }

  })

//Fetch API for Bollnäs forecast every 3 hours
fetch("http://api.openweathermap.org/data/2.5/forecast?q=Bollnas&units=metric&cnt=5&APPID=8322e51e2df230498c7f0d4ce04304d6")

  //Get the json from the API
  .then((response) => {
    return response.json()
  })

  //Create HTML content with the json content
  .then((json) => {

    //Loop to go through the 5 forecasts in API
    json.list.forEach(forecast => {

      theDayDate.innerHTML += `${forecast.dt}</br>`
      theDayWeather.innerHTML += `${forecast.weather[0].description}</br>`
      // theDayTemp.innerHTML += `${Math.round((forecast.main.temp_max) * 10) / 10} &deg;C / ${Math.round((forecast.main.temp_min) * 10) / 10} &deg;C</br>`
      theDayTemp.innerHTML += `${forecast.main.temp_max.toFixed(1)} &deg;C / ${forecast.main.temp_min.toFixed(1)} &deg;C</br>`

    })

    // if (theDayTemp > '15') {
    //   document.body.style.backgroundColor = '#B0B7c6';
    // } else {
    //   document.body.style.backgroundColor = "#ff8d88";
    // }




  })



//Declare variable for the time of sunrise/sunset
const unixTimestampSunrise = 1572156459
const unixTimestampSunset = 1572188928
//To get sunrise/sunset time in hours:minutes:seconds
let sunrise = new Date(unixTimestampSunrise * 1000)
let sunset = new Date(unixTimestampSunset * 1000)
//Declare new variable to show only hh:mm
let sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short' });
let sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short' });

//Get icons instead of string

const getIcons = () => {


}

//clear sky
//few clouds
//scattered clouds
//broken clouds
//shower rain
//rain
//thunderstorm
//snow
//mist

