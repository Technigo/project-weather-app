// APIs from different cities
const StockholmAPI = 'http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&appid=2163e0bcc8eaa7f0951284d8a650a723&lang=sv';
const StockholmForecastAPI = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=2163e0bcc8eaa7f0951284d8a650a723';
const UmeaAPI = 'http://api.openweathermap.org/data/2.5/weather?q=Umea,Sweden&units=metric&appid=2163e0bcc8eaa7f0951284d8a650a723&lang=sv';
const UmeaForecastAPI = 'https://api.openweathermap.org/data/2.5/forecast?q=Umea,Sweden&units=metric&APPID=2163e0bcc8eaa7f0951284d8a650a723&lang=sv';
const BodenAPI = 'http://api.openweathermap.org/data/2.5/weather?q=Boden,Sweden&units=metric&appid=2163e0bcc8eaa7f0951284d8a650a723&lang=sv';
const BodenForecastAPI = 'https://api.openweathermap.org/data/2.5/forecast?q=Boden,Sweden&units=metric&APPID=2163e0bcc8eaa7f0951284d8a650a723';
const KlintanAPI = 'http://api.openweathermap.org/data/2.5/weather?q=Robertsfors,Sweden&units=metric&appid=2163e0bcc8eaa7f0951284d8a650a723&lang=sv';
const KlintanForecastAPI = 'https://api.openweathermap.org/data/2.5/forecast?q=Robertsfors,Sweden&units=metric&APPID=2163e0bcc8eaa7f0951284d8a650a723';

// Getting HTML elements

const currentWeatherContainer = document.getElementById("current-weather-container");
const weatherForecastContainer = document.getElementById("weather-forecast-container");
const currentWeatherMain = document.getElementById("current-main");
const navBar = document.getElementById("nav-bar");

// Getting current geo location

let lat =''
let lon =''
let geoLocationAPI = ''
let geoLocationForcastAPI = ''

const getLocationAPI = (callback) => {

     const getLocation = () => {
         if (navigator.geolocation) {
             navigator.geolocation.getCurrentPosition(setCoordinates); 
         } else {
            showCurrentWeather(StockholmAPI);
            showWeatherForecast(StockholmForecastAPI);
         }
     }
     const setCoordinates = (position) => {
         lat = position.coords.latitude
         lon = position.coords.longitude
         geoLocationAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=2163e0bcc8eaa7f0951284d8a650a723&lang=sv`
         geoLocationForcastAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=2163e0bcc8eaa7f0951284d8a650a723`
         callback();
     }
     
     getLocation();
     
}

const setLocationAPI = () => {
    showCurrentWeather(geoLocationAPI);
    showWeatherForecast(geoLocationForcastAPI);

}

//Shows or hides the navigation bar

const showHamburgerMenu = () => {
    if(navBar.style.display === "none") {
        navBar.style.display = "flex";
    } else {
        navBar.style.display = "none";
    }
};
const showNavBar = () => {
    const mediaSize = window.matchMedia("(min-width: 1024px)")
    if(mediaSize.matches) {
        navBar.style.display = "flex";
    } else { 
        navBar.style.display = "none";
    }
}

//Fetches the API and shows the data of today's weather

const showCurrentWeather = (API) => {
    showNavBar();
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
                if (weatherType === "Clouds") {
                    currentWeatherMain.classList.add('clouds');
                    currentWeatherMain.classList.remove('clear');
                    currentWeatherMain.classList.remove('rain');
                    currentWeatherMain.classList.remove('snow');
                } else if (weatherType === 'Rain') {
                    currentWeatherMain.classList.add('rain');
                    currentWeatherMain.classList.remove('clouds');
                    currentWeatherMain.classList.remove('clear');
                    currentWeatherMain.classList.remove('snow');
                } else if (weatherType === 'Clear') {
                    currentWeatherMain.classList.add('clear');
                    currentWeatherMain.classList.remove('clouds');
                    currentWeatherMain.classList.remove('rain');
                    currentWeatherMain.classList.remove('snow');
                } else if (weatherType === 'Snow') {
                    currentWeatherMain.classList.add('snow');
                    currentWeatherMain.classList.remove('clouds');
                    currentWeatherMain.classList.remove('rain');
                    currentWeatherMain.classList.remove('clear');
                }
            }
            setWeatherColors();
            currentWeatherContainer.innerHTML = `<h1>${weatherTemp}<sup>&degC</sup></h1><h2>${weather.name}</h2><p>${weatherDescription}</p><div class="sun"><p>Sunrise: ${sunriseString} </p> <p>Sunset: ${sunsetString} </p></div>`
        })


}

//Fetches the API and shows the data of the 5 day forecast

const showWeatherForecast = (forecastAPI) => {
    fetch(forecastAPI)
    .then ((response) => {
        return response.json();
    })
    .then ((forecast) => {
        const filteredForecast = forecast.list.filter(item => item.dt_txt.includes('12:00'));
        console.log(filteredForecast)
        weatherForecastContainer.innerHTML = '';
        filteredForecast.forEach((forecastDay => {
            const forecastTemp = forecastDay.main.temp.toFixed(0)
            const forecastWeekday = new Date(forecastDay.dt * 1000).toLocaleDateString('se-SE', {weekday: 'short'})
            const weatherIcon = forecastDay.weather[0].icon
            let forecastImage = '';
            let forecastHTML = '';

            const setForecastImage = () => {
                if (weatherIcon === "01d") {
                    forecastImage = "http://openweathermap.org/img/wn/01d@2x.png"
                } else if (weatherIcon === "02d") {
                    forecastImage = "http://openweathermap.org/img/wn/02d@2x.png"
                } else if (weatherIcon === "03d") {
                    forecastImage = "http://openweathermap.org/img/wn/03d@2x.png"
                } else if (weatherIcon === "04d") {
                    forecastImage = "http://openweathermap.org/img/wn/04d@2x.png"
                } else if (weatherIcon === "09d") {
                    forecastImage = "http://openweathermap.org/img/wn/09d@2x.png"
                } else if (weatherIcon === "10d") {
                    forecastImage = "http://openweathermap.org/img/wn/10d@2x.png"
                } else if (weatherIcon === "11d") {
                    forecastImage = "http://openweathermap.org/img/wn/11d@2x.png"
                } else if (weatherIcon === "13d") {
                    forecastImage = "http://openweathermap.org/img/wn/13d@2x.png"
                } else if (weatherIcon === "50d") {
                    forecastImage = "http://openweathermap.org/img/wn/50d@2x.png"
                }
        }
        setForecastImage();

        forecastHTML += `<div class="forecast-day">`;
        forecastHTML += ` <p>${forecastWeekday}</p>`;
        forecastHTML += ` <div class="temp">`;
        forecastHTML += `  <img src="${forecastImage}"/><p> ${forecastTemp}&degC </p>`;
        forecastHTML += ` </div>`;
        forecastHTML += `</div>`;
        
        weatherForecastContainer.innerHTML += `${forecastHTML}`;

        }))

    })
}

//On page load

getLocationAPI(setLocationAPI);

