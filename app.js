const API_today = "http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=0885d110db76ae5dbaae0c2672772fdf"
const API_forecast = "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=0885d110db76ae5dbaae0c2672772fdf"
//DOM Selectors
const temperature = document.getElementById("temperature")
const feelsLike = document.getElementById("feels-like")
const city = document.getElementById("city")
const weatherDescription = document.getElementById("weather-description")
const sunrise = document.getElementById("sunrise")
const sunset = document.getElementById("sunset")


//Weather for Stockholm today
fetch(API_today)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        //temperature
        let rawTemp = json.main.temp 
        let roundedTemp = rawTemp.toFixed(0)
        temperature.innerHTML = `<h1>${roundedTemp}&deg;C</h1>`
        //feels like
        feelsLike.innerHTML += `<span>${json.main.feels_like.toFixed(0)}&deg;C</span>`
        //city
        let currentCity = json.name
        city.innerHTML = `<h2>${currentCity}</h2>`
        //weather description
        let weatherDes = json.weather.map((element) => (element.description))
        weatherDescription.innerHTML = `<h3>${weatherDes}</h3>`
    })

//Sunrise & Sunset


//Weather forecast for Stockholm for 5 days  
fetch(API_forecast)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00')) //filters out only the forecast at 12.00 each day
        console.log(filteredForecast)
        
        
        filteredForecast.map((day) => {
            const daysOfTheWeek = ['sun', 'mon', 'tue', 'wed', 'thur', 'fri', 'sat']
            const date = new Date(day.dt * 1000) //Convert Unix timestamp to time in JavaScript
            const dayName = daysOfTheWeek[date.getDay()] //Returns day of the week for the date specified using array daysOfTheWeek
            //const weatherIcon = `${day.weather[0].icon}`
            const temp = `${day.main.temp.toFixed(0)}`
            
            console.log(date, dayName, weatherIcon, temp)    


            forecast.innerHTML += `
            <div class ="forecast-day" id = forecastDay>
                <span class = "day">${dayName}</span>
                <img class = "forecast-icon" ${weatherIcon}/>
                <span class = "temperature"> ${temp}</span>
                
            </div>
            `
        })
        
        
    })