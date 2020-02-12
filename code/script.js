/*
API KEY: 3c481a17ec1c4b275eed746ad29d58b1
API CALL: http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={APIKEY}

5 day forecast example for Stockholm and the units is metric
api.openweathermap.org/data/2.5/forecast?id=2673730&units=metric&appid=3c481a17ec1c4b275eed746ad29d58b1

city id stockholm: 2673730
*/

// Testing to print out some of the respons from the api
const city = document.getElementById("city")
const temp = document.getElementById("temp")
const wind = document.getElementById("wind")
const description = document.getElementById("description")

// Fetch function
const key = "3c481a17ec1c4b275eed746ad29d58b1"
const stockholm = "2673730"
const units = "metric"
const url = `http://api.openweathermap.org/data/2.5/forecast?id=${stockholm}&units=${units}&appid=${key}`
let weatherResponse;


const getWeatherForecast = async (url) => {
  await fetch(url)
    .then((response) => {
      // console.log(response)
      return response.json()
    })
    .then((myJson) => {
      // weatherResponse = myJson
      // console.log(weatherResponse)

      // Targeting my id and update with current information from api.
      // This is how I can show big card information about stockholm.
      // Add icon depending on myJson.list[0].weather.id, rain, cloudy, sunny etc.
      city.innerHTML = `City: ${myJson.city.name}`
      temp.innerHTML = `Current temp in ${myJson.city.name} is ${myJson.list[0].main.temp}&#176`
      wind.innerHTML = `Wind speed: ${myJson.list[0].wind.speed} m/s`
      description.innerHTML = `Description: ${myJson.list[0].weather[0].description}`
    })
    .catch((err) => {
      console.log(err)
    })
}

getWeatherForecast(url);



// TrafikLAB
// Företaget som hanterar all kollektivtrafik, bland annat SL.
// Skapat ett konto, godkänt licenser och avtal.
// https://www.trafiklab.se/api/sl-storningsinformation-2
// API nyckel: 47b6750ccfc04bfd9145a16eeda8fad4

/* fetch url till sl
https://api.sl.se/api2/deviations.Json?key=47b6750ccfc04bfd9145a16eeda8fad4&transportMode=metro
*/