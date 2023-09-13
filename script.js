const forecast = document.getElementById("forecast");
const day = document.getElementById("day");
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const container = document.getElementById('sthweather');

fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=8fa7c461aec946fde31f330992fce9d6')
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    const cityName = json.name;
    const temperature = json.main.temp;
    const weatherDescription = json.weather[0].description;
    const sunsetTimestamp = json.sys.sunset * 1000;
    const sunriseTimestamp = json.sys.sunrise * 1000;
    const feelsLike = json.main.feels_like;

    // Create Date objects for sunset and sunrise times
    const sunset = new Date(sunsetTimestamp);
    const sunrise = new Date(sunriseTimestamp);

    container.innerHTML = `
      <h1>Here's the weather in ${cityName} right now</h1>
      <p>Temperature: ${temperature}°C</p>
      <p>Weather: ${weatherDescription}</p>
      <p>Sunrise: ${sunrise.toLocaleTimeString()}</p>
      <p>Sunset: ${sunset.toLocaleTimeString()}</p>
      <p>Weather feels like: ${feelsLike}°C</p>
    `;
  })
  .catch((error) => {
    console.error('Error fetching weather data:', error);
  });

function fetchWeatherData() {
  fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=8fa7c461aec946fde31f330992fce9d6')
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      // Filter and group forecast data by date
      const groupedForecast = json.list.reduce((result, item) => {
        const date = item.dt_txt.split(' ')[0];
        if (!result[date]) {
          result[date] = [];
        }
        result[date].push(item);
        return result;
      }, {});

      // Calculate and display morning and evening temperatures for each day
      for (const date in groupedForecast) {
        if (groupedForecast.hasOwnProperty(date)) {
          const forecastItems = groupedForecast[date];
          const morningTemperature = forecastItems[0].main.temp; // Temperature at 9:00 AM
          const eveningTemperature = forecastItems[8].main.temp; // Temperature at 9:00 PM

          // Get the day of the week for the date
          const weekday = new Date(date).getDay();

          // Display the forecast for the day with time of day
          day.innerHTML += `
            <div class="forecast-day">
              <h3>${weekdays[weekday]}</h3>
              <p>Morning: ${morningTemperature}°C</p>
              <p>Evening: ${eveningTemperature}°C</p>
            </div>
          `;
        }
      }
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
    });
}

fetchWeatherData();
