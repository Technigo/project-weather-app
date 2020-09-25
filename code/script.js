//Variables to be used later on

const tempToday = document.getElementById("temperatureToday");
const city = document.getElementById("city");
const description = document.getElementById("description");
const sunrise = document.getElementById("sunriseTime");
const sunset = document.getElementById("sunsetTime");
const icon0 = document.getElementById("icon0");

const API_KEY = "e3f7767c281ddc6599588c383f72962d";
const API_URL_TODAY = `https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=${API_KEY}`;
const API_URL_FORECAST = `https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=${API_KEY}`;

//Two fetches to get API data for today and a 5-day-forecast

fetch(API_URL_TODAY)
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        updateWeatherToday(json);
    });

    
fetch(API_URL_FORECAST)
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        updateWeatherForecast(json);
        
    });

//Function to be invoked in the first fetch for the weather today

const updateWeatherToday = (json) => {
    //Update information in the top section
    tempToday.innerHTML = `${json.main.temp.toFixed(1)}<span>°C</span>`;
    city.innerHTML = json.name;
    description.innerHTML = json.weather[0].description;
    icon0.innerHTML = `<img src= "https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png" alt="weather icon" />`;

    //Update extra information for the tablet version
    document.getElementById("windSpeed_a").innerHTML = `wind speed: ${json.wind.speed} m/s`;
    document.getElementById("airPressure_a").innerHTML = `air pressure: ${json.main.pressure} mb`;
    document.getElementById("humidity_a").innerHTML = `humidity: ${json.main.humidity} g/m<sup>3</sup>`;

    //Update extra information for the desktop version
    document.getElementById("windSpeed_b").innerHTML = `wind speed: ${json.wind.speed} m/s`;
    document.getElementById("airPressure_b").innerHTML = `air pressure: ${json.main.pressure} mb`;
    document.getElementById("humidity_b").innerHTML = `humidity: ${json.main.humidity} g/m<sup>3</sup>`;

    //Update sunrise and sunset information
    const sunriseTime = new Date(json.sys.sunrise * 1000).toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"});
    sunrise.innerHTML = sunriseTime;

    const sunsetTime = new Date(json.sys.sunset * 1000).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});
    sunset.innerHTML = sunsetTime;
};



//Functions to be used inside the forecast-function for the second fetch

const getMinTemperature = (json, dayNumber) => {
    const day0Date = new Date();
    const day0MillSeconds = day0Date.getTime();
    const day1Date = new Date(day0MillSeconds + 86400000 * (dayNumber+1)).toLocaleDateString("sv-SE");
    
    const filteredForecast = json.list.filter(item => item.dt_txt.includes(day1Date));
    const minTempArray = filteredForecast.map(day => day.main.temp_min);
    return Math.min(...minTempArray);
};

const getMaxTemperature = (json, dayNumber) => {
    const day0Date = new Date();
    const day0MillSeconds = day0Date.getTime();
    const day1Date = new Date(day0MillSeconds + 86400000 * (dayNumber +1)).toLocaleDateString("sv-SE");
    
    const filteredForecast = json.list.filter(item => item.dt_txt.includes(day1Date));
    const maxTempArray = filteredForecast.map(day => day.main.temp_max);
    return Math.max(...maxTempArray);
};

const getWeekday = (dayNumber) => {
    const day0Date = new Date();
    const day0MillSeconds = day0Date.getTime();
    const day1Date = new Date(day0MillSeconds + 86400000 * (dayNumber + 1)).toLocaleDateString("en-US", {weekday : "short"});
    return day1Date;
};

//Function to be invoked in the second fetch for the 5-day-forecast

const updateWeatherForecast = (json) => {

    // Update weekdays for the next five days

    const nextDays = Array.from(document.getElementsByClassName("days"));
    nextDays.forEach((item, index) => {
        document.getElementsByClassName("days")[index].innerHTML = getWeekday(index);
    });


    // Update the weather icons for the next five days

    const forecastIcons = Array.from(document.getElementsByClassName("icons"));
    forecastIcons.forEach((item, index) => {
        document.getElementsByClassName("icons")[index].innerHTML = `<img src= "https://openweathermap.org/img/wn/${json.list[index + 1].weather[0].icon}@2x.png" alt="weather icon" />`;
    });


    // Get minimum and maximum temperatures for the next five days

    const nextTemps = Array.from(document.getElementsByClassName("temps"));
    nextTemps.forEach((item, index) => {
        document.getElementsByClassName("temps")[index].innerHTML = `${getMinTemperature(json, index).toFixed(1)}° / ${getMaxTemperature(json, index).toFixed(1)} °C`;
    });

};

