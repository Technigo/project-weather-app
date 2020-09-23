////////////////////////////////////////////////////////////////////////////

// *** VARIABLES

// const stad = "stockholm";
// const stad = dropdown.value;

const key = "5c01b021abe8da367bcecadd67235fb3";
const apiURLcurrent = `https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=${key}`;
const apiURLforcast = `https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=${key}`;

const container = document.getElementById("main");

// *** current
let city = document.getElementById("city");
let temp = document.getElementById("temp");
let feelsLikeTemp = document.getElementById("feelsLikeTemp");
let wind = document.getElementById("wind");
let weather = document.getElementById("weather");
let sunRise = document.getElementById("sunRise");
let sunSet = document.getElementById("sunSet");

// *** forecast
//day 1
let day1 = document.getElementById("day1");
let temp1 = document.getElementById("temp1");
//day 2
let day2 = document.getElementById("day2");
let temp2 = document.getElementById("temp2");
//day 3
let day3 = document.getElementById("day3");
let temp3 = document.getElementById("temp3");
//day 4
let day4 = document.getElementById("day4");
let temp4 = document.getElementById("temp4");
//day 5
let day5 = document.getElementById("day5");
let temp5 = document.getElementById("temp5");

////////////////////////////////////////////////////////////////////////////

// *** FUNCTIONS

// round number to one decimal
const round = (number) => {
  return Math.round(number * 10) / 10;
};

// from unix time to milliseconds
const time = (number) => {
  return new Date(number * 1000);
};

////////////////////////////////////////////////////////////////////////////

// *** WEATHER TODAY

const weatherToDay = () => {
  fetch(apiURLcurrent)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      // *** city
      city.innerHTML = data.name;
      // *** temperature
      temp.innerHTML = round(data.main.temp);
      // *** feels like temperature
      feelsLikeTemp.innerHTML = round(data.main.feels_like);
      // *** wind
      wind.innerHTML = data.wind.speed;
      // *** weather
      weatherToday.innerHTML = data.weather[0].description;
      // *** sunrise
      sunrise = time(data.sys.sunrise);
      // "short" makes time show 4 numbers e.g. "06:30"
      sunRise.innerHTML = `${sunrise.toLocaleTimeString([], {
        timeStyle: "short",
      })}`;
      // *** sunset
      sunset = time(data.sys.sunset);
      // "short" makes time show 4 numbers e.g. "18:30"
      sunSet.innerHTML = `${sunset.toLocaleTimeString([], {
        timeStyle: "short",
      })}`;
    });
};

////////////////////////////////////////////////////////////////////////////

// *** WEATHER FORECAST

const weatherForcast = () => {
  fetch(apiURLforcast)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      // filter days weather at 12.00
      const filteredForecast = data.list.filter((item) =>
        item.dt_txt.includes("12:00")
      );
      console.log(filteredForecast);

      // *** weather day 1 (tomorrow)
      firstDay = time(filteredForecast[0].dt);
      // making 'day1' time to e.g. "Thursday"
      day1.innerHTML = `${firstDay.toLocaleDateString(["en-GB"], {
        weekday: "long",
      })}`;
      // temp of day 1
      temp1.innerHTML = round(filteredForecast[0].main.temp);
      // *** weather day 2
      secondDay = time(filteredForecast[1].dt);
      day2.innerHTML = `${secondDay.toLocaleDateString(["en-GB"], {
        weekday: "long",
      })}`;
      // temp of day 2
      temp2.innerHTML = round(filteredForecast[1].main.temp);
      // *** weather day 3
      thirdDay = time(filteredForecast[2].dt);
      day3.innerHTML = `${thirdDay.toLocaleDateString(["en-GB"], {
        weekday: "long",
      })}`;
      // temp of day 3
      temp3.innerHTML = round(filteredForecast[2].main.temp);
      // *** weather day 4
      fourthDay = time(filteredForecast[3].dt);
      day4.innerHTML = `${fourthDay.toLocaleDateString(["en-GB"], {
        weekday: "long",
      })}`;
      // temp of day 4
      temp4.innerHTML = round(filteredForecast[3].main.temp);
      // *** weather day 5
      fifthDay = time(filteredForecast[4].dt);
      day5.innerHTML = `${fifthDay.toLocaleDateString(["en-GB"], {
        weekday: "long",
      })}`;
      // temp of day 5
      temp5.innerHTML = round(filteredForecast[4].main.temp);

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
