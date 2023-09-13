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
    const currentDayOfWeek = new Date().getDay();

    container.innerHTML = `
    <h1>Here's the weather in ${cityName}<h1/> 
      <h3>${weekdays[currentDayOfWeek]}</h3>
      <p>Temperature: ${temperature}°C</p>
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
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((json) => {
        const cityName = json.city.name;
        const temperature = json.list[0].main.temp; // Current temperature
        const weatherDescription = json.list[0].weather[0].description; // Current weather description
        const feelsLike = json.list[0].main.feels_like; // "Feels like" temperature
  
  
        // Filter and group forecast data by date
        const groupedForecast = json.list.reduce((result, item) => {
          const date = item.dt_txt.split(' ')[0];
          if (!result[date]) {
            result[date] = [];
          }
          result[date].push(item);
          return result;
        }, {});
  
        // Calculate and display morning (9 AM) and evening (9 PM) temperatures for each day
        for (const date in groupedForecast) {
          if (groupedForecast.hasOwnProperty(date)) {
            const forecastItems = groupedForecast[date];
            const morningItem = forecastItems.find((item) => item.dt_txt.includes("09:00"));
            const eveningItem = forecastItems.find((item) => item.dt_txt.includes("21:00"));
        
            if (morningItem && eveningItem) {
              const morningTemperature = morningItem.main.temp; // Temperature at 9:00 AM
              const eveningTemperature = eveningItem.main.temp; // Temperature at 9:00 PM
              const morningFeelsLike = morningItem.main.feels_like; // "Feels like" temperature at 9:00 AM
              const eveningFeelsLike = eveningItem.main.feels_like; // "Feels like" temperature at 9:00 PM
              const morningDescription = morningItem.weather[0].description; // Weather description at 9:00 AM
              const eveningDescription = eveningItem.weather[0].description; // Weather description at 9:00 PM
             const morningHumidity = morningItem.main.humidity; // Humidity at 9:00 AM
              const eveningHumidity = eveningItem.main.humidity; // Humidity at 9:00 PM

        
              // Get the day of the week for the date
              const weekday = new Date(date).getDay();
        
              // Display the forecast for the day with time of day and "feels like" temperature
              day.innerHTML += `
                <div class="forecast-day">
                  <h3>${weekdays[weekday]}</h3>
                  <p>At 9 am</p>
                  <p>Temperature: ${morningTemperature}°C (Feels like: ${morningFeelsLike}°C)</p>
                  <p>Weather: ${morningDescription}</p>
                  <p>Humidity: ${morningHumidity}%</p>
                  <p>At 9 pm</p>
                  <p>Temperature: ${eveningTemperature}°C (Feels like: ${eveningFeelsLike}°C)</p>
                  <p>Weather: ${eveningDescription}</p>
                  <p>Humidity: ${eveningHumidity}%</p>
                </div>
              `;
            }
          }
        }
        
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  }
  
  fetchWeatherData();