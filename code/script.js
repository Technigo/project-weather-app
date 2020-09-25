//Variables to be used later on

const tempToday = document.getElementById("temperatureToday");
const city = document.getElementById("city");
const description = document.getElementById("description");
const sunrise = document.getElementById("sunriseTime");
const sunset = document.getElementById("sunsetTime");
const icon0 = document.getElementById("icon0")

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
    icon0.innerHTML = `<img src= "https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png" alt="weather icon" />`

    //Update extra information for the tablet version
    document.getElementById("windSpeed_a").innerHTML = `wind speed: ${json.wind.speed} m/s`;
    document.getElementById("airPressure_a").innerHTML = `air pressure: ${json.main.pressure} mb`;
    document.getElementById("humidity_a").innerHTML = `humidity: ${json.main.humidity} g/m<sup>3</sup>`;

    //Update extra information for the desktop version
    document.getElementById("windSpeed_b").innerHTML = `wind speed: ${json.wind.speed} m/s`;
    document.getElementById("airPressure_b").innerHTML = `air pressure: ${json.main.pressure} mb`;
    document.getElementById("humidity_b").innerHTML = `humidity: ${json.main.humidity} g/m<sup>3</sup>`;

    //Update sunrise and sunset information
    const sunriseMillSeconds = new Date(json.sys.sunrise * 1000);
    const sunriseProperTime = sunriseMillSeconds.toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"});
    sunrise.innerHTML = sunriseProperTime;

    const sunsetMillSeconds = new Date(json.sys.sunset * 1000);
    console.log(sunsetMillSeconds);
    const sunsetProperTime = sunsetMillSeconds.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});
    sunset.innerHTML = sunsetProperTime;
};



//Functions to be used inside the forecast-function for the second fetch

const getMinTemperature = (json, dayNumber) => {
    const day0Date = new Date();
    const day0MillSeconds = day0Date.getTime();
    const day1Date = new Date(day0MillSeconds + 86400000 * dayNumber).toLocaleDateString("sv-SE");
    
    const filteredForecast = json.list.filter(item => item.dt_txt.includes(day1Date));
    const minTempArray = filteredForecast.map(day => day.main.temp_min);
    return Math.min(...minTempArray);
};

const getMaxTemperature = (json, dayNumber) => {
    const day0Date = new Date();
    const day0MillSeconds = day0Date.getTime();
    const day1Date = new Date(day0MillSeconds + 86400000 * dayNumber).toLocaleDateString("sv-SE");
    
    const filteredForecast = json.list.filter(item => item.dt_txt.includes(day1Date));
    const maxTempArray = filteredForecast.map(day => day.main.temp_max);
    return Math.max(...maxTempArray);
};

const getWeekday = (dayNumber) => {
    const day0Date = new Date();
    const day0MillSeconds = day0Date.getTime();
    const day1Date = new Date(day0MillSeconds + 86400000 * dayNumber).toLocaleDateString("en-US", {weekday : "short"});
    return day1Date;
};

//Function to be invoked in the second fetch for the 5-day-forecast

const updateWeatherForecast = (json) => {

    // Update the weekday for the next five days
    const day1 = document.getElementById("day1");
    const day2 = document.getElementById("day2");
    const day3 = document.getElementById("day3");
    const day4 = document.getElementById("day4");
    const day5 = document.getElementById("day5");

    day1.innerHTML = getWeekday(1);
    day2.innerHTML = getWeekday(2);
    day3.innerHTML = getWeekday(3);
    day4.innerHTML = getWeekday(4);
    day5.innerHTML = getWeekday(5);

    // Update the weather icons for the next five days
    const icon1 = document.getElementById("icon1");
    const icon2 = document.getElementById("icon2");
    const icon3 = document.getElementById("icon3");
    const icon4 = document.getElementById("icon4");
    const icon5 = document.getElementById("icon5");

    icon1.innerHTML = `<img src= "https://openweathermap.org/img/wn/${json.list[1].weather[0].icon}@2x.png" alt="weather icon" />`;
    icon2.innerHTML = `<img src= "https://openweathermap.org/img/wn/${json.list[2].weather[0].icon}@2x.png" alt="weather icon" />`;
    icon3.innerHTML = `<img src= "https://openweathermap.org/img/wn/${json.list[3].weather[0].icon}@2x.png" alt="weather icon" />`;
    icon4.innerHTML = `<img src= "https://openweathermap.org/img/wn/${json.list[4].weather[0].icon}@2x.png" alt="weather icon" />`;
    icon5.innerHTML = `<img src= "https://openweathermap.org/img/wn/${json.list[5].weather[0].icon}@2x.png" alt="weather icon" />`;


    // Get minimum and maximum temperatures for the next five days

    const day1MinTemp = getMinTemperature(json, 1).toFixed(1);
    const day2MinTemp = getMinTemperature(json, 2).toFixed(1);
    const day3MinTemp = getMinTemperature(json, 3).toFixed(1);
    const day4MinTemp = getMinTemperature(json, 4).toFixed(1);
    const day5MinTemp = getMinTemperature(json, 5).toFixed(1);

    const day1MaxTemp = getMaxTemperature(json, 1).toFixed(1);
    const day2MaxTemp = getMaxTemperature(json, 2).toFixed(1);
    const day3MaxTemp = getMaxTemperature(json, 3).toFixed(1);
    const day4MaxTemp = getMaxTemperature(json, 4).toFixed(1);
    const day5MaxTemp = getMaxTemperature(json, 5).toFixed(1);

    // Update DOM with min and max temperatures
    const day1Temp = document.getElementById("day1Temp");
    const day2Temp = document.getElementById("day2Temp");
    const day3Temp = document.getElementById("day3Temp");
    const day4Temp = document.getElementById("day4Temp");
    const day5Temp = document.getElementById("day5Temp");

    day1Temp.innerHTML = `${day1MinTemp}° / ${day1MaxTemp} °C`;
    day2Temp.innerHTML = `${day2MinTemp}° / ${day2MaxTemp} °C`;
    day3Temp.innerHTML = `${day3MinTemp}° / ${day3MaxTemp} °C`;
    day4Temp.innerHTML = `${day4MinTemp}° / ${day4MaxTemp} °C`;
    day5Temp.innerHTML = `${day5MinTemp}° / ${day5MaxTemp} °C`;

};

