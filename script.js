//CONTAINERS for the DOM elements
const weatherContainer = document.getElementById('currentWeather')
const featureImage = document.getElementById('featureImage')
const weatherApp = document.getElementById('weatherApp')
const currentTemperature = document.getElementById('currentTemperature')
const sunRiseSet = document.getElementById('sunRiseSet')
const cityTimeDesc = document.getElementById('cityTimeDesc')
const weatherDescriptionIcon = document.getElementById('weatherDescriptionIcon')
const weatherForecast = document.getElementById('weatherForecast')

const searchMenuBtn = document.getElementById('searchMenuBtn');
const closeSearchMenu = document.getElementById('closeSearchMenu');
const searchBtn = document.getElementById('searchBtn');
const searchToggler = document.getElementById('search-toggler')
const currentLocBtn = document.getElementById('currentLocButton')
const inputField = document.getElementById('inputField');

//Create a search string
const appID = "d8d8bd8fc9a245def8c2bd16cb32ba83"
const units = "metric"
const baseURL = "https://api.openweathermap.org/data/2.5/"
const searchString = (searchTerm, searchCity) => {
    return (`${baseURL}${searchTerm}?q=${searchCity}&units=${units}&APPID=${appID}`)
}

//Creates the weather forecast and current weather with a city name as a parameter. Calls an API using fetch-then functions.
const todaysWeatherFeature = (city) =>{

    //Fetch the API from Open Weather to construct the current weather
    fetch(searchString("weather", city))
    .then((response) => {
        return response.json()})
    .then((json) => {
        
        let temperature = Math.round(json.main.temp)
        let cityName = json.name

        currentTemperature.innerHTML = `<p><div class ="tempNumber">${temperature}</div> <div class="degrees">°C</div></p>`
        cityTimeDesc.innerHTML += `<h1 class="cityFont">${cityName}</h1>`

        let weatherDescription = json.weather[0].description
        let weatherIcon = createIcon(json.weather[0].icon)

        cityTimeDesc.innerHTML +=`
        <div class="weatherDescriptionIcon">  
        <p class="weatherDescription">${weatherDescription}</p> 
        <img class="weatherIcon" src = "${weatherIcon}", alt = "${weatherDescription}", width = "50px">
        </img>
        </div>`

        const currentLocalTime = new Date((json.dt + json.timezone) * 1000)
        const timeNow = currentLocalTime.toLocaleTimeString([], {timeStyle: 'short', timeZone: 'UTC'})

        cityTimeDesc.innerHTML += `<p>${timeNow}</p>`

        let sunrise = new Date ((json.sys.sunrise + json.timezone) * 1000)
        let sunset = new Date ((json.sys.sunset + json.timezone) * 1000)
        const sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short', timeZone: 'UTC'})
        const sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short', timeZone: 'UTC'})
    
        sunRiseSet.innerHTML +=`<p>sunrise ${sunriseTime}</p>`
        sunRiseSet.innerHTML +=`<p>sunset ${sunsetTime}</p>`

        let weatherImg = json.weather[0].main
        switch (weatherImg) {
            case 'Clear':
                changeBackground('clear')
                stopRain()
                break
            case 'Clouds':
                changeBackground('clouds')
                stopRain()
                break
            case 'Drizzle':
                changeBackground('drizzle')
                stopRain()
                makeRain()
                break
            case 'Rain':
                changeBackground('rain')
                makeRain()
                break
            case 'Snow':
                changeBackground('snow')
                stopRain()
                break
            case 'Thunderstorm':
                changeBackground('thunderstorm')
                stopRain()
                break
            default:
                changeBackground('atmosphere')
                stopRain()
                break
        }

        dayNightOrDusk(sunriseTime, sunsetTime, currentLocalTime)
    })

//Fetch the API from Open Weather and construct a forecast for the coming 4-5 days
fetch(searchString("forecast", city))
    .then((response) => (response.json()))
    .then((json) => {

        const noonWeather = json.list.filter((item) => item.dt_txt.includes("12:00:00"))

        let today = new Date().toDateString()
        let iterationNum = 1

        const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

        noonWeather.forEach((item) => {

            let day = new Date(item.dt_txt)

            let weatherIcon = createIcon(item.weather[0].icon)
            let weatherDescription = item.weather.description

            let temperature = Math.round(item.main.temp *10)/10
            let windSpeed = item.wind.speed

            //If first forecast is for today, don't log it in forecast. Otherwise add all info to innerHTML
            if (day.toDateString() === today) {}
            else {
                const forecastRow = document.getElementById(`forecastRow${iterationNum}`)

                let dayOfWeek = weekDays[day.getDay()]
                forecastRow.innerHTML += `<p>${dayOfWeek}</p>`

                forecastRow.innerHTML += `<img src = "${weatherIcon}", alt = "${weatherDescription}", width = "60px"></img>`

                forecastRow.innerHTML += `<p>${temperature}°C</p>`
                forecastRow.innerHTML +=`<p>${windSpeed} m/s</p>`            

                iterationNum ++
            }
        })
    })
}

//Creating the icon's cource URL
const createIcon= (iconID) => {

    let base_URL = `https://openweathermap.org/img/wn/`
    let icon = iconID
    let end_URL = `@2x.png`

    return base_URL+icon+end_URL
}

//Toggles between open and closed search field when you click the magnifying glass or the cross
const toggleSearchField = () => {
    
    searchToggler.classList.toggle('hidden')
    closeSearchMenu.classList.toggle('hidden')
    searchMenuBtn.classList.toggle('hidden')
    currentLocBtn.classList.toggle('hidden')
}

//When searching for a new city. Saves the input as a variable and runs todaysWeatherFeature with this input. Clears the previous weather forecast
const searchFunction = () => {

    let searchedCity = inputField.value

        todaysWeatherFeature(searchedCity)

        //Clears field & hides the input field
        inputField.value = ""
        searchToggler.classList.add('hidden')
        closeSearchMenu.classList.add('hidden')
        searchMenuBtn.classList.toggle('hidden')
        currentLocBtn.classList.add('hidden')

        //Resets the weather forecast
        cityTimeDesc.innerHTML = ""
        sunRiseSet.innerHTML = ""
        forecastRow1.innerHTML =""
        forecastRow2.innerHTML =""
        forecastRow3.innerHTML =""
        forecastRow4.innerHTML =""
        forecastRow5.innerHTML =""
}

//Changes the backgroundimage
const changeBackground = (imgURL) => {

    featureImage.style.backgroundImage = 'url(img/' + imgURL + '.jpg)'
}

//Changes the backgroungimage if it's night or evening. Takes the current time, sunrise and sunset as parameters
const dayNightOrDusk = (sunriseTime, sunsetTime, timeNow) => {

    let hours = timeNow.toLocaleTimeString([],{hour: '2-digit', timeZone: 'UTC'})

    if (hours < sunriseTime.substring(0,2) || hours >= sunsetTime.substring(0,2)) {
        changeBackground('night')
    }
    else if (hours > (sunsetTime.substring(0,2) - 1)) {
        changeBackground('moon') 
    }
}

//When the current location button is clicked, it asks the user to accept geolocation, then calls the open weather API usin those long + lat to get the city name. With that, it resets todays WeatherFeature
const getCurrentLocation = () => {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition)
    } else {
        console.log("Geolocation is not supported by this browser.")
    }

    //Clears field & hides the input field
    inputField.value = ""
    searchToggler.classList.toggle('hidden')
    currentLocBtn.classList.toggle('hidden')
    
    //Resets the weather forecast
    cityTimeDesc.innerHTML = ""
    sunRiseSet.innerHTML = ""
    forecastRow1.innerHTML =""
    forecastRow2.innerHTML =""
    forecastRow3.innerHTML =""
    forecastRow4.innerHTML =""
    forecastRow5.innerHTML =""
    
    function showPosition(position) {
        let lat = position.coords.latitude
        let lon = position.coords.longitude
        let limit = 20

        fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${appID}`)
        .then((response) => response.json())
        .then((data) => {
            todaysWeatherFeature(data[0].name)
        })
    }
}

//Makes rain in the foreground if it rains in the forecast
const makeRain = () => {
    let hrElement //The individual raindrops
    let counter = 100

    //Creates 100 individual raindrops
    for (let i = 0; i < counter; i++) {
        hrElement = document.createElement("HR")

        //Randomizes the "starting position" of the raindrop starting from the left
        hrElement.style.left = Math.floor(Math.random() * window.innerWidth) + "px"
        //Randomizes the speed of the raindrop
        hrElement.style.animationDuration = 0.6 + Math.random() * 0.3 + "s"
        //Randomizes when the rain animation starts
        hrElement.style.animationDelay = Math.random() * 5 + "s"
        
        document.body.appendChild(hrElement)
      }
}

const stopRain = () => {
    const hrElement = document.getElementsByTagName('hr')
    
    for (i = 0; i < hrElement.length; i++) {
        hrElement[i].setAttribute('class', 'fadeOut')
    }
}

//START
todaysWeatherFeature("Stockholm, Sweden")


//EVENT LISTENERS

//Eventlistener to search by current location
currentLocBtn.addEventListener('click', getCurrentLocation)

//Eventlistener to toggle search field:
searchMenuBtn.addEventListener('click', toggleSearchField)
closeSearchMenu.addEventListener('click', toggleSearchField)

//Eventlistener to search through enter key also
searchBtn.addEventListener('click', searchFunction)

//Eventlistener to search through enter key also
inputField.addEventListener('keyup', function (event) {
    if (event.key == "Enter") {
        searchFunction()
      }
    }
)