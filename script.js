const API_URL = 'https://api.openweathermap.org/data/2.5/weather?q=Gothenburg,Sweden&units=metric&APPID=affe19113e10ebc0685623d229879d1f'

const sunsetSunrise = document.getElementById('sunset-sunrise')
const weatherContainer = document.getElementById('weather-container')
const text = document.getElementById('text')

fetch(API_URL)
.then((response) => response.json())
.then((data) => {
    // This function adds a zero in case the time units consist of only one digit 
    const addZero = sec => {
        if (sec < 10) {
            sec = '0' + sec;
        }
        return sec
    }

    let sunriseTime = new Date(data.sys.sunrise)
    let sunsetTime = new Date(data.sys.sunset)
    let formattedHourSunrise = addZero(sunriseTime.getHours()) + ':' + addZero(sunriseTime.getMinutes()) + ':' + addZero(sunriseTime.getSeconds()) 
    let formattedHourSunset = addZero(sunsetTime.getHours()) + ':' +
    addZero(sunsetTime.getMinutes()) + ':' + addZero(sunsetTime.getSeconds()) 

    sunsetSunrise.innerHTML+= `
    <h2>Sunrise: ${formattedHourSunrise} </h2>
    <h2>Sunset: ${formattedHourSunset}</h2>`

    text.innerHTML += `
    <h1>City: ${data.name}</h1>
    <h2>Temperature: ${data.main.temp.toFixed(1)} C°</h2>
    <h2>Type of weather: ${data.weather[0].description}</h2>`

    // If else statement med de olika ikonerna
    text.innerHTML += `
    <img src="./Designs/Design-2/icons/noun_Cloud_1188486.svg" alt="cloud icon">
    <img src="./Designs/Design-2/icons/noun_Sunglasses_2055147.svg" alt="sunglasses icon">
    <img src="./Designs/Design-2/icons/noun_Umbrella_2030530.svg" alt="umbrella icon">

    <h1>Get your sunnies on, it looks rather warm in Göteborg today</h1>
    <h1>Get your umbrella, it looks rather wet in Göteborg today</h1>
    <h1>It looks rather cloudy in Göteborg today</h1>`
 
})

.catch((error) => console.error(error))