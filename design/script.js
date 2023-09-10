const container = document.getElementById()

fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=8fa7c461aec946fde31f330992fce9d6')
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    container.innerHTML = `<h1>This is the ${json.weather[0].description} in Stockholm right now</h1>`;

    json.weather.forEach((param) => {
      container.innerHTML += `<p>${param.description}</p>`;
    });
  })
  .catch((error) => {
    console.error('Error fetching weather data:', error);
  });