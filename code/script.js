//VARIABLES weather
const API_KEY = "81897fae64080a6ccc65fb8b9cecf3b8";
const API_URL_WEATHER = `https://api.openweathermap.org/data/2.5/weather?q=Lund,Sweden&units=metric&APPID=${API_KEY}`;

const cityCountry = document.getElementById("cityCountry");
const temp = document.getElementById("temperature");
const description = document.getElementById("description");
const sunrise = document.getElementById("sunriseTime");
const sunset = document.getElementById("sunsetTime");

//formatting sunrise/sunset unix stamps (in ms)
const formatUnix = (unixStamp) => {
  const stampDate = new Date(unixStamp * 1000);
  const stampTime = stampDate.toLocaleTimeString("se-SE", {
    timeStyle: "short",
  });
  return stampTime;
};

//FETCHING the weather data
fetch(API_URL_WEATHER)
  .then((response) => {
    //status of the response - low level computer communication
    return response.json();
  })
  .then((weatherObject) => {
    //when we have the data api returns, we log it
    //data is available here

    const currDate = new Date();
    const dateFormatted = currDate.toLocaleDateString("se-SE", {
      month: "long",
      day: "2-digit",
    });

    //more options can be added at the same time
    const timeFormatted = currDate.toLocaleTimeString("se-SE", {
      timeStyle: "short",
    });

    //city + country
    cityCountry.innerHTML = `${weatherObject.name}, ${weatherObject.sys.country}`;

    temp.innerHTML = `${weatherObject.main.temp.toFixed()}°`;
    description.innerHTML = weatherObject.weather[0].description;

    //formatting unix stamps to time
    const sunriseUnixStamp = weatherObject.sys.sunrise;
    const sunsetUnixStamp = weatherObject.sys.sunset;

    const sunriseTime = formatUnix(sunriseUnixStamp);
    const sunsetTime = formatUnix(sunsetUnixStamp);

    sunrise.innerHTML = sunriseTime;
    sunset.innerHTML = sunsetTime;

    document.getElementById("date").innerHTML = dateFormatted;
    document.getElementById("time").innerHTML = timeFormatted;
  });

//FORECAST
const API_URL_FORECAST = `https://api.openweathermap.org/data/2.5/forecast?q=Lund,Sweden&units=metric&APPID=${API_KEY}`;

const forecastText = document.getElementById("5DayForecast");

fetch(API_URL_FORECAST)
  .then((response) => {
    return response.json();
  })
  .then((forecastObject) => {
    //extract an element called list which is an array, from the object
    const listArray = forecastObject.list;

    //filter out info for each day at 12:00 = array of objects (days)
    const listArrayFiltered = listArray.filter((item) =>
      item.dt_txt.includes("12:00")
    );

    //loop through array to get forcasted data
    listArrayFiltered.forEach((day) => {
      const date = new Date(day.dt * 1000);
      const weekday = date.toLocaleDateString("se-SE", { weekday: "short" });
      const dailyTemp = day.main.temp.toFixed();

      forecastText.innerHTML += `
    <div class="daily-forecast">
    <p class="weekday">${weekday.toLocaleLowerCase()}</p>
    <p class="weekday-temp">${dailyTemp}°</p>
    </div>`;
    });
  });
