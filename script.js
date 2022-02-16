const weather = document.getElementById("weather");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const icon = document.getElementById("icon");
const message = document.getElementById("message");
const forecastWrapper = document.getElementById("forecastWrapper");


const displayData = (data) => {
  const temperature = Math.round(data.main.temp)
  const description = data.weather[0].description
  const sunrisedata = new Date(data.sys.sunrise * 1000)
  const sunsetdata = new Date(data.sys.sunset * 1000)

  let sunriseHours = sunrisedata.getHours();
  let sunriseMinutes = sunrisedata.getMinutes()

  let sunsetHours = sunsetdata.getHours();
  let sunsetMinutes = sunsetdata.getMinutes()

  if (sunriseHours < 10) {
    sunriseHours = `0${sunriseHours}`
  } 
   
  if (sunriseMinutes < 10) {
    sunriseMinutes = `0${sunriseMinutes} `
  }

  if (sunsetHours < 10) {
    sunsetHours = `0${sunsetHours}`
  } 
   
  if (sunsetMinutes < 10) {
    sunsetMinutes = `0${sunsetMinutes} `
  }

  weather.innerHTML = `${description} | ${temperature}`
  sunrise.innerHTML = `Sunrise: ${sunriseHours}.${sunriseMinutes}`
  sunset.innerHTML = `Sunset: ${sunsetHours}.${sunsetMinutes}`
}

const displayForecast = (data) => {
  for (i = 1; i < 8; i++) {
    const days = new Date(data.daily[i].dt * 1000);
    const dayOfWeek = days.getDay();
    let day = [
      "sun",
      "mon",
      "tue",
      "wed",
      "thu",
      "fri",
      "sat"
    ]

    const displayWeek = day[dayOfWeek]
    const displayTemp = Math.round(data.daily[i].temp.day);
    forecastWrapper.innerHTML += `<p>${displayWeek} ${displayTemp}°</p>`
  } 
}

const fetchData = () => {
  const API_URL = "https://api.openweathermap.org/data/2.5/weather?q=stockholm&units=metric&appid=7908c37d2eaed12abeb790e5b0154ee9"
  fetch(API_URL)
    .then((res) => res.json())
    .then(data => {
      displayData(data)
    })
}


 const fetchDataForecast = () => {
   const API_URL = "https://api.openweathermap.org/data/2.5/onecall?lat=59.32&lon=18.06&exclude=current,hourly,minutely,alerts&units=metric&appid=7908c37d2eaed12abeb790e5b0154ee9"
   fetch(API_URL)
   .then((res) => res.json())
   .then(data => {
     displayForecast(data)
   })
  }
 
fetchData()
fetchDataForecast() 
