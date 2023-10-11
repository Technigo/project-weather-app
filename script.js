//FETCH API

const city = document.getElementById("city");
const temp = document.getElementById("temp");
const time = document.getElementById("time")
const date = document.getElementById("date")
const weatherCondition = document.getElementById("condition")

const URL =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=231ff309be8ceb223aff125da6bf7bb2";

let data = [];

async function fetchWeatherData() {
  try {
    const response = await fetch(URL);
    const json = await response.json();
    data = json;
    city.textContent = data.name;
    
    const nameValue = data.name;
    const tempValue = data.main.temp;
    const conditionValue = data.weather[0].main;


    // display in html
    name.textContent = nameValue;
    temp.textContent = tempValue;
    weatherCondition.textContent = conditionValue;

    console.log("WeatherData", data);
  } catch (err) {
    console.log("caught error", err);
  }
}

fetchWeatherData();


function dateBuilder(d) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[d.getDay()];
  let date = d.getDay();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
