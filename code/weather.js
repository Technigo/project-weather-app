//API KEY used for both current weather and forecast
const apiKey = "c2889b12ee617ea787319a19a98a5906"

//Current Weather variables
const currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=Toronto,Canada&units=metric&APPID=c2889b12ee617ea787319a19a98a5906"
const city = 'Toronto, ON'
const date = document.getElementById('date')
const temperature = document.getElementById('temperature')
const description = document.getElementById('description')
const tempFeelsLike = document.getElementById('feelsLike')
const tempHigh = document.getElementById('H')
const tempLow = document.getElementById('L')
const sunrise = document.getElementById('sunriseTO')
const sunset = document.getElementById('sunsetTO')
const body = document.getElementsByTagName('body')[0]

//FUNCTION CURRENT WEATHER
const currentWeatherToday = (json) => {
    temperature.innerHTML = `${json.main.temp.toFixed(0.5)} °C`
    city.innerHTML = json.name
    date.innerHTML = new Date().toLocaleString('en-US', { timeZone: 'Canada/Eastern', weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    description.innerHTML = json.weather[0].description.toUpperCase()
    iconUpdate(json.weather[0].main)
    changeBackground(json)
    tempFeelsLike.innerHTML = `${json.main.feels_like.toFixed(0.5)} °C`
    tempHigh.innerHTML = `${json.main.temp_max.toFixed(0.5)} °C`
    tempLow.innerHTML = `${json.main.temp_min.toFixed(0.5)} °C`

    //Sunrise in Toronto
    let timezoneSunrise = json.sys.sunrise
    const sunriseToronto = new Date((timezoneSunrise + json.timezone) * 1000)
    const sunriseTorontoTime = sunriseToronto.toLocaleTimeString('en-CA', { timeStyle: 'short' })
    sunrise.innerHTML = sunriseTorontoTime

    //Sunset in Toronto
    let timezoneSunset = json.sys.sunset
    const sunsetToronto = new Date((timezoneSunset + json.timezone) * 1000)
    const sunsetTorontoTime = sunsetToronto.toLocaleTimeString('en-CA', { timeStyle: 'short' })
    sunset.innerHTML = sunsetTorontoTime
}
//Changing icons depending on visibility ('description')
const iconUpdate = (weather) => {
    if (weather == 'Clouds') {
        document.getElementById('visibilityIcon').src = 'assets/cloudyy.png'
    } if (weather == 'Rain') {
        document.getElementById('visibilityIcon').src = 'assets/rain.png'
    } if (weather == 'Clear' || weather == 'Sunny') {
        document.getElementById('visibilityIcon').src = 'assets/sun.png'
    } if (weather == 'Mist') {
        document.getElementById('visibilityIcon').src = 'assets/mist.png'
    } if (weather == 'Fog') {
        document.getElementById('visibilityIcon').src = 'assets/brokencloud.png'
    } if (weather == 'Snow') {
        document.getElementById('visibilityIcon').src = 'assets/snow.png'
    } if (weather == 'Hail') {
        document.getElementById('visibilityIcon').src = 'assets/hail.png'
    } if (weather == 'Thunder') {
        document.getElementById('visibilityIcon').src = 'assets/thunder.png'
    } if (weather == 'Haze') {
        document.getElementById('visibilityIcon').src = 'assets/thunder.png'
    }
}
//CHANGING BACKGROUND DEPENDING ON TEMP
const changeBackground = (json) => {
    if (json.main.temp.toFixed(0.5) <= 10 || json.main.feels_like.toFixed(0.5) <= 10) {
        body.classList.add('cold')
    } else if (json.main.temp.toFixed(0.5) >= 22 || json.main.feels_like.toFixed(0.5) >= 2) {

        body.classList.add('warm')
    }
}
//Fetch with JSON - Current Weather
fetch(currentWeatherUrl)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        currentWeatherToday(json)
    })

// Five day forecast variables
const weatherForecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=Toronto,Canada&units=metric&APPID=c2889b12ee617ea787319a19a98a5906"
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const today = new Date()
const days = today.getDay()


//FUNCTION FORECAST
const updateMinMaxTemps = (data) => {
    let minMaxTemps = {}

    data.list.forEach((item) => {
        const currentDate = item.dt_txt.split(" ")[0]

        if (minMaxTemps[currentDate]) {
            if (item.main.temp_min < minMaxTemps[currentDate].minTemp) {
                minMaxTemps[currentDate].minTemp = item.main.temp_min
            }
            if (item.main.temp_max > minMaxTemps[currentDate].maxTemp) {
                minMaxTemps[currentDate].maxTemp = item.main.temp_max
            }
        } else {
            const date = new Date(item.dt * 1000)
            const trueDate = date.getDay()
            minMaxTemps[currentDate] = {
                minTemp: item.main.temp_min,
                maxTemp: item.main.temp_max,
                dayOfWeek: weekDays[trueDate].toUpperCase()
            }
        }
    })
    for (const date in minMaxTemps) {
        const forecast = document.getElementById('weatherForecast')
        forecast.innerHTML += `<div class="column">${minMaxTemps[date].dayOfWeek}</div>`
        forecast.innerHTML += `<div class="column">${minMaxTemps[date].minTemp.toFixed(0.5)} °C | ${minMaxTemps[date].maxTemp.toFixed(0.5)} °C </div>`
    }
}
// Fetch 5 day Forecast Data
fetch(weatherForecastUrl)
    .then((response) => { return response.json() })
    .then((data) => { updateMinMaxTemps(data) })
