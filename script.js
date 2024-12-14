const BASE_URL = "https://api.openweathermap.org/data/2.5/"
const API_KEY = "72e635da2875c352d9f726550253e2db"

const menu = document.getElementById('hamburgerMenu')
const searchWindow = document.getElementById('searchLocationWindow')
const closeWindow = document.getElementById('closeWindow')
const searchButton = document.getElementById('searchLocationButton')
const cityInput = document.getElementById('searchCity')
const temperature = document.getElementById('temp')
const weather = document.getElementById('weather')
const cityName = document.getElementById('cityName')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')
const iconCurrent = document.getElementById('currentWeatherImage')
const header = document.getElementById('header')

// function to create new URL for forecast based on the users input
const createForecastURL = (cityName) => {
    return `${BASE_URL}forecast?q=${cityName}&units=metric&APPID=${API_KEY}`
}

// function to create new URL for current weather based on the users input
const createURL = (cityName) => {
    return `${BASE_URL}weather?q=${cityName}&units=metric&APPID=${API_KEY}`
}

// function to convert Unix-time into hours:minutes
const convertUnixToTime = (unixTime, timeZone) => {
    const time = unixTime * 1000
    const date = new Date(time)
    const localTime = new Date(date.getTime() + timeZone * 1000)
    const hours = localTime.getUTCHours()
    const minutes = "0" + localTime.getUTCMinutes()
    return `${hours}:${minutes.substr(-2)}`
}

// to get the weather data for the current weather
const fetchWeatherData = async (cityName) => {
    const URL = createURL(cityName)
    try {
        const response = await fetch(URL)
        if (!response.ok) {
            throw new Error('Failed to fetch weather data')
        }
        const data = await response.json()
        updateHTML(data)
    } catch (error) {
        console.log(error)
    }
}

// to get the forecast weather data
const fetchForecastData = async (cityName) => {
    const URLForecast = createForecastURL(cityName)
    try {
        const response = await fetch(URLForecast)
        if (!response.ok) {
            throw new Error('Failed to fetch forecast weather data')
        }
        const dataForecast = await response.json()
        console.log(dataForecast)
        updateForecastHTML(dataForecast)
    } catch (error) {
        console.log(error)
    }
}

// update HTML current weather
const updateHTML = (data) => {
    cityName.innerText = data.name
    weather.innerText = data.weather[0].description

    // method to round the temperatures
    const roundedTemp = Math.round(data.main.temp)
    temperature.innerText = `${roundedTemp}°C`

    // the local time for the specific city
    const sunriseTime = convertUnixToTime(data.sys.sunrise, data.timezone)
    const sunsetTime = convertUnixToTime(data.sys.sunset, data.timezone)

    sunrise.innerText = sunriseTime
    sunset.innerText = sunsetTime

    const currentTime = Math.floor(Date.now() / 1000)

    // Icon
    const iconCode = data.weather[0].icon
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`

    iconCurrent.innerHTML = `<img class="icon-big" src="${iconUrl}" alt="Weather Icon">`

    // Day/Night Background Update
    const nightBackground = (currentTime, sunriseTime, sunsetTime) => {
        header.style.background = (currentTime < sunriseTime || currentTime > sunsetTime)
            ? "linear-gradient(90deg, #323667 50%, #6B6EA8 50%)"
            : ""
    }
    nightBackground(currentTime, data.sys.sunrise, data.sys.sunset)
}

// update HTML for forecast weather
// Array with weekdays
const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

// Function for HTML inputs
const updateForecastHTML = (dataForecast) => {
    const forecasts = dataForecast.list

    // filters the forecast for 12 AM (midnight) each day
    const filteredMinForecasts = forecasts.filter(minForecast => {
        const dateTime = new Date(minForecast.dt_txt)
        return dateTime.getHours() === 0
    })

    // filters the forecast for 12AM each day
    const filteredMaxForecasts = forecasts.filter(maxForecast => {
        const dateTime = new Date(maxForecast.dt_txt)
        return dateTime.getHours() === 12
    })
    let forecastHTML = ''

    // Loops
    for (let i = 0; i < 4; i++) {
        const minTemp = Math.round(filteredMinForecasts[i].main.temp)
        const maxTemp = Math.round(filteredMaxForecasts[i].main.temp)

        // Get the icon for the forecast
        const iconCode = filteredMinForecasts[i].weather[0].icon
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`

        // get weekdays
        const dateTime = new Date(filteredMaxForecasts[i].dt_txt)
        const dayOfWeek = weekdays[dateTime.getDay()]

        forecastHTML += `
        <div class="weather-day">
                <p class="weekday">${dayOfWeek}</p>
                <div class="forecast-image">
                <img class="forecast-icon "src="${iconUrl}" alt="Weather Icon">
                </div>
                <p class="forecast-temperature">${minTemp}° / ${maxTemp}°C</p>
            </div>
        `
    }
    forecastContainer.innerHTML = forecastHTML
}

// Event Listener to open the search window
menu.addEventListener("click", () => {
    searchWindow.style.display = "block"
    cityInput.value = ""
})

// To close the search window users can either click on the X or somewhere else on the window 
closeWindow.addEventListener("click", () => {
    searchWindow.style.display = "none"
})
searchWindow.addEventListener("click", (event) => {
    if (event.target == searchWindow) {
        searchWindow.style.display = "none"
    }
})

// Event-Listener to be able to search a cities
searchButton.addEventListener("click", () => {
    // gets the name of the city from the input field
    const city = cityInput.value
    console.log(city)
    if (city) {
        fetchWeatherData(city)
        fetchForecastData(city)
        searchWindow.style.display = "none"
    } else (
        console.log("please enter a city name")
    )
})