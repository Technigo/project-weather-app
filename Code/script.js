/****DOM Elements****/
const container = document.getElementById("todaySummary");
const mainWeather = document.getElementById("mainWeather");
const weeklyWeather = document.getElementById("weeklyForecastWrapper");
const selectCity = document.getElementById("cities");

/*API one call*/
const url = {
  stockholm:
    "https://api.openweathermap.org/data/2.5/onecall?lat=59.33&lon=18.06&units=metric&exclude=minutely,hourly,alerts&appid=3285c239f8e96c158f7b6e8c65189ffd",
  sidney:
    "https://api.openweathermap.org/data/2.5/onecall?lat=-33.87&lon=151.21&units=metric&exclude=minutely,hourly,alerts&appid=ba035e9fa7344885b204d6ca5f08a903",
  bangkok:
    "https://api.openweathermap.org/data/2.5/onecall?lat=13.73&lon=100.31&units=metric&exclude=minutely,hourly,alerts&appid=03d0938fd2c8cbbbdf2019d3faac9153",
  london:
    "https://api.openweathermap.org/data/2.5/onecall?lat=51.51&lon=-0.12&units=metric&exclude=minutely,hourly,alerts&appid=204e05a6afd3596c993f849109aa03b8",
};

selectCity.addEventListener("change", () => {
  let selectedCity = selectCity.value.toLowerCase();
  console.log("selectedCity", selectedCity);
  weeklyWeather.innerHTML = "";
  mainWeather.innerHTML = "";
  container.innerHTML = "";

  fetchAPI(url[selectedCity], (data) => {
    ShowCityWeather(data);
    ShowCityForecast(weeklyForecast(data));
  });
});

const fetchAPI = (url, callback) => {
  WeatherForecastPromise = fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      callback(data);
    })
    .catch((error) => {
      console.log("error", error);
    });
};

/**** Display the weather at the top****/

const ShowCityWeather = (data) => {
  /*Description*/
  mainWeather.innerHTML = `<p>${data.current.weather[0].main} | ${
    Math.round(data.current.temp) + "° C"
  }</p>`;

  /*Sunrise*/
  const unixTimestampSunrise = data.current.sunrise;
  let sunrise = new Date(unixTimestampSunrise * 1000); //Declare new variable to show only hh:mm
  let sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: "short" });
  mainWeather.innerHTML += `<p>sunrise: ${sunriseTime}</p>`;

  /*Sunset*/
  const unixTimestampSunset = data.current.sunset;
  let sunset = new Date(unixTimestampSunset * 1000);
  let sunsetTime = sunset.toLocaleTimeString([], { timeStyle: "short" });
  mainWeather.innerHTML += `<p>sunset: ${sunsetTime}</p>`;

  /*Change apperance depending on weather*/
  if (data.current.weather[0].main === "Cloudy") {
    document.body.style.backgroundColor = "#CFD2CF";
    document.body.style.color = "#5F6F94";
    container.innerHTML += `<i class="fa-solid fa-cloud"></i>
<h1>It looks rather cloudy in ${data.name} today &#x1F325;</h1>`;
    container.classList.add("cloudy");
  } else if (data.current.weather[0].main === "Rain") {
    document.body.style.backgroundColor = "#DAEAF1";
    document.body.style.color = "#5F6F94";
    container.innerHTML += `<i class="fa-solid fa-cloud-rain"></i>
<h1>Get your umbrella, it looks rather wet in ${data.name} today &#9748;</h1>`;
    container.classList.add("rainy");
  } else if (data.current.weather[0].main === "Clear") {
    document.body.style.backgroundColor = "#FFB3B3";
    document.body.style.color = "#B270A2";
    container.innerHTML += `<i class="fa-solid fa-sun"></i>
<h1>Get your sunnies on, ${data.name} is looking rather great today.</h1>`;
    container.classList.add("sunny");
  } else {
    document.body.style.backgroundColor = "#E4DCCF";
    document.body.style.color = "#7D9D9C";
    container.innerHTML += `<i class="fa-solid fa-cloud"></i>
<h1>You can chillout, it is neutral weather in ${data.name} today.</h1>`;
    container.classList.add("natural");
  }
};

/**** Display the 5 days forecast****/

const weeklyForecast = (data) => {
  let forecast = [];
  data.daily.forEach((day) => {
    let dailyForecast = {
      dayOfWeek: new Date(day.dt * 1000).toLocaleDateString("en-SE", {
        weekday: "long",
      }), // converts number to english name
      temp: Math.round(day.temp.day), // rounds to nearest integer
    };
    forecast.push(dailyForecast); // adds object for each day to the forecast array
  });
  return forecast;
};

const ShowCityForecast = (weeklyForecast) => {
  const filteredForecast = weeklyForecast.forEach((dailyForcast) => {
    let dayInWeek = `${dailyForcast.dayOfWeek}`;
    let temp = `${dailyForcast.temp}`;
    weeklyWeather.innerHTML += `
<div class="forecast-row">
<p> ${dayInWeek}:</p><p> ${temp}°C </p></div>`;
  });
};



// const defaultWeather = (selectedCity) => {
//   // let selectedCity = "stockholm";
//   fetchAPI(url[selectedCity], (data) => {
//     console.log('dataDefault', data)
//     ShowCityWeather(data);
//     ShowCityForecast(weeklyForecast(data));
//   });
// }
// defaultWeather("stockholm");