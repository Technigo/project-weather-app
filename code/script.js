// URL (rename to URL and capitals)
const URLDAILYWEATHER = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=2ecf28ca2c29fa0578cb610c6c66c223'
const URLWEEKLYFORECAST = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=2ecf28ca2c29fa0578cb610c6c66c223'

// All the DOM selectors stored as short variables
const containerDailyWeather = document.getElementById('containerDailyWeather')
const topDailyWeather = document.getElementById('topDailyWeather') 
const mainDailyWeather = document.getElementById('mainDailyWeather')
const weekForecast = document.getElementById('weekForecast')

// fetch URL for daily weather
fetch (URLDAILYWEATHER)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log("daily URL", data)

        //weather
        const fetchDailyWeather = data.weather[0].main 
        // temperature
        const temp = data.main.temp
        const roundedTemp = temp.toFixed() // no decimal
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
        const iconDailyWeather = () => {
        //console.log(fetchDailyWeather)
               if (fetchDailyWeather === "Drizzle") {
                    mainDailyWeather.innerHTML = `
                    <div class="main-wrapper">
                        <img class="weather_icon" src="./assets/004-rain.svg" alt="icon weather">
                        <h1 class="main-heading"> The weather in ${data.name} is sunny bring your sunscreen</h1>
                    </div>`
               } else if (fetchDailyWeather === "Clear") {
                    mainDailyWeather.innerHTML = `
                    <div class="main-wrapper">
                        <img class="weather_icon" src="./assets/001-sun.svg" alt="icon weather">
                        <h1 class="main-heading"> The weather in ${data.name} is sunny bring your sunscreen</h1>
                    </div>`
               } else if (fetchDailyWeather === "Rain") {
                    mainDailyWeather.innerHTML = `
                    <div class="main-wrapper">
                        <img class="weather_icon" src="./assets/004-rain.svg" alt="icon weather">
                        <h1 class="main-heading"> The weather in ${data.name} is sunny bring your sunscreen</h1>
                    </div>`
               } else if (fetchDailyWeather === "Thunderstorm") {
                    mainDailyWeather.innerHTML = `
                    <div class="main-wrapper">
                        <img class="weather_icon" src="./assets/010-thunderstorm.svg" alt="icon weather">
                        <h1 class="main-heading"> The weather in ${data.name} is sunny bring your sunscreen</h1>
                     </div>`
               } else if (fetchDailyWeather === "Snow") {
                    mainDailyWeather.innerHTML = `
                    <div class="main-wrapper">
                        <img class="weather_icon" src="./assets/009-snowy.svg" alt="icon weather">
                        <h1 class="main-heading"> The weather in ${data.name} is sunny bring your sunscreen</h1>
                    </div>`
               } else if (fetchDailyWeather === "Clouds") {
                    mainDailyWeather.innerHTML = `
                    <div class="main-wrapper">
                        <img class="weather_icon" src="./assets/002-cloud.svg" alt="icon weather">
                        <h1 class="main-heading"> The weather in ${data.name} is sunny bring your sunscreen</h1>
                    </div>`
               } else {
                    mainDailyWeather.innerHTML = `
                    <div class="main-wrapper">
                        <img class="weather_icon" src="./assets/030-haze.svg" alt="icon weather">
                        <h1 class="main-heading"> The weather in ${data.name} is sunny bring your sunscreen</h1>
                    </div>`
               }
            }
            iconDailyWeather()
    })

    .catch( err => {
        containerDailyWeather.innerHTML = 'error!' + err
    })    
    .finally(() => console.log('Request finished'))

    // fetch URL for weekly forecast
    //const fetchWeekly 
    fetch (URLWEEKLYFORECAST)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log("weekly URL",data)
            //filter forcast to get the weather 12:00 each day
            const filteredForcast = data.list.filter(item => item.dt_txt.includes('12:00'))
            console.log(filteredForcast)

            // loopa through the array and return weather for each day
            filteredForcast.forEach((day)=>{
                const date = new Date (day.dt *1000)
                let dayName = date.toLocaleDateString('se-SE', {weekday:'short'})
                //console.log('day name', dayName, day.weather[0].description, day.main.temp)

                const iconWeeklyForecast = () => {
                    if (day.weather[0].main === "Drizzle") {
                        weekForecast.innerHTML += `
                        <div class="forecast-wraper">
                            <p>${dayName}</p>
                            <div class="forecast-content-wraper">
                                <img src="./assets/004-rain.svg" alt="icon weather">
                                <p>${day.main.temp.toFixed()}°</>
                            </div>
                        </div>`
                    } else if (day.weather[0].main === "Clear") {
                        weekForecast.innerHTML += `
                        <div class="forecast-wraper">
                            <p>${dayName}</p>
                            <div class="forecast-content-wraper">
                                <img src="./assets/001-sun.svg" alt="icon weather">
                                <p>${day.main.temp.toFixed()}°</>
                            </div>
                        </div>`
                    } else if (day.weather[0].main === "Rain") {
                        weekForecast.innerHTML += `
                        <div class="forecast-wraper">
                            <p>${dayName}</p>
                            <div class="forecast-content-wraper">
                                <img src="./assets/004-rain.svg" alt="icon weather">
                                <p>${day.main.temp.toFixed()}°</>
                            </div>
                        </div>`
                    } else if (day.weather[0].main === "Thunderstorm") {
                        weekForecast.innerHTML += `
                        <div class="forecast-wraper">
                            <p>${dayName}</p>
                            <div class="forecast-content-wraper">
                                <img src="./assets/010-thunderstorm.svg" alt="icon weather">
                                <p>${day.main.temp.toFixed()}°</>
                            </div>
                        </div>`
                    } else if (day.weather[0].main === "Snow") {
                        weekForecast.innerHTML += `
                        <div class="forecast-wraper">
                            <p>${dayName}</p>
                            <div class="forecast-content-wraper">
                                <img src="./assets/009-snowy.svg" alt="icon weather">
                                <p>${day.main.temp.toFixed()}°</>
                            </div>
                        </div>`
                    } else if (day.weather[0].main === "Clouds") {
                        weekForecast.innerHTML += `
                        <div class="forecast-wraper">
                            <p>${dayName}</p>
                            <div class="forecast-content-wraper">
                                <img src="./assets/002-cloud.svg" alt="icon weather">
                                <p>${day.main.temp.toFixed()}°</>
                            </div>
                        </div>`
                    } else {
                        weekForecast.innerHTML += `
                        <div class="forecast-wraper">
                            <p>${dayName}</p>
                            <div class="forecast-content-wraper">
                                <img src="./assets/030-haze.svg" alt="icon weather">
                                <p>${day.main.temp.toFixed()}°</>
                            </div>
                        </div>`
                    }
                 }
                 iconWeeklyForecast()
              })   
        })

