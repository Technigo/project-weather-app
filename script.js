const weatherDescriptionAndTemperatureElement = document.getElementById(
  "weather-description-and-temperature"
);
const descriptionElement = document.getElementById("description");
const weatherConditions = {
  sunny: {
    id: 800,
    class: "sunny",
    message: "Sunny",
  },
  cloudy: {
    minId: 801,
    maxId: 899,
    class: "cloudy",
    message: "Cloudy",
  },
  rainy: {
    minId: 500,
    maxId: 599,
    class: "rainy",
    message: "Rainy",
  },
};

//Step 1 - use fetch() to load the weather data
fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=db63b41efc78e9f2c60ec93f035d8cff"
)
  .then((response) => response.json())
  .then((data) => {
    const weather = data.weather[0];
    const temperature = data.main.temp.toFixed(0);
    let condition;

    if (weather.id === weatherConditions.sunny.id) {
      condition = weatherConditions.sunny;
    } else if (
      weather.id >= weatherConditions.cloudy.minId &&
      weather.id <= weatherConditions.cloudy.maxId
    ) {
      condition = weatherConditions.cloudy;
    } else if (
      weather.id >= weatherConditions.rainy.minId &&
      weather.id <= weatherConditions.rainy.maxId
    ) {
      condition = weatherConditions.rainy;
    }

    if (condition) {
      document.body.classList.add(condition.class);
      weatherDescriptionAndTemperatureElement.textContent = `${condition.message} | ${temperature}°`;
    } else {
      descriptionElement.textContent = `${weather.description} | ${temperature}°`;
    }
  })
  .catch((error) => console.error("There was an error!", error));

//Step 2 - Present some data on your web app

/*
    if (weather.id > 800 && weather.id < 900) {
      document.body.classList.add("cloudy");
      weatherDescriptionAndTemperatureElement.textContent = `Cloudy | ${temperature.toFixed(
        0
      )}°`;
    } else if (weather.id === 800) {
      document.body.classList.add("sunny");
      weatherDescriptionAndTemperatureElement.textContent = `Sunny | ${temperature.toFixed(
        0
      )}°`;
    } else if (weather.id >= 500 && weather.id < 600) {
      document.body.classList.add("rainy");
      weatherDescriptionAndTemperatureElement.textContent = `Rainy | ${temperature.toFixed(
        0
      )}°`;
    } else {
      descriptionElement.textContent = `${
        weather.description
      } | ${temperature.toFixed(0)}°`;
    }
    */

//Sunrise and Sunset
const sunriseTime = new Date(data.sys.sunrise * 1000)
  .toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })
  .replace(":", ".");
const sunsetTime = new Date(data.sys.sunset * 1000)
  .toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })
  .replace(":", ".");

document.getElementById("sunrise").textContent = `Sunrise ${sunriseTime}`;
document.getElementById("sunset").textContent = `Sunset ${sunsetTime}`;

/* 
if (weather.id > 800 && weather.id < 900) {
  document.body.classList.add("cloudy");
  descriptionElement.textContent = `Light a fire, get cosy. ${cityName} is looking cloudy today.`;
} else if (weather.id === 800) {
  document.body.classList.add("sunny");
} else {
  descriptionElement.textContent = `The current weather is: ${weather.description}`;
}
*/

//Feature - weather forecast
fetch(
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=db63b41efc78e9f2c60ec93f035d8cff"
)
  .then((response) => response.json())
  .then((forecastData) => {
    //12:00のデータのみをフィルタリング
    const noonForecasts = forecastData.list.filter((forecast) => {
      //この式が true を返す予報アイテムのみが、フィルタリングの結果として残る → 日中の正午（12:00）の予報データのみが選択される
      //.dt_txtは、単純にAPI設計者がこの名前を付けたから
      return forecast.dt_txt.includes("12:00:00");
    });

    //.then()ブロックから次の.then()ブロックへデータを「渡す」ためにreturnを使用
    return noonForecasts;
  })
  .then((noonForecasts) => {
    noonForecasts.forEach((forecast) => {
      // 新しいリストアイテム（li要素）を作成
      const forecastElement = document.createElement("li");
      // リストアイテムの内容を設定
      forecastElement.textContent = `Date: ${forecast.dt_txt}, Highest Temprature: ${forecast.main.temp_max}°C, Weather: ${forecast.weather[0].description}`;

      // li要素をHTMLのidがforecast-listの要素の中に追加
      //.appendChild = DOM（Document Object Model）に動的に要素を追加
      document.getElementById("forecast-list").appendChild(forecastElement);
    });
  });
