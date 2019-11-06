const cityContainer = document.getElementById("theCity");
const currentTempContainer = document.getElementById("currentTemp");

const apiKey = "6aa09e2ff9fbbd8c9a0b402db6f492f6";

fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=Stockholm,se&APPID=${apiKey}&units=metric`
)
  .then(response => {
    return response.json();
  })

  .then(json => {
    const sunRise = new Date(json.sys.sunrise * 1000);
    const sunSet = new Date(json.sys.sunset * 1000);
    const sunriseTime = sunRise.toLocaleTimeString("sv-SE", {
      timeStyle: "short"
    });
    const sunsetTime = sunSet.toLocaleTimeString("sv-SE", {
      timeStyle: "short"
    });

    const weather = today({
      city: json.name,
      temp: json.main.temp,
      sunUp: sunriseTime,
      sunSet: sunsetTime,
      icon: json.weather[0].icon,
      specWeatherType: json.weather[0].description
    });

    const app = document.getElementById("weatherApp");
    app.classList.add(`weatherapp-${json.weather[0].main.toLowerCase()}`);

    document.getElementById("todaysWeather").innerHTML = weather;
  });

const getWeekDayFromDayOfWeek = dayOfWeek => {
  switch (dayOfWeek) {
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wendesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "Sunday";
  }
};

fetch(
  `https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,se&APPID=${apiKey}&units=metric`
)
  .then(response => {
    return response.json();
  })

  .then(json => {
    const arr = [];
    json.list.forEach(item => {
      const date = new Date(item.dt_txt);
      const isNoon = date.getHours() === 12;

      if (isNoon) {
        const weatherObject = forecast({
          noonTemp: item.main.temp,
          weatherType: item.weather[0].main,
          icon: item.weather[0].icon,
          day: getWeekDayFromDayOfWeek(date.getDay())
        });
        arr.push(weatherObject);
      }
    });
    const innerHTML = arr.join(" ");
    document.querySelector(".forecastContainer").innerHTML = innerHTML;
  });
