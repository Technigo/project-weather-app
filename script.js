//linnea sofia and maja works with this branch
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=96fe044f50a395c3e9ed78deeb27089f';
// Calls current weather data for Stockholm, Sweden using the api key: 96fe044f50a395c3e9ed78deeb27089f

//emelie works with this branch
const FORECAST_API_URL = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=96fe044f50a395c3e9ed78deeb27089f'
// Calls 5 day weather forecast data for Stockholm, Sweden using the api key: 96fe044f50a395c3e9ed78deeb27089f

const weatherContainer = document.getElementById('weather-container')
const messageContainer = document.getElementById('message-container')
const forecastContainer = document.getElementById('forecast-container')

fetch(WEATHER_API_URL)
    .then(res => res.json()) 
    .then(weatherData => {
        console.log('WEATHERDATA!!!', weatherData);
        //Math.round(25.62*10)/10)
        //Math.round(256.2)/10
        //256/10
        //25.6
        weatherContainer.innerHTML += /* html */ `
            <p>Name: ${weatherData.name}</p>
            <p>Temperature: ${Math.round(weatherData.main.temp * 10)/10}</p>
            <p>Description: ${weatherData.weather[0].description}</p>
        `        
    })

    fetch(FORECAST_API_URL)
        .then(res => res.json())
        .then(forecastData => {
            console.log('FORECASTDATA', forecastData);
            forecastContainer.innerHTML += /*html*/`
            <p>Tomorrow | ${Math.round(forecastData.list[6].main.temp_max * 10)/10}° / ${Math.round(forecastData.list[6].main.temp_min * 10)/10}°
            </p>
            <p>Day after tomorrow | ${Math.round(forecastData.list[14].main.temp_max * 10)/10}° / ${Math.round(forecastData.list[14].main.temp_min * 10)/10}°</p>
            <p>Day 3 | ${Math.round(forecastData.list[22].main.temp_max * 10)/10}° / ${Math.round(forecastData.list[22].main.temp_min * 10)/10}°</p>
            <p>Day 4 | ${Math.round(forecastData.list[30].main.temp_max * 10)/10}° / ${Math.round(forecastData.list[30].main.temp_min * 10)/10}°</p>
            <P>Day 5 | ${Math.round(forecastData.list[38].main.temp_max * 10)/10}° / ${Math.round(forecastData.list[38].main.temp_min * 10)/10}°</p>
            `
        })

       // let d = new Date();
       //  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
       // let weekDay = days[d.getDay()];
       // console.log(weekDay);


    //let tomorrowTemp = Math.round((forecastData.list[6].main.temp_max * 10)/10);

    document.getElementById("wrapper-forecast-temp-tomorrow").innerHTML = forecastData.list[14].main.temp_max  + "°C";
    document.getElementById("wrapper-forecast-temp-dAT").innerHTML = temp + "°C";
    document.getElementById("wrapper-forecast-temp-day-3").innerHTML = temp + "°C";
    document.getElementById("wrapper-forecast-temp-day-4").innerHTML = temp + "°C";
    document.getElementById("wrapper-forecast-temp-day-5").innerHTML = temp + "°C";
    
    
