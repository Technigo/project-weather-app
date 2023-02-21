const weather = document.getElementById("weather");
const descriptionToday = document.getElementById("description-today");
const tempToday = document.getElementById("temp-today");

fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=Malmo,Sweden&units=metric&APPID=7916e2ff30e82c8f4b79258c3235d9c2"
)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    // Update weather in Malmo from API
    weather.innerHTML = `<h1>Today's weather in ${json.name}</h1>`;

    descriptionToday.innerHTML = `<h2>The weather is ${json.weather[0].description}</h2>`;

    tempToday.innerHTML = `<h3>The temperature is ${
      Math.round(json.main.temp * 10) / 10
    }°C in ${json.name}</h3>`;
  });
