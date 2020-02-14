const containerToday = document.getElementById("todays-weather");
const containerFiveDays = document.getElementById("five-day-weather");
const containerWeather = document.getElementById("weather");

const header = document.getElementById("header");
const footer = document.getElementById("footer");

const userChoice = city => {
  document.getElementById("pick-city").style.display = "none";
  containerWeather.style.display = "block";

  const weatherToday = `https://api.openweathermap.org/data/2.5/weather?q=${city},Sweden&units=metric&APPID=778e796f3254363f06afef1bc4ea2b4f`;

  const weatherFiveDays = `https://api.openweathermap.org/data/2.5/forecast?q=${city},Sweden&units=metric&APPID=778e796f3254363f06afef1bc4ea2b4f`;

  fetch(weatherToday)
    .then(response => {
      return response.json();
    })
    .then(json => {
      const sunriseTime = timeFormat(json.sys.sunrise);
      const sunsetTime = timeFormat(json.sys.sunset);
      console.log(json);

      const weather = json.weather[0].main;
      const temperature = json.main.temp;

      const currentTime = new Date();
      const currentHour = currentTime.getHours();
      console.log(currentHour);

      containerToday.innerHTML = `<h3>${/*json.name*/ cityFormat(city)}</h3>`;
      containerToday.innerHTML += `<img src="${checkWeather(
        weather,
        currentHour
      )}" alt="">`;
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
          "linear-gradient(200deg, rgba(136,255,183,1) 0%, rgba(26,182,92,1) 100%)"
        );
      }

      checkTime(currentHour);
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

//Dark background between 22-06
const checkTime = time => {
  if (time > 22 || time < 08) {
    containerWeather.style.backgroundImage = "url(images/stardust.png)";
    containerWeather.style.background =
      "linear-gradient(51deg, rgba(58,67,82,1) 0%, rgba(18,31,88,1) 100%)";
  }
};

//Styles background
const styleContainers = backgroundColour => {
  containerWeather.style.background = backgroundColour;
  footer.style.background = backgroundColour;
  header.style.background = backgroundColour;
};

//Changes icon based on weather/hour of day
const checkWeather = (weatherType, hours) => {
  const typesOfWeather = [
    "Clear",
    "Clouds",
    "Drizzle",
    "Rain",
    "Snow",
    "Thunderstorm"
  ];

  if (hours > 22 || hours < 06) {
    return "images/Night.png";
  } else {
    for (let i = 0; i < typesOfWeather.length; i++) {
      if (typesOfWeather[i] === weatherType) {
        let imageIcon = `images/${weatherType}.png`;
        return imageIcon;
      }
    }
    return "images/Rainbow.png";
  }
};

//Formats time to be HH:MM
const timeFormat = timeStamp => {
  const time = new Date(timeStamp * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
  return time;
};

//Writes weekday based on date
const weekdayFormat = timeStamp => {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let date = new Date(timeStamp * 1000);
  let dayOfWeek = weekdays[date.getDay()];
  return dayOfWeek;
};

//Formats temp to always have one decimal
const temperatureFormat = temp => {
  let tempFormat = Math.round(temp * 10) / 10;
  return tempFormat.toFixed(1);
};

//Writes city names in Swedish
const cityFormat = city => {
  if (city === "Malmoe") {
    city = "Malmö";
    return city;
  } else if (city === "Gothenburg") {
    city = "Göteborg";
    return city;
  } else {
    return city;
  }
};
