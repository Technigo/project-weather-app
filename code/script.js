
//API fo Weather made to constant for easy re-use 
const weatherUrl ='https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=f03e81d089081eb6bc8048a2ff0048e8'
const forecastURL ='https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=f03e81d089081eb6bc8048a2ff0048e8'

//constants variables for weather temp/ description/ main
const container = document.getElementById('container')
const temperature = document.getElementById('temperature')
const weather = document.getElementById('weather')

const sunRise = document.getElementById('sunRise')
const sunSet = document.getElementById('sunSet')


// So you can read the time in HH:MM
const formatTime = (timestamp) => {
    let readableTime = new Date(timestamp * 1000);

    readableTime = readableTime.toLocaleTimeString('sv-SE', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
    return readableTime;
}


//fetch - "stop trying to make fetch happen ;)"
fetch(weatherUrl)
.then((response) => {
    return response.json()
})
.then((json) => {
    console.log(json)
    
    container.innerHTML = `<h1> The weather in ${json.name} is ${json.weather[0].main} with ${json.weather[0].description}. </h1>`;

    temperature.innerHTML = Math.round(json.main.temp) + "°";

    sunRise.innerHTML = `sun up picture? ${formatTime(json.sys.sunrise)}`;
    sunSet.innerHTML = `sun up picture? ${formatTime(json.sys.sunset)}`;
    
}); 

// OK 5 day forecast.. 

fetch(forecastURL)
.then((response) => {
    return response.json()
})

// Maybe move the 5-day forecast to start. If it works.. 
const forecast = document.getElementById('forecast')
