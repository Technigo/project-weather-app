const todayBaseURL = "https://api.openweathermap.org/data/2.5/weather?";
const api_key = "13effacd4851e7429104b607caf74ebc";
const city = "Stockholm,Sweden";
const todayURL = `${todayBaseURL}q=${city}&units=metric&APPID=${api_key}`;

// DOM Selectors
const cityName = document.getElementById("city");
const temperature = document.getElementById("temp");
const weatherType = document.getElementById("we_type");
const sunriseTime = document.getElementById("sunrise");
const sunsetTime = document.getElementById("sunset");
const currentWeatherIcon = document.getElementById("weather-icon");

// Initiate network request
fetch(todayURL)
    // Convert response to JSON
    .then(response => response.json())
    // Take JSON data and execute the code inside the callback function
    .then(data => {
        console.log(data);
        const currentCity = data.name;
        const todayTemp = data.main.temp;
        const currentType = data.weather[0].description;
        const todayIcon = data.weather[0].icon;
        const todayIconURL = `http://openweathermap.org/img/w/${todayIcon}.png`;
        const sunrise = data.sys.sunrise;
        const sunset = data.sys.sunset;

        // Round off todayTemp to one decimal
        const todayTempRounded = todayTemp.toFixed(1);

        // Convert sunrise and sunset data into Date obejcts
        const sunriseDate = new Date(sunrise * 1000);
        const sunsetDate = new Date(sunset * 1000);

        // Format Date objects to display sunrise and sunset in 24h format
        const sunriseFormatted = sunriseDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/Stockholm' });
        const sunsetFormatted = sunsetDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/Stockholm' });

        // Update the HTML
        cityName.innerText = currentCity
        temperature.innerText = `${todayTempRounded}°C`;
        currentWeatherIcon.src = todayIconURL;
        currentWeatherIcon.alt = "Weather Icon";
        weatherType.innerText = currentType;
        sunriseTime.innerText = `Sunrise: ${sunriseFormatted}`;
        sunsetTime.innerText = `Sunset: ${sunsetFormatted}`;
    });