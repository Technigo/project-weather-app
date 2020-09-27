const API_KEY = '1135d0ed8f3ffc61db744af9153b5e66';

const url = (place) => {
    return `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&APPID=${API_KEY}`
};

const urlFiveDayForecast = (place) => {
    return `https://api.openweathermap.org/data/2.5/forecast?q=${place}&units=metric&APPID=${API_KEY}`
};

const currentTemp = document.getElementById('todaysTemp');
const city = document.getElementById('city');
const weatherType = document.getElementById('weatherType');
const weatherTypeIcon = document.getElementById('weatherTypeIcon');
const sunriseTime = document.getElementById('sunriseTime');
const sunsetTime = document.getElementById('sunsetTime');
const days = document.getElementsByClassName('day-container');
const sunTime = document.getElementsByClassName('.sun');
const body = document.getElementsByTagName('body');
const circle = document.getElementById('circle');
const cloud = document.getElementById('cloud');
const drops = document.getElementById('drops');


const showSunWeatherImage = () => {
    circle.style.display = 'block';
    cloud.style.display = 'none';
    drops.style.display = 'none';
};

const showCloudWeatherImage = () => {
    circle.style.display = 'none';
    cloud.style.display = 'block';
    drops.style.display = 'none';
};

const showRainWeatherImage = () => {
    circle.style.display = 'none';
    cloud.style.display = 'none';
    drops.style.display = 'block';
};

//Rounding Numbers
const roundNums = (num, decimals = 1) => {
    const pow = Math.pow(10, decimals);
    return Math.round(num * pow) / pow;
};

//Get current time
const currentTime = () => {
    const today = new Date();
    const time = today.getHours() + ":" + today.getMinutes();
    return time;
};

//Generate time from jason
const generateTime = (json) => {
    const time = new Date(json * 1000);
    const timeToString = time.toLocaleTimeString('sv-SE', { hour: 'numeric', minute: 'numeric'});
    return timeToString;
}

//Generate date from jason
const generateDate = (json) => {
    const date = new Date(json * 1000);
    const dateToString = date.toLocaleDateString('sv-SE', { weekday: 'long'});
    return dateToString;
}

 // Get city, current temperature, sunrise, sunset from json and change html
const generateHTMLForWeather = (currentWeather) => {
    sunriseTime.innerText = generateTime(currentWeather.sys.sunrise);
    sunsetTime.innerText = generateTime(currentWeather.sys.sunset);
    city.innerText = currentWeather.name;
    currentTemp.innerText = `${roundNums(currentWeather.main.temp, 0)} °C`;
    weatherType.innerText = currentWeather.weather[0].main;
    weatherType.innerHTML += `<i class='${weatherIcon(currentWeather.weather[0].icon)}'>`;
}

 // Get day and temperature from json and change html
const generateHTMLFiveDayForecast = (forecast) => {
    const filteredFiveDayForecast = forecast.list.filter(item => item.dt_txt.includes('12:00'));
    filteredFiveDayForecast.forEach((item, index) => {
        days[index].querySelector('.day').innerText = generateDate(item.dt);
    });

    filteredFiveDayForecast.forEach((item, index) => {
        days[index].querySelector('.temperature').innerText = `${roundNums(item.main.temp)} °C`;
    });
}

// Assign new Icon depending on icon from json
const weatherIcon = (icon) => {
    const code = icon[0] + icon[1];
    const time = icon[2];
    switch (code) {
        case '01': return `wi wi-${time === 'n' ? 'night-clear' : 'day-sunny'}`;
        case '02': return `wi wi-${time === 'n' ? 'night' : 'day'}-cloudy`;
        case '03': return 'wi wi-cloud';
        case '04': return 'wi wi-cloudy';
        case '09': return 'wi wi-rain';
        case '10': return `wi wi-${time === 'n' ? 'night' : 'day'}-rain`;
        case '11': return 'wi wi-thunderstorm';
        case '13': return 'wi wi-snowflake-cold';
        case '50': return 'wi-fog';
    };
};

//Change background Image depending on weather type
const bigWeatherIcon = (currentWeather) => {
    const icon = currentWeather.weather[0].icon;
    const code = icon[0] + icon[1];
    switch (code) {
        case '01': showSunWeatherImage(); 
        case '02': showSunWeatherImage();
        case '03': showCloudWeatherImage();
        case '04': showCloudWeatherImage();
        case '09': showRainWeatherImage();
        case '10': showRainWeatherImage();
        case '11': showRainWeatherImage();
        case '13': showRainWeatherImage();
        case '50': showRainWeatherImage();
    };
};

//Change background depending on time
const changeBackground = (currentWeather) => {
    const currenttime = currentTime();
    const sunrise = generateTime(currentWeather.sys.sunrise)
    const sunset = generateTime(currentWeather.sys.sunset)

    document.body.style.backgroundImage = currenttime > sunrise && currenttime < sunset 
    ? 'linear-gradient(190deg, #FFC6C8 0%, #FAD56A 100%)'
    : 'linear-gradient(190deg, #ffc6c8 0%, #976bb6 100%)'
};

const getSelectedLocation = () => {
    select = document.getElementById('selectCity');
    return select.options[select.selectedIndex].value;
};


//Fetch current weather  
fetch(url(getSelectedLocation())).then((response) => {
    return response.json();
})
.then((currentWeather) => {
    generateHTMLForWeather(currentWeather);
    changeBackground(currentWeather);
    bigWeatherIcon(currentWeather);
});


//Fetch 5 weather 
fetch(urlFiveDayForecast(getSelectedLocation())).then((response) => {
    return response.json();
})
.then((forecast) => {
    generateHTMLFiveDayForecast(forecast);
});

//Update fetch depeding on selected city
const update = () => {
    fetch(url(getSelectedLocation())).then((response) => {
        return response.json();
    })
    .then((currentWeather) => {
        generateHTMLForWeather(currentWeather);
        changeBackground(currentWeather);
        bigWeatherIcon(currentWeather);
    });

    fetch(urlFiveDayForecast(getSelectedLocation())).then((response) => {
        return response.json();
    })
    .then((forecast) => {
        generateHTMLFiveDayForecast(forecast);
    });
}

const getLocation = () => {
    navigator.geolocation 
    ? navigator.geolocation.getCurrentPosition(setCoordinates)
    : console.log("Geolocation is not supported by this browser.")
};

const setCoordinates = (position) => {
    lat = position.coord.latitude
    lon = position.coord.longitude
    geolocationAPI = `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    
}

