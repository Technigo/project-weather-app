//WEATER TODAY

const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=98db751c8d3a6ca2838ff31c950cf0fc';

const theStart = document.getElementById ('Title')
const currentDate = new Date( ) 

fetch(weatherUrl)
    .then ((response) => {
        return response.json()
    })
    .then((json) => {
        
        const weatherTemp =json.main.temp.toFixed(1)
        const watherTempFeels = json.main.feels_like.toFixed(1)
        const sunRiseTime = new Date(json.sys.sunrise * 1000)
        const sunSetTime = new Date(json.sys.sunset * 1000)

        theStart.innerHTML += `<h1>${json.name}</h1>`
        theStart.innerHTML += `<p>Temperature: ${weatherTemp}°C</p>`
        theStart.innerHTML += `<p>Feels like: ${watherTempFeels}°C</p>`
        theStart.innerHTML += `<p>${json.weather[0].description}</p>`
        theStart.innerHTML += `Sunrise: ${sunRiseTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}, `
        theStart.innerHTML += `Sunset: ${sunSetTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} `
     
    });


    //FORECAST 

    const theCenter = document.getElementById ('Middle')
    const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&appid=98db751c8d3a6ca2838ff31c950cf0fc'

    fetch(forecastUrl)
    .then ((response) => {
        return response.json()
    })
    .then((json) => {
        
        const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
        
        filteredForecast.forEach((forcastDay) => {

        const forcastDate = new Date(forcastDay.dt_txt);
        const forecastDateString = forcastDate.toLocaleDateString('en-US', {weekday: 'short'});
        const forecastTimeString = forcastDate.toLocaleDateString('sv-Sv', {timeStyle: 'short'});
        const forcastTemp= forcastDay.main.temp.toFixed(1)
        theCenter.innerHTML += `<p> ${forecastDateString} ${forecastTimeString} ${forcastTemp}°C </p> `
        })
    })