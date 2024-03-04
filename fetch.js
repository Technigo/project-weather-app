const todayBaseURL = "https://api.openweathermap.org/data/2.5/weather?";
const api_key = "13effacd4851e7429104b607caf74ebc";
const city = "Stockholm,Sweden";
const todayURL = `${todayBaseURL}q=${city}&units=metric&APPID=${api_key}`;
const forecastBaseURL = "https://api.openweathermap.org/data/2.5/forecast?";
const forecastURL = `${forecastBaseURL}q=${city}&units=metric&APPID=${api_key}`;

// DOM Selectors for current weather container
const cityName = document.getElementById("city");
const temperature = document.getElementById("temp");
const weatherType = document.getElementById("we_type");
const sunriseTime = document.getElementById("sunrise");
const sunsetTime = document.getElementById("sunset");
const currentWeatherIcon = document.getElementById("weather-icon");

// Initiate network request for current weather data
fetch(todayURL)
    // Convert response to JSON
    .then(response => response.json())
    // Take JSON data and execute the code inside the callback function
    .then(data => {
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

// DOM Selector for the forecast containers
const forecastContainers = document.querySelectorAll('.day-container');

// Function to update the HTML
function updateForecastData(container, weekdayString, forecastIconURL, middayTemp) {
    container.querySelector('.weekday').innerText = weekdayString;
    container.querySelector('.forecast-icon').src = forecastIconURL;
    container.querySelector('.midday_temp').innerText = `${middayTemp}°C`;
}

// Initiate network request for forecast data
fetch(forecastURL)
    // Convert response to JSON
    .then(response => response.json())
    // Take JSON data and execute the code inside the callback function
    .then(data => {
        // Filter array for 12:00 data
        const filterArray = data.list.filter(item => item.dt_txt.includes("12:00"));

        // Loop through forecast containers and update data
        forecastContainers.forEach((container, index) => {
            const item = filterArray[index];

            // Convert unix to weekdays
            const unix = item.dt;
            const date = new Date(unix * 1000);
            const weekday = date.getDay();
            const weekdayArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const weekdayString = weekdayArray[weekday];

            // Forecast weather icon and temperature
            const weatherIcon = item.weather[0].icon;
            const forecastIconURL = `http://openweathermap.org/img/w/${weatherIcon}.png`;
            const middayTemp = item.main.temp;

            // Round off todayTemp to one decimal
            const middayTempRounded = middayTemp.toFixed(1);

            // Call function to update the HTML
            updateForecastData(container, weekdayString, forecastIconURL, middayTempRounded);
        });
    });