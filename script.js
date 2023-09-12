const container = document.getElementById('sthweather')

fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=8fa7c461aec946fde31f330992fce9d6')
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    const cityName = json.name;
    const temperature = json.main.temp;
    const weatherDescription = json.weather[0].description;
    const sunset = sunsetNewDate(json.sys.sunset * 1000);
    const sunrise = sunriseNewDate(json.sys.sunrise * 1000);
    const feelsLike = json.main.feels_like
    container.innerHTML = `
      <h1>Here's the weather in ${cityName} right now</h1>
      <p>Temperature: ${temperature}°C</p>
      <p>Weather: ${weatherDescription}</p>
      <p>Sunrise: ${sunriseNewDate}</p>
      <p>Sunset: ${sunsetNewDate}</p>
      <p>Weather feels like: ${feels_like.value} ${feels_like.unit}
    `;
  })
  .catch((error) => {
    console.error('Error fetching weather data:', error);
  });

  //https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=8fa7c461aec946fde31f330992fce9d6