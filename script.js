const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";
const API_KEY = "c88d356312a64bb962632770e0bd8c0f";
const CITY = "Stockholm,Sweden";
const UNITS = "metric";

function formatDate(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function updateWeatherAppearance(weatherMain) {
    const weatherIconElement = document.getElementById('weather-icon');
    const container = document.getElementById('weather-container');
    const iconMap = {
        'Clear': 'design/design2/icons/noun_Sunglasses_2055147.svg',
        'Rain': 'design/design2/icons/noun_Umbrella_2030530.svg',
        'Clouds': 'design/design2/icons/noun_Cloud_1188486.svg'
    };
    const classMap = {
        'Clear': 'sunny-weather',
        'Rain': 'rainy-weather',
        'Clouds': 'cloudy-weather'
    };

    weatherIconElement.src = iconMap[weatherMain] || 'path-to-default-icon.png';
    container.className = classMap[weatherMain] || '';
}

function updateForecast(forecastData) {
    const forecastElement = document.getElementById('forecast');
    forecastElement.innerHTML = '';
    forecastData.forEach(day => {
        const date = new Date(day.dt_txt);
        const dayElement = document.createElement('div');
        dayElement.className = 'forecast-day';
        dayElement.innerHTML = `
            <p class="forecast-date">${date.toLocaleDateString('en-US', { weekday: 'short' })}</p>
            <p class="forecast-temp">${day.main.temp.toFixed(1)}°C</p>
        `;
        forecastElement.appendChild(dayElement);
    });
}

function fetchWeatherData() {
    const URL = `${BASE_URL}?q=${CITY}&units=${UNITS}&APPID=${API_KEY}`;

    fetch(URL)
        .then(response => response.json())
        .then(data => {
            const cityNameElement = document.getElementById('city-name');
            const temperatureElement = document.getElementById('temperature');
            const weatherDescriptionElement = document.getElementById('weather-description');
            const sunriseSunsetElement = document.getElementById('sunrise-sunset');

            cityNameElement.textContent = data.name;
            temperatureElement.textContent = `Temperature: ${data.main.temp.toFixed(1)} °C`;
            weatherDescriptionElement.textContent = data.weather[0].description;
            sunriseSunsetElement.textContent = `Sunrise: ${formatDate(data.sys.sunrise)} Sunset: ${formatDate(data.sys.sunset)}`;

            updateWeatherAppearance(data.weather[0].main);

            fetchForecastData();
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

function fetchForecastData() {
    const FORECAST_URL_WITH_PARAMS = `${FORECAST_URL}?q=${CITY}&units=${UNITS}&APPID=${API_KEY}`;
    fetch(FORECAST_URL_WITH_PARAMS)
        .then(response => response.json())
        .then(data => {
            const dailyData = data.list.filter(forecast => forecast.dt_txt.includes('12:00:00'));
            updateForecast(dailyData);
        })
        .catch(error => {
            console.error('Forecast fetch error:', error);
        });
}

fetchWeatherData();