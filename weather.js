const apiWeather =
  "http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=9dcf660f4adfbe64a1f1edf5962b352d";
const apiForcast =
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=9dcf660f4adfbe64a1f1edf5962b352d";
const city = document.getElementById("city");
const country = document.getElementById("country");
const description = document.getElementById("description");
const averageTemp = document.getElementById("averageTemp");
const minTemp = document.getElementById("minTemp");
const maxTemp = document.getElementById("maxTemp");
const feelsLike = document.getElementById("feelsLike");
const windSpeed = document.getElementById("windSpeed");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const forcast = document.getElementsByClassName("forcast");

fetch(apiWeather)
  .then((weather) => {
    return weather.json();
  })
  .then((weatherArr) => {
    city.innerHTML = weatherArr.name;
    country.innerHTML = weatherArr.sys.country;
    description.innerHTML = weatherArr.weather[0].description;
    averageTemp.innerHTML = generateRoundedTemperature(weatherArr.main.temp);
    minTemp.innerHTML = generateRoundedTemperature(weatherArr.main.temp_min);
    maxTemp.innerHTML = generateRoundedTemperature(weatherArr.main.temp_max);
    feelsLike.innerHTML = generateRoundedTemperature(
      weatherArr.main.feels_like
    );
    windSpeed.innerHTML = weatherArr.wind.speed;
    sunrise.innerHTML = generateTimeFromMilliSec(weatherArr.sys.sunrise);
    sunset.innerHTML = generateTimeFromMilliSec(weatherArr.sys.sunset);
  });

const generateRoundedTemperature = (temperature) => {
  return Math.round(temperature * 10) / 10;
};

const generateTimeFromMilliSec = (milliseconds) => {
  const date = new Date(milliseconds * 1000);
  const timeString = date.toLocaleTimeString(
    "en-US",
    { hour: "2-digit", minute: "2-digit" },
    {
      timestyle: "short",
      hour12: false,
    }
  );
  return timeString;
};

// -----------------------------FORCAST--------------------------------

fetch(apiForcast)
  .then((weatherForcast) => {
    return weatherForcast.json();
  })
  .then((weatherForcast) => {
    const newWeatherForcastArr = weatherForcast.list.map((item) => {
      const dt_txt = item.dt_txt;
      const temp_min = generateRoundedTemperature(item.main.temp_min);
      return { dt_txt, temp_min };
    });

    const filteredArr = newWeatherForcastArr.filter((item) =>
      item["dt_txt"].includes("12:00:00")
    );

    const dataFormat = (str) => {
      const forcastDate = new Date(str);
      const forcastDateString = forcastDate.toLocaleDateString("en-US", {
        weekday: "short",
      });
      return forcastDateString;
    };

    filteredArr.forEach((item, index) => {
      forcast[index].querySelector(".filtredForcastDate").innerText +=
        " " + dataFormat(item.dt_txt);
      forcast[index].querySelector(".filtredForcastTemperatureMin").innerText +=
        " " + item.temp_min;
    });
  });
