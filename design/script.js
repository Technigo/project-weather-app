//DOM
const container = document.getElementById("weather");

fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=c8fa4668e358d868f3ce8d740d6137ec"
)
  .then((response) => {
    return response.json();
  })

  .then((json) => {
    container.innerHTML = `
    <h1>${json.name}</h1>
    <p>${json.main.temp.toFixed(1)}°C</p>
    <p>${json.weather[0].description}</p>
    `;
  });
