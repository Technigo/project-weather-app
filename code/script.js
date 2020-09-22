
// Location Variables
const city = 'Porto, Portugal';
const cityName = document.getElementById('city');

// API Variables
const apiCurrentWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=09124a2f59a3124951523d476ed8a36d`;
const apiForecastWeatherUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=09124a2f59a3124951523d476ed8a36d`;
const apiUvIndexUrlPorto = 'http://api.openweathermap.org/data/2.5/uvi?lat=41.15&lon=8.61&appid=09124a2f59a3124951523d476ed8a36d';

// Weather Variables 
const currentTemperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weather-description');
const realFeel = document.getElementById('real-feel');
const currentWind = document.getElementById('wind');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');
const uvIndexPorto = document.getElementById('uv')

// Date Variables
let todaysDate = new Date();
const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Main function that shows the updated weather
const updateCityWeather = (weatherInfo) => { 
    cityName.innerHTML = city;
    weatherDescription.innerHTML = weatherInfo.weather.map((weather) => weather.description);
    sunriseSunset(weatherInfo);
    updateRoundTemperatures(weatherInfo);
    updateWind(weatherInfo);
};

// Current and real feel rounded temperature function

const updateRoundTemperatures = (weatherInfo) => {
    const roundedTemperature = weatherInfo.main.temp.toFixed(1);
    currentTemperature.innerHTML += `${roundedTemperature} °C`;
    const realFeelRoundedTemp = weatherInfo.main.feels_like.toFixed(1);
    realFeel.innerHTML += `${realFeelRoundedTemp}°C`;
};

// WIND Function 

const updateWind = (weatherInfo) => { 
    const wind = weatherInfo.wind.speed;
    currentWind.innerHTML += `${wind} m/s`;
};

// SUNRISE & SUNSET Function
const sunriseSunset = (weatherInfo) => {
    const sunriseTime = new Date(weatherInfo.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    sunrise.innerHTML += `${sunriseTime}`;
    const sunsetTime = new Date(weatherInfo.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    sunset.innerHTML += `${sunsetTime}`;
};

// UV index Function 
const updateUvIndex = (uvInfo) => {
    const uvIndex = uvInfo.value;
    uv.innerHTML += `${uvIndex}`;
}

// Fetch Weather Data
fetch(apiCurrentWeatherUrl)
    .then((response) => { 
        return response.json()
    })
    .then((json) => { 
        console.log(json);
        updateCityWeather(json);    
    })
      .catch((error) => {
        console.log(error) 
    })

// Fetch UV index Data for Porto
fetch(apiUvIndexUrlPorto)
    .then((response) => {
        return response.json()
    })
.then ((json) => {
    console.log(json)
    updateUvIndex(json);
})
.catch((error) => {
    console.log(error) 
})


// Function to get the min and max temps over the day from the 5 day forecast (3hr interval)
const updateMinMaxTemps = (data) => {
    let minMaxTemps = {};

    data.list.forEach((item) => {
        const currentDate = item.dt_txt.split(" ")[0];

        if (minMaxTemps[currentDate]) {
            if (item.main.temp_min < minMaxTemps[currentDate].minTemp) {
                minMaxTemps[currentDate].minTemp = item.main.temp_min;
            }
            if (item.main.temp_max > minMaxTemps[currentDate].maxTemp) {
                minMaxTemps[currentDate].maxTemp = item.main.temp_max;
            }
        } else {
            const date = new Date(item.dt*1000);
            minMaxTemps[currentDate] = { 
                minTemp: item.main.temp_min, 
                maxTemp: item.main.temp_max,
                dayOfWeek: daysOfTheWeek[date.getDay()]
            };
        }
    });
    console.log(minMaxTemps)
    for (const date in minMaxTemps) { 
        const forecast = document.getElementById('forecast');
        forecast.innerHTML += `<div class="column">${minMaxTemps[date].dayOfWeek}</div>`
        forecast.innerHTML += `<div class="column">${minMaxTemps[date].minTemp.toFixed(1)} °C | ${minMaxTemps[date].maxTemp.toFixed(1)} °C </div>`
    };
    
}

// Fetch 5-day Forecast Data
fetch(apiForecastWeatherUrl)
.then((response) => { return response.json(); })
.then((data) => { updateMinMaxTemps(data); }); 







