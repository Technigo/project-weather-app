// const API_WEATHER = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=f1099e35a6194bceb628758a90cd792b";

const actualWeather = document.getElementById('actualWeather')
const actualTemperature = document.getElementById('actualTemperature')
const todaysAdvice = document.getElementById('todaysAdvice')

fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=f1099e35a6194bceb628758a90cd792b')
    .then((response) => response.json())
    .then((json) => {
        console.log(json)

        actualWeather.innerHTML = `${json.weather[0].description}`
        actualTemperature.innerHTML = `${Math.round(json.main.temp * 10) / 10}`        
        todaysAdvice.innerHTML = `
            <img src="#" class="" id="weatherIcon"> 
            <h1 class="advice" id="advice">
                <span class="city" id="city">Its wet in ${json.name} bring an umbrella</span>
            </h1>
        `;
    })
