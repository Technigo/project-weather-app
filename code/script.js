// APIs from different cities
const StockholmAPI = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&appid=2163e0bcc8eaa7f0951284d8a650a723&lang=sv';
const UmeaAPI = 'https://api.openweathermap.org/data/2.5/weather?q=Umea,Sweden&units=metric&appid=2163e0bcc8eaa7f0951284d8a650a723&lang=sv';
const BodenAPI = 'https://api.openweathermap.org/data/2.5/weather?q=Boden,Sweden&units=metric&appid=2163e0bcc8eaa7f0951284d8a650a723&lang=sv';
const KlintanAPI = 'https://api.openweathermap.org/data/2.5/weather?q=Robertsfors,Sweden&units=metric&appid=2163e0bcc8eaa7f0951284d8a650a723&lang=sv';
const stockholmDailyAPI = 'https://api.openweathermap.org/data/2.5/onecall?lat=59.3293&lon=18.0686&exclude=current,minutely,hourly,alerts&units=metric&appid=2163e0bcc8eaa7f0951284d8a650a723'
const umeaDailyAPI = 'https://api.openweathermap.org/data/2.5/onecall?lat=63.8258&lon=20.2630&exclude=current,minutely,hourly,alerts&units=metric&appid=2163e0bcc8eaa7f0951284d8a650a723'
const bodenDailyAPI = 'https://api.openweathermap.org/data/2.5/onecall?lat=65.8251&lon=21.6887&exclude=current,minutely,hourly,alerts&units=metric&appid=2163e0bcc8eaa7f0951284d8a650a723'
const klintanDailyAPI = 'https://api.openweathermap.org/data/2.5/onecall?lat=64.1918&lon=20.8489&exclude=current,minutely,hourly,alerts&units=metric&appid=2163e0bcc8eaa7f0951284d8a650a723'


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
let geoLocationForcastAPI = ''
let geoLocationDailyAPI = ''

/*** FUNCTIONS ***/

// Getting current geo location

const getLocationAPI = (callback) => {

    const getLocation = () => {
         if (navigator.geolocation) {
             navigator.geolocation.getCurrentPosition(setCoordinates, handleError); 
         } else {
            showCurrentWeather(StockholmAPI);
            showWeatherForecast(stockholmDailyAPI);
         }
    }
    const setCoordinates = (position) => {
         lat = position.coords.latitude
         lon = position.coords.longitude
         geoLocationAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=2163e0bcc8eaa7f0951284d8a650a723&lang=sv`
         geoLocationForcastAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=2163e0bcc8eaa7f0951284d8a650a723`
         geoLocationDailyAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=2163e0bcc8eaa7f0951284d8a650a723`
         callback();
    }
    
    const handleError = (error) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                showCurrentWeather(StockholmAPI);
                showWeatherForecast(stockholmDailyAPI);
                break;
            case error.POSITION_UNAVAILABLE:
                showCurrentWeather(StockholmAPI);
                showWeatherForecast(stockholmDailyAPI);
                break;
            case error.TIMEOUT:
                showCurrentWeather(StockholmAPI);
                showWeatherForecast(stockholmDailyAPI);
                break;
        }
    }
    getLocation();
     
}

const setLocationAPI = () => {
    showCurrentWeather(geoLocationAPI);
    showWeatherForecast(geoLocationDailyAPI);
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
    cloudAnimation.style.display = "block";
    sunAnimation.style.display = "none";
    rainAnimation.style.display = "none";
    mistAnimation.style.display = "none";
}

const showRainAnimation = () => {
    cloudAnimation.style.display = "none";
    sunAnimation.style.display = "none";
    rainAnimation.style.display = "flex";
    mistAnimation.style.display = "none";
}

const showSunAnimation = () => {
    cloudAnimation.style.display = "none";
    sunAnimation.style.display = "flex";
    rainAnimation.style.display = "none";
    mistAnimation.style.display = "none";
}

const showMistAnimation = () => {
    cloudAnimation.style.display = "none";
    sunAnimation.style.display = "none";
    rainAnimation.style.display = "none";
    mistAnimation.style.display = "flex";
}

const hideWeatherAnimation = () => {
    cloudAnimation.style.display = "none";
    sunAnimation.style.display = "none";
    rainAnimation.style.display = "none";
    mistAnimation.style.display = "none";
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
                    currentWeatherMain.classList.add('clouds');
                    currentWeatherMain.classList.remove('clear');
                    currentWeatherMain.classList.remove('rain');
                    currentWeatherMain.classList.remove('snow');
                    currentWeatherMain.classList.remove('mist');
                    showCloudAnimation();
                } else if (weatherType === 'Rain'|| weatherType === 'Drizzle') {
                    currentWeatherMain.classList.add('rain');
                    currentWeatherMain.classList.remove('clouds');
                    currentWeatherMain.classList.remove('clear');
                    currentWeatherMain.classList.remove('snow');
                    currentWeatherMain.classList.remove('mist');
                    showRainAnimation();
                } else if (weatherType === 'Clear') {
                    currentWeatherMain.classList.add('clear');
                    currentWeatherMain.classList.remove('clouds');
                    currentWeatherMain.classList.remove('rain');
                    currentWeatherMain.classList.remove('snow');
                    currentWeatherMain.classList.remove('mist');
                    showSunAnimation();
                } else if (weatherType === 'Mist' || weatherType === 'Fog') {
                    currentWeatherMain.classList.add('mist');
                    currentWeatherMain.classList.remove('clear');
                    currentWeatherMain.classList.remove('rain');
                    currentWeatherMain.classList.remove('snow');
                    currentWeatherMain.classList.remove('clouds');
                    showMistAnimation();
                } else if (weatherType === 'Snow') {
                    currentWeatherMain.classList.add('snow');
                    currentWeatherMain.classList.remove('clouds');
                    currentWeatherMain.classList.remove('rain');
                    currentWeatherMain.classList.remove('clear');
                    currentWeatherMain.classList.remove('mist');
                    showCloudAnimation();
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
                const forecastTemp = forecastDay.temp.day.toFixed(0)
                const forecastWeekday = new Date(forecastDay.dt * 1000).toLocaleDateString('se-SE', {weekday: 'short'})
                const weatherIcon = forecastDay.weather[0].icon
                const tempMin = forecastDay.temp.min.toFixed(0)
                const tempMax = forecastDay.temp.max.toFixed(0)
                let forecastImage = '';
                let forecastHTML = '';
    
                const setForecastImage = () => {
                    if (weatherIcon === "01d") {
                        forecastImage = "https://openweathermap.org/img/wn/01d@2x.png"
                    } else if (weatherIcon === "02d") {
                        forecastImage = "https://openweathermap.org/img/wn/02d@2x.png"
                    } else if (weatherIcon === "03d") {
                        forecastImage = "https://openweathermap.org/img/wn/03d@2x.png"
                    } else if (weatherIcon === "04d") {
                        forecastImage = "https://openweathermap.org/img/wn/04d@2x.png"
                    } else if (weatherIcon === "09d") {
                        forecastImage = "https://openweathermap.org/img/wn/09d@2x.png"
                    } else if (weatherIcon === "10d") {
                        forecastImage = "https://openweathermap.org/img/wn/10d@2x.png"
                    } else if (weatherIcon === "11d") {
                        forecastImage = "https://openweathermap.org/img/wn/11d@2x.png"
                    } else if (weatherIcon === "13d") {
                        forecastImage = "https://openweathermap.org/img/wn/13d@2x.png"
                    } else if (weatherIcon === "50d") {
                        forecastImage = "https://openweathermap.org/img/wn/50d@2x.png"
                    }
                }
                setForecastImage();
    
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
