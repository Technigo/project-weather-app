const API_KEY = "ad96db07a123e6ca29acb372e202f428" // Should be put in a file that is not committed to Github but let's skip it for now.
// some global constants
const FORECAST_URL = "http://api.openweathermap.org/data/2.5/forecast?q="
const CURRENT_URL = "http://api.openweathermap.org/data/2.5/weather?q="
const URL_SUFFIX = `&units=metric&appid=${API_KEY}`
const FORECAST_TIME_OF_DAY = 15 //The time of day (+- 1 hour) that the forecast should take

const WEEKDAY_SHORT = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
]

// A  weather URL is made up of xxx_URL + cityName + URL_SUFFIX. Should use country code to avoid duplicate cities but let's keep it simple for now...

// object containing the weather apps relevant information 
const mainCityWeather = {
    name: "",
    currentWeather: {
        temp: "",
        description: "",
        sunrise: "",
        sunset: ""
    }
}
// add test attributes

// function to test the API, not used
let testFunction = (requestTypeUrl, cityName) => {
    console.log("Started testFunction.")
    fetch(`${requestTypeUrl}${cityName}${URL_SUFFIX}`).then((response) => {
        console.log("1.")
        return response.json()
    }).then((json) => {
        console.log("2.")
        console.log(json)
    }).catch ((err) => {
        console.error("Error.", json)
    })
    console.log("Finished testFunction.")
}
//testFunction(FORECAST_URL, mainCityWeather.name)
//testFunction(CURRENT_URL, mainCityWeather.name)

// loads and prints the current weather div info
const loadCurrentWeather = (obj) => {
    fetch(`${CURRENT_URL}${obj.name}${URL_SUFFIX}`)
    .then(response => {
        return response.json()
    }).then(json => {
        // Hmm, will likely not need to add this to an object...
        obj.currentWeather.temp = json.main.temp.toFixed(1)
        obj.currentWeather.description = json.weather[0].main
        obj.currentWeather.sunrise = json.sys.sunrise
        obj.currentWeather.sunset = json.sys.sunset
        
        // Instead only populate the DOM as it's async (cannot populate DOM before promise is received)
        document.getElementById("city-name").innerHTML = mainCityWeather.name
        document.getElementById("current-temperature").innerHTML = mainCityWeather.currentWeather.temp
        document.getElementById("weather-description").innerHTML = mainCityWeather.currentWeather.description
        
        const sunrise = new Date(mainCityWeather.currentWeather.sunrise*1000)
        document.getElementById("sunrise").innerHTML = `Sunrise: ${sunrise.getHours()}:${sunrise.getMinutes()}`
        
        const sunset = new Date(mainCityWeather.currentWeather.sunset*1000)
        document.getElementById("sunset").innerHTML = `Sunset: ${sunset.getHours()}:${sunset.getMinutes()}`
        // console.log(json)
    })
}

//selects the weather at 3pm each day
const forecastSelector = (element) => {
    const elementDate = new Date(element.dt*1000)
    
    
    if (elementDate.getDate() == (new Date()).getDate()) {
        // Skip today's date in the forecast
        return false
    } else if (elementDate.getHours() >= (FORECAST_TIME_OF_DAY - 1) && elementDate.getHours() <= (FORECAST_TIME_OF_DAY + 1)) {
        // Only take accept the weather that is closest to the predefined time
        return true
    }
    return false
}

// loads and prints the forecasted div info
const loadForecastedWeather = (obj) => {
    fetch(`${FORECAST_URL}${obj.name}${URL_SUFFIX}`)
    .then(response => {
        return response.json()
    }).then(json => {
        console.log(json)
        let weatherList = document.getElementById("forecast-weather-list")
        let forecastList = json.list
        forecastList.forEach(element => {
            if (!forecastSelector(element)) { // 
                return
            }
                const elementDate = new Date(element.dt*1000)
                
                const liNode = document.createElement("LI") // Main li element
                
                // Create all Nodes
                const dayNode = document.createElement("P") // Holder for day (Mon/Tue/...)
                const imgNode = document.createElement("IMG") // Holder for img
                const tempNode = document.createElement("P") // Holder temperature

                // Add content to all Nodes
                dayNode.appendChild(document.createTextNode(`${WEEKDAY_SHORT[elementDate.getDay() - 1]}`))
                imgNode.src = `http://openweathermap.org/img/wn/${element.weather[0].icon.substring(0,2)}d@2x.png` // force to use "Day symbol"
                tempNode.appendChild(document.createTextNode(`${element.main.temp.toFixed(1)}`))
                
                // Add all nodes to liNode
                liNode.appendChild(dayNode)
                liNode.appendChild(imgNode)
                liNode.appendChild(tempNode)
                weatherList.appendChild(liNode)
        })

        
    })
}

mainCityWeather.name = "Norsjö"
console.log(mainCityWeather)

loadCurrentWeather(mainCityWeather)
loadForecastedWeather(mainCityWeather)