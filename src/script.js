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
  const city = data.name

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
  sunrise.innerHTML = `sunrise: ${sunriseHours}.${sunriseMinutes}`
  sunset.innerHTML = `sunset: ${sunsetHours}.${sunsetMinutes}`

  if (data.weather[0].main === "Clear") {
      icon.src = "./Designs/Design-2/icons/noun_Sunglasses_2055147.svg"
      message.innerHTML = `Get your sunnies on. ${city} is looking rather great today.`
      document.body.style.backgroundColor = "#F7E9B9"
      document.body.style.color = "#2A5510"

  } else if  (data.weather[0].main === "Clouds") {
    icon.src = "./Designs/Design-2/icons/noun_Cloud_1188486.svg"
    message.innerHTML = `Light a fire and get cosy. ${city} is looking grey today.`
    document.body.style.backgroundColor = "#F4F7F8"
    document.body.style.color = "#F47775"

  } else if (data.weather[0].main === "Rain"|| data.weather[0].main ==="Drizzle") {
    icon.src = "./Designs/Design-2/icons/noun_Umbrella_2030530.svg"
    message.innerHTML = `Don't forget your umbrella. It is wet in ${city} today.`
    document.body.style.backgroundColor = "#A3DEF7"
    document.body.style.color = "#164A68"
    
  } else if (data.weather[0].main === "Thunderstorm"|| data.weather[0].main ==="Snow") {
    message.innerHTML = `Stay inside. It is dangerous out in ${city} today.`
    document.body.style.backgroundColor = "#A3DEF7" //change this color
    document.body.style.color = "#164A68" //change this color

  } else {
    message.innerHTML = `Lock your door in ${city} today.`
    document.body.style.backgroundColor = "#A3DEF7" //change this color
    document.body.style.color = "#164A68" //change this color
  }
  
  
  
  // console.log(data.weather[0].main)
  console.log(data)
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
