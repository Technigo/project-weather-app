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

const showMessage = (weather, city) => {
  console.log(weather)
  if (weather === "Snow") {
    messageImg.innerHTML = `<img src="./images/snow.png" alt="snow-cloud">`
    messageText.innerHTML = `Put on a warm coat. It's snowing in ${city} today.`
  } else if (weather === "Clouds") {
    messageImg.innerHTML = `<img src="./images/cloud.svg" alt="Cloud">`
    messageText.innerHTML = `Light a fire and get cosy. ${city} is looking grey today`
  } else if (weather === "Clear") {
    messageImg.innerHTML = `<img src="./images/sunglasses.svg" alt="Sunglasses">`
    messageText.innerHTML = `Get your sunnies on. ${city} is looking rather great today.`
  } else if (weather === "Rain") {
    messageImg.innerHTML = `<img src="./images/umbrella.svg" alt="Umbrella">`
    messageText.innerHTML = `Don't forget your umbrella. It's wet in ${city} today.`
  } else {
    messageImg.innerHTML = `<img src="./images/sun-cloud.png" alt="Sun and cloud">`
    messageText.innerHTML = `Remember, ${city}: No such thing as bad weather, only bad clothing. `
  }
}


const fetchWeatherData = () => {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=5cdf47ce276dd7dd42146ec93c23e3a6"
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);
      //Header (w. description, current temp, time for sunrise/sunset)
      conditionTemp.innerHTML = `
      ${json.weather[0].description} | ${Math.round(json.main.temp)}°c
      `;
      let sunriseTime = new Date(json.sys.sunrise * 1000)
      sunrise.innerHTML = `
      Sunrise: ${sunriseTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
      `
      let sunsetTime = new Date (json.sys.sunset * 1000)
      sunset.innerHTML = `
      Sunset: ${sunsetTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
      `
      
      //Message: Image and personalised message, depending on the weather.
      showMessage(`${json.weather[0].main}`, `${json.name}`)
    });
    
  // catch((error) => console.error(error));
};
fetchWeatherData();




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
