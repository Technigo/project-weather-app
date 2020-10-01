const apiWeatherUrl =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=3d0d86970b5aff224fe8f40e9b4e2e78";
const container = document.getElementById("main");
const weatherElement = document.getElementById("weatherInfo");
const filteredForecast = document.getElementById("weatherFiveDays");

fetch(apiWeatherUrl)
  .then((response) => {
    return response.json();
  })
  .then((weatherArray) => {
    console.log(weatherArray);

    // Step2 - Present city, temp, description, data on your web app.

    weatherElement.innerHTML = weatherArray.name;

    const temperatureElement = document.getElementById("temperature");
    const y = weatherArray.main.temp;
    const x = Math.round(y);
    temperatureElement.innerText = x + "°c";

    const weatherTypeElement = document.getElementById("weatherType");
    weatherTypeElement.innerText = weatherArray.weather[0].description;

    // Show the time for sunrise and sunset in a readable time format for today.
    // Sunrise
    const sunriseElement = document.getElementById("sunrise");
    const sunriseUnix = weatherArray.sys.sunrise * 1000;
    const sunriseDate = new Date(sunriseUnix);
    const sunriseHour = sunriseDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    sunriseElement.innerText = sunriseHour;

    //Sunset
    const sunsetElement = document.getElementById("sunset");
    const sunsetUnix = weatherArray.sys.sunset * 1000;
    const sunsetDate = new Date(sunsetUnix);
    const sunsetHour = sunsetDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    sunsetElement.innerText = sunsetHour;
  });

//Step 4 - Show a forecast for the next 5 days. Show the min and max temperature for each day.

const apiWeatherFiveDaysUrl =
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=3d0d86970b5aff224fe8f40e9b4e2e78";

fetch(apiWeatherFiveDaysUrl)
  .then((response) => {
    return response.json();
  })
  .then((item) => {
    const filteredForecast = item.list.filter((item) =>
      item.dt_txt.includes("12:00")
    );

    // the temperture it feels like temperature
    const feelsTemp = filteredForecast[0].main.feels_like;

    // maximnum temperature
    const maxTemp = filteredForecast[0].main.temp_max;

    const dayNames = ["dayOne", "dayTwo", "dayThree", "dayFour", "dayFive"];

    const dtToWeekday = {
      run: function () {
        const dt1000 = this.dt * 1000;
        const dayDate = new Date(dt1000);
        return dayDate.toLocaleDateString("en-US", { weekday: "long" });
      },
    };

    const result = dtToWeekday.run.call(filteredForecast[1]);
    dayOne.innerText = result;

    var i;
    for (i = 0; i < filteredForecast.length; i++) {
      const dayDocument = document.getElementById(dayNames[i]);
      const dayName = dtToWeekday.run.call(filteredForecast[i]);
      const feelsTemp = filteredForecast[i].main.feels_like.toFixed();
      const maxTemp = filteredForecast[i].main.temp_max;
      dayDocument.innerText = `${dayName} ${maxTemp}°C feels like ${feelsTemp}°C`;
    }
  });
