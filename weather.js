const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=8b97619989976c72fc1e602d8c793890';
const apiUrl2 = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=8b97619989976c72fc1e602d8c793890';


//CURRENT WEATHER:
fetch(apiUrl).then((response) => {
    return response.json();
}).then((json) => {
    mainTemp.innerHTML += `<h1>${json.main.temp.toFixed(1)}&#730<sup>c</sup></h1>`;
    city.innerHTML += `<h1>${json.name}<h1>`;
    //.toFixed(1) rounds the temperature to 1 decimal
    json.weather.forEach((weather) => {
    weatherDescription.innerHTML += `<p>The weather is ${weather.description}</p>`
    });
    const sunrise = new Date(json.sys.sunrise * 1000);
    const sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: "short" });
 
    const sunset = new Date(json.sys.sunset * 1000);
    const sunsetTime = sunset.toLocaleTimeString([], { timeStyle: "short" });
 
    sunriseInfo.innerHTML += `<h2> Sunrise ${sunriseTime}</h2>`;
    sunsetInfo.innerHTML += `<h2> Sunset ${sunsetTime} </h2>`;
 
});

//FORECAST FOR 5 DAYS:
fetch(apiUrl2).then((response) => {
    return response.json();
}).then((json) => {
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'));

    filteredForecast.forEach((day) => {
        const date = new Date(day.dt * 1000);
        const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        let dayOfWeek = weekdays[date.getDay()];
  
        theWeekdays.innerHTML += `<h2>${dayOfWeek}</h2>`;
        forecastMainTemp.innerHTML += `<h2><span>${day.main.temp.toFixed(1)}&#730<sup>c</sup></span></h2>`;
    });
    console.log(json)
});