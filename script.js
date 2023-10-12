//FETCH API

const city = document.getElementById("city");
const temp = document.getElementById("temp");
const time = document.getElementById("time")
const date = document.getElementById("date")
const weatherCondition = document.getElementById("condition")

const URL =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=231ff309be8ceb223aff125da6bf7bb2";

let data = [];

async function fetchWeatherData() {
  try {
    const response = await fetch(URL);
    const json = await response.json();
    data = json;

    const cityValue = data.name;
    const tempValue = data.main.temp;
    const conditionValue = data.weather[0].main;

    let now = new Date();
    // display in html
    city.textContent = cityValue;
    temp.textContent = Math.round(tempValue);
    weatherCondition.textContent = conditionValue;
    date.textContent = dateBuilder(now);

    setInterval(() => {
      const currentTime = new Date();
      time.textContent = timeBuilder(currentTime);
    }, 1000); 

    console.log("WeatherData", data);
  } catch (err) {
    console.log("caught error", err);
  }
}

fetchWeatherData();


function timeBuilder(time) {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  return `${hours}:${minutes}`;
}


function dateBuilder(d) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[d.getDay()];
  let date = d.getDay();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}


function weatherConditionBuilder() {
  
}



// search bar
function toggleSearchBar() {
  const searchContainer = document.getElementById('search-container');
  searchContainer.classList.toggle('active');
}
