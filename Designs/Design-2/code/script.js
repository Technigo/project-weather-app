const CURRENT_WEATHER_URL = "http://api.openweathermap.org/data/2.5/weather?q=Paris&units=metric&appid=9aeed004b4643ec679ac5d430384d994"
const FORECAST_URL = "http://api.openweathermap.org/data/2.5/forecast?q=Paris&units=metric&appid=9aeed004b4643ec679ac5d430384d994"

const cityName = document.getElementById("cityName")
const currentTemperature = document.getElementById("currentTemperature")
const sunrise = document.getElementById("sunrise")
const sunset = document.getElementById("sunset")
const currentWeatherContainer = document.getElementById("currentWeatherContainer")
const icon = document.getElementById("icon")
const weatherMessage = document.getElementById("weatherMessage")

//Getting current weather information and changing inner.HTML accordingly
fetch(CURRENT_WEATHER_URL)
    .then(response => {
        if(response.ok){
            return response.json()
        } else {
            throw "Something went wrong!"
        }
    })
    .then((data) => {
        console.log(data)
        //Solve the problem of proper timezone!!
        const sunriseDate = new Date((data.sys.sunrise + data.timezone) * 1000)
        const sunsetDate = new Date((data.sys.sunset + data.timezone) * 1000)

        const weatherDescription = data.weather[0].description   
        const cloudIcon = "../icons/noun_Cloud_1188486.svg"
        const sunglassesIcon = "../icons/noun_Sunglasses_2055147.svg"
        const umbrellaIcon = "../icons/noun_Umbrella_2030530.svg"
        
        //Showing temperature, sunrise, sunset and city name
        currentTemperature.innerHTML = `<p>${data.weather[0].main} | ${data.main.temp}<p>` 
        sunrise.innerHTML += `<p>Sunrise  ${sunriseDate.getHours()}:${sunriseDate.getMinutes()}:${sunriseDate.getSeconds()}<p>`
        sunset.innerHTML += `<p>Sunset ${sunsetDate.getHours()}:${sunsetDate.getMinutes()}:${sunsetDate.getSeconds()}<p>`
        cityName.innerHTML += `<h1>${data.name}<h1>`

        //Showing proper icon
        if (weatherDescription === "clear sky"){
            icon.innerHTML += `<img src=${sunglassesIcon}></img>`
            weatherMessage.innerHTML += `<h2>Get your sunnies on! ${data.name} is looking rather great today.</h2>`
        } else if (weatherDescription === "thunderstorm" || "rain" || "shower rain" || "snow"){
            icon.innerHTML += `<img src=${umbrellaIcon}> </img>`
            weatherMessage.innerHTML += `<h2>Don't forget your umbrella. It's wet in ${data.name} today.</h2>`
        } else {
            icon.innerHTML += `<img src=${cloudIcon}> </img>`
            weatherMessage.innerHTML += `<h2>Light a fire, get cosy ${data.name} is looking grey today.</h2>`
        }        
    })
    // Method to catch errors during fetch()
    .catch(error => { 
        currentWeatherContainer.innerHTML = `<h1>${error}. "Something went wrong!"<h1>`
    })

//Getting forecast weather information and changing inner.HTML accordingly
fetch(FORECAST_URL)
    .then(response => {
        if(response.ok){
            return response.json()
        } else {
            throw "Something went wrong!"
        }
    })
    .then((data) => {
        console.log(data)
           
    })
    
    // Method to catch errors during fetch()
    .catch(error => { 
        currentWeatherContainer.innerHTML = `<h1>${error}. "Something went wrong!"<h1>`
    })

