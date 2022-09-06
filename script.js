const cityName = document.getElementById('city-placeholder');
const cityTemp = document.getElementById('temp-placeholder');
const cityWeather = document.getElementById('weather-placeholder');
const sunriseTime = document.getElementById('sunrise-time');
const sunsetTime = document.getElementById('sunset-time');



fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=8802f8b4b2d622931613aace44be57ae')
    .then(response => {
        return response.json()
    }) 
    .then((json) => {
        console.log(json);
        cityName.innerHTML = json.name;
        cityTemp.innerHTML = (Math.round(json.main.temp)).toFixed(1);
        cityWeather.innerHTML = json.weather[0].description;
        const sunriseStart = new Date(json.sys.sunrise);
        const sunsetStart = new Date(json.sys.sunset);
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString
        sunriseTime.innerHTML = sunriseStart.toLocaleTimeString([], {hour:'2-digit', minute: '2-digit'});
        sunsetTime.innerHTML = sunsetStart.toLocaleTimeString([], {hour:'2-digit', minute: '2-digit'});

    } )
    
    .catch((error) => {
        console.log('caught error', error);
    })


    

    