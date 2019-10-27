//Declare constants for divs in HTML
const theCity = document.getElementById("city")
const theTemp = document.getElementById("temp")
const theWeather = document.getElementById("weather")
const theSunrise = document.getElementById("sunrise")
const theSunset = document.getElementById("sunset")

//Fetch API for Bollnas
fetch("http://api.openweathermap.org/data/2.5/weather?q=Bollnas&units=metric&APPID=8322e51e2df230498c7f0d4ce04304d6")

  //Get the json from the API
  .then((response) => {
    return response.json()
  })

  //Create HTML content with the json content
  //The [0] after json.weather because of array in API - the others are objects
  .then((json) => {
    theCity.innerHTML = `City: ${json.name}`
    theTemp.innerHTML = `Temperature: ${json.main.temp} &deg;C`
    theWeather.innerHTML = `Weather: ${json.weather[0].description}`
    theSunrise.innerHTML = `Sunrise at: ${sunriseTime}`
    theSunset.innerHTML = `Sunset at: ${sunsetTime}`
  })

//To get sunrise/sunset time in hours:minutes
const unixTimestampSunrise = 1572156459
const unixTimestampSunset = 1572188928

let sunrise = new Date(unixTimestampSunrise * 1000)
let sunset = new Date(unixTimestampSunset * 1000)
let sunriseTime = sunrise.toLocaleTimeString();
let sunsetTime = sunset.toLocaleTimeString();
