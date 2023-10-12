const apiKey =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=6675145806c7290b2d43a240155a964d";

const container = document.querySelector(".weather-container");

fetch(apiKey)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    const cityName = data.name;
    const temperature = Math.floor(data.main.temp);
    const description = data.weather[0].description;

    const heading = document.createElement("h1");
    const temp = document.createElement("h2");
    const weatherDescription = document.createElement("p");

    heading.textContent = cityName;
    temp.textContent = temperature;
    weatherDescription.textContent = description;

    container.appendChild(heading);
    container.appendChild(temp);
    container.appendChild(weatherDescription);
  });
