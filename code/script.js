const containerToday = document.getElementById("todays-weather");
const containerFiveDays = document.getElementById("five-day-weather");
const containerWeather = document.getElementById("weather");

const header = document.getElementById("header");
const footer = document.getElementById("footer");

const userChoice = city => {
  containerWeather.style.display = "block";
  document.getElementById("pick-city").style.display = "none";
  const weatherToday = `https://api.openweathermap.org/data/2.5/weather?q=${city},Sweden&units=metric&APPID=778e796f3254363f06afef1bc4ea2b4f`;

  const weatherFiveDays = `https://api.openweathermap.org/data/2.5/forecast?q=${city},Sweden&units=metric&APPID=778e796f3254363f06afef1bc4ea2b4f`;

  fetch(weatherToday)
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log(json);
      console.log(json.weather[0].main);
      console.log(typeof json.main.temp);

      const sunriseTime = timeFormat(json.sys.sunrise);
      const sunsetTime = timeFormat(json.sys.sunset);
      const weather = json.weather[0].main;
      const temperature = json.main.temp;

      containerToday.innerHTML = `<h3>${json.name}</h3>`;
      containerToday.innerHTML += `<img src="${checkWeather(weather)}" alt="">`;
      containerToday.innerHTML += `<p>${temperatureFormat(temperature)}°C and ${
        json.weather[0].description
      }
    </p>`;

      containerToday.innerHTML += `<p>  Sunrise: ${sunriseTime}<br>
     Sunset: ${sunsetTime}</p>`;

      if (temperatureFormat(temperature) < 10) {
        styleContainers(
          "linear-gradient(15deg, rgba(34,122,224,1) 0%, rgba(81,217,255,1) 100%)"
        );
      } else if (temperatureFormat(temperature) > 20) {
        styleContainers(
          "linear-gradient(15deg, rgba(226,44,44,1) 0%, rgba(246,255,115,1) 100%)"
        );
      } else {
        styleContainers(
          "linear-gradient(15deg, rgba(78,221,134,1) 0%, rgba(249,255,179,1) 100%)"
        );
      }
    });

  fetch(weatherFiveDays)
    .then(response => {
      return response.json();
    })
    .then(json => {
      const filteredForecast = json.list.filter(item =>
        item.dt_txt.includes("03:00")
      );

      console.log(filteredForecast);
      containerFiveDays.innerHTML = "";
      filteredForecast.forEach(day => {
        containerFiveDays.innerHTML += `<p>${weekdayFormat(day.dt)}
      
      ${temperatureFormat(day.main.temp)}°C feels like: ${temperatureFormat(
          day.main.feels_like
        )}°C</p>`;
      });
    });
};

const styleContainers = backgroundColour => {
  containerWeather.style.background = backgroundColour;
  footer.style.background = backgroundColour;
  header.style.background = backgroundColour;
};

const checkWeather = weatherType => {
  const typesOfWeather = [
    "Clear",
    "Clouds",
    "Drizzle",
    "Rain",
    "Snow",
    "Thunderstorm"
  ];

  for (let i = 0; i < typesOfWeather.length; i++) {
    if (typesOfWeather[i] === weatherType) {
      let imageIcon = `images/${weatherType}.png`;
      return imageIcon;
    }
  }
  return "images/Rainbow.png";
};

const timeFormat = timeStamp => {
  const time = new Date(timeStamp * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
  return time;
};

const weekdayFormat = timeStamp => {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let date = new Date(timeStamp * 1000);
  let dayOfWeek = weekdays[date.getDay()];
  return dayOfWeek;
};

const temperatureFormat = temp => {
  let tempFormat = Math.round(temp * 10) / 10;
  return tempFormat.toFixed(1);
};

// document
//   .getElementById("malmo")
//   .addEventListener("click", userChoice("Malmoe"));
// document
//   .getElementById("gbg")
//   .addEventListener("click", userChoice("Gothenburg"));
// document
//   .getElementById("sthlm")
//   .addEventListener("click", userChoice("Stockholm"));
