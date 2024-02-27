const BASE_URL =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=";
const API_KEY = "ea8ddf441b50c5601343ca1ba4aa982c";

const URL = `${BASE_URL}${API_KEY}`;

//DOM Selectors
const city = document.getElementById("currentCity");
const temp = document.getElementById("currentTemp");
const weather = document.getElementById("currentWeather");

//API fetch
// fetch("https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=ea8ddf441b50c5601343ca1ba4aa982c")
//   .then((response) => response.json())
//   .then((json) => {
//     console.log(json);
//   })
//   .then((json) => {
//     city.innerHTML += `
//     ${json.name}
//     `;
//     const roundedTemp = Math.round(json.main.temp * 10) / 10;
//     temp.innerHTML += `
//     ${roundedTemp} °C
//     `;
//     weather.innerHTML += `
//     ${json.weather[0].main}
//     `;
//   });

const fetchNameTempWeather = () => {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      city.textContent = `
      ${data.name}
      `;
      const roundedTemp = Math.round(data.main.temp * 10) / 10;
      temp.textContent = `
      ${roundedTemp} °C
      `;
      weather.textContent = `
      ${data.main.temp}
      `;
    });
};

fetchNameTempWeather();
