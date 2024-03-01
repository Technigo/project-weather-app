//DOM get element from HTML
const temSunTime = document.getElementById('temperature-sun-time')
// const temperature = document.getElementById('temperature')
// const sunrise = document.getElementById('sunrise-time')
// const sunset = document.getElementById('sunset-time')
const remindImgText = document.getElementById('remind-img-text')
const fiveDaysTemperature = document.getElementById('five-days-temperature')

//DOM create in JS
// const dayOfTheWeek = document.createElement('li')





//fetch API, weather in Helsinki
const weatherInfo = () => {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Helsinki,Finland&units=metric&appid=0a3f5beba05e6db2d5da18ddf3283c92')
    .then(response => response.json())
    .then(data => {
        remindTestCityName(data)
        console.log(data)     
    })
}
weatherInfo()


const remindTestCityName = (param) => {
    let dayWeather = param.weather[0].main
    let description = param.weather[0].description
    let temperature = Math.round(param.main.temp)
    let cityName = param.name

    //sunset and sunrise
    const timeFormat = {hour: '2-digit', minute: '2-digit', hour12: false}
    const sunriseTime = param.sys.sunrise * 1000
    const sunsetTime = param.sys.sunset * 1000
    // const finlandUct = 2 * 60 * 60 * 1000 //EET = UCT + 2h? if I fetch API q=Helsinki,Finland, do I plus 2 hours for the time? if I plus 2 hours the final time is two more hours which is incorrect. 
    const finlandSunriseTime = new Date(sunriseTime)
    const finlandSunsetTIme = new Date(sunsetTime)
    const hoursSunrise = finlandSunriseTime.toLocaleTimeString('en-US', timeFormat)
    const hoursSunset = finlandSunsetTIme.toLocaleTimeString('en-US', timeFormat)

    if (dayWeather === 'clear') {
        temSunTime.innerHTML = `
        <P> ${description} | ${temperature}</p>
        <p> Sunrise ${hoursSunrise}</p>
        <p> Sunset ${hoursSunset}</p>`
        remindImgText.innerHTML = `
        <h3 id="remind-text">Get your sunnies on. ${cityName} is looking rather great today.</h3>`
    } else if (dayWeather === 'Rain' || dayWeather === 'Drizzle') {
        temSunTime.innerHTML = `
        <P> ${description} | ${temperature}</p>
        <p> Sunrise ${hoursSunrise}</p>
        <p> Sunset ${hoursSunset}</p>`
        remindImgText.innerHTML = `
        <h3 id="remind-text">Don't forget your umbrella. It's wet in ${cityName} today.</h3>`
    } else if (dayWeather === 'Clouds') {
        temSunTime.innerHTML = `
        <P> ${description} | ${temperature}</p>
        <p> Sunrise ${hoursSunrise}</p>
        <p> Sunset ${hoursSunset}</p>`
        remindImgText.innerHTML = `
        <h3 id="remind-text">Light a fire and get cosy. ${cityName} is looking grey today.</h3>`
    } else {
        remindImgText.innerHTML = `
        <h3 id="remind-text">Oops... Something went wrong</h3>`
    }  
}

// weather-forecast-feature

// const BASE_URL = 'http://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}'
// const API_KEY = '0a3f5beba05e6db2d5da18ddf3283c92'
// const city = 'Helsinki,Finland'
// const units = 'metric'

// const URL = `${BASE_URL}?${city}${units}${API_KEY}`

const forecast = () => {
    fetch ('http://api.openweathermap.org/data/2.5/forecast?q=Helsinki,Finland&units=metric&appid=0a3f5beba05e6db2d5da18ddf3283c92')
    .then(response => response.json())
    .then(data => {
        //weather update from 12.00 every day
        //[...data.list] print all the array of list (40 arrays) from the data was fetched
        let filteredTime=[]
        filteredTime = [...data.list].filter(day => {
        return day.dt_txt.endsWith('12:00:00')
        }) 
        console.log(filteredTime)
        console.log(filteredTime[0].dt)
        
        // console.log(new Date(filteredTime[0].dt*1000).toLocaleDateString('en-US', {weekday:'short'})) --> Fri 

         //convert each day to a short name. print weather for next 4 days
        filteredTime.forEach((day) => {
            let fromSecond = day.dt * 1000
            let currentDate = new Date(fromSecond)
            let currentDay
            currentDay = currentDate.toLocaleDateString('en-US', {weekday:'short'})    
            console.log (currentDay) 

            let fiveDaysWeather = Math.round(day.main.temp)

            fiveDaysTemperature.innerHTML += `
            <li>${currentDay} ${fiveDaysWeather}</li>`
            }) 
        } 
    // .catch(error => console.log (error))
    )}
forecast()

// const weekDayForecast = (param) =>{
//     let filteredTime = []
//     filteredTime = [...param.list].filter(day=> {
//         day.dt_txt.endsWith('12:00:00')
//     })
    
// }
