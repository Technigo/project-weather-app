
//API URL and Endpoints
const BaseURL = "https://api.openweathermap.org/data/2.5/weather?"
const api_key = ""
const city = "Stockholm,Sweden"

const todayURL = `${BaseURL}q=${city}&units=metric&APPID=${api_key}`
const forecastBaseURL = "https://api.openweathermap.org/data/2.5/forecast?"
const forecastURL = `${forecastBaseURL}q=${city}&units=metric&APPID=${api_key}`

// DOM Selectors
const cityName = document.getElementById("city")
const description = document.getElementById("description")
const temperature = document.getElementById("temperature")
const sunriseTime = document.getElementById("sunrise")
const sunsetTime = document.getElementById("sunset")

//Fetch todays weather
const fetchTodaysWeatherAsync = async () => {
    try {
        const response = await fetch(`${todayURL}`)
        //convert response to JSON
        const data = await response.json()
        console.log("Data is shown in JSON format: ", data)
        
        cityName.innerHTML = data.name
        temperature.innerHTML = `${data.main.temp} °C`
        description.innerHTML = data.weather[0].description
        sunriseTime.innerHTML = data.sys.sunrise
        sunsetTime.innerHTML = data.sys.sunset
    } catch (error) {
     //Handle any errors 
    console.error("Error when fetching Today's weather", error)
     }
}
fetchTodaysWeatherAsync()