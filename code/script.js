// APIs from different cities
const stockholmCurrentAPI = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&appid=2163e0bcc8eaa7f0951284d8a650a723&lang=sv';
const umeaCurrentAPI = 'https://api.openweathermap.org/data/2.5/weather?q=Umea,Sweden&units=metric&appid=2163e0bcc8eaa7f0951284d8a650a723&lang=sv';
const bodenCurrentAPI = 'https://api.openweathermap.org/data/2.5/weather?q=Boden,Sweden&units=metric&appid=2163e0bcc8eaa7f0951284d8a650a723&lang=sv';
const klintanCurrentAPI = 'https://api.openweathermap.org/data/2.5/weather?q=Robertsfors,Sweden&units=metric&appid=2163e0bcc8eaa7f0951284d8a650a723&lang=sv';
const stockholmOneCallAPI = 'https://api.openweathermap.org/data/2.5/onecall?lat=59.3293&lon=18.0686&exclude=current,minutely,hourly,alerts&units=metric&appid=2163e0bcc8eaa7f0951284d8a650a723'
const umeaOneCallAPI = 'https://api.openweathermap.org/data/2.5/onecall?lat=63.8258&lon=20.2630&exclude=current,minutely,hourly,alerts&units=metric&appid=2163e0bcc8eaa7f0951284d8a650a723'
const bodenOneCallAPI = 'https://api.openweathermap.org/data/2.5/onecall?lat=65.8251&lon=21.6887&exclude=current,minutely,hourly,alerts&units=metric&appid=2163e0bcc8eaa7f0951284d8a650a723'
const klintanOneCallAPI = 'https://api.openweathermap.org/data/2.5/onecall?lat=64.1918&lon=20.8489&exclude=current,minutely,hourly,alerts&units=metric&appid=2163e0bcc8eaa7f0951284d8a650a723'


// Getting HTML elements

const currentWeatherContainer = document.getElementById("current-weather-container");
const weatherForecastContainer = document.getElementById("weather-forecast-container");
const currentWeatherMain = document.getElementById("current-main");
const navBar = document.getElementById("nav-bar");
const hamburgerMenu = document.getElementById("hamburger-menu")
const loading = document.getElementById("loading")
const sunriseSpan = document.getElementById("sunrise")
const sunsetSpan = document.getElementById("sunset")
const minMax = document.getElementById("min-max")
const cloudAnimation = document.getElementById("cloud-symbol")
const rainAnimation = document.getElementById("rain-symbol")
const sunAnimation = document.getElementById("sun-symbol")
const mistAnimation = document.getElementById("mist-symbol")

//Variables for geo location

let lat =''
let lon =''
let geoLocationAPI = ''
let geoLocationDailyAPI = ''

/*** FUNCTIONS ***/

// Getting current geo location

const getLocationAPI = (callback) => {

    const getLocation = () => {
         if (navigator.geolocation) {
             navigator.geolocation.getCurrentPosition(setCoordinates, handleError); 
         } else {
            showDefaultCity();
         }
    }
    const setCoordinates = (position) => {
         lat = position.coords.latitude
         lon = position.coords.longitude
         geoLocationAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=2163e0bcc8eaa7f0951284d8a650a723&lang=sv`
         geoLocationOneCallAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=2163e0bcc8eaa7f0951284d8a650a723`
         callback();
    }
    
    const handleError = (error) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                showDefaultCity();
                break;
            case error.POSITION_UNAVAILABLE:
                showDefaultCity();
                break;
            case error.TIMEOUT:
                showDefaultCity();
                break;
        }
    }
    getLocation();
     
}

const showDefaultCity = () => {
    showCurrentWeather(stockholmCurrentAPI);
    showWeatherForecast(stockholmOneCallAPI);
}

const setLocationAPI = () => {
    showCurrentWeather(geoLocationAPI);
    showWeatherForecast(geoLocationOneCallAPI);
}

//Shows or hides the navigation bar

const showHamburgerMenu = () => {
    if(navBar.style.display === "none") {
        navBar.style.display = "flex";
        hamburgerMenu.style.flexDirection = "row"

    } else {
        navBar.style.display = "none";
        hamburgerMenu.style.flexDirection = "column"
    }
};

const showNavBar = () => {
    const mediaSize = window.matchMedia("(min-width: 1024px)")
    if(mediaSize.matches) {
        navBar.style.display = "flex";
    } else { 
        navBar.style.display = "none";
        hamburgerMenu.style.flexDirection = "column"
    }
}

//Shows or hides the weather animations

const showCloudAnimation = () => {
    hideWeatherAnimation();
    cloudAnimation.style.display = "block";
    currentWeatherMain.classList.add('clouds');
}

const showRainAnimation = () => {
    hideWeatherAnimation();
    rainAnimation.style.display = "flex";
    currentWeatherMain.classList.add('rain');
}

const showSunAnimation = () => {
    hideWeatherAnimation();
    sunAnimation.style.display = "flex";
    currentWeatherMain.classList.add('clear');}

const showMistAnimation = () => {
    hideWeatherAnimation();
    mistAnimation.style.display = "flex";
    currentWeatherMain.classList.add('mist');
}

const hideWeatherAnimation = () => {
    cloudAnimation.style.display = "none";
    sunAnimation.style.display = "none";
    rainAnimation.style.display = "none";
    mistAnimation.style.display = "none";
    currentWeatherMain.classList.remove('clouds','clear','snow','rain','mist');
}

//Fetches the API and shows the data of today's weather

const showCurrentWeather = (API) => {
    loading.style.display = "none";
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
                    showCloudAnimation();
                } else if (weatherType === 'Rain'|| weatherType === 'Drizzle') {
                    showRainAnimation();
                } else if (weatherType === 'Clear') {
                    showSunAnimation();
                } else if (weatherType === 'Mist' || weatherType === 'Fog') {
                    showMistAnimation();
                } else if (weatherType === 'Snow') {
                    showCloudAnimation();
                    currentWeatherMain.classList.add('snow');
                    currentWeatherMain.classList.remove('clouds');
                } else {
                    hideWeatherAnimation();
                }
            }
            setWeatherColors();
            currentWeatherContainer.innerHTML = `<h1>${weatherTemp}<sup>&degC</sup></h1><h2>${weather.name}</h2><p>${weatherDescription}</p>`
            sunriseSpan.innerHTML = `<p> ${sunriseString} </p>`
            sunsetSpan.innerHTML = `<p> ${sunsetString} </p>`
        })
}

//Fetches the API and shows the data of the 5 day forecast

const showWeatherForecast = (forecastAPI) => {
        fetch(forecastAPI)
        .then ((response) => {
            return response.json();
        })
        .then ((forecast) => {
            weatherForecastContainer.innerHTML = '';
            const forecast5Days = forecast.daily.slice(1,6);
            const todayMin = forecast.daily[0].temp.min.toFixed(0)
            const todayMax = forecast.daily[0].temp.max.toFixed(0)
            forecast5Days.forEach((forecastDay => {
                const forecastWeekday = new Date(forecastDay.dt * 1000).toLocaleDateString('se-SE', {weekday: 'short'})
                const weatherIcon = forecastDay.weather[0].icon
                const tempMin = forecastDay.temp.min.toFixed(0)
                const tempMax = forecastDay.temp.max.toFixed(0)
                let forecastImage =`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
                let forecastHTML = '';

                forecastHTML += `<div class="forecast-day">`;
                forecastHTML += ` <p>${forecastWeekday}</p>`;
                forecastHTML += ` <div class="temp">`;
                forecastHTML += `  <img src="${forecastImage}"/><p> ${tempMin}&degC / ${tempMax}&degC </p>`;
                forecastHTML += ` </div>`;
                forecastHTML += `</div>`;
            
                weatherForecastContainer.innerHTML += `${forecastHTML}`;    
            }))

            minMax.innerHTML = `<p>Min ${todayMin}&degC / Max ${todayMax}&degC</p>`
    
        })
    }
    

//On page load
window.addEventListener("resize", showNavBar);
getLocationAPI(setLocationAPI);
