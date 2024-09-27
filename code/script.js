//API URL and Endpoints
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?"
const api_key = "617b18d1663716ef276314bb0808d62b"
const city = "Stockholm,Sweden"
const LAT = "59.3326"
const LON = "18.0649"
const timestamps = 2

const todayURL = `${BASE_URL}q=${city}&units=metric&APPID=${api_key}`
const forecastBaseURL = "https://api.openweathermap.org/data/2.5/forecast?"
const forecastURL = `${forecastBaseURL}lat=${LAT}&lon=${LON}&cnt=${timestamps}&units=metric&appid=${api_key}`
// units=metric to get temperatures in Celcius

// DOM Selectors
const cityName = document.getElementById("city")
const description = document.getElementById("description")
const temperature = document.getElementById("temperature")
const sunriseTime = document.getElementById("sunrise")
const sunsetTime = document.getElementById("sunset")
const weekday = document.getElementById("weekday")

//Other variables
const date = new Date()

//Fetch todays weather
const fetchTodaysWeatherAsync = async () => {
    try {
        const response = await fetch(`${todayURL}`)
        //convert response to JSON
        const data = await response.json()
        //console.log("Data is shown in JSON format: ", data)
        
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

//Fetch forecast weather
const fetchForecastWeatherAsync = async () => {
    try {
        const response = await fetch(`${forecastURL}`)
        //convert response to JSON
        const data = await response.json()
        console.log("Forecast data is shown in JSON format: ", data)
        
    } catch (error) {
     //Handle any errors 
    console.error("Error when fetching the forecast", error)
     }
}
fetchForecastWeatherAsync()