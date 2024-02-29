const BASE_URL = "https://api.openweathermap.org/data/2.5/weather"
const API_KEY = "5170e7466e6e4805797bdd1908cdd84d"
const city = "Copenhagen,Denmark"

const URL = `${BASE_URL}?q=${city}&units=metric&APPID=${API_KEY}`

//DOM Selectors
const mainContainer = document.getElementById("mainContainer")
const cityName = document.getElementById("cityName")
const mainTemp = document.getElementById("mainTemp")
const weatherDescription = document.getElementById("weatherDescription")
const errorDiv = document.getElementById("error")
const sunrise = document.getElementById("sunrise")
const sunset = document.getElementById("sunset")

const updateHTML = (data) => {
  const temp = data.main.temp.toFixed(1)
  const description = data.weather[0].description
  const cityTitle = data.name
  const sunriseUnix = new Date(data.sys.sunrise * 1000)
  const sunsetUnix = new Date(data.sys.sunset * 1000)

  const sunriseShort = sunriseUnix.toLocaleTimeString([], { timeStyle: "short" }) 
  const sunsetShort = sunsetUnix.toLocaleTimeString([], { timeStyle: "short" })

  mainTemp.innerText = temp
  weatherDescription.innerText = description
  cityName.innerText = cityTitle
  sunrise.innerText += `Sunrise: ${sunriseShort}`
  sunset.innerText += `Sunset: ${sunsetShort}`
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
