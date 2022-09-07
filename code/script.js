const summary = document.getElementById("summary");
const mainSection = document.getElementById("mainSection");
const forecast = document.getElementById("forecast");
const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// Global variables
let weather;

fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=a8803210b888f640e92f889b4be6e93f')
    .then((response) => {
    return response.json()
    })

    .then((json) => {
    weather = json.weather[0].main
    summary.innerHTML = `<h1>${json.name}</h1>
    ${json.weather[0].main}
    ${Math.round(json.main.temp)}°C
    ` 
    })
 
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=a8803210b888f640e92f889b4be6e93f')
    .then((response) => {
    return response.json()
    })
    
    .then((json) => {
    console.log(json)
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('15:00'))
    console.log(filteredForecast)

    filteredForecast.forEach((day) => {
        const date = new Date(day.dt * 1000)
      
        // Make a Date object for right now
        const now = new Date();
      
        // Compare the forecast's day with the day right now
        const isTodaysForecast = date.getDay() === now.getDay();
      
        let dayName = week[date.getDay()]
      
        // We don't want to include this forecast if it is for today
        if(!isTodaysForecast){
          forecast.innerHTML += `<p>${dayName}: ${Math.round(day.main.temp)} °C</p>`
        }
      })

    if (weather === 'Clear') {    // || 
        document.body.style.backgroundColor = '#F7E9B9';
        document.body.style.color = '#2A5510';
        mainSection.innerHTML = `Get your sunnies on. Stockholm is looking rather great today.`  
    }
    else if (weather === 'Rain') {
        document.body.style.backgroundColor = '#A3DEF7';
        document.body.style.color = '#164A68'; 
    }
    else if (weather === 'Snow') {
        document.body.style.backgroundColor = '#A3DEF7';
        document.body.style.color = '#164A68'; 
    }
    else {
        document.body.style.backgroundColor = '#F4F7F8';
        document.body.style.color = '#F47775'; 
    }
})
