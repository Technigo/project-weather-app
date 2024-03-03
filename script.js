const BASE_URL = "https://api.openweathermap.org/data/2.5/"
const API_KEY = "5170e7466e6e4805797bdd1908cdd84d"
const city = "Stockholm,Sweden"

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
    if (data.weather[0].main === "Clear") {
      message.innerHTML += `<div>
      <img src ="design/design2/icons/noun_Sunglasses_2055147.svg"/>
      <h1>Get your sunnies on. ${cityName} is looking rather great today.</h1>
      </div>`
      document.body.style.backgroundColor = "#F7E9B9"
      document.body.style.color = "#2A5510"
    } else if (data.weather[0].main === "Rain") {
      message.innerHTML += `<div>
      <img src ="design/design2/icons/noun_Umbrella_2030530.svg"/>
      <h1>Don't forget your umbrella. It's wet in ${cityName} today.</h1>
      </div>` 
      document.body.style.backgroundColor = "#A3DEF7"
      document.body.style.color = "#164A68"
    } else if (data.weather[0].main === "Clouds") {
      message.innerHTML += `<div> 
      <img src ="design/design2/icons/noun_Cloud_1188486.svg"/>
      <h1>Light a fire and get cozy. ${cityName} is looking grey today.</h1>
      </div>`
      document.body.style.backgroundColor = "#F4F7F8"
      document.body.style.color = "#F47775"
    } else {
      message.innerHTML += `<div>
      <img src ="design/design2/icons/noun_Cloud_1188486.svg"/>
      <h1>The weather in ${cityName} is difficult to tell today.</h1>
      </div>`
      document.body.style.backgroundColor = "#F4F7F8"
      document.body.style.color = "#164A68"
    }
  }

  weatherConditions()
}

const updateHTMLforecast = (data) => {
  const filterForecast = data.list.filter((item) =>
    item.dt_txt.includes("12:00")
  )
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)
  for (let addDay = 0; addDay < 4; addDay++) {
    const day = filterForecast[addDay]
    const date = new Date(tomorrow)
    date.setDate(date.getDate() + addDay)
    const weekdayName = date.toLocaleDateString(["en-GB"], { weekday: "short" })
    const weekdayTemp = day.main.temp.toFixed(0)
    const weatherPic = {
      Clouds: "design/design2/icons/noun_Cloud_1188486.svg",
      Clear: "design/design2/icons/noun_Sunglasses_2055147.svg",
      Rain: "design/design2/icons/noun_Sunglasses_2055147.svg",
    }
    forecast.innerHTML += `
    <div id="weeklyForecast">
    <p>${weekdayName}</p> 
    <img src ="${weatherPic[day.weather[0].main]}">
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