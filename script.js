//DOM Selectors
const city = document.getElementById("currentCity");
const temp = document.getElementById("currentTemp");
const weather = document.getElementById("currentWeather");

//API fetch
fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=ea8ddf441b50c5601343ca1ba4aa982c"
)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    console.log(json);
    return json;
  })
  .then((json) => {
    city.innerHTML += `
    ${json.name}
    `;
    const roundedTemp = Math.round(json.main.temp * 10) / 10;
    temp.innerHTML += `
    ${roundedTemp} °C
    `;
    weather.innerHTML += `
    ${json.weather[0].main}
    `;
  });
