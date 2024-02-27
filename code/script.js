const url =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=781cdd2e00a90d16de41361eb1c43353";
fetch(url)
  .then((response) => response.json())
  .then((forecast) => {
    const weatherType = document.querySelector(".weatherType");
    weatherType.innerHTML = forecast.weather[0].main;
    const temperature = document.querySelector(".temperature");
    temperature.innerHTML = forecast.main.temp
  });

