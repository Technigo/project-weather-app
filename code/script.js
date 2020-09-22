
// Location + API links 
const city = 'Porto,Portugal';
const cityName = document.getElementById('city');
const apiCurrentWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=09124a2f59a3124951523d476ed8a36d`;
const apiForecastWeatherUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=09124a2f59a3124951523d476ed8a36d`;
const apiUvIndexUrl = 'http://api.openweathermap.org/data/2.5/uvi?lat=41.15&lon=8.61&appid=09124a2f59a3124951523d476ed8a36d';

// Weather Variables 
const currentTemperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("weather-description");
const realFeel = document.getElementById('real-feel');
const currentWind = document.getElementById('wind');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');

// Date Variable 
let todaysDate = new Date();

//Fetch Data

    fetch(apiCurrentWeatherUrl)
    .then((response)=> { 
        return response.json()
    })
    .then((porto) => { 
        console.log(porto);
        cityName.innerHTML = city;

        //Current and real feel rounded temperature 
        const roundedTemperature = porto.main.temp.toFixed(1);
        currentTemperature.innerHTML += `${roundedTemperature}°C`;

        const realFeelRoundedTemp = porto.main.feels_like.toFixed(1);
        realFeel.innerHTML += `${realFeelRoundedTemp}°C`;

        weatherDescription.innerHTML = porto.weather.map((weather) => weather.description);

        //WIND
        const wind = porto.wind.speed;
        currentWind.innerHTML += `${wind} m/s`;

        //SUNRISE & SUNSET//
        const sunriseTime = new Date(porto.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const sunsetTime = new Date(porto.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        sunrise.innerHTML += `${sunriseTime}`;
        sunset.innerHTML += `${sunsetTime}`;
    })
      .catch((error) => {
        console.log(error) 
    })


