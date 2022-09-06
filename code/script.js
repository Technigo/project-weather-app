const summary = document.getElementById("summary");
const main = document.getElementById("main");
const forecast = document.getElementById("forecast");

fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=a8803210b888f640e92f889b4be6e93f')
    .then((response) => {
    return response.json()
    })

    .then((json) => {
    console.log(json) // remove later

    // API sunrise and sunset times are given as UNIX time: the number of seconds that have elapsed since 00:00:00 UTC on 1 January 1970
    let sunrise = new Date(json.sys.sunrise * 1000); //multiply by 1000 to get milliseconds, as Unix timestamp in in seconds while JS Date() uses milliseconds
    let sunset = new Date(json.sys.sunset * 1000);
    let currentTime;

    // Function to add a 0 before any single digit hour or minute
    const formatTime = (sunEvent) => {
        let hours = sunEvent.getHours()
        let minutes = sunEvent.getMinutes()
        
        // Object that stores the hour and minutes 
        currentTime = {
            hours: hours,
            minutes: minutes
        }

        // If needed, a 0 is added infront of the hours and minutes
        if (hours < 10){
            currentTime.hours = '0' + hours
        }
        if (minutes < 10){
            currentTime.minutes = '0' + minutes
        }
        
        return currentTime
    }
    
    summary.innerHTML = `
        <h1>${json.name}</h1>
        ${json.weather[0].description} |
        ${Math.round(json.main.temp)}° 
        <p>sunrise ${formatTime(sunrise).hours}.${formatTime(sunrise).minutes}</p>  
        <p>sunset ${formatTime(sunset).hours}.${formatTime(sunset).minutes}</p>
        ` 
    })
 
    // ${sunrise.getHours()}.${sunrise.getMinutes()}
    //<p>${new Date()}</p>  Gives current date normally
    //<p>${Date.now()}</p>  Gives current date in milliseconds

    