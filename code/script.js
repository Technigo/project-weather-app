// URL (rename to URL and capitals)
const URLDAILYWEATHER = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=2ecf28ca2c29fa0578cb610c6c66c223'
const URLWEEKLYFORECAST = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=2ecf28ca2c29fa0578cb610c6c66c223'

// All the DOM selectors stored as short variables
const containerDailyWeather = document.getElementById('containerDailyWeather')
const dailyTemp = document.getElementById('dailyTemp') 
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')
const city = document.getElementById('location')
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
        dailyTemp.innerHTML = `Todays temperature: ${roundedTemp}°` // add html element here or in index.html?

        // sunrise and sunset
        const sunriseHour = new Date((data.sys.sunrise)*1000).toLocaleTimeString('se-SE', {hour:'numeric', minute: 'numeric'})
            sunrise.innerHTML = `Sunrise: ${sunriseHour}`// add html element here or in index.html?
        
        const sunsetHour = new Date(data.sys.sunset*1000).toLocaleTimeString('se-SE', {hour:'numeric', minute: 'numeric'})
            sunset.innerHTML = `Sunset: ${sunsetHour}` // add html-element here or in index.html?

        // Todays weather from weather-array
        const fetchDailyWeather = data.weather[0].main 
            city.innerHTML = `The weather in ${data.name}:` // add html-element here or in index.html?
            mainWeather.innerHTML = `${fetchDailyWeather}` // add html-element here or in index.html?

        // Icons - daily weather 
           const iconDailyWeather = () => {
               if (fetchDailyWeather == "Drizzle") {
                   icon.innerHTML = `<img class="weather_icon" src="./assets/004-rain.svg" alt="icon weather">`
               } else if (fetchDailyWeather == "Clear") {
                   icon.innerHTML = `<img class="weather_icon" src="./assets/001-sun.svg" alt="icon weather">`
               } else if (fetchDailyWeather == "Rain") {
                   icon.innerHTML = `<img class="weather_icon" src="./assets/004-rain.svg" alt="icon weather">`
               } else if (fetchDailyWeather == "Thunderstorm") {
                   icon.innerHTML = `<img class="weather_icon" src="./assets/010-thunderstorm.svg" alt="icon weather">`
               } else if (fetchDailyWeather == "Snow") {
                   icon.innerHTML = `<img class="weather_icon" src="./assets/009-snowy.svg" alt="icon weather">`
               } else if (fetchDailyWeather == "Clouds") {
                   icon.innerHTML = `<img class="weather_icon" src="./assets/002-cloud.svg" alt="icon weather">`
               } else {
                   icon.innerHTML = `<img class="weather_icon" src="./assets/Group34.png" alt="icon weather">`
               }
            }
            iconDailyWeather()
    })

    .catch( err => {
        containerDailyWeather.innerHTML = 'error!' + err
    })    
    .finally(() => console.log('Request finished'))

    // fetch URL for weekly forecast
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
                    if (day.weather[0].main == "Drizzle") {
                        weekForecast.innerHTML += `
                        <tr>
                            <td>${dayName}</td>
                            <td>
                                <img src="./assets/004-rain.svg" alt="icon weather">
                            </td>
                            <td>${day.main.temp.toFixed()}°</td>
                        </tr>`

                    } else if (day.weather[0].main == "Clear") {
                        weekForecast.innerHTML += `
                        <tr>
                            <td>${dayName}</td>
                            <td>
                                <img src="./assets/001-sun.svg" alt="icon weather">
                            </td>
                            <td>${day.main.temp.toFixed()}°</td>
                        </tr>`
                    } else if (day.weather[0].main == "Rain") {
                        weekForecast.innerHTML += `
                        <tr>
                            <td>${dayName}</td>
                            <td>
                                <img src="./assets/004-rain.svg" alt="icon weather">
                            </td>
                            <td>${day.main.temp.toFixed()}°</td>
                        </tr>`
                    } else if (day.weather[0].main == "Thunderstorm") {
                        weekForecast.innerHTML += `
                        <tr>
                            <td>${dayName}</td>
                            <td>
                                <img src="./assets/010-thunderstorm.svg" alt="icon weather">
                            </td>
                            <td>${day.main.temp.toFixed()}°</td>
                        </tr>`
                    } else if (day.weather[0].main == "Snow") {
                        weekForecast.innerHTML += `
                        <tr>
                            <td>${dayName}</td>
                            <td>
                                <img src="./assets/009-snowy.svg" alt="icon weather">
                            </td>
                            <td>${day.main.temp.toFixed()}°</td>
                        </tr>`
                    } else if (day.weather[0].main == "Clouds") {
                        weekForecast.innerHTML += `
                        <tr>
                            <td>${dayName}</td>
                            <td>
                                <img src="./assets/002-cloud.svg" alt="icon weather">
                            </td>
                            <td>${day.main.temp.toFixed()}°</td>
                        </tr>`
                    } else {
                        
                    }
                 }
                 iconWeeklyForecast()
              })   
        })

