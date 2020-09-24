////////////////////////////////////////////////////////////////////////////

// *** VARIABLES

// const stad = "stockholm";
// const stad = dropdown.value;

const key = "5c01b021abe8da367bcecadd67235fb3";
const apiURLcurrent = `https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=${key}`;
const apiURLforcast = `https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=${key}`;

// *** current
let city = document.getElementById("city");
let temp = document.getElementById("temp");
let weather = document.getElementById("weather");
let sunRise = document.getElementById("sunRise");
let sunSet = document.getElementById("sunSet");
let icon = document.getElementById("mainWeather");

// *** forecast
let forecast = document.getElementById("forecast");

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

      // *** weather description
      weatherToday.innerHTML = data.weather[0].description;

      // *** main weather
      mainWeather.innerHTML = data.weather[0].main;

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

      if (data.weather[0].main === "Clear") {
        city.innerHTML = `${data.name} is looking nice today`;
      } else if (data.weather[0].main === "Clouds") {
        city.innerHTML = `${data.name} is looking a bit grey today`;
        icon.src = "images/current/cloudy.svg";
      } else if (
        data.weather[0].main === "Rain" ||
        data.weather[0].main === "Drizzle"
      ) {
        city.innerHTML = `${data.name} is looking rainy today`;
      } else if (data.weather[0].main === "Snow") {
        city.innerHTML = `${data.name} is cold today. Watch out for snow!`;
      } else if (data.weather[0].main === "Thunderstorm") {
        city.innerHTML = `${data.name} is looking scary today. Watch out for thunderstorm!`;
      } else {
        city.innerHTML = `${data.name} is looking foggy today. Watch your step!`;
      }
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

      // for each day:
      filteredForecast.forEach((item) => {
        // making time to weekdays
        const day = time(item.dt).toLocaleDateString(["en-GB"], {
          weekday: "long",
        });

        // weather description
        const weather = item.weather[0].description;

        // getting the temperature and rounds it
        const temp = round(item.main.temp);

        // writing to html
        forecast.innerHTML += `<p class="forecast-info">A ${day} with ${weather} and a temperature of ${temp}°C<p>`;
      });
    });
};

weatherToDay();
weatherForcast();
