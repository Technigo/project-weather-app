const API_KEY = "e0b091865cb13799f8ef15c4fb40d2a9";
const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=${API_KEY}`;
const API_URL_FORECAST = `https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=${API_KEY}`;

const weatherApp = document.getElementById("weatherApp");
const weekDays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

fetch(API_URL)
  .then((res) => res.json())
  .then((data) => {
    //HÄR VILL VI SÄTTA CLASS PÅ VÄDER, GRADER, SOLUPPGÅNG/SOLNEDGÅNG
    const date = new Date(data.dt * 1000);
    const sunrise = new Date(data.sys.sunrise * 1000);
    const sunset = new Date(data.sys.sunset * 1000);
    const weatherTypes = data.weather[0].main;
    weatherApp.innerHTML += `
			<section class="topsite">
      <p class="toptext">${weatherTypes} | ${
      Math.round(data.main.temp * 10) / 10
    }&#176;</p>
      <p class="toptext">Sunrise ${sunrise.getHours()}:${sunrise.getMinutes()}</p>
      <p class="toptext">Sunset ${sunset.getHours()}:${sunset.getMinutes()}</p>
			</section>`;
    console.log("data current", data);

    if (weatherTypes === "Clear") {
      //här borde vi kunna skriva en weatherApp.style.backgroundcolor = #F7E9B9 style.color = #2A5510
      weatherApp.innerHTML += `<h2 class="description">Get your sunnies on. Stockholm is looking rather great today.</h2>`;
    } else if (weatherTypes === "Clouds") {
      weatherApp.innerHTML += `<h2 class="description">Light a fire and get cosy. Stockholm is looking grey today.</h2>`;
    } else if (weatherTypes === "Rain") {
      weatherApp.innerHTML += `<h2 class="description">Don't forget your umbrella! It's wet in Stockholm today!</h2>`;
    }
  })

  .catch((error) => console.log("error", error));

fetch(API_URL_FORECAST)
  .then((res) => res.json())
  .then((data) => {
    const date = new Date(data.dt * 1000);
    const filteredForecast = data.list.filter((item) =>
      item.dt_txt.includes("12:00")
    );
    console.log(filteredForecast);
    filteredForecast.slice(1).forEach((day) => {
      let weekDay = new Date(day.dt * 1000);
      weekDay = weekDay.getDay();
      weatherApp.innerHTML += `<section class="forecast"><p class="forecastDay">${
        weekDays[weekDay]
      }</p><p class="forecastTemp"> ${
        Math.round(day.main.temp * 10) / 10
      }&#176;</p></section>`;
    });

    console.log("data forecast", data);
  })
  .catch((error) => console.log("error", error));

//   vi behöver fixa ikoner som ska vara ovanför h2an, färgtema tll varje väder samt fixa prickarna för att ha under kommande fyra dagar
