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
//testFunction(FORECAST_URL, cityName)
//testFunction(CURRENT_URL, cityName)

// loads and prints the current weather div info
const loadCurrentWeather = (cityName) => {
    fetch(`${CURRENT_URL}${cityName}${URL_SUFFIX}`)
    .then(response => {
        return response.json()
    }).then(json => {
       
        document.getElementById("city-name").innerHTML = cityName
        document.getElementById("current-temperature").innerHTML = json.main.temp.toFixed(1)
        document.getElementById("weather-description").innerHTML = json.weather[0].main
        
        const sunrise = new Date(json.sys.sunrise*1000)
        document.getElementById("sunrise").innerHTML = `Sunrise: ${sunrise.getHours()}:${sunrise.getMinutes()}`
        
        const sunset = new Date(json.sys.sunset*1000)
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
const loadForecastedWeather = (cityName) => {
    fetch(`${FORECAST_URL}${cityName}${URL_SUFFIX}`)
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

cityName = "Norsjö"
console.log(cityName)

loadCurrentWeather(cityName)
loadForecastedWeather(cityName)