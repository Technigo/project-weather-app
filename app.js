const weatherToday = 'http://api.openweathermap.org/data/2.5/weather?q=Gamleby,Sweden&units=metric&APPID=6ce5bf72d646ddeec36c25915a5c0762'
const weatherForecast = 'http://api.openweathermap.org/data/2.5/forecast?q=Gamleby,Sweden&units=metric&APPID=6ce5bf72d646ddeec36c25915a5c0762'

const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')
const temp = document.getElementById('temp')
const icon = document.getElementById('icon')

fetch(weatherToday)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        updateWeatherToday(json)
    })

fetch(weatherForecast)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(json)
        updateWeatherForecast(json)
    })

const updateWeatherToday = (todayWeatherJson) => {
    document.getElementById('city').innerHTML = todayWeatherJson.name
    document.getElementById('description').innerHTML = todayWeatherJson.weather[0].description

    // Calculate the time to readable format.
    const sunriseTime = new Date(todayWeatherJson.sys.sunrise * 1000)
    const sunriseTimeString = sunriseTime.toLocaleTimeString('en-US', {
        timestyle: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    })

    const sunsetTime = new Date(todayWeatherJson.sys.sunset * 1000)
    const sunsetTimeString = sunsetTime.toLocaleTimeString('en-US', {
        timestyle: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    })

    // Check the time of day and displays night or daytime.
    const now = new Date()
    if (now < sunriseTime || now > sunsetTime) {
        document.getElementById('daily-weather').classList.toggle("daytime")
    }

    sunrise.innerHTML = `sunrise ${sunriseTimeString}`
    sunset.innerHTML = `sunset ${sunsetTimeString}`
    temp.innerHTML = `${Math.round(todayWeatherJson.main.temp)}° `

    const icon = document.getElementById('icon')
    icon.src = `images/${todayWeatherJson.weather[0].icon}.png`
}

const updateWeatherForecast = (weatherForecastJson) => {

    // Filtered data so it only picks the 12:00 data everyday.
    const filteredForecast = weatherForecastJson.list.filter(item => item.dt_txt.includes('12:00'))

    filteredForecast.forEach((day, index) => {

        //The variable saves the element(day) that matches the HTML id. Plus in index is so it gets on the right day because index 0. 
        const dayName = document.getElementById(`day${index + 1}-name`)

        //Calculates the new date from milliseconds to a readeble day date...
        const dayDate = new Date(day.dt * 1000)

        // ... and calculate witch day it is and gives it a shorter name
        const dayString = dayDate.toLocaleDateString('en-US', {
            weekday: 'short'
        })

        // Show the name of the day on the site
        dayName.innerHTML = dayString

        // The varieble saves the element (day) that matches the HTML id.
        const dayIcon = document.getElementById(`day${index + 1}-icon`)

        //the icon is selected from the json and finds the match in my image file
        dayIcon.src = `images/${day.weather[0].icon}.png`

        // the varieble saves the temprature for the days weather, 
        const tempDay = document.getElementById(`day${index + 1}-temp`)

        // rounds it up so there's no decimals
        tempDay.innerHTML = `${Math.round(day.main.temp)}°`
    })
}
