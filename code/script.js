////////// DOM Selectors //////////
const container = document.getElementById("container")
const temperature = document.getElementById("temperature")
const city = document.getElementById("city")
const weather = document.getElementById("weather")
const sunrise = document.getElementById("sunrise")
const sunset = document.getElementById("sunset")
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
const cityName = "Stockholm" //path param
const forecastURL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

/////Display city name in app
city.innerHTML = cityName

//Function to fetch information for the current weather

const fetchWeatherData = () => {
  fetch(`${BASE_URL}${cityName}&appid=${API_KEY}`)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      console.log(json)

      //One decimal as per instructions
      const temp = json.main.temp.toFixed(1)
      //Weather description
      const weatherDescription = json.weather[0].description
      //Modify HTML
      temperature.innerHTML = `${temp}`
      weather.innerHTML = `${weatherDescription}`
      console.log("temp:", temp)
      console.log("weather:", weatherDescription)
      console.log("city:", cityName)
    })
}

fetchWeatherData(cityName)

////////// Feature 2: Forecast 5 days//////////

const fetchWeatherForecast = (cityName) => {
  fetch(`${forecastURL}${cityName}&appid=${API_KEY}`)
    .then((response) => response.json())
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
    //clear the input
    citySearchInput.value = ""
  }
})
fetchWeatherData()
