const API_KEY = '1135d0ed8f3ffc61db744af9153b5e66';

const url = (city, country = "Sweden") => {
    return `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&APPID=${API_KEY}`;
};

const urlFiveDayForecast = (city, country = "Sweden") => {
    return `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=metric&APPID=${API_KEY}`; 
};

const currentTemp = document.getElementById('todaysTemp')
const city = document.getElementById('city');

const sunriseTime = document.getElementById('sunriseTime');
const sunsetTime = document.getElementById('sunsetTime');

const days = document.getElementsByClassName('day-container');
const sunTime = document.getElementsByClassName('.sun');


//Rounding Numbers
const roundNums = (num, decimals = 1) => {
    const pow = Math.pow(10, decimals);
    return Math.round(num * pow) / pow;
};

//Generate time from jason
const generateTime = (json) => {
    const time = new Date(json * 1000);
    const timeToString = time.toLocaleTimeString('sv-SE', {
        hour: 'numeric',
        minute: 'numeric',  
    });
    return timeToString;
}

//Generate date from jason
const generateDate = (json) => {
    const date = new Date(json * 1000);
    const dateToString = date.toLocaleDateString('sv-SE', {
        weekday: 'long',
        
    });
    return dateToString;
}

 // Get city, current temperature, sunrise, sunset from json and change html
const generateHTMLForWeather = (stockholmWeather) => {
    sunriseTime.innerText = generateTime(stockholmWeather.sys.sunrise);
    sunsetTime.innerText = generateTime(stockholmWeather.sys.sunrise);
    city.innerText = stockholmWeather.name;
    currentTemp.innerText = roundNums(stockholmWeather.main.temp);
}

 // Get day and temperature from json and change html
const generateHTMLFiveDayForecast = (forecast) => {
    const filteredFiveDayForecast = forecast.list.filter(item => item.dt_txt.includes('12:00'));
    filteredFiveDayForecast.forEach((item, index) => {
        days[index].querySelector('.day').innerText = generateDate(item.dt);
    });

    filteredFiveDayForecast.forEach((item, index) => {
        days[index].querySelector('.temperature').innerText = roundNums(item.main.temp);
    });
}


fetch(url('Stockholm')).then((response) => {
    return response.json();
})
.then((stockholmWeather) => {
    generateHTMLForWeather(stockholmWeather);
});



fetch(urlFiveDayForecast('Stockholm')).then((response) => {
    return response.json();
})
.then((forecast) => {
    generateHTMLFiveDayForecast(forecast);
});

