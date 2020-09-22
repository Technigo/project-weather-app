// const stad = "stockholm";
// const stad = dropdown.value;
let city = document.getElementById("city");
let temp = document.getElementById("temp");
let feelsLikeTemp = document.getElementById("feelsLikeTemp");
let weather = document.getElementById("weather");
let sunRise = document.getElementById("sunRise");
let sunSet = document.getElementById("sunSet");

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

// round number to one decimal
const round = (number) => {
  return Math.round(number * 10) / 10;
};

// from unix-time to milliseconds
const time = (number) => {
  return new Date(number * 1000);
};

const weatherToDay = () => {
  fetch(apiURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      city.innerHTML = data.city.name;
      temp.innerHTML = round(data.list[1].main.temp);
      feelsLikeTemp.innerHTML = round(data.list[1].main.feels_like);
      weatherToday.innerHTML = data.list[1].weather[0].description;
      // sunrise
      sunrise = time(data.city.sunrise);
      sunRise.innerHTML = `${sunrise.getHours()}:${sunrise.getMinutes()}`;
      // sunset
      sunset = time(data.city.sunset);
      sunSet.innerHTML = `${sunset.getHours()}:${sunset.getMinutes()}`;
    });
};

weatherToDay();
