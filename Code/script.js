fetch(
  "http://api.openweathermap.org/data/2.5/weather?q=Stockholm,SE&units=metric&APPID=f470af9640f5a3ff24b68ba60ee15c10"
)
  //The Json from the API//

  .then(response => {
    return response.json();
  })

  .then(json => {
    const theCity = document.getElementById("city");
    const theTemp = document.getElementById("temp");
    const theWeather = document.getElementById("weather");
    const theSunrise = document.getElementById("sunrise");
    const theSunset = document.getElementById("sunset");

    //Time of Sunrise and Sunset//

    const sunrise = new Date(json.sys.sunrise * 1000);
    const sunset = new Date(json.sys.sunset * 1000);

    const sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: "short" });
    const sunsetTime = sunset.toLocaleTimeString([], { timeStyle: "short" });

    //Today's weather//

    theCity.innerHTML = `${json.name}`;
    theTemp.innerHTML = `${json.main.temp.toFixed(1)} &deg;C`;
    theWeather.innerHTML = `${json.weather[0].description}`;
    theSunrise.innerHTML = `<img src="Assets/noun_sunrise_1550440.png" alt="icon" width=60px></br>${sunriseTime}`;
    theSunset.innerHTML = `<img src="Assets/noun_sunset_1632877.png" alt="icon" width=60px></br>${sunsetTime}`;

    //Conditions for changing icons next to weather description//

    if (json.weather[0].description === "broken clouds") {
      theWeather.innerHTML = `<img src="Assets/broken-clouds.png" alt="icon" width=70px">`;
    } else if (json.weather[0].description === "clouds") {
      theWeather.innerHTML = `<img src="Assets/scattered-clouds" alt="icon" width=\"70px\">`;
    } else if (json.weather[0].description === "clear sky") {
      theWeather.innerHTML = `<img src="Assets/clear-sky" alt="icon" width=\"70px\">`;
    } else if (json.weather[0].description === "rain") {
      theWeather.innerHTML = `<img src="Assets/rain" alt="icon" width=\"70px\">`;
    } else if (json.weather[0].description === "snow") {
      theWeather.innerHTML = `<img src="Assets/snow" alt="icon" width=\"70px\">`;
    } else if (json.weather[0].description === "thunderstorm") {
      theWeather.innerHTML = `<img src="Assets/thunderstorm" alt="icon" width=\"70px\">`;
    }
  });

//Weather forecast//

const city = "Stockholm,SE";
const apiKey = "f470af9640f5a3ff24b68ba60ee15c10";

const handle5DayForecast = json => {
  const forecastDiv = document.getElementById("forecast");

  const dates = {};

  json.list.forEach(weather => {
    const date = weather.dt_txt.split(" ")[0];

    if (dates[date]) {
      dates[date].push(weather);
    } else {
      dates[date] = [weather];
    }
  });

  Object.entries(dates).forEach((item, index) => {
    if (index === 0) {
      return;
    }

    const date = item[0];
    const weatherValues = item[1];

    const temps = weatherValues.map(value => value.main.temp);

    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);

    forecastDiv.innerHTML += `<li>${date} - min: ${minTemp.toFixed(
      1
    )}, max: ${maxTemp.toFixed(1)}</li>`;
  });
};

fetch(
  `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
)
  .then(res => res.json())
  .then(handle5DayForecast);
