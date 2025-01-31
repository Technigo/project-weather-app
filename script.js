const apiKey = 'f9f6a2848b9884ac0094319bc7eaad1f';
const city = 'Stockholm';

async function fetchWeather() {
    try {
        const weatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`
        );

        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${apiKey}`
        );

        const weatherData = await weatherResponse.json();
        const forecastData = await forecastResponse.json();

        displayCurrentWeather(weatherData);
        displayForecast(forecastData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayCurrentWeather(data) {
    const temperatureElement = document.getElementById('temperature');
    const cityElement = document.getElementById('city');
    const descriptionElement = document.getElementById('description');
    const sunriseElement = document.getElementById('sunrise');
    const sunsetElement = document.getElementById('sunset');
    const localTimeElement = document.getElementById('local-time');
    const weatherIconElement = document.getElementById('weather-icon');

    const temperature = data.main.temp.toFixed(1);
    const cityName = data.name;
    const description = data.weather[0].description;
    const sunrise = formatTime(data.sys.sunrise, data.timezone);
    const sunset = formatTime(data.sys.sunset, data.timezone);
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // Correct local time calculation
    const localTimeFormatted = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: `Etc/GMT${data.timezone / 3600 > 0 ? '-' : '+'}${Math.abs(data.timezone / 3600)}`,
    }).format(new Date());

    // Update DOM elements
    temperatureElement.textContent = `${temperature}°C`;
    cityElement.textContent = cityName;
    descriptionElement.textContent = description;
    sunriseElement.textContent = `Sunrise: ${sunrise}`;
    sunsetElement.textContent = `Sunset: ${sunset}`;
    localTimeElement.textContent = `Local Time: ${localTimeFormatted}`;

    // Update weather icon
    weatherIconElement.src = iconUrl;
    weatherIconElement.alt = description;
}

function displayForecast(data) {
    const forecastElement = document.getElementById('forecast');
    const groupedForecasts = {};

    // Group forecasts by date
    data.list.forEach(item => {
        const date = item.dt_txt.split(' ')[0]; // Extract date
        if (!groupedForecasts[date]) {
            groupedForecasts[date] = [];
        }
        groupedForecasts[date].push(item);
    });

    // Generate forecast display
    forecastElement.innerHTML = ''; // Clear previous forecast
    Object.entries(groupedForecasts).slice(0, 5).forEach(([date, forecasts]) => {
        const day = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });

        // Calculate min/max temperatures for the day
        const temps = forecasts.map(f => f.main.temp);
        const tempMin = Math.min(...temps).toFixed(1);
        const tempMax = Math.max(...temps).toFixed(1);

        // Select the midday weather icon
        const middayForecast = forecasts.find(f => f.dt_txt.includes('12:00:00')) || forecasts[0];
        const iconCode = middayForecast.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';
        forecastItem.innerHTML = `
            <div class="day">${day}</div>
            <img src="${iconUrl}" alt="Weather icon" class="icon" />
            <div class="temp-range">${tempMin}° / ${tempMax}°</div>
        `;

        forecastElement.appendChild(forecastItem);
    });
}

function formatTime(timestamp, timezoneOffset) {
    const date = new Date((timestamp + timezoneOffset) * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

fetchWeather();
