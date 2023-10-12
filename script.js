const apiKey =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=6675145806c7290b2d43a240155a964d";

const container = document.querySelector(".weather-container");

const fetchWeatherData = () => {
  fetch(apiKey)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const cityName = data.name;
      const temperature = Math.floor(data.main.temp);
      const description = data.weather[0].description;

      // Sunrise and sunset times
      const sunrise = data.sys.sunrise * 1000;
      const sunset = data.sys.sunset * 1000;
      const sunriseTime = new Date(sunrise);
      const sunsetTime = new Date(sunset);
      const sunriseHours = sunriseTime.getHours();
      const sunriseMinutes = sunriseTime.getMinutes();
      const sunsetHours = sunsetTime.getHours();
      const sunsetMinutes = sunsetTime.getMinutes();

      const sunriseTimeString = `${
        sunriseHours < 10 ? "0" : ""
      }${sunriseHours}:${sunriseMinutes < 10 ? "0" : ""}${sunriseMinutes}`;

      const sunsetTimeString = `${sunsetHours < 10 ? "0" : ""}${sunsetHours}:${
        sunsetMinutes < 10 ? "0" : ""
      }${sunsetMinutes}`;

      const heading = document.createElement("h1");
      const temp = document.createElement("h2");
      const weatherDescription = document.createElement("p");
      const sunriseElement = document.createElement("p");
      const sunsetElement = document.createElement("p");
      const divElement = document.createElement("div");
      divElement.classList.add("sunrise-sunset");

      heading.textContent = cityName;
      temp.textContent = `${temperature}°C`;
      weatherDescription.textContent = description;
      sunriseElement.textContent = `Sunrise   ${sunriseTimeString}`;
      sunsetElement.textContent = `Sunset   ${sunsetTimeString}`;

      container.appendChild(temp);
      container.appendChild(heading);
      container.appendChild(weatherDescription);
      container.appendChild(divElement).appendChild(sunriseElement);
      container.appendChild(divElement).appendChild(sunsetElement);
    });
};

fetchWeatherData();
