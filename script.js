const weather = document.getElementById("weather");
const descriptionToday = document.getElementById("description-today");
const tempToday = document.getElementById("temp-today");
const sunUp = document.getElementById('sunrise');
const sunDown = document.getElementById('sunset');
const windGust = document.getElementById('wind')

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
 

  const sunrise = json.sys.sunrise;
  const sunriseTimepoint = new Date(sunrise * 1000);
  const sunriseHrMin = sunriseTimepoint.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false});
  sunUp.innerHTML = `<h3>The sun rises at ${sunriseHrMin}</h3>`;
  console.log(json.sys.sunrise)

  const sunset = json.sys.sunset;
  const sunsetTimepoint = new Date(sunset * 1000);
  const sunsetHrMin = sunsetTimepoint.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false}); 
  sunDown.innerHTML = `<h3>The sun sets at ${sunsetHrMin}</h3>`;
  console.log(json.sys.sunset) 

  const wind = json.wind.gust;
  windGust.innerHTML = `<h3>The wind blows gusts up to ${wind} meters per second`;
});

//ändra bakgrund beroende på väder, som JL?

//weekly forecast

//avsluta med en .catch((err) => {
  //console.log('error caught', err)
//})

//Eventlisteners?