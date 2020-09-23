const StockholmAPI = 'http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&appid=2163e0bcc8eaa7f0951284d8a650a723&lang=sv';
const StockholmForecastAPI = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=2163e0bcc8eaa7f0951284d8a650a723';
const UmeaAPI = 'http://api.openweathermap.org/data/2.5/weather?q=Umea,Sweden&units=metric&appid=2163e0bcc8eaa7f0951284d8a650a723&lang=sv';
const UmeaForecastAPI = 'https://api.openweathermap.org/data/2.5/forecast?q=Umea,Sweden&units=metric&APPID=2163e0bcc8eaa7f0951284d8a650a723';

const currentWeatherContainer = document.getElementById("current-weather-container");
const weatherForecastContainer = document.getElementById("weather-forecast-container");
const currentWeatherMain = document.getElementById("current-main");
const navBar = document.getElementById("nav-bar");

const showHamburgerMenu = () => {
    if(navBar.style.display === "none") {
        navBar.style.display = "flex";
    } else {
        navBar.style.display = "none";
    }
};

const currentWeather = (API) => {
navBar.style.display = "none";
fetch(API)
.then((respons) => {
    return respons.json();
})
.then ((weather) => {
    const weatherTemp = weather.main.temp.toFixed(0)
    const sunrise = new Date(weather.sys.sunrise * 1000)
    const sunriseString = sunrise.toLocaleTimeString('se-SE', {hour: '2-digit', minute:'2-digit'})
    const sunset = new Date(weather.sys.sunset * 1000)
    const sunsetString = sunset.toLocaleTimeString('se-SE', {hour: '2-digit', minute:'2-digit'})
    const weatherDescription = weather.weather[0].description
    const weatherType = weather.weather[0].main

    const setWeatherColors = () => {
        if (weatherType === 'Clouds') {
        currentWeatherMain.classList.add('clouds');
        } else if (weatherType === 'Rain') {
            currentWeatherMain.classList.add('rain');
        } else if (weatherType === 'Clear') {
            currentWeatherMain.classList.add('clear');
        } else if (weatherType === 'Snow') {
            currentWeatherMain.classList.add('snow');
        }

    }
    setWeatherColors();
    currentWeatherContainer.innerHTML = `<h1>${weatherTemp}<sup>&degC</sup></h1><h2>${weather.name}</h2><p>${weatherDescription}</p><div class="sun"><p>Sunrise: ${sunriseString} </p> <p>Sunset: ${sunsetString} </p></div>`
})


}

const weatherForecast = (forecastAPI) => {
    fetch(forecastAPI)
    .then ((response) => {
        return response.json();
    })
    .then ((forecast) => {
        const filteredForecast = forecast.list.filter(item => item.dt_txt.includes('12:00'));
        console.log(filteredForecast)
        weatherForecastContainer.innerHTML = '';
        filteredForecast.forEach((item => {
        const forecastTemp = item.main.temp.toFixed(0)
        const forecastDay = new Date(item.dt * 1000).toLocaleDateString('se-SE', {weekday: 'short'})
        let forecastImage = "";
        let forecastHTML = '';

        const setForecastImage = () => {
            if (item.weather[0].icon === "01d") {
                forecastImage = "http://openweathermap.org/img/wn/01d@2x.png"
            } else if (item.weather[0].icon === "02d") {
                forecastImage = "http://openweathermap.org/img/wn/02d@2x.png"
            } else if (item.weather[0].icon === "03d") {
                forecastImage = "http://openweathermap.org/img/wn/03d@2x.png"
            } else if (item.weather[0].icon === "04d") {
                forecastImage = "http://openweathermap.org/img/wn/04d@2x.png"
            } else if (item.weather[0].icon === "09d") {
                forecastImage = "http://openweathermap.org/img/wn/09d@2x.png"
            } else if (item.weather[0].icon === "10d") {
                forecastImage = "http://openweathermap.org/img/wn/10d@2x.png"
            } else if (item.weather[0].icon === "11d") {
                forecastImage = "http://openweathermap.org/img/wn/11d@2x.png"
            } else if (item.weather[0].icon === "13d") {
                forecastImage = "http://openweathermap.org/img/wn/13d@2x.png"
            } else if (item.weather[0].icon === "50d") {
                forecastImage = "http://openweathermap.org/img/wn/50d@2x.png"
            }
        }
        setForecastImage();

        forecastHTML += `<div class="forecast-day">`;
        forecastHTML += ` <p>${forecastDay}</p>`;
        forecastHTML += ` <div class="temp">`;
        forecastHTML += `  <img src="${forecastImage}"/><p> ${forecastTemp}&degC </p>`;
        forecastHTML += ` </div>`;
        forecastHTML += `</div>`;
        
        weatherForecastContainer.innerHTML += `${forecastHTML}`;

        }))

    })
}


currentWeather(StockholmAPI);
weatherForecast(StockholmForecastAPI);