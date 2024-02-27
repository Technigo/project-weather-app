const url =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=781cdd2e00a90d16de41361eb1c43353";
fetch(url)
  .then((response) => response.json())
  .then((forecast) => {
    const weatherType = document.querySelector(".weatherType");
    weatherType.innerHTML = forecast.weather[0].main;
    const temperature = document.querySelector(".temperature");
    temperature.innerHTML = forecast.main.temp;
    const sunrise = document.querySelector(".sunrise");
    const sunriseDate = new Date(forecast.sys.sunrise * 1000);
    sunrise.innerHTML = `${sunriseDate
      .getHours()
      .toString()
      .padStart(2, "0")}.${sunriseDate
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    const sunset = document.querySelector(".sunset");
    const sunsetDate = new Date(forecast.sys.sunset * 1000);
    sunset.innerHTML = `${sunsetDate
      .getHours()
      .toString()
      .padStart(2, "0")}.${sunsetDate
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    const textAboutWeather = document.querySelector(".textAboutWeather");
    const icon = document.querySelector(".icon");
    if (forecast.weather[0].main == "Clouds") {
      icon.innerHTML = `<img src="/icons/cloud.svg" />`;
      textAboutWeather.innerHTML = `Light a fire and get cosy. Stockholm is looking grey today.`;
    } else if (forecast.weather[0].main == "Rain") {
      icon.innerHTML = `<img src="/icons/umbrella.svg" />`;
      textAboutWeather.innerHTML = `Don't forget your umbrella. It's wet in Stockholm today.`;
    } else {
      icon.innerHTML = `<img src="/icons/sunglasses.svg" />`;
      textAboutWeather.innerHTML = `Get your sunnies on. Stockholm is looking rather great today.`;
    }

  });


  