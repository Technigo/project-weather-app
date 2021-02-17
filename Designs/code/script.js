const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=e205e8ad7da5418f24fd968d3b9c30f1';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&appid=e205e8ad7da5418f24fd968d3b9c30f1'
const container = document.getElementById('container')
const forecast = document.getElementById('forecast')

const sunIcon = '<svg role="img" xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" viewBox="0 0 24 24" aria-labelledby="sunIconTitle" stroke="#EADA4F" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#EADA4F"> <title id="sunIconTitle">Sun</title> <circle cx="12" cy="12" r="4"/> <path d="M12 5L12 3M12 21L12 19M5 12L2 12 5 12zM22 12L19 12 22 12zM16.9497475 7.05025253L19.0710678 4.92893219 16.9497475 7.05025253zM4.92893219 19.0710678L7.05025253 16.9497475 4.92893219 19.0710678zM16.9497475 16.9497475L19.0710678 19.0710678 16.9497475 16.9497475zM4.92893219 4.92893219L7.05025253 7.05025253 4.92893219 4.92893219z"/> </svg>'

let icon 

const sunTime = (time) => {
    let sunHours = new Date(time * 1000)

    return sunHours.toLocaleTimeString("sv-SE", {
        hour: "2-digit", 
        minute: "2-digit",
        hour12: false
    })
}

const weatherIcon = (item) => {
    

    if (item.weather[0].main === 'Clouds') {
       //console.log('if')
       icon = './ikons/icons8-clouds-96.png'
    } else if (item.weather[0].main === 'Thunderstorm') {
        icon = './ikons/icons8-lightning-bolt-96.png'
    } else if (item.weather[0].main === 'Rain' || item.weather[0].main === 'Drizzle') {
        icon = './ikons/icons8-rain-96.png'
    } else if (item.weather[0].main === 'Snow') {
        icon = './ikons/icons8-snow-96.png'
    } else if (item.weather[0].main === 'Clear') {
        icon = './ikons/icons8-sun-96.png'
    } else {
        icon = './ikons/icons8-fahrenheit-symbol-96.png'
    }    
}


fetch(WEATHER_URL)
    .then((response) => {
        console.log(response) 
        return response.json() 
    }) 
    .then((data) => {
        let fixedTemperature = data.main.temp.toFixed(1)
        let sunrise = data.sys.sunrise
    
        container.innerHTML += `
        <h2 class="city-name">${data.name}</h2>
        <h4>${data.weather[0].description}</h4>
        <h1 class="temperature">${fixedTemperature}</h1>
        <h4><img src ="./ikons/icons8-sunrise-96.png"> ${sunTime(data.sys.sunrise)} <img src ="./ikons/icons8-moon-and-stars-96.png"> ${sunTime(data.sys.sunset)}</h4>
        `
        console.log(data)
    })



fetch(FORECAST_URL)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
        const filteringByTime = data.list.filter(item => item.dt_txt.includes('12:00'))
        const timezone = data.city.timezone
        //const forecastDate = new Date((filteringByTime.dt + data.city.timezone) * 1000)    
        //const weekday = {weekday:'long'}        
        console.log(filteringByTime)
        

        filteringByTime.forEach((item)=> {
            weatherIcon(item)
            const forecastDate = new Date((item.dt + timezone) * 1000)    
            const weekday = {weekday:'long'}
            let fixedTempForecast = item.main.temp.toFixed(1)
            forecast.innerHTML += `<p>${forecastDate.toLocaleDateString('en-US', weekday)} <img src=${icon}> ${fixedTempForecast}</p>` 
           
        })
    })
    