const city = document.getElementById("city");
const currentWeather = document.getElementById("currentWeather");

fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=1ecbebf1161e80b656c352a8c659aec8"
)
  .then((res) => {
    console.log(res);
    return res.json();
  })
  .then((data) => {
    city.innerHTML = data.name;
    currentWeather.innerHTML = data.main;
    console.log(data);
  });
