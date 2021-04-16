// URL
const URLDAILYWEATHER = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=2ecf28ca2c29fa0578cb610c6c66c223'
const URLWEEKLYFORECAST = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=2ecf28ca2c29fa0578cb610c6c66c223'

// All the DOM selectors stored as short variables
const topDailyWeather = document.getElementById('topDailyWeather') 
const mainDailyWeather = document.getElementById('mainDailyWeather')
const weekForecast = document.getElementById('weekForecast')

// fetch URL for daily weather
fetch (URLDAILYWEATHER)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        //weather
        const fetchDailyWeather = data.weather[0].main 
        // temperature
        const temp = data.main.temp
        const roundedTemp = temp.toFixed(1)
        // sunrise and sunset
        const sunriseHour = new Date((data.sys.sunrise)*1000).toLocaleTimeString('se-SE', {hour:'numeric', minute: 'numeric'})
        const sunsetHour = new Date(data.sys.sunset*1000).toLocaleTimeString('se-SE', {hour:'numeric', minute: 'numeric'})
        topDailyWeather.innerHTML = `
        <div class="top-wraper">
            <p class="top-text">${fetchDailyWeather} ${roundedTemp}°</p>
            <p class="top-text">Sunrise ${sunriseHour}</p>
            <p class="top-text">Sunset ${sunsetHour}</p>
        </div>`

        // Todays weather
        const showDailyWeather = () => {
               if (fetchDailyWeather === "Drizzle") {
                    document.body.style.backgroundColor = "lightskyblue"
                    mainDailyWeather.innerHTML = `
                    <div class="main-wrapper">
                        <img class="weather_icon" src="./assets/004-rain.svg" alt="icon weather">
                        <h1 class="main-heading"> The weather in ${data.name} is drizzel, you might want an umbrella.</h1>
                    </div>`
               } else if (fetchDailyWeather === "Clear") {
                    document.body.style.backgroundColor = "#ffff84"
                    mainDailyWeather.innerHTML = `
                    <div class="main-wrapper">
                        <img class="weather_icon" src="./assets/001-sun.svg" alt="icon weather">
                        <h1 class="main-heading"> The weather in ${data.name} is sunny, don't forget your sunglases.</h1>
                    </div>`
               } else if (fetchDailyWeather === "Rain") {
                    document.body.style.backgroundColor = "darkgray"
                    mainDailyWeather.innerHTML = `
                    <div class="main-wrapper">
                        <img class="weather_icon" src="./assets/004-rain.svg" alt="icon weather">
                        <h1 class="main-heading"> The weather in ${data.name} is rainy, bring your raincoat.</h1>
                    </div>`
               } else if (fetchDailyWeather === "Thunderstorm") {
                    document.body.style.backgroundColor = "#395c83"
                    mainDailyWeather.innerHTML = `
                    <div class="main-wrapper">
                        <img class="weather_icon" src="./assets/010-thunderstorm.svg" alt="icon weather">
                        <h1 class="main-heading"> The weather in ${data.name} is stormy, better stay inside.</h1>
                     </div>`
               } else if (fetchDailyWeather === "Snow") {
                    document.body.style.backgroundColor = "lightblue"
                    mainDailyWeather.innerHTML = `
                    <div class="main-wrapper">
                        <img class="weather_icon" src="./assets/009-snowy.svg" alt="icon weather">
                        <h1 class="main-heading"> The weather in ${data.name} is snowy, bring out your skies.</h1>
                    </div>`
               } else if (fetchDailyWeather === "Clouds") {
                    document.body.style.backgroundColor = "lightskyblue"
                    mainDailyWeather.innerHTML = `
                    <div class="main-wrapper">
                        <img class="weather_icon" src="./assets/002-cloud.svg" alt="icon weather">
                        <h1 class="main-heading"> The weather in ${data.name} is cloudy, a perfect day to strole around.</h1>
                    </div>`
               } else {
                    document.body.style.backgroundColor = "#ebefef"
                    mainDailyWeather.innerHTML = `
                    <div class="main-wrapper">
                        <img class="weather_icon" src="./assets/030-haze.svg" alt="icon weather">
                        <h1 class="main-heading"> The weather in ${data.name} is foggy, dont get lost in the mist.</h1>
                    </div>`
               }
            }
            showDailyWeather()
    })

    .catch( err => {
    topDailyWeather.innerHTML = 'error!' + err
    mainDailyWeather.innerHTML = 'error!' + err

    })    

    // fetch URL for weekly forecast
    fetch (URLWEEKLYFORECAST)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            //filter forcast to get the weather 12:00 each day
            const filteredForcast = data.list.filter(item => item.dt_txt.includes('12:00'))

            // loopa through the array and return weather for each day
            filteredForcast.forEach((day)=>{
                const date = new Date (day.dt *1000)
                let dayName = date.toLocaleDateString('en-GB', {weekday:'long'})

                const iconWeeklyForecast = () => {
                    if (day.weather[0].main === "Drizzle") {
                        weekForecast.innerHTML += `
                        <div class="forecast-wraper">
                            <p>${dayName}</p>
                            <div class="forecast-content-wraper">
                                <img src="./assets/004-rain.svg" alt="icon weather">
                                <p>${day.main.temp.toFixed()}°</p>
                            </div>
                        </div>`
                    } else if (day.weather[0].main === "Clear") {
                        weekForecast.innerHTML += `
                        <div class="forecast-wraper">
                            <p>${dayName}</p>
                            <div class="forecast-content-wraper">
                                <img src="./assets/001-sun.svg" alt="icon weather">
                                <p>${day.main.temp.toFixed()}°</p>
                            </div>
                        </div>`
                    } else if (day.weather[0].main === "Rain") {
                        weekForecast.innerHTML += `
                        <div class="forecast-wraper">
                            <p>${dayName}</p>
                            <div class="forecast-content-wraper">
                                <img src="./assets/004-rain.svg" alt="icon weather">
                                <p>${day.main.temp.toFixed()}°</p>
                            </div>
                        </div>`
                    } else if (day.weather[0].main === "Thunderstorm") {
                        weekForecast.innerHTML += `
                        <div class="forecast-wraper">
                            <p>${dayName}</p>
                            <div class="forecast-content-wraper">
                                <img src="./assets/010-thunderstorm.svg" alt="icon weather">
                                <p>${day.main.temp.toFixed()}°</p>
                            </div>
                        </div>`
                    } else if (day.weather[0].main === "Snow") {
                        weekForecast.innerHTML += `
                        <div class="forecast-wraper">
                            <p>${dayName}</p>
                            <div class="forecast-content-wraper">
                                <img src="./assets/009-snowy.svg" alt="icon weather">
                                <p>${day.main.temp.toFixed()}°</p>
                            </div>
                        </div>`
                    } else if (day.weather[0].main === "Clouds") {
                        weekForecast.innerHTML += `
                        <div class="forecast-wraper">
                            <p>${dayName}</p>
                            <div class="forecast-content-wraper">
                                <img src="./assets/002-cloud.svg" alt="icon weather">
                                <p>${day.main.temp.toFixed()}°</p>
                            </div>
                        </div>`
                    } else {
                        weekForecast.innerHTML += `
                        <div class="forecast-wraper">
                            <p>${dayName}</p>
                            <div class="forecast-content-wraper">
                                <img src="./assets/030-haze.svg" alt="icon weather">
                                <p>${day.main.temp.toFixed()}°</p>
                            </div>
                        </div>`
                    }
                 }
                 iconWeeklyForecast()
              })   
        })

        .catch( err => {
            weekForecast.innerHTML = 'error!' + err
        })
