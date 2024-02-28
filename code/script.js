////////// DOM Selectors //////////
const container = document.getElementById("container")
const temperature = document.getElementById("temperature")
const city = document.getElementById("city")
const weather = document.getElementById("weather")
const sunriseElement = document.getElementById("sunrise")
const sunsetElement = document.getElementById("sunset")
const forecastSection = document.getElementById("forecast-section")
const date = document.getElementById("date")

////////// Get time + date and display in app //////////
const currentDate = new Date().toLocaleDateString()
const currentTime = new Date().toLocaleTimeString()

date.innerHTML = `${currentDate} ${currentTime}`

////////// API URL storing //////////
const BASE_URL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q="
const API_KEY = "206e380881feb4fbbb5f8d99cb75f06d" //query param
let cityName = "Stockholm" //path param
const forecastURL =
  "https://api.openweathermap.org/data/2.5/forecast?units=metric&q="

////////// Function to fetch API data //////////

const fetchWeatherData = () => {
  fetch(`${BASE_URL}${cityName}&appid=${API_KEY}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json)

      //One decimal as per instructions
      const temp = json.main.temp.toFixed(1)
      //Weather description
      const weatherDescription = json.weather[0].description
      //Display in HTML
      temperature.innerHTML = `${temp}`
      weather.innerHTML = `${weatherDescription}`
      city.innerHTML = cityName

      console.log("temp:", temp)
      console.log("weather:", weatherDescription)
      console.log("city:", cityName)

      ////////// Feature 1: Sunrise and sunset //////////

      //Convert to milliseconds to use JS date constructor and create new date object
      const sunriseTime = new Date(json.sys.sunrise * 1000)
      const sunsetTime = new Date(json.sys.sunset * 1000)

      //Timezone offset local time in minutes relative to UTC time
      const timezoneOffsetMinutes = json.timezone / 60

      //Calculate sunrise and sunset time for the city's timezone
      const sunriseOptions = {
        hour: "2-digit",
        minute: "2-digit",
        //If time in minutes > 0: city is behind UTC, subtracting time
        //If time in minutes < 0: city is before UTC, adding time
        timeZone: `Etc/GMT${timezoneOffsetMinutes >= 0 ? "-" : "+"}${Math.abs(
          //calculates abs value of the offset in hrs and includes it the timezone identifier
          timezoneOffsetMinutes / 60
        )}`,
      }

      const sunsetOptions = {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: `Etc/GMT${timezoneOffsetMinutes >= 0 ? "-" : "+"}${Math.abs(
          timezoneOffsetMinutes / 60
        )}`,
      }

      //Display in HTML adding the formatting created in sunriseOptions
      sunriseElement.innerHTML = sunriseTime.toLocaleTimeString(
        "sv-SE",
        sunriseOptions
      )
      sunsetElement.innerHTML = sunsetTime.toLocaleTimeString(
        "sv-SE",
        sunsetOptions
      )

      //End of fetchWeatherData function
    })
}

fetchWeatherData()
