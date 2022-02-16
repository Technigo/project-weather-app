const weatherContainer = document.getElementById ('dailyWeather');
const typeOfWeather = document.getElementById('typeOfWeather')
const currentTemp = document.getElementById('currentTemp')
const city = document.getElementById('city')
const sunriseAndSunset = document.getElementById('sunriseAndSunset')



fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=16decfbdca757a425e796503a595bad8')
    .then((res) => res.json())
    .then((data) => { 
        console.log(data)
        let tempRemoveDecimals = Math.floor(data.main.temp)  // To make the number "round" without decimals. 
        let sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { timeStyle: 'short' })
        let sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { timeStyle: 'short' })
     


    dailyWeather.innerHTML += `
    <h1 id="currentTemp">${tempRemoveDecimals}</h1>
    <p id="city">${data.name}</p>
    <p id="typeOfWeather">${data.weather[0].description}</p>
    <p id="sunriseAndSunset">sunrise ${sunrise} sunset ${sunset}</p>
    `  

    }) 

