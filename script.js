const weatherRightNow = document.getElementById('weather-right-now');
const sunsetSunrise = document.getElementById('sunset-sunrise');
const forecast = document.getElementById('forecast');
document.body.style.fontFamily = 'MyCustomFont, sans-serif';

// Fetch current weather data for Stockholm
fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=3492ebb354e19f61676ca7b4ced6d196')
    .then((response) => response.json())
    .then((json) => {
        const temperature = json.main.temp.toFixed(0);
        const description = json.weather[0].description;
        const icon = json.weather[0].icon;
        const sunrise = new Date(json.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const sunset = new Date(json.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const timestamp = new Date(json.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        weatherRightNow.innerHTML = `<h1>${temperature}<span class='degree'>°C</span></h1>`;
        weatherRightNow.innerHTML += `<h3>${json.name}</h3>`;
        weatherRightNow.innerHTML += `<p>Time: ${timestamp}</p>`;
        weatherRightNow.innerHTML += `<p>${description} <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather icon"></p>`;

        sunsetSunrise.innerHTML += `<p>Sunrise: ${sunrise} | Sunset: ${sunset}</p>`;
    })
    .catch((error) => {
        console.error('Error fetching weather data:', error);
    });

// Fetch forecast for Stockholm
fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=3492ebb354e19f61676ca7b4ced6d196')
    .then(response => response.json())
    .then(data => {
        forecast.innerHTML = '';  // Clear previous content

        const today = new Date().getDate();  // Today's date
        const dailyForecasts = [];

        data.list.forEach(item => {
            const itemDate = new Date(item.dt_txt).getDate();  // Date for each forecast

            // Only get one forecast per day, ensuring it's a new day
            if (!dailyForecasts.some(f => new Date(f.dt_txt).getDate() === itemDate)) {
                dailyForecasts.push(item);
            }
        });

        // Limit to today + four days ahead
        const forecastDays = dailyForecasts.slice(1, 5);

        // Iterate over forecast days and create HTML content
        forecastDays.forEach(item => {
            forecast.innerHTML += `
                <div class="forecast-day">
                    <p>${new Date(item.dt_txt).toLocaleDateString('ENG', { weekday: 'short' })}</p>
                    <p><img src="http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" alt="Weather icon"></p>
                    <p>${item.main.temp.toFixed(0)}°C</p>
                    <p>${item.wind.speed} m/s</p>
                </div>`;
        });
    })
    .catch(error => console.log('Error fetching data:', error));
