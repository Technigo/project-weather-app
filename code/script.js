const weatherContainer = document.getElementById('weather-container')
const todaysTemp = document.getElementById('todays-temp')
const city = document.getElementById('city')
const todaysWeather = document.getElementById('todays-weather')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')





fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=d5df19d6f5f0e0c58e9f1a6d07022e47")
.then((response) => {
    return response.json()
})
.then((json) => {
    todaysTemp.innerHTML = `<p>${Math.round(json.main.temp * 10)/10}</p>`
    city.innerHTML += `<h1>${json.name}<h1>`
    todaysWeather.innerHTML += `<p>${json.weather[0].description}</p>`
    sunrise.innerHTML += `<p>Sunrise: ${convertTime(json.sys.sunrise)}<p>`
    sunset.innerHTML += `<p>Sunset: ${convertTime(json.sys.sunset)}<p>`
})

const convertTime = (milliseconds) => {
    let unitTime = milliseconds * 1000;
    let date = new Date(unitTime).toLocaleTimeString([], {
        hour: '2-digit', minute:'2-digit'
    });
    return date
}

/* function toDigits(number) {
    return number.toString().padStart(2, '0');
}
 */

/* function convertedTime(milliseconds) {
 let seconds = Math.floor(milliseconds / 1000);
 let minutes = Math.floor(seconds / 60);
 let hours = Math.floor(minutes / 60);

 seconds = seconds % 60;
 minutes = seconds >= 30 ? minutes + 1 : minutes;
 minutes = minutes % 60;
 hours = hours % 24; }

 return `${convertedTime(hours)}:${convertedTime(minutes)}` */