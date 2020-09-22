// const stad = "stockholm";
// const stad = dropdown.value;
let temp = document.getElementById("temp");
let feelsLikeTemp = document.getElementById("feelsLikeTemp");
let weather = document.getElementById("weather");
let city = document.getElementById("city");

const key = "5c01b021abe8da367bcecadd67235fb3";
const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=${key}`;

const container = document.getElementById("main");

fetch(apiURL)
  .then((response) => {
    return response.json();
  })
  .then((weather) => {
    console.log(weather);
  });

const weatherToDay = () => {
  fetch(apiURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      city.innerHTML = data.city.name;
      temp.innerHTML = data.list[1].main.temp;
      console.log(data.list[1].main.temp);
    });
};

weatherToDay();
