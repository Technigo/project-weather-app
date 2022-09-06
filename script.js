const cityName = document.getElementById('city-placeholder');
const cityTemp = document.getElementById('temp-placeholder');
const cityWeather = document.getElementById('weather-placeholder');
const weeklyForecastMin = document.getElementById('weekly-forecast-min-placeholder');
const weeklyForecastMax = document.getElementById('weekly-forecast-max-placeholder');
const weeklyForecast = document.getElementById('weekly-placeholder');

fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=8802f8b4b2d622931613aace44be57ae')
    .then(response => {
        return response.json()
    }) 
    .then((json) => {
        console.log(json);
        cityName.innerHTML = json.name;
        cityTemp.innerHTML = (Math.round(json.main.temp)).toFixed(1);
        cityWeather.innerHTML = json.weather[0].description;
        weeklyForecastMin.innerHTML = json.main.temp_min.toFixed(1);
        weeklyForecastMax.innerHTML = json.main.temp_max.toFixed(1);
        })
    
    .catch((error) => {
        console.log('caught error', error);
    })


    

    