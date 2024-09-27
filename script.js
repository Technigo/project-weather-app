// DOM selectors
const weather = document.getElementById('weather');
const viewCurrentWeatherIcon = document.getElementById('viewCurrentWeatherIcon');
const viewCurrentTemp = document.getElementById('viewCurrentTemp');
const viewCurrentCity = document.getElementById('viewCurrentCity');
const viewCurrentWeatherText = document.getElementById('viewCurrentWeatherText');
const viewSunriseSunset = document.getElementById('viewSunriseSunset');
const forecastContainer = document.getElementById('forecastContainer');

// API
const API_KEY = '7438f6ff1587b542eeec76b91380b575';
const city = 'Stockholm';
const URL_WEATHER = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${API_KEY}`;
const URL_FORECAST = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${API_KEY}`;

const getTodaysWeather = () => {
  fetch(URL_WEATHER)
    // Reurn API-answere in JSON-format
    .then(response => response.json())

    .then(data => {
      // Get API data
      const currentWeatherIcon = data.weather[0].icon;
      // Commented out this code, just to show how it looks if temperature is rounded to 1 decimal
      //const currentTemp = data.main.temp.toFixed(1);
      const currentTemp = Math.round(data.main.temp);
      const currentCity = data.name;
      const currentWeatherText = data.weather[0].description;

      // Convert the Unix timestamp returned by the OpenWeatherMap API to a readable date and time format
      const sunriseTime = new Date(data.sys.sunrise * 1000);
      const sunsetTime = new Date(data.sys.sunset * 1000);

      // To calculate sunset/sunrise
      const currentTime = new Date();

      // Convert time to 00:00 format
      const sunriseTimeFormatted = sunriseTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const sunsetTimeFormatted = sunsetTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      // When background for night/day should me shown
      if (currentTime >= sunriseTime && currentTime < sunsetTime) {
        weather.classList.add('daytime');
      } else {
        weather.classList.add('nighttime');
      }

      // Update HTML
      viewCurrentWeatherIcon.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${currentWeatherIcon}@2x.png" alt="Weather icon">
      `;
      viewCurrentTemp.innerHTML = `
        <h1>${currentTemp}</h1><h2>°C</h2>
      `;
      viewCurrentCity.innerHTML = `
        <h3>${currentCity}</h3>
      `;
      viewCurrentWeatherText.innerHTML = `
        <h4>${currentWeatherText}</h4>
      `;
      viewSunriseSunset.innerHTML = `
        <h4>sunrise</h4>
        <h4>${sunriseTimeFormatted}</h4>
        <h4>sunset</h4>
        <h4>${sunsetTimeFormatted}</h4>
      `;
    })

    // Catch logs and errors
    .catch((error) => {
      console.log('Error:', error);
    });
}

// Call the function to get and show todays weather
getTodaysWeather();

const getWeatherForecast = () => {
  fetch(URL_FORECAST)
    .then(response => response.json())

    .then(data => {
      // Get unique days in the forecast (filtering by date without time)"
      const days = {};
      data.list.forEach(item => {
        const date = item.dt_txt.split(' ')[0]; // Get only date
        if (!days[date]) {
          days[date] = []; // Create array for each date
        }
        days[date].push(item); // Add all weather entries for each date
      });

      // Skip first day (index 0)
      const filteredDays = Object.keys(days).slice(1, 6);

      // Loop through filtred days and show the data
      filteredDays.forEach(date => {
        const dayForecast = days[date];

        // Find highest and lowest temperature for each day
        const temps = dayForecast.map(item => Math.round(item.main.temp));
        const maxTemp = Math.max(...temps);
        const minTemp = Math.min(...temps);

        // Get weahter icon at 12:00 for the specific day
        const middayForecast = dayForecast.find(item => item.dt_txt.includes('12:00:00'));
        const weatherIcon = middayForecast ? middayForecast.weather[0].icon : dayForecast[0].weather[0].icon;

        // Get the weekday (three letters in uppercase)
        const dayOfWeek = new Date(date).toLocaleDateString('en-GB', { weekday: 'short' }).toUpperCase();

        // Build HTML for every days forecast
        forecastContainer.innerHTML += `
          <div class="forecast">
            <p>${dayOfWeek}</p>
            <div class="forecast-icon-temp">
              <img src="http://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather icon">
              <p>${minTemp}° / ${maxTemp}°C</p>
            </div>
          </div>
        `;
      });
    })

    // Catch logs and errors
    .catch(error => {
      console.error('Error:', error);
    });
}

// Call the function to get and show weather forecast
getWeatherForecast();