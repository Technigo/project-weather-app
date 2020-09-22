const tempToday = document.getElementById("temperatureToday");
const city = document.getElementById("city");
const description = document.getElementById("description");
const sunrise = document.getElementById("sunriseTime");
const sunset = document.getElementById("sunsetTime");



fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=e3f7767c281ddc6599588c383f72962d")
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        updateWeatherToday(json);
    });


const updateWeatherToday = (json) => {
    tempToday.innerHTML = json.main.temp.toFixed(1);
    city.innerHTML = json.name;
    description.innerHTML = json.weather[0].description;

    const sunriseMillSeconds = new Date(json.sys.sunrise * 1000);
    const sunriseProperTime = sunriseMillSeconds.toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"});
    sunrise.innerHTML = sunriseProperTime;

    const sunsetMillSeconds = new Date(json.sys.sunset * 1000);
    console.log(sunsetMillSeconds);
    const sunsetProperTime = sunsetMillSeconds.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});
    sunset.innerHTML = sunsetProperTime;
};

fetch("https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=e3f7767c281ddc6599588c383f72962d")
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        updateWeatherForecast(json);
    });


//FUNCTIONS TO SUPPORT THE WEATHER FORECAST UPDATE

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
    const day1Date = new Date(day0MillSeconds + 86400000 * dayNumber).toLocaleDateString("sv-SE", {weekday : "short"});
    return day1Date;
};

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

    // Get minimum and maximum temperatures for the next five days
    const jsonComplete = json 

    const day1MinTemp = getMinTemperature(jsonComplete, 1).toFixed(1);
    const day2MinTemp = getMinTemperature(jsonComplete, 2).toFixed(1);
    const day3MinTemp = getMinTemperature(jsonComplete, 3).toFixed(1);
    const day4MinTemp = getMinTemperature(jsonComplete, 4).toFixed(1);
    const day5MinTemp = getMinTemperature(jsonComplete, 5).toFixed(1);

    const day1MaxTemp = getMaxTemperature(jsonComplete, 1).toFixed(1);
    const day2MaxTemp = getMaxTemperature(jsonComplete, 2).toFixed(1);
    const day3MaxTemp = getMaxTemperature(jsonComplete, 3).toFixed(1);
    const day4MaxTemp = getMaxTemperature(jsonComplete, 4).toFixed(1);
    const day5MaxTemp = getMaxTemperature(jsonComplete, 5).toFixed(1);

    // Update DOM with min and max temperatures
    const day1Temp = document.getElementById("day1Temp");
    const day2Temp = document.getElementById("day2Temp");
    const day3Temp = document.getElementById("day3Temp");
    const day4Temp = document.getElementById("day4Temp");
    const day5Temp = document.getElementById("day5Temp");

    day1Temp.innerHTML = `${day1MinTemp}° / ${day1MaxTemp}° C`;
    day2Temp.innerHTML = `${day2MinTemp}° / ${day2MaxTemp}° C`;
    day3Temp.innerHTML = `${day3MinTemp}° / ${day3MaxTemp}° C`;
    day4Temp.innerHTML = `${day4MinTemp}° / ${day4MaxTemp}° C`;
    day5Temp.innerHTML = `${day5MinTemp}° / ${day5MaxTemp}° C`;

};

