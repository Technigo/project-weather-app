console.log('Vamos a la playa')

// https://api.openweathermap.org/data/2.5/weather?q=Malmo,Sweden&units=metric&APPID=f6ea1936f0499b177ea24494f76ba447

// https://api.openweathermap.org/data/2.5/forecast?q=Malmo,Sweden&units=metric&APPID=f6ea1936f0499b177ea24494f76ba447

const myCity = document.getElementById('cityWeather')
const theSun = document.getElementById('sunRiseSet')
const futureWeatherContainer = document.getElementById('futureWeather');


fetch('https://api.openweathermap.org/data/2.5/weather?q=Malmo,Sweden&units=metric&APPID=f6ea1936f0499b177ea24494f76ba447')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    const temperature = json.main.temp; // Get the actual temperature
    const cityName = json.name;
    const weatherDescription = json.weather[0].description;
    const sunriseTimestamp = json.sys.sunrise;
    const sunsetTimestamp = json.sys.sunset;

    // Convert timestamps to date objects and format
    const sunriseDate = new Date(sunriseTimestamp * 1000);
    const sunsetDate = new Date(sunsetTimestamp * 1000);
    const sunriseTime = sunriseDate.toLocaleTimeString('en-US',
      { timeStyle: 'short', hour12: false });
    const sunsetTime = sunsetDate.toLocaleTimeString('en-US', { timeStyle: 'short', hour12: false });


    cityWeather.innerHTML = `<p>The temperature in ${cityName}, Sweden is ${temperature.toFixed(1)}°C.🌡️
    <br>
     The weather is giving: ${weatherDescription}. ✨ </p>`;


    // Update the sunrise/sunset element
    theSun.innerHTML = `<p>Sunrise: ${sunriseTime} | Sunset: ${sunsetTime}</p>`;

    console.log(sunriseTime)
    console.log(sunsetTime)
    console.log(temperature.toFixed(1))

  })

// Fetch forecast data using the same API key
fetch('https://api.openweathermap.org/data/2.5/forecast?q=Malmo,Sweden&units=metric&APPID=f6ea1936f0499b177ea24494f76ba447')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // Group data by day
    const forecastDataByDay = data.list.reduce((acc, forecast) => {
      const day = new Date(forecast.dt * 1000).toLocaleDateString();
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(forecast);
      return acc;
    }, {});

    // Calculate daily averages/ranges
    const dailyForecast = Object.entries(forecastDataByDay).map(([day, forecasts]) => {
      const averageTemp = forecasts.reduce((sum, forecast) => sum + forecast.main.temp, 0) / forecasts.length;
      const minTemp = forecasts.reduce((min, forecast) => Math.min(min, forecast.main.temp), Infinity);
      const maxTemp = forecasts.reduce((max, forecast) => Math.max(max, forecast.main.temp), -Infinity);

      // Add other calculations as needed (e.g., humidity, feels like)

      return {
        day,
        averageTemp,
        minTemp,
        maxTemp,
      };
    });

    // Create HTML elements and populate
    dailyForecast.forEach((forecast) => {
      const forecastElement = document.createElement('div');
      forecastElement.classList.add('forecast-item');
      forecastElement.innerHTML = `
        <h2>${forecast.day}</h2>   

        <p>Average Temperature: ${forecast.averageTemp.toFixed(1)}°C</p>
        <p>Temperature Range: ${forecast.minTemp.toFixed(1)}°C - ${forecast.maxTemp.toFixed(1)}°C</p>
      `;
      futureWeatherContainer.appendChild(forecastElement);
    });
  });