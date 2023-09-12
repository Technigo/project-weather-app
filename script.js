const container = document.getElementById('sthweather')

fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=8fa7c461aec946fde31f330992fce9d6')
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    const cityName = json.name;
    container.innerHTML = `<h1>Here's the weather in ${cityName} right now</h1>`;

    json.weather.forEach((param) => {
      container.innerHTML += `<p>${param.description}</p>`;
    });
  

    const sunset = sunsetNewDate(json.sys.sunset * 1000);
    console.log(sunset.toISOString());

    const sunrise = sunriseNewDate(json.sys.sunrise * 1000);
    console.log(sunrise.toISOString());

    const feelsLike = json.main.feels_like;
    
    container.innerHTML += `<p>Sunrise: ${sunriseNewDate}</p>`;
    container.innerHTML += `<p>Sunset: ${sunsetNewDate}</p>`;
    container.innerHTML += `<p>Weather feels like: ${feels_like.value} ${feels_like.unit}`
});



  
  .catch((error) => {
    console.error('Error fetching weather data:', error);
  });