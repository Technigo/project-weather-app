const cityName = document.getElementById('city-placeholder');
const cityTemp = document.getElementById('temp-placeholder');
const cityWeather = document.getElementById('weather-placeholder');
const sunriseTime = document.getElementById('sunrise-time');
const sunsetTime = document.getElementById('sunset-time');
const weekly1Temp = document.getElementById('weekly-temperature-d1-placeholder'); 
const weekly2Temp = document.getElementById('weekly-temperature-d2-placeholder');
const weekly3Temp = document.getElementById('weekly-temperature-d3-placeholder');
const weekly4Temp = document.getElementById('weekly-temperature-d4-placeholder');
const weekly5Temp = document.getElementById('weekly-temperature-d5-placeholder');



fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=8802f8b4b2d622931613aace44be57ae')
    .then(response => {
        return response.json()
    }) 
    .then((json) => {
        console.log(json);
        cityName.innerHTML = json.name;
        cityTemp.innerHTML = (Math.round(json.main.temp)).toFixed(1);
        cityWeather.innerHTML = json.weather[0].description;
        cityName.innerHTML = json.city.name;
        cityTemp.innerHTML = json.list[0].main.temp.toFixed(1);
        cityWeather.innerHTML = json.list[0].weather[0].description;
        const sunriseStart = new Date(json.city.sunrise);
        const sunsetStart = new Date(json.city.sunset);
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString
        sunriseTime.innerHTML = sunriseStart.toLocaleTimeString([], {hour:'2-digit', minute: '2-digit'});
        sunsetTime.innerHTML = sunsetStart.toLocaleTimeString([], {hour:'2-digit', minute: '2-digit'});
        weekly1Temp.innerHTML = (json.list[1].main.temp).toFixed(1);
        weekly2Temp.innerHTML = (json.list[2].main.temp).toFixed(1);
        weekly3Temp.innerHTML = (json.list[3].main.temp).toFixed(1);
        weekly4Temp.innerHTML = (json.list[4].main.temp).toFixed(1);
        weekly5Temp.innerHTML = (json.list[5].main.temp).toFixed(1);
    } )
    
    .catch((error) => {
        console.log('caught error', error);  
    })


    

    