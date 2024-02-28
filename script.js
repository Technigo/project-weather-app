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

const updateHTML = (data) => {
  const temp = data.main.temp
  const description = data.weather[0].description
  const cityTitle = data.name

  mainTemp.innerText = temp
  weatherDescription.innerText = description
  cityName.innerText = cityTitle
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
