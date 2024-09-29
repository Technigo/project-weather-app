//API URL and Endpoints
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?"
const forecastBaseURL = "https://api.openweathermap.org/data/2.5/forecast?"
const api_key = "617b18d1663716ef276314bb0808d62b"

// DOM Selectors
const cityName = document.getElementById("city")
const description = document.getElementById("description")
const temperature = document.getElementById("temperature")
const sunriseTime = document.getElementById("sunrise")
const sunsetTime = document.getElementById("sunset")
const fiveDayForecast = document.getElementById('five-day-forecast')

//Array with weekdays 
const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        
//Fetch todays weather
const fetchTodaysWeatherAsync = async (city) => {
    const todayURL = `${BASE_URL}q=${city}&units=metric&APPID=${api_key}`
    // units=metric to get temperatures in Celcius
    try {
        const response = await fetch(`${todayURL}`)
        if (!response.ok) {
            throw new Error("Failed to fetch today's weather data")
        }
        //convert response to JSON
        const data = await response.json()

        //Update DOM with today's weather data
        cityName.innerHTML = data.name
        temperature.innerHTML = `${Math.round(data.main.temp)} °C`
        description.innerHTML = data.weather[0].description
        //Convert Sunset/Sunrise from seconds to milliseconds by multiplying by 1000, which the date object requires 
        const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString()
        const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString()
         
        sunriseTime.innerHTML = `Sunrise: ${sunrise}`;
        sunsetTime.innerHTML = `Sunset: ${sunset}`
        //sunriseTime.innerHTML = data.sys.sunrise
        //sunsetTime.innerHTML = data.sys.sunset
    } catch (error) {
     //Handle any errors 
    console.error("Error when fetching Today's weather", error)
     }
}
fetchTodaysWeatherAsync("Las Vegas")

//Fetch forecast weather
const fetchForecastWeatherAsync = async (city) => {
    const forecastURL = `${forecastBaseURL}q=${city}&units=metric&appid=${api_key}`
     // units=metric to get temperatures in Celcius
    try {
        const response = await fetch(`${forecastURL}`)
        if (!response.ok) {
            throw new Error("Failed to fetch forecast weather data")
        }
        //convert response to JSON
        const data = await response.json()

        //Filter forecast on 12:00
        const filteredForecast = data.list.filter(forecast => {
            const forecastDate = new Date(forecast.dt_txt)
            return forecastDate.getHours() === 12
        })

            filteredForecast.forEach(forecast => {
                let forecastDate = new Date(forecast.dt_txt)//Convert date to Date const
                let dayName = weekdays[forecastDate.getDay()] // Get weekday
                
                //Update HTML with weekday and temperture
                fiveDayForecast.innerHTML += `<p>${dayName}: ${Math.round(forecast.main.temp)} °C</p>`

                
                console.log(`Day: ${dayName}, Temp: ${forecast.main.temp} °C`)
        })
    } catch (error) {
     //Handle any errors 
    console.error("Error when fetching the forecast", error)
     }
}
fetchForecastWeatherAsync("Las Vegas")