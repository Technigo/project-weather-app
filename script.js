const city = document.getElementById('city')
const weather = document.getElementById('weather')
const temperature = document.getElementById('temperature')
const forecast = document.getElementById('forecast')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')
const header = document.getElementById('header')


const API_KEY = "b881032f7a405f3e6e05ebbfb98e3e49"

let cityName = "Stockholm"
const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${API_KEY}`;

const formattedTime = (timestamp) => {
    sunStatus = new Date(timestamp * 1000)
    const hours = sunStatus.getHours();
    const minutes = sunStatus.getMinutes();
    const time = `  
    ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return (time)
}

const fetchWeather = () => {
    console.log(fetchWeather)
    fetch(url)
        .then((respons) => respons.json())
        .then((data) => {
            console.log(data)
            header.innerHTML = ` 
            <h3>${data.weather[0].description} | ${data.main.temp.toFixed(1)}°C</h3>
            <h3>Sunrise ${formattedTime(data.sys.sunrise)} | Sunset ${formattedTime(data.sys.sunset)}</h3>
            <h3>${data.name}</h3>
            `
        })

        .catch((error) => {
            console.log('Error', error)
        })

}

fetchWeather();

// const calculateSunrise = (data) => {
//     const unixTimestamp = data.sys.sunrise // seconds
//     const sunRiseTimestamp = unixTimestamp * 1000 //milliseconds
//     const sunriseDate = new Date(sunRiseTimestamp)
// }

// weatherData = () => {

//     currentCity.innerHTML = '';
//     const fetchWeather = () => {
//         fetch(url)
//             .then((respons) => respons.json())
//             .then((data) => {
//                 console.log(data)
//                 //
//                 city.innerHTML = `${data.name}`;
//                 weather.innerHTML = `${data.weather[0].description}`;
//                 temperature.innerHTML = `${data.main.temp}`;
//             })
//             .catch((error) => {
//                 console.log('Error', error)
//             });
//     }

