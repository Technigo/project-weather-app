// True constants (SNAKECASE)
const API_KEY = "ea9a90c62aeaaa3811505087d195520e"
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?q="
const FORECAST_BASE_URL = "https://api.openweathermap.org/data/2.5/forecast?q="

let city = "Stockholm" // Dynamic city variable

// DOM Selectors
const temperatureDisplay = document.getElementById("temperature")
const conditionDisplay = document.getElementById("condition")
const sunriseDisplay = document.getElementById("sunriseTime")
const sunsetDisplay = document.getElementById("sunsetTime")
const weatherImg = document.getElementById("weatherImage")
const weatherMsg = document.getElementById("weatherMessage")
const forecastList = document.getElementById("forecastList")
const searchButton = document.getElementById("searchButton")
const cityInput = document.getElementById("cityInput")

// Function to fetch weather data
const fetchWeatherData = () => {
  const URL = `${BASE_URL}${city}&units=metric&APPID=${API_KEY}`
  const FORECAST_URL = `${FORECAST_BASE_URL}${city}&units=metric&APPID=${API_KEY}`

  // Fetch current weather data
  fetch(URL)
    .then(response => response.json())
    .then(data => {
      if (!data || data.cod !== 200) {
        throw new Error("City not found")
      }
      const stockholmTemp = data.main.temp
      const weatherCondition = data.weather[0].description
      const roundedTemp = Math.round(stockholmTemp)
      const sunrise = data.sys.sunrise
      const sunset = data.sys.sunset
      const timezoneOffset = data.timezone // Timezone offset in seconds

      temperatureDisplay.innerText = `${roundedTemp}°C`
      conditionDisplay.innerText = `${weatherCondition}`

      // Convert and display sunrise and sunset times with timezone offset
      const sunriseTime = convertUnixToTime(sunrise, timezoneOffset)
      const sunsetTime = convertUnixToTime(sunset, timezoneOffset)
      sunriseDisplay.innerText = `${sunriseTime}`
      sunsetDisplay.innerText = `${sunsetTime}`

      updateUI(roundedTemp, weatherCondition, sunset)
    })
    .catch(error => {
      console.error("Error fetching weather data:", error)
    })

  // Fetch 5-day forecast data
  fetch(FORECAST_URL)
    .then(response => response.json())
    .then(forecastData => {
      forecastList.innerHTML = ""
      const today = new Date()

      // Loop through the next 5 days
      for (let i = 1; i <= 5; i++) {
        const forecastDate = new Date(today)
        forecastDate.setDate(today.getDate() + i)
        const forecastDateString = forecastDate.toISOString().split("T")[0]

        // Filter forecasts for this specific date
        const dailyForecasts = forecastData.list.filter(item => {
          const itemDate = new Date(item.dt * 1000).toISOString().split("T")[0]
          return itemDate === forecastDateString
        })

        if (dailyForecasts.length > 0) {
          // Initialize min and max temperature variables
          let minTemp = Infinity
          let maxTemp = -Infinity

          // Calculate min and max temperatures for the day
          dailyForecasts.forEach(item => {
            const temp = Math.round(item.main.temp)
            if (temp < minTemp) {
              minTemp = temp
            }
            if (temp > maxTemp) {
              maxTemp = temp
            }
          })

          const weekDay = forecastDate.toLocaleDateString("en-US", {
            weekday: "long",
          })
          const listItem = document.createElement("li")
          listItem.innerHTML = `${weekDay} <span class="min-temp">${minTemp} / <span class="max-temp">${maxTemp}°C</span>`
          forecastList.appendChild(listItem)
        }
      }
    })
    .catch(error => {
      console.error("Error fetching forecast data:", error)
    })
}

// Function to convert UNIX timestamp to readable time format (24-hour clock)
const convertUnixToTime = (unixTimestamp, timezoneOffset) => {
  const date = new Date((unixTimestamp + timezoneOffset) * 1000)
  const hours = date.getUTCHours()
  const minutes = String(date.getUTCMinutes()).padStart(2, "0")
  return `${hours}:${minutes}`
}

// Initial fetch for the default city
fetchWeatherData()

// Event listener for the search button
searchButton.addEventListener("click", () => {
  city = cityInput.value.trim() // Update city variable with input value
  if (city) {
    city = capitalizeCityName(city) // Capitalize the first letter of each word
    fetchWeatherData() // Fetch new weather data for the entered city
  }
})

// Event listener for the Enter key in the input field
cityInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    // Check if the pressed key is Enter
    city = cityInput.value.trim()
    if (city) {
      city = capitalizeCityName(city) // Capitalize the first letter of each word
      searchButton.click() // Trigger the click event of the search button
      searchButton.click() // Trigger the click event of the search button
    }
  }
})

// Arrow function to capitalize the first letter of each word in the city name
const capitalizeCityName = (city) => {
  return city
    .split(" ") // Split the city name into an array of words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word
    .join(" ") // Join the words back into a single string
}

const updateUI = (temperature, weatherDescription, sunsetTime) => {
  const weatherContainer = document.getElementById("weatherContainer")
  const searchButton = document.getElementById("searchButton")
  const currentTime = new Date() // Get the current time
  const sunset = new Date(sunsetTime * 1000) // Convert sunset time to Date object
  let weatherMessage // Variable to store the weather message

  // Check if it's after sunset
  if (currentTime > sunset) {
    // Night styling
    weatherContainer.style.backgroundColor = "#001f3f" // Dark blue for night
    weatherContainer.style.color = "#ffffff" // White text
    searchButton.style.backgroundColor = "#164A68" // Light blue button color
    weatherImg.src = "assets/design-2/moonlight.png" // Moon image for night
    weatherMessage = `It's ${weatherDescription} in ${city}. Enjoy the evening and have a good night!`

  } else {
    // Update background and text color based on weather condition
    if (
      weatherDescription.toLowerCase().includes("rain") ||
      weatherDescription.toLowerCase().includes("drizzle") ||
      weatherDescription.toLowerCase().includes("mist")
    ) {
      weatherContainer.style.backgroundColor = "#BDE8FA" // Blue for rain
      weatherContainer.style.color = "#164A68" // Rainy font color
      searchButton.style.backgroundColor = "#164A68"
      weatherImg.src = "assets/design-2/noun_Umbrella.svg"
      weatherMessage = `Don’t forget your umbrella.<br>It’s wet in ${city} today.`

    } else if (weatherDescription.toLowerCase().includes("few clouds")) {
      weatherContainer.style.backgroundColor = "#F7E9B9" // Yellow for few clouds
      weatherContainer.style.color = "#2A5510" // Green font color
      searchButton.style.backgroundColor = "#2A5510"
      weatherImg.src = "assets/design-2/noun_Sunglasses.svg"
      weatherMessage = `Get your sunnies on. There are a few clouds, but it's still a lovely day in ${city}.`

    } else if (weatherDescription.toLowerCase().includes("scattered clouds")) {
      weatherContainer.style.backgroundColor = "#F7E9B9" // Yellow for scattered clouds
      weatherContainer.style.color = "#2A5510" // Green font color
      searchButton.style.backgroundColor = "#2A5510"
      weatherImg.src = "assets/design-2/noun_cloud.svg"
      weatherMessage = `There are some scattered clouds, but it's still a lovely day in ${city}.`

    } else if (weatherDescription.toLowerCase().includes("clear")) {
      weatherContainer.style.backgroundColor = "#F7E9B9" // Yellow for clear sky
      weatherContainer.style.color = "#2A5510" // Green font color
      searchButton.style.backgroundColor = "#2A5510"
      weatherImg.src = "assets/design-2/noun_Sunglasses.svg"
      weatherMessage = `Get your sunnies on.<br>${city} is looking rather great today.`

    } else if (
      weatherDescription.toLowerCase().includes("clouds") ||
      weatherDescription.toLowerCase().includes("fog") ||
      weatherDescription.toLowerCase().includes("haze")
    ) {
      weatherContainer.style.backgroundColor = "#FFFFFF" // White for cloudy
      weatherContainer.style.color = "#F47775" // Orange font color
      searchButton.style.backgroundColor = "#F47775"
      weatherImg.src = "assets/design-2/noun_Cloud.svg"
      weatherMessage = `Light a fire and get cosy.<br>${city} is looking grey today.`

    } else if (weatherDescription.toLowerCase().includes("snow")) {
      weatherContainer.style.backgroundColor = "#BDE8FA" // Blue for snow
      weatherContainer.style.color = "#164A68" // Blue font color
      searchButton.style.backgroundColor = "#164A68"
      weatherImg.src = "assets/design-2/snow.png"
      weatherMessage = `Wrap up warm! It's snowy in ${city}.`
    }
  }

  // Update the DOM elements with weather message and image
  weatherMsg.innerHTML = weatherMessage
}
