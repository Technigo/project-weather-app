//DOM get element from HTML
const temSunTime = document.getElementById('temperature-sun-time')
const remindImgText = document.getElementById('remind-img-text')
const fiveDaysTemperature = document.getElementById('five-days-temperature')
const errorText = document.getElementById('error')

//style.css
const styleElement = document.createElement('style')
document.head.appendChild(styleElement)

//fetch API, weather in Helsinki
const BASE_URL1= 'https://api.openweathermap.org/data/2.5/weather'
const BASE_URL2 = 'https://api.openweathermap.org/data/2.5/forecast'
const API_KEY = '0a3f5beba05e6db2d5da18ddf3283c92'
const city = 'Helsinki,Finland'
const URL1 = `${BASE_URL1}?q=${city}&units=metric&appid=${API_KEY}`
const URL2 = `${BASE_URL2}?q=${city}&units=metric&appid=${API_KEY}`

 // fetch('https://api.openweathermap.org/data/2.5/weather?q=Helsinki,Finland&units=metric&appid=0a3f5beba05e6db2d5da18ddf3283c92')
const weatherInfo = () => {
    fetch(URL1)
    .then(response => response.json())
    .then(data => {
        remindTestCityName(data)
        console.log(data)     
    })
    .catch(error=>{
        errorText.innerHTML = 'Oops, something went wrong🫢'
        console.log('error:', error)
    })
}
weatherInfo()

const remindTestCityName = (param) => {
    const dayWeather = param.weather[0].main
    const descriptionLower = param.weather[0].description
    const description = descriptionLower[0].toUpperCase()+descriptionLower.slice(1).toLowerCase()
    const temperature = param.main.temp.toFixed(1) //rounded to 1 decimal place
    const cityName = param.name

    //sunset and sunrise
    const timeFormat = {hour: '2-digit', minute: '2-digit', hour12: false}
    const sunriseTime = param.sys.sunrise * 1000
    const sunsetTime = param.sys.sunset * 1000
    // const finlandUct = 2 * 60 * 60 * 1000 //EET = UCT + 2h? if I fetch API q=Helsinki,Finland, do I plus 2 hours for the time? if I plus 2 hours the final time is two more hours which is incorrect. 
    const finlandSunriseTime = new Date(sunriseTime)
    const finlandSunsetTIme = new Date(sunsetTime)
    const hoursSunrise = finlandSunriseTime.toLocaleTimeString('en-US', timeFormat)
    const hoursSunset = finlandSunsetTIme.toLocaleTimeString('en-US', timeFormat)

    if (dayWeather === 'Clear') {
        temSunTime.innerHTML = `
        <P> ${description} | ${temperature}°</p>
        <p> Sunrise ${hoursSunrise}</p>
        <p> Sunset ${hoursSunset}</p>`
        remindImgText.innerHTML = `
        <img src="./design/design2/icons/noun_Sunglasses_2055147.svg">
        <h3 id="remind-text">Get your sunnies on. <br>${cityName} is looking rather great today.</h3>`
        styleElement.sheet.insertRule('body {background-color: #F7E9B9; color: #2A5510}')
        styleElement.sheet.insertRule('hr {border-button: 1px; color: #707070}')
    } else if (dayWeather === 'Rain' || dayWeather === 'Drizzle' || dayWeather=== 'Thunderstorm') {
        temSunTime.innerHTML = `
        <P> ${description} | ${temperature}°</p>
        <p> Sunrise ${hoursSunrise}</p>
        <p> Sunset ${hoursSunset}</p>`
        remindImgText.innerHTML = `
        <img src="./design/design2/icons/noun_Umbrella_2030530.svg">
        <h3 id="remind-text">Don't forget your umbrella. <br>It's wet in ${cityName} today.</h3>`
        styleElement.sheet.insertRule('body {background-color: #BDE8FA; color: #164A68}')
        styleElement.sheet.insertRule('hr {border-button: 1px; color: #164A68}')
    } else if (dayWeather === 'Clouds' || dayWeather=== 'Fog' || dayWeather === 'Snow') {
        temSunTime.innerHTML = `
        <P> ${description} | ${temperature}°</p>
        <p> Sunrise ${hoursSunrise}</p>
        <p> Sunset ${hoursSunset}</p>`
        remindImgText.innerHTML = `
        <img src="./design/design2/icons/noun_Cloud_1188486.svg">
        <h3 id="remind-text">Light a fire and get cosy. <br>${cityName} is looking grey today.</h3>`
        styleElement.sheet.insertRule('body {background-color: #F4F7F8; color: #F47775}')
        styleElement.sheet.insertRule('hr {border-button: 1px; color: #F47775}')
    } else { //if none of the weather description is match, the city name will be instead of description.
        temSunTime.innerHTML = `
        <P> ${cityName} | ${temperature}°</p>
        <p> Sunrise ${hoursSunrise}</p>
        <p> Sunset ${hoursSunset}</p>`
        remindImgText.innerHTML = `
        <img src="./design/design2/icons/noun_Sunglasses_2055147.svg">
        <h3 id="remind-text">How are you today?</h3>`
        styleElement.sheet.insertRule('body {background-color: #F7E9B9; color: #2A5510}')
        styleElement.sheet.insertRule('hr {border-button: 1px; color: #707070}')
    }  
}

// weather-forecast-feature
// fetch ('https://api.openweathermap.org/data/2.5/forecast?q=Helsinki,Finland&units=metric&appid=0a3f5beba05e6db2d5da18ddf3283c92')

const forecast = () => { 
    fetch(URL2)
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
            const fromSecond = day.dt * 1000
            const currentDate = new Date(fromSecond)
            let currentDay
            currentDay = currentDate.toLocaleDateString('en-US', {weekday:'short'})    
            console.log (currentDay) 

            const fiveDaysWeather = Math.round(day.main.temp)
        
            fiveDaysTemperature.innerHTML += `
            <li>
            <span>${currentDay}</span>
            <span>${fiveDaysWeather}°</span>
            </li><hr>`
            styleElement.sheet.insertRule('li {list-style-type: none}')
            }) 
        } 
    // .catch(error => console.log (error))
    )
    .catch(error=>{
        errorText.innerHTML = 'Oops, something went wrong🫢'
        console.log('error:', error)
    })
}
forecast()





