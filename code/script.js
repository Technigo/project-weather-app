////////// DOM Selectors //////////
const upperBackground = document.getElementById("upper-background")
const temperature = document.getElementById("temperature")
const city = document.getElementById("city")
const weather = document.getElementById("weather")
const sunriseElement = document.getElementById("sunrise")
const sunsetElement = document.getElementById("sunset")
const forecastContainer = document.getElementById("forecast-container")
const citySearchInput = document.getElementById("city-search-input")
const searchForm = document.getElementById("search-form")
const sunText = document.getElementById("sun-text")
const celsius = document.getElementById("celsius")

////////// API URL storing //////////
const BASE_URL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q="
const API_KEY = "206e380881feb4fbbb5f8d99cb75f06d" //query param
let cityName = "Stockholm" //path param
const forecastURL =
  "https://api.openweathermap.org/data/2.5/forecast?units=metric&q="

////////// Function to fetch API data //////////
const fetchWeatherData = (cityName) => {
  fetch(`${BASE_URL}${cityName}&appid=${API_KEY}`)
    .then((response) => {
      if (!response.ok) {
        if (response.status === 404) {
          // City not found
          throw new Error("City not found")
        } else {
          //Other errors
          throw new Error("Failed to fetch weather data")
        }
      }
      return response.json()
    })
    .then((json) => {
      //One decimal as per instructions
      const temp = json.main.temp.toFixed(1)
      //Get weather description
      const weatherDescription = json.weather[0].description
      const weatherDescriptionCapitalized =
        weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1)

      //Check time to know whether to display day or night image
      const localTime = new Date(json.dt * 1000) //milliseconds
      const timeZoneOffset = json.timezone / 3600 //convert to hours
      localTime.setHours(localTime.getHours() + timeZoneOffset) //adjust time by adding offset
      const formattedLocalTime = localTime.toLocaleTimeString("en-GB", {
        timeStyle: "short",
        timeZone: "UTC",
      })

      const formattedLocalTimeInHours = parseInt(
        formattedLocalTime.split(":")[0]
      )

      //Change background depending on weather condition
      const weatherToday = json.weather[0].main
      const atmosphere = [
        "Mist",
        "Smoke",
        "Haze",
        "Dust",
        "Fog",
        "Sand",
        "Dust",
        "Ash",
        "Squall",
        "Tornado",
      ]

      //Background for daytime 06-20
      if (formattedLocalTimeInHours >= 6 && formattedLocalTimeInHours < 20) {
        //If statements changing background based on weather condition
        if (weatherToday === "Clear") {
          upperBackground.style.backgroundImage = `url("./assets/day-clear.jpg")`
        } else if (weatherToday === "Clouds") {
          upperBackground.style.backgroundImage = `url("./assets/day-cloud.jpg")`
        } else if (weatherToday === "Thunderstorm") {
          upperBackground.style.backgroundImage = `url("./assets/thunder.jpg")`
        } else if (weatherToday === "Snow") {
          upperBackground.style.backgroundImage = `url("./assets/day-snow.jpg")`
        } else if (weatherToday === "Rain" || weatherToday === "Drizzle") {
          upperBackground.style.backgroundImage = `url("./assets/day-rain.jpg")`
        } else if (atmosphere.includes(weatherToday)) {
          upperBackground.style.backgroundImage = `url("./assets/day-atmosphere.jpg")`
        } else {
          upperBackground.style.backgroundImage = `url("./assets/day-cloud.jpg")`
        }
      } else {
        //If it's not daytime, so 20-06
        if (weatherToday === "Clear") {
          upperBackground.style.backgroundImage = `url("./assets/night-clear.jpg")`
        } else if (weatherToday === "Clouds") {
          upperBackground.style.backgroundImage = `url("./assets/night-cloud.jpg")`
        } else if (weatherToday === "Thunderstorm") {
          upperBackground.style.backgroundImage = `url("./assets/thunder.jpg")`
        } else if (weatherToday === "Snow") {
          upperBackground.style.backgroundImage = `url("./assets/night-snow.jpg")`
        } else if (weatherToday === "Rain") {
          upperBackground.style.backgroundImage = `url("./assets/night-rain.jpg")`
        } else {
          upperBackground.style.backgroundImage = `url("./assets/night-cloud.jpg")`
        }
      }

      //Display in HTML
      temperature.innerHTML = `${temp}`
      weather.innerHTML = `${weatherDescriptionCapitalized}`
      city.innerHTML = cityName

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
    })
    //Handle errors
    .catch((error) => {
      if (error.message === "City not found") {
        //City not found, only change placeholder text
        citySearchInput.placeholder = "Try another city"
      } else {
        //Other error - display in browser that we're unable to fetch data
        weather.innerHTML =
          "<p>Error fetching weather data. Please try again later.</p>"
        temperature.innerHTML = ""
        city.innerHTML = ""
        sunriseElement.innerHTML = ""
        sunsetElement.innerHTML = ""
        celsius.innerHTML = ""
        sunText.innerHTML = ""
        searchForm.innerHTML = ""
      }
      console.error("Error fetching weather data:", error)
    })
  //End of fetchWeatherData function
}

fetchWeatherData(cityName)

////////// Feature 2: Forecast 5 days//////////

const fetchWeatherForecast = (cityName) => {
  fetch(`${forecastURL}${cityName}&appid=${API_KEY}`)
    .then((response) => {
      if (!response.ok) {
        if (response.status === 404) {
          //City not found
          throw new Error("City not found")
        } else {
          throw new Error("Failed to fetch weather data")
        }
      }
      return response.json()
    })
    .then((json) => {
      //Extract today's index
      const todayIndex = new Date(json.list[0].dt_txt).getDay()

      //Filter out today's weather data
      const nextFiveDays = json.list.filter(
        (element) => new Date(element.dt_txt).getDay() !== todayIndex
      )

      const fiveDayArray = []
      let maxTemp = -1000
      let minTemp = 1000
      let weatherIcon = ""

      nextFiveDays.forEach((element) => {
        const currentWeekDay = new Date(element.dt_txt).toLocaleDateString(
          "en-GB",
          {
            weekday: "long",
          }
        )

        //If it's a new day, add the max and min temp to array
        if (!fiveDayArray.includes(currentWeekDay)) {
          if (fiveDayArray.length !== 0) {
            fiveDayArray.push(maxTemp.toFixed())
            fiveDayArray.push(minTemp.toFixed())
            fiveDayArray.push(weatherIcon)
          }
          fiveDayArray.push(currentWeekDay)
          maxTemp = -1000
          minTemp = 1000
          weatherIcon = ""
        }

        //Update max and min temp if needed
        if (element.main.temp_max > maxTemp) {
          maxTemp = element.main.temp_max
          weatherIcon = element.weather[0].icon
        }
        if (element.main.temp_min < minTemp) {
          minTemp = element.main.temp_min
        }
      })

      //Push temperature values for the last day
      fiveDayArray.push(maxTemp.toFixed())
      fiveDayArray.push(minTemp.toFixed())
      fiveDayArray.push(weatherIcon)

      //Empty previous forecast
      forecastContainer.innerHTML = ""

      //Render five-day forecast
      for (let i = 0; i < 5; i++) {
        const currentDay = fiveDayArray.slice(i * 4, (i + 1) * 4)
        const weekDay =
          currentDay[0].charAt(0).toUpperCase() + currentDay[0].slice(1)
        const maxTemp = currentDay[1]
        const minTemp = currentDay[2]
        const icon = currentDay[3]

        forecastContainer.innerHTML += `
        <div class="day-container">
            <p class="forecast-day">${weekDay}</p>
              <img class="forecast-image" src="https://openweathermap.org/img/wn/${icon}@2x.png"
              alt="forecast image"/>
            <div class="min-max-temp">
            <p class="max-temp">${maxTemp}&deg;</p>
            <p>/</p>
            <p class="min-temp">${minTemp}&deg;C</p>
          </div>
          </div>
        `
      }
    })
    .catch((error) => {
      if (error.message === "City not found") {
        //City not found, only change placeholder text
        citySearchInput.placeholder = "Try another city"
      } else {
        //Other error - display in browser that we're unable to fetch data
        forecastContainer.innerHTML =
          "<p>Error fetching weather forecast. Please try again later.</p>"
      }
      console.error("Error fetching weather forecast:", error)
    })
}
fetchWeatherForecast(cityName)

////////// Feature 3: Search for other cities //////////

searchForm.addEventListener("submit", (event) => {
  event.preventDefault()
  const inputValue = citySearchInput.value.trim()
  const cityName = inputValue.charAt(0).toUpperCase() + inputValue.slice(1)
  if (cityName) {
    //Fetch weather data and forecast for new city
    fetchWeatherData(cityName)
    fetchWeatherForecast(cityName)
    //Clear the input after user presses enter
    citySearchInput.value = ""
  } else {
    citySearchInput.placeholder = "Try another city"
  }
})
