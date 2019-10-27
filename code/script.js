//Declare constants for divs in HTML
const theCity = document.getElementById("city")
const theTemp = document.getElementById("temp")
const theWeather = document.getElementById("weather")
const theSunrise = document.getElementById("sunrise")
const theSunset = document.getElementById("sunset")

//Fetch API for Bollnas
fetch("http://api.openweathermap.org/data/2.5/weather?q=Bollnas&APPID=8322e51e2df230498c7f0d4ce04304d6")

  //Get the json from the API
  .then((response) => {
    return response.json()
  })

  //Create HTML content with the json content
  .then((json) => {
    theCity.innerHTML = `City: ${json.name}`
    theTemp.innerHTML = `Temperature: ${json.main.temp} &deg;C`
    theWeather.innerHTML = `Weather: ${json.weather[0].description}`
    theSunrise.innerHTML = `Sunrise: ${json.sys.sunrise}`
    theSunset.innerHTML = `Sunset: ${json.sys.sunset}`
  })
