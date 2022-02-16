const city= document.getElementById("text")
const date = document.getElementById("date")
const API_URL = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=4efc415dbf1df503974ec65e3563d721"
const API_FORCAST = "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=4efc415dbf1df503974ec65e3563d721"

fetch(API_URL)
.then(res => res.json())
.then(data => {
   console.log(data)
    data.weather.forEach(item => {
    console.log(item.description)
    })
    console.log(Math.round(data.main.temp))
    const milSec = data.sys.sunrise;
  
fetch(API_FORCAST)
.then(res => res.json())
.then((data) => {
    getForcastData(data)
    })

   //Displays sunrise and sunset times
navigator.geolocation.getCurrentPosition(position => {
fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&APPID=4efc415dbf1df503974ec65e3563d721`)
.then(res => {
    if (!res.ok) {
    throw Error("Weather data not available")
    }
    return res.json()
    })
.then(data => {
    console.log(data)
    let sunriseTime = new Date(data.sys.sunrise * 1000)
    let sunsetTime = new Date(data.sys.sunset * 1000)
    const sunriseLocale = sunriseTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
    const sunsetLocale = sunsetTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
    console.log(sunriseLocale)
    console.log(sunsetLocale)
            })
.catch(err => console.error(err))
    });
    const sunRise = new Date(milSec)
    //console.log(sunRise.getMinutes())
    const sunriseLocal = sunRise.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
    console.log(sunriseLocal)
    city.innerHTML =`
    <h1>${data.name}</h1>`
})

const getForcastData = (data) => {
    console.log(`hello`)
const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00'))

filteredForecast.forEach((days) => {
    console.log(`hi`)
    const mainTemp = days.main.temp.toFixed(0)

    date.innerHTML +=`
    <li>${days.main.temp}</li>
    `


    
})
}