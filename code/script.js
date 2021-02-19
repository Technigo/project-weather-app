// URL (rename to URL and capitals)
const URLDAILYWEATHER = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=2ecf28ca2c29fa0578cb610c6c66c223'
const URLWEEKLYFORECAST = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=2ecf28ca2c29fa0578cb610c6c66c223'

// All the DOM selectors stored as short variables
const containerDailyWeather = document.getElementById('containerDailyWeather')
const topDailyWeather = document.getElementById('topDailyWeather') 
const mainDailyWeather = document.getElementById('mainDailyWeather')
const icon = document.getElementById('icon')
const mainWeather = document.getElementById('mainWeather')
const weekForecast = document.getElementById('weekForecast')

// fetch URL for daily weather
fetch (URLDAILYWEATHER)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log("daily URL", data)

        // temperature
        const temp = data.main.temp
        const roundedTemp = temp.toFixed() // no decimal
        // sunrise and sunset
        const sunriseHour = new Date((data.sys.sunrise)*1000).toLocaleTimeString('se-SE', {hour:'numeric', minute: 'numeric'})
        const sunsetHour = new Date(data.sys.sunset*1000).toLocaleTimeString('se-SE', {hour:'numeric', minute: 'numeric'})
        topDailyWeather.innerHTML = `
        <div>
            <p>Todays temperature: ${roundedTemp}°</p>
            <p>Sunrise: ${sunriseHour}</p>
            <p>Sunset: ${sunsetHour}</p>
        </div>`

        // Todays weather
        const fetchDailyWeather = data.weather[0].main 
        const iconDailyWeather = () => {
        //console.log(fetchDailyWeather)
               if (fetchDailyWeather === "Drizzle") {
                    mainDailyWeather.innerHTML = `
                        <p> The weather in ${data.name} is sunny bring your sunscreen</p>
                        <img class="weather_icon" src="./assets/004-rain.svg" alt="icon weather">`
               } else if (fetchDailyWeather === "Clear") {
                    mainDailyWeather.innerHTML = `
                        <p> The weather in ${data.name} is sunny bring your sunscreen</p>
                        <img class="weather_icon" src="./assets/001-sun.svg" alt="icon weather">`
               } else if (fetchDailyWeather === "Rain") {
                    mainDailyWeather.innerHTML = `
                        <p> The weather in ${data.name} is sunny bring your sunscreen</p>
                        <img class="weather_icon" src="./assets/004-rain.svg" alt="icon weather">`
               } else if (fetchDailyWeather === "Thunderstorm") {
                    mainDailyWeather.innerHTML = `
                        <p> The weather in ${data.name} is sunny bring your sunscreen</p>
                        <img class="weather_icon" src="./assets/010-thunderstorm.svg" alt="icon weather">`
               } else if (fetchDailyWeather === "Snow") {
                    mainDailyWeather.innerHTML = `
                        <p> The weather in ${data.name} is sunny bring your sunscreen</p>
                        <img class="weather_icon" src="./assets/009-snowy.svg" alt="icon weather">`
               } else if (fetchDailyWeather === "Clouds") {
                    mainDailyWeather.innerHTML = `
                        <p> The weather in ${data.name} is sunny bring your sunscreen</p>
                        <img class="weather_icon" src="./assets/002-cloud.svg" alt="icon weather">`
               } else {
                    mainDailyWeather.innerHTML = `
                        <p> The weather in ${data.name} is sunny bring your sunscreen</p>
                        <img class="weather_icon" src="./assets/030-haze.svg" alt="icon weather">`
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
                        <tr>
                            <td>${dayName}</td>
                            <td>
                                <img src="./assets/004-rain.svg" alt="icon weather">
                            </td>
                            <td>${day.main.temp.toFixed()}°</td>
                        </tr>`

                    } else if (day.weather[0].main === "Clear") {
                        weekForecast.innerHTML += `
                        <tr>
                            <td>${dayName}</td>
                            <td>
                                <img src="./assets/001-sun.svg" alt="icon weather">
                            </td>
                            <td>${day.main.temp.toFixed()}°</td>
                        </tr>`
                    } else if (day.weather[0].main === "Rain") {
                        weekForecast.innerHTML += `
                        <tr>
                            <td>${dayName}</td>
                            <td>
                                <img src="./assets/004-rain.svg" alt="icon weather">
                            </td>
                            <td>${day.main.temp.toFixed()}°</td>
                        </tr>`
                    } else if (day.weather[0].main === "Thunderstorm") {
                        weekForecast.innerHTML += `
                        <tr>
                            <td>${dayName}</td>
                            <td>
                                <img src="./assets/010-thunderstorm.svg" alt="icon weather">
                            </td>
                            <td>${day.main.temp.toFixed()}°</td>
                        </tr>`
                    } else if (day.weather[0].main === "Snow") {
                        weekForecast.innerHTML += `
                        <tr>
                            <td>${dayName}</td>
                            <td>
                                <img src="./assets/009-snowy.svg" alt="icon weather">
                            </td>
                            <td>${day.main.temp.toFixed()}°</td>
                        </tr>`
                    } else if (day.weather[0].main === "Clouds") {
                        weekForecast.innerHTML += `
                        <tr>
                            <td>${dayName}</td>
                            <td>
                                <img src="./assets/002-cloud.svg" alt="icon weather">
                            </td>
                            <td>${day.main.temp.toFixed()}°</td>
                        </tr>`
                    } else {
                        weekForecast.innerHTML += `
                        <tr>
                            <td>${dayName}</td>
                            <td>
                                <img src="./assets/030-haze.svg" alt="icon weather">
                            </td>
                            <td>${day.main.temp.toFixed()}°</td>
                        </tr>`

                        
                    }
                 }
                 iconWeeklyForecast()
              })   
        })

