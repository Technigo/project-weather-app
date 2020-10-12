// Variables for today's weather
const city = document.getElementById('city');
const todaysDate = document.getElementById('todaysDate');
const feelsLike = document.getElementById('feelsLike');
const weatherDescr = document.getElementById('weatherDescr');
const todaysTemperature = document.getElementById('todaysTemperature');
const wind = document.getElementById('wind');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');

const API_KEY = '22db637cf647bcd1513c052513b7d54c' // API-KEY

const start = () => { // Function for loading data for Gothenburg as default when the page loads first time
    let cityName = 'Gothenburg'; // The variable for city name. Let since it can be changed further on.
    forecastFunction(cityName);
    todaysWeatherfunction(cityName);
}

// Function connected to the select class '.city-input' in HTML - starts fetching other weather when new city is choosen
const fetchWeather = (cityName) => {
    forecastFunction(cityName);
    todaysWeatherfunction(cityName);
}

// Function for today's weather
const todaysWeatherfunction = (cityName) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${API_KEY}`)
    .then((response) => {
        return response.json();
    })
    .then((todaysweather) => {
        city.innerHTML = `${todaysweather.name}, ${todaysweather.sys.country}`; // City-name
        todaysDate.innerHTML = `${new Date().toLocaleDateString('en-US', 
        {weekday: 'short'},)}  <b>TODAY</b>`; // Today's weekday
        feelsLike.innerHTML = `feels like ${todaysweather.main.feels_like.toFixed(1)} °C`; // Feels-like info
        weatherDescr.innerHTML = `${todaysweather.weather[0].description}`; // Weather description
        todaysTemperature.innerHTML = `${todaysweather.main.temp.toFixed(1)} °C`; // Temperature
        wind.innerHTML = `wind speed: ${todaysweather.wind.speed} (m/s)` // Wind

        sunrise.innerHTML = new Date(todaysweather.sys.sunrise * 1000).toLocaleTimeString('en-US', 
        {hour: '2-digit', minute:'2-digit', hour12: false,}); // Sunrise time
        sunset.innerHTML = new Date(todaysweather.sys.sunset * 1000).toLocaleTimeString('en-US', 
        {hour: '2-digit', minute:'2-digit', hour12: false,}); // Sunset time
        
        const weatherPicID = todaysweather.weather[0].icon; // Variable for the weather icon from API
        weatherPic.src = `./assets/${weatherPicID}.png`; // Stored pics per weather icon id 

        // Function to give the border different colors based on the temperature
        coloringFunction = () => {
            if (todaysweather.main.temp > 30.0) {
                document.getElementById("weatherColor").style.border = "15px solid #f56b56";
            } else if (todaysweather.main.temp > 25.0) {
                document.getElementById("weatherColor").style.border = "15px solid #f29d74";
            } else if (todaysweather.main.temp > 20.0) {
                document.getElementById("weatherColor").style.border = "15px solid #ebbd73";
            } else if (todaysweather.main.temp > 15.0) {
                document.getElementById("weatherColor").style.border = "15px solid #a7f2c2";
            } else if (todaysweather.main.temp > 10.0) {
                document.getElementById("weatherColor").style.border = "15px solid #b6f0e0";
            } else if  (todaysweather.main.temp > 0.0) {
                document.getElementById("weatherColor").style.border = "15px solid #bbeff2";
            } else if (todaysweather.main.temp < 0.0) {
                document.getElementById("weatherColor").style.border = "15px solid #bee3eb";
            } else {
                document.getElementById("weatherColor").style.border = "15px solid #f5b0a4";
            }
        };
        coloringFunction(); // Invoking the function
    });
};

// Function for fetching the weather forecast for the next 5 days
const forecastFunction = (cityName) => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&APPID=${API_KEY}`)
    .then((response) => {
        return response.json();
    })
    .then((forecast) => {
        // filteredForecast is now an array with only the data from 12:00 each day.
        const filteredForecast = forecast.list.filter(item => item.dt_txt.includes('12:00'));

        const newWeek = filteredForecast.map((week) => {
            const day = (new Date(week.dt * 1000)).toLocaleDateString("en-US", { weekday: "short" });
            const description = week.weather[0].description;
            const temperature = week.main.temp.toFixed(1) + `°C`;
        
            return { day, description, temperature };
        });

        const weeks = document.getElementsByClassName('anotherday');
           
        newWeek.forEach((item, index) => {        
            weeks[index].querySelector('.day').innerText = item.day;
            weeks[index].querySelector('.day-descr').innerText = item.description;
            weeks[index].querySelector('.day-temp').innerText = item.temperature;
        });

        // To add pictures in the 5-days-forecast. I had to do them one by one.
        // Day 1
        const forecastPicID1 = filteredForecast[0].weather[0].icon; 
        forecastPic1.src = `./assets/${forecastPicID1}.png`; 
        // Day 2
        const forecastPicID2 = filteredForecast[1].weather[0].icon; 
        forecastPic2.src = `./assets/${forecastPicID2}.png`; 
        // Day 3
        const forecastPicID3 = filteredForecast[2].weather[0].icon; 
        forecastPic3.src = `./assets/${forecastPicID3}.png`; 
        // Day 4
        const forecastPicID4 = filteredForecast[3].weather[0].icon; 
        forecastPic4.src = `./assets/${forecastPicID4}.png`; 
        // Day 5
        const forecastPicID5 = filteredForecast[4].weather[0].icon; 
        forecastPic5.src = `./assets/${forecastPicID5}.png`; 

        });
    };