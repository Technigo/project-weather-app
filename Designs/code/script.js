// Decide on class and id names for elements
// DOM selectors
const currentWeather = document.getElementById('currentWeather')
const upcomingWeather = document.getElementById('upcomingWeather')

const searchForm = document.getElementById("search-form")
const cityInput = document.getElementById("search-input")


//const APP_ID = '94506b4af0e0a236471b8ee0da3c2281'

//global variables
let today = new Date().toLocaleDateString('en', {weekday: 'short'})
//console.log('today',today) 
let city 






let weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=94506b4af0e0a236471b8ee0da3c2281`
let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=94506b4af0e0a236471b8ee0da3c2281`      

//Today's temperature, city, weather type, sunrise and sunset
fetch(weatherURL)
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
//This is fetching the 5-day forecast
    fetch(forecastURL)   
    .then((response) => {
    return response.json()
    })
    .then((forecastdata) => {
    console.log(forecastdata)

   
    //Here we declare variables for min temp at midnight and max temp at noon:
    const filteredForecastNoon = forecastdata.list.filter(item => item.dt_txt.includes('12:00')) 
    const filteredForecastMidnight = forecastdata.list.filter(item => item.dt_txt.includes('00:00:00')) 
    
        

    //console.log to test
    console.log('noon', filteredForecastNoon)
    console.log('midnight', filteredForecastMidnight)

    for(let day =0; day < filteredForecastNoon.length; day++) {
        //getting the weekday of forecasted temperature
        let weekDay = filteredForecastNoon[day].dt_txt
        //printing the short versin of the weekday (e.g Mon,Tue,Wed,Thu,Fri,Sat,Sun)
        let shortWeekday = new Date(weekDay).toLocaleDateString('en', {weekday: 'short'})
        
        
        //here if statement if shortWeekDay does not equels to today, then executes following:
        if (shortWeekday !== today) {
        //weatherType storage the value of forecast days's weather type
        let weatherType = filteredForecastNoon[day].weather[0].main
        console.log(weatherType)
        //if statements what weather image we should use for forecasted days:
        //here comes if statement 
        
        if (weatherType === 'Snow'){
            typeImg = 'snow.png'
        }
        else if (weatherType === 'Clouds'){
            typeImg = 'cloudy.png'
        }
        else if (weatherType === 'Clear'){
            typeImg = 'sunny.png'
        }
        else if (weatherType === 'Rain'){
            typeImg = 'rain.png'
        }
        else {
            typeImg = 'partly.png'
        }
     

        //to make temperatures rounded to one decimal
        let roundedWeekMaxTemp = Math.round(filteredForecastNoon[day].main.temp_max)
        let roundedWeekMinTemp = Math.round(filteredForecastMidnight[day].main.temp_min)
        upcomingWeather.innerHTML += `<div class="each-day">
        <div class="each-weekday">${shortWeekday}</div>
        <div class="each-icon"><img class="small-weather-icons" src="./assets/${typeImg}"></div> 
        <div class="each-temps">${roundedWeekMaxTemp}<span class="celsius">°</span> / ${roundedWeekMinTemp} <span class="celsius">&#8451;</span></div>
        </div>`
        }    
    }

})


//here are addEventListeners
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    city = cityInput.value;
    console.log('city:', city)
    return city
  })




