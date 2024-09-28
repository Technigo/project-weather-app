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
// const minMaxTemp0 = document.getElementById('minMaxTemp0')
// const minMaxTemp1 = document.getElementById('minMaxTemp1')
// const minMaxTemp2 = document.getElementById('minMaxTemp2')
// const minMaxTemp3 = document.getElementById('minMaxTemp3')
// const minMaxTemp4 = document.getElementById('minMaxTemp4')
// const weekday0 = document.getElementById('weekday0')


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

// update HTML
const updateHTML = (data) => {
    console.log(data)

    // method to round the temperatures
    const roundedTemp = Math.round(data.main.temp)

    // the local time for the specific city
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
        // console.log(data)
        updateHTML(data)

    } catch (error) {
        console.log(error)
    }
}

// update HTML for forecast weather

// Array with weekdays
const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fr', 'Sat', 'Sun']

// Function for HTML inputs
const updateForecastHTML = (dataForecast) => {
    console.log(dataForecast)

    const forecasts = dataForecast.list

    // filters the forecast for 3 PM each day
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

    // Loop to get the weekdays 
    for (let i = 0; i < 5; i++) {
        const minTemp = Math.round(filteredMinForecasts[i].main.temp)
        const maxTemp = Math.round(filteredMaxForecasts[i].main.temp)

        // get weekdays
        const dateTime = new Date(filteredMinForecasts[i].dt_txt)
        const dayOfWeek = weekdays[dateTime.getDay()]

        forecastHTML += `
        <div class="weather-day">
                <p class="weekday">${dayOfWeek}</p>
                <div class="forecast-image">S</div>
                <p class="forecast-temperature">${minTemp}° / ${maxTemp}°C</p>
            </div>
        `
    }

    forecastContainer.innerHTML = forecastHTML
}
//     

//     minMaxTemp0.innerText = `${minTemp0}° / ${maxTemp0}°C`

//     const minTemp1 = Math.round(filteredMinForecasts[1].main.temp)
//     const maxTemp1 = Math.round(filteredMaxForecasts[1].main.temp)

//     minMaxTemp1.innerText = `${minTemp1}° / ${maxTemp1}°C`

//     const minTemp2 = Math.round(filteredMinForecasts[2].main.temp)
//     const maxTemp2 = Math.round(filteredMaxForecasts[2].main.temp)

//     minMaxTemp2.innerText = `${minTemp2}° / ${maxTemp2}°C`

//     const minTemp3 = Math.round(filteredMinForecasts[3].main.temp)
//     const maxTemp3 = Math.round(filteredMaxForecasts[3].main.temp)

//     minMaxTemp3.innerText = `${minTemp3}° / ${maxTemp3}°C`

//     const minTemp4 = Math.round(filteredMinForecasts[4].main.temp)
//     const maxTemp4 = Math.round(filteredMaxForecasts[4].main.temp)

//     minMaxTemp4.innerText = `${minTemp4}° / ${maxTemp4}°C`


//     const dayOfWeek = new Date(date).toLocaleDateString('en-GB', { weekday: 'short' })
// }



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
