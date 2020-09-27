const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=8b97619989976c72fc1e602d8c793890';
/*const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Phoenix&units=metric&appid=8b97619989976c72fc1e602d8c793890';*/
const apiUrl2 = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=8b97619989976c72fc1e602d8c793890';


const weatherDescription = document.getElementById('weatherDescription');
const weatherText = document.getElementById('weatherText');
//const city = document.getElementById('city');
//const mainTemp = document.getElementById('mainTemp');
//ovan behövs inte, förstår inte riktigt vrf, eftersom const weather/.../ behövs...


//CURRENT WEATHER:
fetch(apiUrl).then((response) => {
    return response.json();
}).then((json) => {
    mainTemp.innerHTML += `<h1>${json.main.temp.toFixed(1)}&#730<sup>c</sup></h1>`;
    city.innerHTML += `<h1>${json.name}<h1>`;
    //.toFixed(1) rounds the temperature to 1 decimal
    json.weather.forEach((weather) => {
    weatherDescription.innerHTML += `<h1>${weather.description}</h1>` 
    weatherIconShow(json.weather[0].main)
});

    function weatherIconShow(weather) {
        if (weather == "Rain"  || weather == "Drizzle") {
            document.getElementById('weatherIcon').src = './icons/noun_Umbrella_2030530.svg';
            weatherText.innerHTML += "<h2>Under the umberella please! Or stay inside. Or do you dance in the rain?</h2>"
        } else if (weather == "Clouds") {
            document.getElementById('weatherIcon').src = './icons/noun_Cloud_1188486.svg';
            weatherText.innerHTML += "<h2>Cloudy today. Maybe stay inside, light a fire and drink some warm chocolate.</h2>"
        } else if (weather == "Sunny"  ||  weather == "Clear") {
            document.getElementById('weatherIcon').src = './icons/noun_Sunglasses_2055147.svg';
            weatherText.innerHTML += "<h2>Aaah! No clouds, no rain, let's get out and enjoy the weather!</h2>"
        } else if (weather == "Thunderstorm") {
            document.getElementById('weatherIcon').src = './icons/noun_Cloud_1188486.svg';
            weatherText.innerHTML += "<h2>The power of nature. Stay safe inside, look at the spectacle through the window & listen to the roar from the sky.</h2>"
        } else if (weather == "Snow") {
            document.getElementById('weatherIcon').src = './icons/iconfinder_Snow_3741358.svg';
            weatherText.innerHTML += "<h2>Stay warm and cosy inside? Out skiing or build a snow man?</h2>"
        } else {
            document.getElementById('weatherIcon').src = './icons/iconfinder_Weather_forecast_weather_station_radar_6646328.svg';
            weatherText.innerHTML += "<h2>Welcome to this weather app!</h2>"
        }
    }

    const sunrise = new Date(json.sys.sunrise * 1000);
    const sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: "short" });
 
    const sunset = new Date(json.sys.sunset * 1000);
    const sunsetTime = sunset.toLocaleTimeString([], { timeStyle: "short" });
 
    sunriseInfo.innerHTML += `<h2> Sunrise ${sunriseTime}</h2>`;
    sunsetInfo.innerHTML += `<h2> Sunset ${sunsetTime} </h2>`;
});

const night = () => {
    const currentTime = new Date().getHours();
    console.log(currentTime)
    if (currentTime >= 22 && currentTime <= 04){
        document.getElementById('nightIcon').src = './icons/iconfinder_03_moon_sleepy_night_emoticon_weather_smiley_3375686.svg';
        weatherText.innerHTML +="<h2>Hello there Night Owl! Can't sleep? Cathing stars? Dancing?</h2>";
        var element = document.getElementById("weatherIconParent");
        element.parentNode.removeChild(element);
    }
}
night();


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
        forecastMainTemp.innerHTML += `<h2><span>${day.main.temp.toFixed(1)}&#730<sup>c</sup></h2>`;
    });
});