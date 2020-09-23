const API_KEY = "f54ca9831c8974c87fd4826fae420a1a"
const API_URL = `http://api.openweathermap.org/data/2.5/weather?q=Malmo,Sweden&units=metric&APPID=${API_KEY}`
const API_URL_5DAYS = `https://api.openweathermap.org/data/2.5/forecast?q=Malmo,Sweden&units=metric&APPID=${API_KEY}`

const container = document.getElementById('weather')
const container2 = document.getElementById('future-weather')


fetch(API_URL)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        container.innerHTML = `<h1>It's ${json.main.temp.toFixed(1)} degrees in ${json.name} today.</h1>`
    
       
        json.weather.forEach((weather) => {
            const sunrise = new Date(json.sys.sunrise * 1000);
            const sunRiseTime = sunrise.toLocaleTimeString ('se-SV', { hour : '2-digit', minute : '2-digit'});
            const sunset = new Date(json.sys.sunset * 1000);
            const sunSetTime = sunset.toLocaleTimeString ('se-SV', { hour : '2-digit', minute : '2-digit'});
        container.innerHTML += `<p>It's ${weather.description}. The sun rises at ${sunRiseTime} and sets at ${sunSetTime}.</p>`
        })
     }) 
    


// INTE KLAR MED DENNA! MÅSTE MAN GÖRA EN NY FETCH? INTE KLART MED FOREACH.
     fetch(API_URL_5DAYS)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        container.innerHTML += `<h1>The next five days?</h1>`
    
               json.weather.forEach((weather) => {
           container.innerHTML += `<p>It's ${weather.description}. The sun rises at ${sunRiseTime} and sets at ${sunSetTime}.</p>`
        })
     }) 