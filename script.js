//Containers for the DOM elements
const weatherContainer = document.getElementById('currentWeather')
const weatherApp = document.getElementById('weatherApp')
const currentTemperature = document.getElementById('currentTemperature')
const sunRiseSet = document.getElementById('sunRiseSet')
const cityTimeDesc = document.getElementById('cityTimeDesc')
const weatherForecast = document.getElementById('weatherForecast')

const searchMenuBtn = document.getElementById('searchMenuBtn');
const closeSearchMenu = document.getElementById('closeSearchMenu');
const searchBtn = document.getElementById('searchBtn');
const inputField = document.getElementById('inputField');
//const switchFavoriteCity = document.getElementById('switchBtn');

//Create a search string
const appID = "d8d8bd8fc9a245def8c2bd16cb32ba83"
const units = "metric"
const baseURL = "https://api.openweathermap.org/data/2.5/"
const searchString = (searchTerm, searchCity) => {
    return (`${baseURL}${searchTerm}?q=${searchCity}&units=${units}&APPID=${appID}`)
}

//Fetch the API from Open Weather construct the current weather
fetch(searchString("weather", "Stockholm,Sweden"))
    .then((response) => {
        return response.json()})
    .then((json) => {
        let cityName = json.name
        let temperature = Math.round(json.main.temp*10)/10
        let weatherDescription = json.weather[0].description

        let sunrise = new Date (json.sys.sunrise * 1000)
        const sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short' })
        let sunset = new Date (json.sys.sunset * 1000)
        const sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short' })

        currentTemperature.innerHTML = `<p><div class ="tempNumber">${temperature}</div> <div class="degrees">°C</div></p>`
        cityTimeDesc.innerHTML += `<h1 class="cityFont">${cityName}</h1>`
        cityTimeDesc.innerHTML += `<p>${currentTime()}</p>`
        cityTimeDesc.innerHTML +=`<p class="weatherDescription">${weatherDescription}</p>`

        sunRiseSet.innerHTML +=`<p>sunrise ${sunriseTime}</p>`
        sunRiseSet.innerHTML +=`<p>sunset ${sunsetTime}</p>`
    })

//Fetch the API from Open Weather and construct a forecast for the coming 4-5 days
fetch(searchString("forecast", "Stockholm,Sweden"))
    .then((response) => (response.json()))
    .then((json) => {
        const noonWeather = json.list.filter((item) => item.dt_txt.includes("12:00:00"))

        let today = new Date().toDateString()
        let iterationNum = 1

        noonWeather.forEach((item) => {
            let day = new Date(item.dt_txt)
            let windSpeed = item.wind.speed

            let weatherIcon = createIcon(item.weather[0].icon)
            let weatherDescription = item.weather.description

            let temperature = Math.round(item.main.temp *10)/10

            if (day.toDateString() === today) {}
            else {
                addForecastRows(iterationNum, day, weatherIcon, weatherDescription, temperature, windSpeed)
                iterationNum ++
            }
        })
})

//Adding data from the fetched forcast to a div in the HTML
const addForecastRows = 
(iter, date, weatherIcon, weatherDescription, temperature, windSpeed) => {
    const forecastRow = document.getElementById(`forecastRow${iter}`)

    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    let dayOfWeek = weekDays[date.getDay()]
    forecastRow.innerHTML += `<p>${dayOfWeek}</p>`
    
    forecastRow.innerHTML += `<img src = "${weatherIcon}", alt = "${weatherDescription}", width = "60px"></img>`

    forecastRow.innerHTML += `<p>${temperature}°C</p>`

    forecastRow.innerHTML +=`<p>${windSpeed} m/s</p>`
}

//Function for current time
const currentTime = () => {
    let date = new Date()
    let hours = date.getHours()
        if (hours < 10) {
            hours = `0${hours}`
        }
    let minutes = date.getMinutes()
        if (minutes < 10) {
            minutes = `0${minutes}`
        }
    return `Time: ${hours}:${minutes}`
}

//Creating the icon's cource URL
const createIcon= (iconID) => {
    let base_URL = `https://openweathermap.org/img/wn/`
    let icon = iconID
    let end_URL = `@2x.png`

    return base_URL+icon+end_URL
}

//Capitalize the first letter
// const capitalize = (text) => {
//     let words = text.split(" ")

//     let index = 0

//     words.forEach((word) => {
//         const firstLetter = word.charAt(0).toUpperCase()
//         const restOfWord = word.slice(1).toLowerCase()

//         words[index] = firstLetter + restOfWord
//         index ++
//     })

//     let modifiedText = words.join(" ")
//     console.log(modifiedText)
// }

const toggleSearchField = () => {
    //This just controls the toggling between opening and closing the search field
    const searchToggler = document.getElementById('search-toggler');
    searchToggler.classList.toggle('hidden');
    closeSearchMenu.classList.toggle('hidden');
    searchMenuBtn.classList.toggle('hidden');
};

const searchFunction = () => {
    //This is for storing the user input from the search and pushing it into our fetching weather function later on
    
    let searchedCity = inputField.value

        //Use the city searched and inject into ""fetchWeather""" function:
        //weather.fetchWeather(searchedCity); //Skriv om till den vi använder
        todaysWeatherFeature(searchedCity);
        weatherForecastData(searchedCity);

        //Clears field & hides the input field:
        inputField.value = "";

        //Reset the weather forecast:
        forecastWeekdays.innerHTML = "";
        forecastIcon.innerHTML = "";
        forecastWind.innerHTML = "";
        forecastTemp.innerHTML = "";
};

//EVENT LISTENERS
//Eventlistener to toggle search field:
searchMenuBtn.addEventListener('click', toggleSearchField)
closeSearchMenu.addEventListener('click', toggleSearchField)
//Eventlistener to search through enter key also
searchBtn.addEventListener('click', searchFunction)
//Eventlistener to search through enter key also
inputField.addEventListener('keyup', function (event) {
    if (event.key == "Enter") {
        searchFunction();
      }
    }
);