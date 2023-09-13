// 5 day Forecast
const weatherForecastDiv = document.getElementById("weatherForecastDiv");
const weatherForecastUl = document.getElementById("weatherForecastUl");

const weatherForecast = () => {
  fetch("https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=aa3656bfb4f1c6ee11a76a4ba390afe7")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("all the data: ", data);
      const filteredListAtNoon = data.list.filter((forecast) =>
        forecast.dt_txt.includes("12:00:00")
      );
      forecastDay(filteredListAtNoon);
    })
    .catch((error) => {
      console.log("caught error", error);
    });
};


const forecastDay = (filteredListAtNoon) => {
  filteredListAtNoon.map((day) => {
    const options = { weekday: "short" };
    const weekDay = new Date(day.dt_txt).toLocaleDateString("en-UK", options);  // Creates a three letter string of the weekdays
    console.log(weekDay);

    const temp = Math.round(day.main.temp * 10) / 10;  //Temperature rounded to one decimal
    const windSpeed = day.wind.speed;   // wind speed in m/s
    const weatherIcon = day.weather[0].icon;  

    weatherForecastUl.innerHTML += `
    <li>
      <span>${weekDay}</span>
      <span><img id="forecastImg" src="https://openweathermap.org/img/wn/${ weatherIcon}@2x.png" alt="weather icon"></span>
      <span>${temp}°C</span>
      <span>${windSpeed} m/s</span>
    </li>
    `;
  });
};

weatherForecast();