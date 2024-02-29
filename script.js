//DOM selectors here:


//create a fench function to log the data from the API
const fetchWeaterData = () =>{
  //https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=69cc94dd08e05801b495ee1b7a9cba03
  const BASE_URL = "https://api.openweathermap.org/data/2.5/"
  const API_KEY = "69cc94dd08e05801b495ee1b7a9cba03"
  const cityCountry = "Stockholm,Sweden"

  const URL = `${BASE_URL}weather?q=${cityCountry}&units=metric&APPID=${API_KEY}`

  fetch(URL)
  .then((response)=>{
    return response.json()
  })
  .then((data)=>{
    console.log(data)
    console.log(data.main)
    //set main temperature
    const selectNowsTemperature = document.getElementById("nowsTemperature")
    const roundOneDecimal = Math.round(data.main.temp * 10)/10 //this to round to one decimal
    selectNowsTemperature.innerHTML = roundOneDecimal

    //set location
    const selectLocation = document.getElementById("location")
    selectLocation.innerHTML = data.name

    //set description
    const selectWeatherDescription = document.getElementById("weatherDescription")
    selectWeatherDescription.innerHTML = data.weather[0].description
    
    //set sunrise "the variable cascade hell-1"
    const selectSunraise = document.getElementById("sunraise")
    const sunriseTimeStamp = data.sys.sunrise*1000
    const sunriseTime = new Date (sunriseTimeStamp)
    const sunriseHours = sunriseTime.getHours()
    const sunriseMinutes = sunriseTime.getMinutes() 
    selectSunraise.innerHTML = `${sunriseHours}:${sunriseMinutes}`

    //set sunset "the variable cascade hell-2"
    const selectSunset = document.getElementById("sunset")
    const sunsetTimestamp = data.sys.sunset * 1000
    const sunsetTime = new Date (sunsetTimestamp)
    const sunsetHours = sunsetTime.getHours()
    const sunsetMinutes = sunsetTime.getMinutes()
    selectSunset.innerHTML = `${sunsetHours}:${sunsetMinutes}`
  })
  .catch ((error) =>{
    console.error(`Error fetching weather data:`, error)
  })
}

fetchWeaterData()