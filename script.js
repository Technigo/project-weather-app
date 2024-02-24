// DOM
const todaysWeather = document.getElementById("weather-today");

// Convert to celcius

// function to print to DOM
const printToDOM = json => {
  console.log(json);
  // todaysWeather.innerHTML = `
  // <p>${json.main.temp}</p>
  // <p>${json.name}</p>
  // <p>${json.weather[0].description}</p>
  // `;
};

fetch(
  "https://api.openweathermap.org/data/2.5/weather?lat=57.791667&lon=13.418611&appid=22a9947f80352a8e0b470d4aaefb4388"
)
  .then(response => response.json())
  .then(json => printToDOM(json))
  .catch(err => console.log("Error: ", err));
