// Variables for today's weather
const city = document.getElementById('city');
const todaysDate = document.getElementById('todaysDate');
const weatherDescr = document.getElementById('weatherDescr');
const todaysTemperature = document.getElementById('todaysTemperature');
const wind = document.getElementById('wind');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');


// Function connected to the button in HTML - starts fetching weather when city is choosen
const fetchWeather = (cityName) => {
    forecastFunction(cityName);
    todaysWeatherfunction(cityName);
}

// Function for today's weather
const todaysWeatherfunction = (cityName) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=22db637cf647bcd1513c052513b7d54c`)
    .then((response) => {
        return response.json();
    })
    .then((todaysweather) => {
        city.innerHTML = `${todaysweather.name}, ${todaysweather.sys.country}`;
        todaysDate.innerHTML = `${new Date().toLocaleDateString('en-US',  {weekday: 'short'},)} |`;
        weatherDescr.innerHTML = `${todaysweather.weather[0].description} `;
        todaysTemperature.innerHTML = `| ${todaysweather.main.temp.toFixed(1)}°`;
        wind.innerHTML = `wind speed: ${todaysweather.wind.speed} (m/s)`

        // Sunrise & Sunset - fixing the format - Multiply by 1000 because data given in seconds.
        sunrise.innerHTML += new Date(todaysweather.sys.sunrise * 1000).toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit', hour12: false,});
        sunset.innerHTML += new Date(todaysweather.sys.sunset * 1000).toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit', hour12: false,});
        
        const weatherPicID = todaysweather.weather[0].icon; // Variable for getting the weather icon from the API
        weatherPic.src = `./assets/${weatherPicID}.png`; // Stored pics per weather icon id

        // Function to get the border different colors based on the temperature
        coloringFunction = () => {
            if (todaysweather.main.temp > 30.0) {
                document.getElementById("weatherColor").style.border = "10px solid #f29d74";
            } else if (todaysweather.main.temp > 20.0) {
                document.getElementById("weatherColor").style.border = "10px solid #ebbd73";
            } else if (todaysweather.main.temp > 15.0) {
                document.getElementById("weatherColor").style.border = "10px solid #a7f2c2";
            } else if (todaysweather.main.temp > 10.0) {
                document.getElementById("weatherColor").style.border = "10px solid #b6f0e0";
            } else if  (todaysweather.main.temp > 0.0) {
                document.getElementById("weatherColor").style.border = "10px solid #bbf2ee";
            } else if (todaysweather.main.temp < 0.0) {
                document.getElementById("weatherColor").style.border = "10px solid #bee3eb";
            } else {
                document.getElementById("weatherColor").style.border = "10px solid #f5b0a4";
            }
        };
        coloringFunction(); // Invoking the function
    
    })
};

// Variables for 5 day forecast
const todayplus1 = document.getElementById('todayplus1');
const descplus1 = document.getElementById('descplus1');
const temperatureplus1 = document.getElementById('temperatureplus1');
const todayplus2 = document.getElementById('todayplus2');
const descplus2 = document.getElementById('descplus2');
const temperatureplus2 = document.getElementById('temperatureplus2');
const todayplus3 = document.getElementById('todayplus3');
const descplus3 = document.getElementById('descplus3');
const temperatureplus3 = document.getElementById('temperatureplus3');
const todayplus4 = document.getElementById('todayplus4');
const descplus4 = document.getElementById('descplus4');
const temperatureplus4 = document.getElementById('temperatureplus4');
const todayplus5 = document.getElementById('todayplus5');
const descplus5 = document.getElementById('descplus5');
const temperatureplus5 = document.getElementById('temperatureplus5');

// Function for fetching the weather forecast for the next 5 days
const forecastFunction = (cityName) => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&APPID=22db637cf647bcd1513c052513b7d54c`)
    .then((response) => {
        return response.json();
    })
    .then((forecast) => {
        // filteredForecast is now an array with only the data from 12:00 each day.
        const filteredForecast = forecast.list.filter(item => item.dt_txt.includes('12:00'))
        
        // Variables and array for name on the upcoming days
        const today = new Date()
        const todayWeekday = today.getDay()
        var days = ['mon','tue','wed','thu','fri','sat', 'sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
        
        todayplus1.innerHTML = `${days[todayWeekday]} |`;
        descplus1.innerHTML = `${forecast.list[0].weather[0].description}`
        temperatureplus1.innerHTML = `| ${forecast.list[0].main.temp.toFixed(1)}°`;
        todayplus2.innerHTML = `${days[todayWeekday+1]} |`;
        descplus2.innerHTML = `${forecast.list[1].weather[0].description}`
        temperatureplus2.innerHTML = `| ${forecast.list[1].main.temp.toFixed(1)}°`;
        todayplus3.innerHTML = `${days[todayWeekday+2]} |`;
        descplus3.innerHTML = `${forecast.list[2].weather[0].description}`
        temperatureplus3.innerHTML = `| ${forecast.list[2].main.temp.toFixed(1)}°`;
        todayplus4.innerHTML = `${days[todayWeekday+3]} |`;
        descplus4.innerHTML = `${forecast.list[3].weather[0].description}`
        temperatureplus4.innerHTML = `| ${forecast.list[3].main.temp.toFixed(1)}°`;
        todayplus5.innerHTML = `${days[todayWeekday+4]} |`;
        descplus5.innerHTML = `${forecast.list[4].weather[0].description}`
        temperatureplus5.innerHTML = `| ${forecast.list[4].main.temp.toFixed(1)}°`;
    })
};

// Function to restart / clean the settings when changing city
const restart= () => {
    document.location.href = "";
};
