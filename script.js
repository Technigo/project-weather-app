// present the data: the city name, the temperature (rounded to 1 decimal place), and what type of weather it is (the "description" in the JSON)
const sunup = document.getElementById(`sunrise`);
const sundown = document.getElementById(`sunset`);
const temperature = document.getElementById(`temp`);
const description = document.getElementById(`desc`);
const forecastTemp = document.getElementById(`forecast`);

const api = `https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=54da82efb468485965f06d89cb0c03a3`;

// TEMPERATUREgot commit

fetch(api)
  .then(response => {
    return response.json();
  })
  .then(json => {
    temperature.innerHTML = `<h1>${json.main.temp.toFixed(1)}&deg</h1>`;
  });

// WEATHER

fetch(api)
  .then(response => {
    return response.json();
  })
  .then(json => {
    description.innerHTML = `<h3> ${json.weather[0].description}</h3>`;
  });

// SUN UP & DOWN

fetch(api)
  .then(response => {
    return response.json();
  })
  .then(json => {
    const unixTimestampSunrise = json.sys.sunrise;
    const unixTimestampSunset = json.sys.sunset;

    const sunrises = new Date(unixTimestampSunrise * 1000);
    const sunsets = new Date(unixTimestampSunset * 1000);

    const sunriseTime = sunrises.toLocaleTimeString([], { timeStyle: "short" });
    const sunsetTime = sunsets.toLocaleTimeString([], { timeStyle: "short" });

    sunup.innerHTML = `<h4>Sunrise ${sunriseTime} </h3>`;
    sundown.innerHTML = `<h4      > Sunset ${sunsetTime} </h4>`;
  });

const handle5DayForecast = json => {
  const forecastDiv = document.getElementById("forecast");
  const dates = {};

  json.list.forEach(weather => {
    const date = weather.dt_txt.split(" ")[0];
    if (dates[date]) {
      dates[date].push(weather);
    } else {
      dates[date] = [weather];
    }
  });

  Object.entries(dates).forEach((item, index) => {
    if (index === 0) {
      return;
    }

    const date = item[0];
    const weatherValues = item[1];

    const temps = weatherValues.map(value => value.main.temp);
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);

    const day = new Date(date);
    const dayNames = [`Sun`, `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`];

    forecastTemp.innerHTML += `<li>${
      dayNames[day.getDay()]
    } &nbsp;&nbsp; Min/Max ${minTemp.toFixed(1)}&deg/${maxTemp.toFixed(
      1
    )}&deg</li>`;
  });
};

fetch(
  `https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=54da82efb468485965f06d89cb0c03a3`
)
  .then(res => res.json())
  .then(handle5DayForecast);
