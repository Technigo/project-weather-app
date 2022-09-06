const cityName = document.getElementById('city-placeholder');
const cityTemp = document.getElementById('temp-placeholder');
const cityWeather = document.getElementById('weather-placeholder');

fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=8802f8b4b2d622931613aace44be57ae')
    .then(response => {
        return response.json()
    }) 
    .then((json) => {
        console.log(json);
        cityName.innerHTML = json.name;
        cityTemp.innerHTML = (Math.round(json.main.temp)).toFixed(1);
        cityWeather.innerHTML = json.weather[0].description;

    } )
    
    .catch((error) => {
        console.log('caught error', error);
    })


    

    