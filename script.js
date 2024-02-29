const BASE_URL = "https://api.openweathermap.org/data/2.5/"
const API_KEY = "5170e7466e6e4805797bdd1908cdd84d"
const city = "Copenhagen,Denmark"

const URL = `${BASE_URL}weather?q=${city}&units=metric&APPID=${API_KEY}`
const URLforecast = `${BASE_URL}forecast?q=${city}&units=metric&APPID=${API_KEY}`
 
//DOM Selectors
const weatherToday = document.getElementById('weatherToday')
const errorDiv = document.getElementById("error")
const forecast = document.getElementById("forecast")
const message = document.getElementById("message")

const updateHTML = (data) => {
  const temp = data.main.temp.toFixed(1)
  const description = data.weather[0].description
  const cityName = data.name
  const sunriseUnix = new Date(data.sys.sunrise * 1000)
  const sunsetUnix = new Date(data.sys.sunset * 1000)

  const sunriseShort = sunriseUnix.toLocaleTimeString([], { timeStyle: "short" }) 
  const sunsetShort = sunsetUnix.toLocaleTimeString([], { timeStyle: "short" })

  weatherToday.innerHTML = `
  <p>${description} | ${temp}°C</p>
  <p>sunrise ${sunriseShort}</p> 
  <p>sunset ${sunsetShort}</p>
  `

  const weatherConditions = () => {
    if (data.weather[0].main === "Clouds") {
      message.innerHTML += `<div> 
      <h1>Light a fire and get cozy. ${cityName} is looking grey today.</h1>
      </div>`
    } else if (data.weather[0].main === "Rain") {
      message.innerHTML += `<div>
      <h1>Don't forget your umbrella. It's wet in ${cityName} today.</h1>
      </div>`
    } else if (data.weather[0].main === "Clear") {
      message.innerHTML += `<div>
      <h1>Get your sunnies on. ${cityName} is looking rather great today.</h1>
      </div>`
    } 
  }

  weatherConditions()
}

const updateHTMLforecast = (json) => {
  const filteredForecast = json.list.filter((item) =>
    item.dt_txt.includes("12:00")
  )
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  for (let counter = 0; counter < 4; counter++) {
    const day = filteredForecast[counter]
    const date = new Date(tomorrow)
    date.setDate(date.getDate() + counter)
    const weekdayName = date.toLocaleDateString(["en-GB"], { weekday: "short" })
    const weekdayTemp = day.main.temp.toFixed(0)
    const weekdayDescription = day.weather[0].description
    forecast.innerHTML += `
    <div id="weeklyForecast">
    <p>${weekdayName}</p> 
    <p>${weekdayDescription}</p> 
    <p>${weekdayTemp}°C</p>
    </div>
    `
  }
}

const fetchWeather = () => {
  fetch(URL)
    .then(response => response.json())
    .then(data => updateHTML(data))
    .catch(error => {
      console.log(error)
      errorDiv.innerText = "Something went wrong"
    })
}

fetchWeather()

const fetchForecast = () => {
  fetch(URLforecast)
    .then(response => response.json())
    .then(data => updateHTMLforecast(data))
    .catch(error => {
      console.log(error)
      errorDiv.innerText = "Something went wrong"
    })
}

fetchForecast()