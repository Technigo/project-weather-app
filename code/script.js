const containerWeather = document.querySelector("#container-weather")
const innerContainerWeather = document.querySelector("#inner-container-weather")
const containerForecast = document.querySelector("#container-forecast")
const hamburger = document.querySelector("#hamburger")
const menu = document.querySelector("#menu")
const cities = document.querySelectorAll(".cities")

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// fetches the data for a location from the API, creates HTML to display the main temperature, city name, weather description and time of sunrise and sunset
const getWeather = (location) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=bb54e9dec92e93ad760de1e57539382a`)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            let sunrise = new Date((data.sys.sunrise + data.timezone + (new Date().getTimezoneOffset() * 60)) * 1000)
            let sunset = new Date((data.sys.sunset + data.timezone + (new Date().getTimezoneOffset() * 60)) * 1000)
            innerContainerWeather.innerHTML = `
        <div class="main-weather">
        <img class="image-weather" src="./assets/${data.weather[0].main.toLowerCase()}.png">
        <div class="info-weather">
            <h1>${data.main.temp.toFixed(1)}<span>°C</span></h1>
            <h2>${data.name}</h2>
            <h3>${data.weather[0].description}</h3>
        </div>
        </div>
            <h3 class="sun">
                <span>sunrise</span>
                <span>${sunrise.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                <span>sunset</span>
                <span>${sunset.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </h3>    
        `
            // changes background color depending on time of day
            if (Date.now() < (data.sys.sunrise * 1000) || Date.now() > (data.sys.sunset * 1000)) {
                containerWeather.style.background = "linear-gradient(0deg, rgba(104,104,171,1) 0%, rgba(12,11,91,1) 100%)"
            } else {
                containerWeather.style.background = "linear-gradient(0deg, #d8d7ff 0%, #8fa9ff 100%)"
            }
        })
}


// fetches the forecast data for a location from the API, extracts min/max temperature, weekday and weather description, and creates HTML to display that
const getForecast = (location) => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&APPID=bb54e9dec92e93ad760de1e57539382a`)
        .then(response => response.json())
        .then((data) => {
            containerForecast.innerHTML = ""
            // these variables are declared outside of the loops because we will need to access them later
            let fiveDaysTempsMax = []
            let fiveDaysTempsMin = []
            let eachDayTempsMax = []
            let eachDayTempsMin = []
            let today = new Date(Date.now()).getDate()
            let measureDay = today + 1
            // this loop fills the fiveDaysTempsMax and the fiveDaysTempsMin arrays with 5 arrays,
            // consisting of the all measurements for max and min temperature for each day
            // it checks the date of each measurement (listedDay) and compares that to the day it's measuring (measureDay)
            for (let i = 0; i < data.list.length; i++) {
                let listedDay = new Date(data.list[i].dt * 1000).getDate()
                // this makes sure that the loop doesn't start capturing today's measurement (as it's a forecast, we want to start with tomorrow's measurements)
                if (listedDay !== today) {
                    // this code will read when the day changes
                    // it will push the arrays with a full day's measurement into the five days temps arrays, and empty them to start with the new day
                    // then it sets the day to measure (measureDay) as the new day that just started (listedDay)
                    if (listedDay !== measureDay) {
                        fiveDaysTempsMax.push(eachDayTempsMax)
                        fiveDaysTempsMin.push(eachDayTempsMin)
                        eachDayTempsMax = []
                        eachDayTempsMin = []
                        measureDay = listedDay
                    }
                    // this will always run, this is where the min / max temps measurements get pushed into each day's array
                    eachDayTempsMax.push(data.list[i].main.temp_max)
                    eachDayTempsMin.push(data.list[i].main.temp_min)
                }
            }
            // this pushes the last day's measurements into the big array
            fiveDaysTempsMax.push(eachDayTempsMax)
            fiveDaysTempsMin.push(eachDayTempsMin)

            // this loop reduces the max temperatures of all five day's of measurement to one max temperature for each day, rounded
            let maxTemps = []
            for (let eachDay of fiveDaysTempsMax) {
                let dailyMaxTemp = eachDay.reduce((accumulator, currentValue) => {
                    return (accumulator > currentValue ? accumulator : currentValue);
                })
                maxTemps.push(dailyMaxTemp.toFixed(1))
            }
            // this loop reduces the min temperatures of all five day's of measurement to one min temperature for each day, rounded
            let minTemps = []
            for (let eachDay of fiveDaysTempsMin) {
                let dailyMinTemp = eachDay.reduce((accumulator, currentValue) => {
                    return (accumulator < currentValue ? accumulator : currentValue);
                })
                minTemps.push(dailyMinTemp.toFixed(1))
            }

            //this loop captures the weekday and the main description of the weather for each day of the five-day-forecast at 9am
            let weekdays = []
            let descriptionWeather = []
            const filteredForecast = data.list.filter(item => item.dt_txt.includes('09:00'))
            for (let i = 0; i < filteredForecast.length; i++) {
                weekdays.push(days[new Date(filteredForecast[i].dt * 1000).getDay()])
                descriptionWeather.push(filteredForecast[i].weather[0].main.toLowerCase())
            }

            //finally, this loop creates the HTML and fills in the weekday, the main description of the weather,
            // and the max and min temperatures for each day
            for (let i = 0; i < 5; i++) {
                containerForecast.innerHTML += `
                    <div class="weekdays">
                        <span>${weekdays[i]}</span>
                        <span class="temperature">
                            <img src="./assets/${descriptionWeather[i]}.png">
                            <span>${maxTemps[i]}° / ${minTemps[i]}°C</span>
                        </span>
                    </div>
                `
            }
        })
}

// these run when the page is loaded, to have a default location shown
getWeather("Stockholm,Sweden")
getForecast("Stockholm,Sweden")

// opens and closes the hamburger menu
const toggle = () => {
    menu.classList.toggle("hidden")
}

// eventlisteners for hamburger menu and cities inside
hamburger.addEventListener("click", () => {
    toggle()
})

for (let city of cities) {
    city.addEventListener("click", () => {
        const value = city.innerText;
        getWeather(value)
        getForecast(value)
        toggle()
    })
}
