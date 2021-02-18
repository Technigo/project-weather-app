const temperature = document.getElementById('temperature')
const city = document.getElementById('city')
const condition = document.getElementById('condition')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')
const weeklyForecastContainer = document.getElementById('weekly-forecast-container')

const currentWeatherApiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Swedentockholm,Sweden&units=metric&APPID='
// Forecast 
const forecastApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID='
const apiKey = '3addfde144e16d817dcc3a5e9a46ea59' 

// This function converts the data for time into a readable format. (t.ex sunrise time of day)
const timeCalculator = (timestamp) => {
    const dateObject = new Date((timestamp) * 1000).toLocaleTimeString([], {timeStyle: 'short'})
    return dateObject 
}

fetch (currentWeatherApiUrl + apiKey)
    .then ((response) => {
        return response.json()
    })
    .then ((json) => {
        temperature.innerHTML = Math.round(json.main.temp)
        city.innerHTML = 
        `
            ${json.name}
            <img src='http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png'>
        `
        condition.innerHTML = json.weather[0].description
        sunrise.innerHTML = `<p>Sunrise ${timeCalculator(json.sys.sunrise)}</p>` // (json.sys.sunrise) filters into timestamp in TimeCalculator function
        sunset.innerHTML = `<p>Sunset ${timeCalculator(json.sys.sunset)}</p>`
        console.log(json)
    })
    .catch ((err) => {
        console.log('caught error', err)
    })

   
const getWeekday = (daysFromToday) => {
    const now = new Date()
    const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] 
    return week[now.getDay() + daysFromToday]
}
    

fetch (forecastApiUrl + apiKey)
    .then ((response) => {
        return response.json()
    })
    .then ((json) => {
        console.log(json)
        const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
        console.log(filteredForecast[0].main.temp)
        
        for(let i = 0; i < 5; i++) {
            const iconUrl = `http://openweathermap.org/img/wn/${filteredForecast[i].weather[0].icon}@2x.png`
            weeklyForecastContainer.innerHTML += 
            `
                <div class="day">
                    <p>${getWeekday(i + 1)}</p>
                    <img src="${iconUrl}">
                    <p>${Math.round(filteredForecast[i].main.temp)}</p>
                </div>
            `
        }
    })
    .catch ((err) => {
        console.log('caught error', err)
    })
