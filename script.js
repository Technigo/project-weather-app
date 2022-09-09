const cityName = document.getElementById("city-placeholder");
const cityTemp = document.getElementById("temp-placeholder");
const cityWeather = document.getElementById("weather-placeholder");
const sunriseTime = document.getElementById("sunrise-time");
const sunsetTime = document.getElementById("sunset-time");
const weeklyTemp = document.getElementById("weekly-temperature-placeholder");
const hero = document.getElementById("hero");
console.log(hero);
const todaysIcon = document.getElementById("todays-icon");

let weeklyWeather;
let dailyIcon;

fetch(
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=8802f8b4b2d622931613aace44be57ae"
)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    console.log(json);
    cityName.innerHTML = json.city.name;
    cityTemp.innerHTML = json.list[0].main.temp.toFixed(1);
    cityWeather.innerHTML = json.list[0].weather[0].description;
    const sunriseStart = new Date(json.city.sunrise * 1000);
    const sunsetStart = new Date(json.city.sunset * 1000); //här hämtas fel data

    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString
    sunriseTime.innerHTML = sunriseStart.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    sunsetTime.innerHTML = sunsetStart.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    //Actual weather & background picture
    if (json.list[0].weather[0].main.includes("Clouds")) {
      hero.style.backgroundImage = `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url('images/cloud.jpg')`;
      todaysIcon.innerHTML = `<img src=\'images/cloud-icon.png'>
            <h1>It is rather gray today in ${json.city.name}.</h1>`;
    } else if (json.list[0].weather[0].main.includes("Rain")) {
      hero.style.backgroundImage = `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url('images/rain.jpeg')`;
      todaysIcon.innerHTML = `<img src=\'images/rain-icon.png'>
            <h1>Don't forget you umbrella. It's raining in ${json.city.name}.</h1>`;
    } else if (json.list[0].weather[0].main.includes("Clear")) {
      hero.style.backgroundImage = `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url('images/clear.png')`;
      todaysIcon.innerHTML = `<img src=\'images/sun-icon.png'>
            <h1>The sun is shining in ${json.city.name} today.</h1>`;
    } else if (json.list[0].weather[0].main.includes("Snow")) {
      hero.style.backgroundImage = `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url('images/snow.jpeg')`;
      todaysIcon.innerHTML = `<img src=\'images/snow-icon.png'>
            <h1>It is snowing in ${json.city.name}.</h1>`;
    } else {
      hero.style.backgroundImage = `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url('images/rain.jpeg')`;
      todaysIcon.innerHTML = `<img src=\'images/cloud-sun-icon.png'>
            <h1>It is a cloudy ${json.city.name} now.</h1>`;
    }

    weeklyWeather = json.list.filter((item) => item.dt_txt.includes("12:00"));
    console.log(weeklyWeather);
    weeklyTemp = weeklyWeather.map((day) => {
      let date = new Date(day.dt * 1000);
      let nameOfDay = date.toLocaleDateString("en-Us", { weekday: "long" });
      let dailyTemperature = day.main.temp.toFixed(1);

      if (day.weather[0].main.includes("Clouds")) {
        dailyIcon = `<img src=\'images/cloud-icon.png'>`;
      } else if (day.weather[0].main.includes("Rain")) {
        dailyIcon = `<img src=\'images/rain-icon.png'>`;
      } else if (day.weather[0].main.includes("Clear")) {
        dailyIcon = `<img src=\'images/sun-icon.png'>`;
      } else if (day.weather[0].main.includes("Snow")) {
      } else {
        dailyIcon = `<img src=\'images/snow-icon.png'>`;
      }

      console.log(weeklyTemp);
      return (weeklyTemp.innerHTML += `
           <li>
           <span>${nameOfDay}</span>
           <span>${dailyIcon}</span>
           <span>${dailyTemperature}°C</span>
           </li>
           `);
    });
  })

  .catch((error) => {
    console.log("caught error", error);
  });
