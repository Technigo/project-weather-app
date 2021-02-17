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

//Convert unix to time
const unixToTime = (unix) => {
    const dateObj = new Date(unix * 1000)
    const timeString = dateObj.getHours() + ':' + dateObj.getMinutes()
    return timeString
}

// const readableTime = () => {
//     currentTime = new Date()

//     console.log()
// }

// fetch API
fetch (currentWeatherApiUrl + apiKey) 
    .then ((response) => {
        return response.json()
    })
    .then ((json) => {
        temperature.innerHTML = Math.round(json.main.temp)
        city.innerHTML = json.name
        condition.innerHTML = json.weather[0].description
        sunrise.innerHTML = (unixToTime(json.sys.sunrise))
        sunset.innerHTML = (unixToTime(json.sys.sunset))
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
        //filteredForecast.forEach(weekday => {
        //const dayOne = weekday.main.temp;
        //})

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
