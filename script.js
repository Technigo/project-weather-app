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

// function to convert the

// update HTML
const updateHTML = (data) => {
    console.log(data)

    // method to round the temperatures
    const roundedTemp = Math.round(data.main.temp)

    // the local time for the specific city
    // const localOffset = getLocalOffset(data.coord.lat, data.coord.lon)
    const sunriseTime = convertUnixToTime(data.sys.sunrise, data.timezone)
    const sunsetTime = convertUnixToTime(data.sys.sunset, data.timezone)

    temperature.innerText = `${roundedTemp}°C`
    weather.innerText = data.weather[0].description
    cityName.innerText = data.name
    sunrise.innerText = sunriseTime
    sunset.innerText = sunsetTime
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
        console.log(data)
        updateHTML(data)

    } catch (error) {
        console.log(error)
    }
}

// Update forecast HTML
const updateForecastHTML = (dataForecast) => {



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

    } catch (error) {
        console.log(error)
    }
}


// Event Listener to open the search window
menu.addEventListener("click", () => {
    searchWindow.style.display = "block"
})

// To close the search window users can either click on the X or somewhere else on the window 

closeWindow.addEventListener("click", () => {
    console.log("hi")
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
