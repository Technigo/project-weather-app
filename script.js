// API urls
const weatherAPI =
  "https://api.openweathermap.org/data/2.5/weather?q=Helsingborg,Sweden&units=metric&APPID=3053f069033c799a9b5c60d9d3887e6c";
const forecastAPI =
  "https://api.openweathermap.org/data/2.5/forecast?q=Helsingborg,Sweden&units=metric&APPID=3053f069033c799a9b5c60d9d3887e6c";

//DOM Selectors
const cityName = document.getElementById("city");
const containerWeather = document.getElementById("weather");
const containerSunset = document.getElementById("sunset");
const containerSunrise = document.getElementById("sunrise");
const containerForecast = document.getElementById("forecast");

//Weather section
fetch(weatherAPI)
  .then(response => response.json())

  .then(json => {
    cityName.innerHTML = `<h1>${json.name}</h1>`;
    containerWeather.innerHTML = `<h2>${json.main.temp.toFixed(
      1
    )}&#730<sup>C</sup> and  
  ${json.weather[0].description}.</h2>`;

    //Sunrise sunset section
    const sunrise = new Date(json.sys.sunrise * 1000);
    const sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: "short" });

    const sunset = new Date(json.sys.sunset * 1000);
    const sunsetTime = sunset.toLocaleTimeString([], { timeStyle: "short" });

    containerSunrise.innerHTML = `<h2> Sunrise ${sunriseTime}</h2>`;
    containerSunset.innerHTML = `<h2> Sunset ${sunsetTime} </h2>`;
  });

//Five day forcast
fetch(forecastAPI)
  .then(response => response.json())

  .then(json => {
    const filteredForecast = json.list.filter(item =>
      item.dt_txt.includes("12:00")
    );

    filteredForecast.forEach(day => {
      const date = new Date(day.dt * 1000);
      const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
      let dayOfWeek = weekdays[date.getDay()];

      containerForecast.innerHTML += `<h2>${dayOfWeek} <span>${day.main.temp.toFixed(
        1
      )}&#730<sup>C</sup></span></h2>`;
    });
  });
