const header = document.getElementById("header");
const headerList = document.getElementById("header-list");
const conditionTemp = document.getElementById("condition-temp");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const message = document.getElementById("message");
const messageImg = document.getElementById("message-img");
const messageText = document.getElementById("message-text");
const forecast = document.getElementById("forecast");
const day = document.getElementById("day");

//   let apiKey = "f74f9f2338bf06af72a7c11d8921c9c0";
//   let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
//   let apiUrl = `${apiEndpoint}q=${searchCityInput}&appid=${apiKey}&units=${units}`;

let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const fetchWeatherData = () => {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=5cdf47ce276dd7dd42146ec93c23e3a6"
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);
      conditionTemp.innerHTML = `
        ${json.main.temp}
      `;
    });
  // catch((error) => console.error(error));
};
fetchWeatherData();

//forecast

// const fetchPokemons = () => {
//   fetch("https://pokeapi.co/api/v2/pokemon/")
//     .then((response) => response.json())
//     .then((json) => {
//       name.innerHTML = `<h1>Pokemons</h1>`;
//       json.results.forEach((pokemons) => {
//         name.innerHTML += `<p>${pokemons.name}</p>`;
//       });
//     })
//     .catch((error) => console.error(error));
// };
