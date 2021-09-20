//DOMs
const WEATHER_API =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=5000cd66a9090b2b62f53ce8a59ebd9e";

const fiveDays =
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=5000cd66a9090b2b62f53ce8a59ebd9e";

const weatherContainer = document.getElementById("weather-container");
const todaysWeather = document.getElementById("today");
const dayContainer = document.getElementsByClassName("day-container");

fetch(WEATHER_API)
  .then((res) => res.json())
  .then((data) => {
    today.innerHTML += `
        <h1>${data.name}</h1>
        <h2>${Math.round(data.main.temp * 10) / 10} °C</h2>
        <h3>${data.weather.map((item) => item.description)}</h3>
    `;
  })
  .catch((error) => console.error("AAAAAAH!", error))
  .finally(() => console.log("YAY!"));

fetch(WEATHER_API)
  .then((res) => res.json())
  .then((data) => {
    const timezoneOffset = new Date().getTimezoneOffset() * 60;
    const timeOfSunrise = new Date(
      (data.sys.sunrise + data.timezone + timezoneOffset) * 1000
    ).toLocaleTimeString("sv-US", { hour: "2-digit", minute: "2-digit" });
    today.innerHTML += `<p>Sunrise: ${timeOfSunrise}</p>`;
    const timeOfSunset = new Date(
      (data.sys.sunset + data.timezone + timezoneOffset) * 1000
    ).toLocaleTimeString("sv-US", { hour: "2-digit", minute: "2-digit" });
    today.innerHTML += `<p>Sunset: ${timeOfSunset}</p>`;
  });

//Variables to prevent choosing past dates.
//const currentDate = new Date()
//const formattedDate = currentDate.toISOString().split('T')[0]

// TUESDAY SUNNY 12C 3C

fetch(fiveDays)
  .then((res) => res.json())
  .then((data) => {
    const filteredForecast = data.list.filter((item) =>
      item.dt_txt.includes("12:00")
    );
    for (let i = 0; i < 5; i++) {
      const days = new Date(filteredForecast[i].dt_txt).toLocaleDateString(
        "en-US",
        { weekday: "short" }
      );

      const forecastTemp = Math.round(filteredForecast[i].main.temp * 10) / 10;
      const forecastWeather = filteredForecast[i].weather.description;
      console.log(forecastWeather);

      weatherContainer.innerHTML += `
        <p class="day"> 
        <span class="forcast-day">${days}</span> 
        <span class="forcast-temp">${forecastTemp} °C </span> 
        <span class="forcast-weather">${filteredForecast[i].weather.map(
          (item) => item.main
        )}</span>
        </p>
      
      `;

      //const fiveDayWeather = data.list.map((item) => item.weather);
      // console.log(fiveDayWeather);

      //const fiveDays = fiveDaysWeather.weather.map((item) => item.description);
      //console.log(fiveDays);
      //console.log(days);
      //console.log(forecastTemp);
      //forecastTemp.forEach((element) => {
      // console.log(element);
      //});
      //const filteredForecast = data.list.map((item) => item.temp);
      //day1.innerHTML += `
      //<h2>${Math.round(data.list.temp * 10) / 10} °C</h2>
      //`;
    }
    console.log(filteredForecast);
  });
