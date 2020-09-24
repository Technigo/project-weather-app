
// Location + UV index Coordinates Variables Porto (default)
let city = 'Porto, Portugal';
let latitude ='41.15';
let longitude = '8.61';
const cityName = document.getElementById('city');

// Weather Variables 
const currentTemperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weather-description');
const realFeel = document.getElementById('real-feel');
const currentWind = document.getElementById('wind');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');
const uvIndexPorto = document.getElementById('uv');
const body = document.getElementsByTagName('body')[0];

// Date Variables
let todaysDate = new Date();
const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


// Function to change background 
const backgroundChange = (weatherInfo) => { 
    if (weatherInfo.main.temp.toFixed(1) >= 18 || weatherInfo.main.feels_like.toFixed(1) >= 18) {
        body.classList.add('warm')
    } else{ 
        body.classList.remove('warm')
    }
}


// Main function that shows the updated weather
const updateCityWeather = (weatherInfo) => { 
    cityName.innerHTML = city;
    weatherDescription.innerHTML = weatherInfo.weather.map((weather) => weather.description);
    sunriseSunset(weatherInfo);
    updateRoundTemperatures(weatherInfo);
    updateWind(weatherInfo);
    backgroundChange(weatherInfo);
    weatherIconChange(weatherInfo.weather[0].main)
};

const weatherIconChange = (weather) => {
    if (weather == "Rain") {
    document.getElementById('weatherIcon').src = './assets/rain.svg';
    } if (weather == "Clouds") {
    document.getElementById('weatherIcon').src = './assets/partly-cloudy-day.svg';
    } if (weather == "Clear" || weather == "Sunny") {
    document.getElementById('weatherIcon').src= './assets/sun.svg';
    } if (weather == "Mist" || weather == "Fog") {
    document.getElementById('weatherIcon').src= './assets/mist.svg';
    } if (weather == "Snow"){
    document.getElementById('weatherIcon').src= './assets/snow.svg';
    } if (weather == "Hail"){
    document.getElementById('weatherIcon').src= './assets/hail.svg';
    } if (weather == "Thunder"){
    document.getElementById('weatherIcon').src= './assets/thunderstorms.svg';
  }
}
  
// Current and real feel rounded temperature function
const updateRoundTemperatures = (weatherInfo) => {
    const roundedTemperature = weatherInfo.main.temp.toFixed(1);
    currentTemperature.innerHTML = `${roundedTemperature} °C`;
    const realFeelRoundedTemp = weatherInfo.main.feels_like.toFixed(1);
    realFeel.innerHTML = `Feels like: ${realFeelRoundedTemp}°C`;
};

// WIND Function 
const updateWind = (weatherInfo) => { 
    const wind = weatherInfo.wind.speed;
    currentWind.innerHTML = `Wind Speed: ${wind} m/s`;
};

// SUNRISE & SUNSET Function
const sunriseSunset = (weatherInfo) => {
    const sunriseTime = new Date(weatherInfo.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    sunrise.innerHTML = `Sunrise: ${sunriseTime}`;
    const sunsetTime = new Date(weatherInfo.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    sunset.innerHTML = `Sunset: ${sunsetTime}`;
};

// UV index Function 
const updateUvIndex = (uvInfo) => {
    const uvIndex = uvInfo.value;
    uv.innerHTML = `UV index: ${uvIndex}`;
}

// Fetch UV index Data 
const loadUvIndex = (latitude, longitude) => { 
    const apiUvIndexUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${latitude}&lon=${longitude}&appid=09124a2f59a3124951523d476ed8a36d`;
    fetch(apiUvIndexUrl)
    .then((response) => {
        return response.json()
    })
    .then ((json) => {
        updateUvIndex(json);
    })
    .catch((error) => {
        console.log(error) 
    })
};


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
            const indexOfDayOfTheWeek = date.getDay();
            minMaxTemps[currentDate] = { 
                minTemp: item.main.temp_min, 
                maxTemp: item.main.temp_max,
                dayOfWeek: daysOfTheWeek[indexOfDayOfTheWeek]
            };
        }
    });
    const forecast = document.getElementById('forecast');
    forecast.innerHTML = "";
    for (const date in minMaxTemps) { 
        forecast.innerHTML += `<div class="column">${minMaxTemps[date].dayOfWeek}</div>`
        forecast.innerHTML += `<div class="column">${minMaxTemps[date].minTemp.toFixed(1)} °C | ${minMaxTemps[date].maxTemp.toFixed(1)} °C </div>`
    };
    
}

// Fetch 5-day Forecast Data
const loadFiveDaysWeatherForecast = (city) => { 
    const apiForecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=09124a2f59a3124951523d476ed8a36d`;
    
    fetch(apiForecastWeatherUrl)
    .then((response) => { return response.json(); })
    .then((data) => { updateMinMaxTemps(data); }); 
}


// Fetch Weather Data
const loadWeatherCity = (city) => {
    const apiCurrentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=09124a2f59a3124951523d476ed8a36d`;
    fetch(apiCurrentWeatherUrl)
    .then((response) => { 
        return response.json()
    })
    .then((json) => { 
        updateCityWeather(json);    
    })
      .catch((error) => {
        console.log(error) 
    })
}

// Sets up page for a city 
const initializePage = (city, latitude, longitude) => {
    loadWeatherCity(city);
    loadFiveDaysWeatherForecast(city);
    loadUvIndex(latitude,longitude);
}


document.getElementById('porto').addEventListener('click', () => {
    city = 'Porto, Portugal';
    latitude = '41.15';
    longitude = '8.61';
    initializePage(city, latitude, longitude);
});

document.getElementById('london').addEventListener('click', () => {
    city = 'London, UK';
    latitude = '51.51';
    longitude = '-0.13';
    initializePage(city, latitude, longitude);
});

document.getElementById('stockholm').addEventListener('click', () => {
    city = 'Stockholm, Sweden';
    latitude = '59.33';
    longitude = '18.06';
    initializePage(city, latitude, longitude);
});
initializePage(city, latitude, longitude);