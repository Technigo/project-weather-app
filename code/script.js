// API
const apiToday =
  "https://api.openweathermap.org/data/2.5/weather?q=göteborg&units=metric&APPID=22db637cf647bcd1513c052513b7d54c";
const apiForecast =
  "https://api.openweathermap.org/data/2.5/forecast?q=G%C3%B6teborg,Sweden&units=metric&APPID=150f4ff6ea1bf24cf1f0e1bdecefa90f";

// OTHER
const weatherToday = document.getElementById("weatherToday");
const weatherForecast = document.getElementById("weatherForecast");
const sunriseSunset = document.getElementById("sunriseSunset");
const weatherIcon = document.getElementById("weatherIcon");

// WEATHER TODAY
fetch(apiToday)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    const cloudsImg = {
      image: "icons/clouds.svg",
    };
    const rainImg = {
      image: "icons/rain.svg",
    };
    const sunImg = {
      image: "icons/sun.svg",
    };
    const mistImg = {
      image: "icons/mist.svg",
    };
    const snowImg = {
      image: "icons/snow.svg",
    };

    // DISPLAYED WEATHER ICON ON TOP
    const weatherImg = () => {
      if (json.weather[0].main === "Clear") {
        weatherIcon.innerHTML = `<img src="${sunImg.image}" height="120" alt="sun">`;
      } else if (json.weather[0].main === "Clouds") {
        weatherIcon.innerHTML = `<img src="${cloudsImg.image}" height="120" alt="clouds">`;
      } else if (json.weather[0].main === "Rain") {
        weatherIcon.innerHTML = `<img src="${rainImg.image}" height="120" alt="rain">`;
      } else if (json.weather[0].main === "Mist") {
        weatherIcon.innerHTML = `<img src="${mistImg.image}" height="120" alt="mist">`;
      } else if (json.weather[0].main === "Snow") {
        weatherIcon.innerHTML = `<img src="${snowImg.image}" height="120" alt="snow">`;
      }
    };
    weatherImg();

    // DISPLAY THE WEATHER IN GOTHENBURG RIGHT NOW
    weatherToday.innerHTML = `${json.name} ${json.main.temp.toFixed(1)} &degC<br> ${json.weather[0].description} `;

    // SUNRISE SUNSET
    const sunsetSunriseFunction = () => {
      const sunrise = new Date(json.sys.sunrise * 1000);
      const sunset = new Date(json.sys.sunset * 1000);
      const sunriseTime = sunrise.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const sunsetTime = sunset.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      sunriseSunset.innerHTML = `<p>Sunrise: ${sunriseTime} Sunset: ${sunsetTime}</p>`;
    };
    sunsetSunriseFunction();
  });

// 5 DAY FORECAST
fetch(apiForecast)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    const filteredForecast = json.list.filter((item) =>
      item.dt_txt.includes("12:00")
    );

    // Daily forecast content
    filteredForecast.forEach((day) => {
      const date = new Date(day.dt * 1000);
      const tempDay = date.toLocaleDateString("en-us", { weekday: "long" });
      const temp = day.main.temp;
      const week = temp.toFixed(1);
      const feelsLike = day.main.feels_like.toFixed(1);
      const type = day.weather[0].main;

      document.getElementById(
        "weatherForecast"
      ).innerHTML += `<p id="temp-day">${tempDay}:</p>`;
      document.getElementById(
        "weatherForecast"
      ).innerHTML += `<p>${type} / ${week}&degC (feels like ${feelsLike}&degC)</p>`;
    });
  });