const todayContainer = document.getElementById("today-container");
const weekdaysContainer = document.getElementById("weekdays");
const nightDay = document.getElementById("night-day")
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=ad72cba3e69f19b6bfee096375f2b3f9";
const apiFiveDaysUrl =
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=ad72cba3e69f19b6bfee096375f2b3f9";
fetch(apiUrl)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw "Ups, something went wrong!";
    }
  })

  .then((json) => {
    const timezoneOffset = new Date().getTimezoneOffset() * 60;
    const sunset = new Date(
      (json.sys.sunset + json.timezone + timezoneOffset) * 1000
    ).toLocaleString("se-SE", {
      hour: "numeric",
      minute: "numeric",
    });
    const sunrise = new Date(
      (json.sys.sunrise + json.timezone + timezoneOffset) * 1000
    ).toLocaleString("se-SE", {
      hour: "numeric",
      minute: "numeric",
    });

    const hr = new Date().getHours();
    let isDay;
    if (hr > sunrise && hr < sunset) {
      isDay = true;
      nightDay.classList.add('day');
    } else {
      isDay = false;
      nightDay.classList.remove('day');
      nightDay.classList.add('night');
    }

    todayContainer.innerHTML += `
      <div class="today-information">
        <div class="today-temp-container">
          <span class="today-temp">${Math.round(json.main.temp)}</span>
          <span class="temp-unit">&#8451;</span>
        </div>
        <div class="location">${json.name}</div>
        <div class="description">${json.weather[0].description}</div>
      </div>
      <div class="day-night">
        <img class="icon" src="./images/${isDay ? "sun" : "moon"}.svg" />
      </div>
      <div class="sunrise-sunset">
        <span>sunrise</span>
        <span>${sunrise}</span>
        <span>sunset</span>
        <span>${sunset}</span>
      </div>
    `;
  })
  .catch((error) => (todayContainer.innerHTML += `${error}`));

fetch(apiFiveDaysUrl)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw "Ups, something went wrong!";
    }
  })
  .then((json) => {
    const sortedDates = {};
    let dayOffset = 0;
    for (let i = 0; i <= 5; i++) {
      const currentDay = new Date(new Date().getTime() + dayOffset)
        .toISOString()
        .split("T")[0];

      sortedDates[currentDay] = json.list.filter((i) =>
        i.dt_txt.includes(currentDay)
      );
      dayOffset += 86400000;
    }

    for (const [key, temps] of Object.entries(sortedDates)) {
      const max = Math.round(Math.max(...temps.map((o) => o.main.temp), 0));
      const min = Math.round(Math.min(...temps.map((o) => o.main.temp), 0));
      let iconSrc = `https://openweathermap.org/img/wn/${temps[0].weather[0].icon}@2x.png`;
      let weekday = new Date(temps[0].dt_txt).toLocaleString("en-US", {
        weekday: "short",
      });

      weekdaysContainer.innerHTML += `
        <div class="weekdays-container">
          <span class="weekdays-name">${weekday}</span>
          <img src=${iconSrc} class="weekdays-icon" />
          <span class="weekdays-temp">
            <span>${max}</span>
            /
            <span>${min}</span>
            <span>&#8451;</span> 
          </span>
        </div>
      `;
    }
  })
  .catch((error) => (weekdaysContainer.innerHTML += `${error}`));
