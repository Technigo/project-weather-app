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



fetch('https://api.openweathermap.org/data/2.5/forecast?q=Malmo,Sweden&units=metric&APPID=f6ea1936f0499b177ea24494f76ba447')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const noonForecasts = data.list.filter(forecast => {
      const forecastTime = new Date(forecast.dt_txt);
      return forecastTime.getHours() === 12 && forecastTime.getMinutes() === 0;
    });

    if (noonForecasts.length >= 4) {
      const futureWeatherDiv = document.getElementById('futureWeather');
      let htmlContent = '';

      for (let i = 0; i < 4; i++) {
        const forecast = noonForecasts[i];
        const forecastDate = new Date(forecast.dt_txt);
        const formattedDate = forecastDate.toLocaleDateString('sv-SE', { day: '2-digit', month: 'short' });

        htmlContent += `<p>${formattedDate} - ${forecast.main.temp.toFixed(1)}°C</p>`;
      }

      futureWeatherDiv.innerHTML = htmlContent;
    } else {
      console.log("Not enough forecasts found for 12:00");
    }
  })
  .catch((error) => {
    console.error("Error fetching weather data:", error);
  });