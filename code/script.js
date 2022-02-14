const API_URL = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=4efc415dbf1df503974ec65e3563d721"

fetch(API_URL)
.then(res => res.json())
.then(data => {
   console.log(data)
    data.weather.forEach(item => {
        console.log(item.description)
    })
    console.log(Math.round(data.main.temp))
    const milSec = data.sys.sunrise;
    
    /*
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
  
    seconds = seconds % 60;
    // 👇️ if seconds are greater than 30, round minutes up (optional)
    minutes = seconds >= 30 ? minutes + 1 : minutes;
  
    minutes = minutes % 60;
  
    // 👇️ If you don't want to roll hours over, e.g. 24 to 00
    // 👇️ comment (or remove) the line below
    // commenting next line gets you `24:00:00` instead of `00:00:00`
    // or `36:15:31` instead of `12:15:31`, etc.
    hours = hours % 24;
  
    console.log(hours, minutes)

    */

    const sunRise = new Date(milSec)
    console.log(sunRise.getMinutes())
    const sunriseLocal = sunRise.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
    console.log(sunriseLocal)
    
})


             