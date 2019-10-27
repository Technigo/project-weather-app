//Declare constants for divs in HTML
const theCity = document.getElementById("city")
const theTemp = document.getElementById("temp")
const theWeather = document.getElementById("weather")
const theSunrise = document.getElementById("sunrise")
const theSunset = document.getElementById("sunset")

const theDay1 = document.getElementById("day1")
const theDay2 = document.getElementById("day2")
const theDay3 = document.getElementById("day3")
const theDay4 = document.getElementById("day4")
const theDay5 = document.getElementById("day5")

//Fetch API for Bollnas today
fetch("http://api.openweathermap.org/data/2.5/weather?q=Bollnas&units=metric&APPID=8322e51e2df230498c7f0d4ce04304d6")

  //Get the json from the API
  .then((response) => {
    return response.json()
  })

  //Create HTML content with the json content
  .then((json) => {
    theCity.innerHTML = `${json.name}`
    theTemp.innerHTML = `Temperature: ${json.main.temp} &deg;C`
    theWeather.innerHTML = `Weather: ${json.weather[0].description}`
    theSunrise.innerHTML = `Sunrise at: ${sunriseTime}`
    theSunset.innerHTML = `Sunset at: ${sunsetTime}`
  })

//Fetch API for Bollnäs forecast 5 days
fetch("http://api.openweathermap.org/data/2.5/forecast?q=Bollnas&units=metric&cnt=5&APPID=8322e51e2df230498c7f0d4ce04304d6")

  //Get tje json from the API
  .then((response) => {
    return response.json()
  })

  //Create HTML content with the json content
  .then((json) => {
    theDay1.innerHTML = `Date: ${json.list[0].dt}</br>`
    theDay1.innerHTML += `Max temperatur: ${json.list[0].temp_max}</br>`
    theDay1.innerHTML += `Min temperatur: ${json.list[0].temp_min}`
    theDay2.innerHTML = `Date: ${json.list[1].dt}</br>`
    theDay2.innerHTML += `Max temperatur: ${json.list[1].temp_max}</br>`
    theDay2.innerHTML += `Min temperatur: ${json.list[1].temp_min}`
    theDay3.innerHTML = `Date: ${json.list[2].dt}</br>`
    theDay3.innerHTML += `Max temperatur: ${json.list[2].temp_max}</br>`
    theDay3.innerHTML += `Min temperatur: ${json.list[2].temp_min}`
    theDay4.innerHTML = `Date: ${json.list[3].dt}</br>`
    theDay4.innerHTML += `Max temperatur: ${json.list[3].temp_max}</br>`
    theDay4.innerHTML += `Min temperatur: ${json.list[3].temp_min}`
    theDay5.innerHTML = `Date: ${json.list[4].dt}</br>`
    theDay5.innerHTML += `Max temperatur: ${json.list[4].temp_max}</br>`
    theDay5.innerHTML += `Min temperatur: ${json.list[4].temp_min}`
  })


//To get sunrise/sunset time in hours:minutes
const unixTimestampSunrise = 1572156459
const unixTimestampSunset = 1572188928

let sunrise = new Date(unixTimestampSunrise * 1000)
let sunset = new Date(unixTimestampSunset * 1000)
let sunriseTime = sunrise.toLocaleTimeString();
let sunsetTime = sunset.toLocaleTimeString();

