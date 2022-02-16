// Decide on class and id names for elements
// DOM selectors
const currentWeather = document.getElementById('currentWeather')
//const upcomingWeather = document.getElementById('upcomingWeather')


//const APP_ID = '94506b4af0e0a236471b8ee0da3c2281'

//local variables:
let today = new Date() //this stores the current date and time 
console.log(today)

fetch('https://api.openweathermap.org/data/2.5/weather?q=Rovaniemi,Finland&units=metric&APPID=94506b4af0e0a236471b8ee0da3c2281')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(json)
        const roundedTemp = Math.round(json.main.temp * 10) / 10
        currentWeather.innerHTML += `
        <h1 class="main-temp">${roundedTemp} <span class="celsius">&#8451;</span></h1>
        <h2 class="city-name">${json.name}</h2>
        <p class="weather-type">${json.weather[0].main}</p>
        <div class="rise-set"></div>
         `

    })

 //we decided to take the max temperature of noon and then min temperature of the midnight,
 //so then we have min and max for the whole day   
fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=94506b4af0e0a236471b8ee0da3c2281')   
    .then((response) => {
    return response.json()
    })
    .then((forecastdata) => {
    console.log(forecastdata)
    //const filteredForecast = forecastdata.list.filter(item => item.dt_txt.includes('12:00', '00:00')) 
    //console.log(filteredForecast)
    }) 
//some notes here:
    //const day1 = array[0]
    //const day2 = array[1]


    //list.main.temp_max
    //list.main.temp_min




