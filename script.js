const cityName = document.getElementById('city-placeholder');
const cityTemp = document.getElementById('temp-placeholder');
const cityWeather = document.getElementById('weather-placeholder');
const sunriseTime = document.getElementById('sunrise-time');
const sunsetTime = document.getElementById('sunset-time');

//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=8802f8b4b2d622931613aace44be57ae')
    .then(response => {
        return response.json()
    }) 
    .then((json) => {
        console.log(json);
        cityName.innerHTML = json.city.name;
        cityTemp.innerHTML = json.list[0].main.temp.toFixed(1);
        cityWeather.innerHTML = json.list[0].weather[0].description;
        const sunriseStart = new Date(json.city.sunrise);
        const sunsetStart = new Date(json.city.sunset);
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString
        sunriseTime.innerHTML = sunriseStart.toLocaleTimeString([], {hour:'2-digit', minute: '2-digit'});
        sunsetTime.innerHTML = sunsetStart.toLocaleTimeString([], {hour:'2-digit', minute: '2-digit'});
    } )
    
    .catch((error) => {
        console.log('caught error', error);
    })


    

    