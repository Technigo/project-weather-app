// All the DOM selectors stored as short variables
const shortDescription = document.getElementById("shortDescription")
const body = document.getElementById("body")
const temperature = document.getElementById("temperature")
const sunrise = document.getElementById("sunrise")
const sunset = document.getElementById("sunset")
const feelsLike = document.getElementById("feels-like")
const forecast = document.getElementById("forecast")
const cityName = document.getElementById("city")
const icon = document.getElementById("icon")
const openListPopup = document.getElementById("cities-popup")
const closeList = document.getElementById("close")
const citiesList = document.getElementById("cities-popup-list")

// Global variables
const API_KEY = "3d7fce6feca82d6b1a292f951247862b"
const cities = ["Stockholm", "Barcelona", "Berlin","London","Milan","Madrid","Paris","Copenhagen","Rome","Moskva"]

/***** CURRENT DAY INFORMATION *****/
// Function to call the current day Fect and recall it when one city is selected. 

const fetchCurrentDay=(city)=>{
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${API_KEY}`)
    .then((response) => {
        return response.json()
        
    })

    .then((json) => {
        body.classList =''
        temperature.innerHTML = `${Math.round(json.main.temp * 10) / 10}°C`
        cityName.innerHTML = `${json.name}`
        icon.src= `assets/${weatherIcon(json.weather[0].main)}`
        shortDescription.innerHTML = `${json.weather[0].description}`
        sunrise.innerHTML = `Sunrise ${hourConversion(json.sys.sunrise)}`
        sunset.innerHTML = `Sunset ${hourConversion(json.sys.sunset)}`
        feelsLike.innerHTML = `Feels Like ${Math.round(json.main.feels_like)}°C`
        body.classList.add(json.weather[0].main.toLowerCase())
        closeCitiesList()
        
   })
/****** WEATHER FORECAST *****/

//https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=3d7fce6feca82d6b1a292f951247862b

fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${API_KEY}`)
    .then((response) => {
        return response.json()
    })

    .then((json) => {
        forecast.innerHTML =  ''
        const filteredForecast = json.list.filter((forecastDay) => {
            return forecastDay.dt_txt.includes('12:00')
        })

        filteredForecast.forEach((forecastDay) => {
            forecast.innerHTML += `
            <div class="forecast-grid">
                <div class="days">
                    <h3>${getWeekday(forecastDay.dt_txt)}</h3>
                </div>
                <div class="weather-type">
                    <img src="assets/${weatherIcon(forecastDay.weather[0].main)}">
                </div>
                <div class="min-temp">
                    <h3>${Math.round(forecastDay.main.temp_min)}°C</h3>
                </div>
                <div class="max-temp">
                    <h3>${Math.round(forecastDay.main.temp_max)}°C</h3>
                </div>
            </div>`
        })

    })
}

//function to convert milliseconds to hours and minutes
const hourConversion = (milliseconds) => {
    let unitTime = milliseconds * 1000;
    let date = new Date(unitTime).toLocaleTimeString();
    return date
}
//function to get the index of each day
const getWeekday = (weekdate) => {
    const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const weekdayNumber = new Date(weekdate).getDay()
    return week[weekdayNumber]
}
//Function to select icon image per weather
const weatherIcon = (weatherDescription) => {
    if (weatherDescription === 'Clear') {
        return 'clear-day.svg'
    } else if (weatherDescription === 'Clouds') {
        return 'cloudy.svg'
    } else if (weatherDescription === 'Drizzle') {
        return 'light-rain.svg'
    } else if (weatherDescription === 'Rain') {
        return 'rain.svg'
    } else if (weatherDescription === 'Snow') {
        return 'snow.svg'
    } else if (weatherDescription === 'Mist') {
        return 'mist.svg'
    } else if (weatherDescription === 'Thunderstorm') {
        return 'thunderstorms.svg'
    } else {
        return 'unknown_.svg'
    }
}
//***** MODAL TO DISPLAY CITIES *****/ */
const renderCitiesList = () =>{
    cities.forEach((cityListName)=>{
        citiesList.innerHTML +=`
        <li onclick="fetchCurrentDay('${cityListName}')">${cityListName}</li> `
    })
}
// open / close popup
const openCitiesList = () => {
    openListPopup.classList.add("cities-popup-on")
}
const closeCitiesList = () => {
    openListPopup.classList.remove("cities-popup-on")
}

//Start function calle it when the page is loaded. 
cityName.addEventListener('click', openCitiesList)
closeList.addEventListener('click', closeCitiesList)
renderCitiesList()
fetchCurrentDay("Stockholm")

