// WEATHER GENERAL INFORMATION

const apiWeather = "https://api.openweathermap.org/data/2.5/weather?id=2673730&units=metric&appid=cb1cb364426bfa018c80b0e628ac10c8";
fetch(apiWeather)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    console.log(json);

    const location = json.name;
    document.getElementById("location").innerHTML += `${location}`;

    const temp = json.main.temp;
    const temp1 = temp.toFixed(0.1);
    document.getElementById("temp").innerHTML += `${temp1}°C`;

    const description = json.weather[0].description;
    document.getElementById("description").innerHTML += `${description}`;

    const humidity = json.main.humidity;
    document.getElementById("humidity").innerHTML += ` ${humidity} %`;

    const windSpeed = json.wind.speed;
    document.getElementById("windSpeed").innerHTML += ` ${windSpeed} m/s`;

    const sunriseTime = json.sys.sunrise;
    const sunsetTime = json.sys.sunset;
    let sunrise = new Date(sunriseTime * 1000);
    let sunset = new Date(sunsetTime * 1000);
    document.getElementById("sunrise").innerHTML += ` ${sunrise.getHours()}:${sunrise.getMinutes()}`;
    document.getElementById("sunset").innerHTML += ` ${sunset.getHours()}:${sunset.getMinutes()}`;
  });

// WEATHER FORECAST 5 DAYS

const apiForecast = "https://api.openweathermap.org/data/2.5/forecast?id=2673730&units=metric&APPID=cb1cb364426bfa018c80b0e628ac10c8"
fetch(apiForecast)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    console.log(json);

    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'));
    const containerFiveDays = document.getElementById("containerFiveDays");

    filteredForecast.forEach((day) => {
      const date = new Date(day.dt * 1000)
      console.log(day);

      const weekDaysString = date.toLocaleDateString("en-US", { weekday: "short" });

      containerFiveDays.innerHTML += `<p> ${weekDaysString} ${day.main.temp.toFixed(0)} °C </p>`
    })
  });
