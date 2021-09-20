const API_KEY =
  "https://api.openweathermap.org/data/2.5/weather?q=Oslo,Norway&units=metric&APPID=0783dde9496332573fca5cd853c81369";
const weatherDisplay = document.getElementById("weather-display");

fetch(API_KEY)
  .then((response) => {
    return response.json();
  })

  .then((json) => {
    console.log(json);
    weatherDisplay.innerHTML = `
    <div>
    <p>city: ${json.name}</p>
    <p>Temperature: ${json.main.temp}</p>
    <p>Type of weather: ${json.weather[0].description}</p>
    
    </div>
    `;
  });
