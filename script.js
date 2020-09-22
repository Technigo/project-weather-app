// const stad = "stockholm";
// const stad = dropdown.value;
let city = document.getElementById("city");
let temp = document.getElementById("temp");
let feelsLikeTemp = document.getElementById("feelsLikeTemp");
let weather = document.getElementById("weather");
let sunRise = document.getElementById("sunRise");
let sunSet = document.getElementById("sunSet");

const key = "5c01b021abe8da367bcecadd67235fb3";
const apiURLcurrent = `https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=${key}`;
const apiURLforcast = `https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=${key}`;

const container = document.getElementById("main");

// round number to one decimal
const round = (number) => {
  return Math.round(number * 10) / 10;
};

// from unix time to milliseconds
const time = (number) => {
  return new Date(number * 1000);
};

const weatherToDay = () => {
  fetch(apiURLcurrent)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      city.innerHTML = data.name;
      temp.innerHTML = round(data.main.temp);
      feelsLikeTemp.innerHTML = round(data.main.feels_like);
      weatherToday.innerHTML = data.weather[0].description;
      // sunrise
      sunrise = time(data.sys.sunrise);
      sunRise.innerHTML = `${sunrise.toLocaleTimeString([], {
        timeStyle: "short",
      })}`;
      // sunset
      sunset = time(data.sys.sunset);
      sunSet.innerHTML = `${sunset.toLocaleTimeString([], {
        timeStyle: "short",
      })}`;
    });
};

const weatherForcast = () => {
  fetch(apiURLforcast)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      /*
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
      */
    });
};

weatherToDay();
weatherForcast();
