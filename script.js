console.log("Hello world!");
const WEATHER_API =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=96cb0f55d34310e596ed4792c7800540";
const weatherContainer = document.getElementById("weather");

const fetchData = () => {
  fetch(WEATHER_API)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log("This is data", data);
      console.log("This is data.main.temp", data.main.temp);

      const decimal = Math.round(data.main.temp * 10) / 10;

      weatherContainer.innerHTML = `
          <h2> City: ${data.name}</h2>
          <h3> Hello, the tempature is ${decimal}&#176 Celsius </h3>
          <h3> Type of weather: ${data.weather[0].description}</h3>
        `;
    })
    .catch((error) => {
      console.error("caught error", error);
    })
    .finally(() => {
      console.log("finished");
    });
};

fetchData();
