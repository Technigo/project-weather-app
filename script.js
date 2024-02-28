//DOM selectors here:
const selectWeatherImg = document.getElementById("weatherImg")


//create a fench function to log the data from the API
const fenchWeaterData = () =>{
  fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=69cc94dd08e05801b495ee1b7a9cba03")
  .then((response)=>{
    return response.json()
  })
  .then((data)=>{
    console.log(data)
    console.log(data.main)
    //set main temperature
    const selectNowsTemperature = document.getElementById("nowsTemperature")
    selectNowsTemperature.innerHTML = data.main.temp
    //set location
    const selectLocation = document.getElementById("location")
    selectLocation.innerHTML = data.name
    //set description
    const selectWeatherDescription = document.getElementById("weatherDescription")
    selectWeatherDescription.innerHTML = data.weather[0].description
    //set sunrise
    const selectSunraiseSunset = document.getElementById("sunraiseSunset")
    selectSunraiseSunset.innerHTML = data.sys.sunrise    
  })
  .catch ((error) =>{
    console.error(`Error fetching weather data:`, error)
  })
}

fenchWeaterData()