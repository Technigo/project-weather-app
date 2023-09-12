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
  })
  .catch((error) => {
    console.error('Error fetching weather data:', error);
  });

  //https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=8fa7c461aec946fde31f330992fce9d6