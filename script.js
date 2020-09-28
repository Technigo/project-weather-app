const API_KEY = '4a5f208af7519fd95c6f1faa53c2e7a7';

const API_CURRENT = `https://api.openweathermap.org/data/2.5/weather?q=Malmo,Sweden&units=metric&APPID=${API_KEY}`;
const API_FORECAST = `https://api.openweathermap.org/data/2.5/forecast?q=Malmo,Sweden&units=metric&APPID=${API_KEY}`;



//DECLARING VARIABLES TO TARGET ELEMENTS ON PAGE
const weatherHeader = document.getElementById("location");
const container = document.getElementById("main");
const weather = document.getElementById("description");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");


//COLORS CHOSEN ELEMENTS
document.getElementById("location").style.color = "red";
document.getElementById("sunrise").style.color = "black";
document.getElementById("sunset").style.color = "red";


//CALCULATING/CONVERTING FUNCTIONS 2 BE INVOKED LATER AND/OR ANYWHERE IN CODE
const calculatingSun = (time) => {
  let sunTime = new Date(time);

  return sunTime.toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
}


// FETCH WEATHER DATA FROM API PROVIDER : CURRENT + FORECAST

fetch(API_CURRENT)
  .then((response) => {
    return response.json();

  })
  .then((weatherToday) => {
    //PRINTING 2 PAGE AND/OR INVOKING FUNCTIONS ON THE GO
    weatherHeader.innerHTML = `Weather in ${weatherToday.name}: `;
    icon.innerHTML = weatherToday.weather[0].icon;
    //method tofixed(1) for 1 decimal
    container.innerHTML = `Temperature is ${weatherToday.main.temp.toFixed(1)}<span>°c</span> and feels like ${weatherToday.main.feels_like.toFixed(1)}<span>°c</span>`;
    weather.innerHTML = `${weatherToday.weather[0].description} `;
    sunrise.innerHTML = `Sunrise: ${calculatingSun(weatherToday.sys.sunrise)}`;
    sunset.innerHTML = `Sunset: ${calculatingSun(weatherToday.sys.sunset)} `;

  });


//WEATHER VARIABLE FOR 5 DAY FORECAST 
const fiveDays = document.getElementsByClassName("five-day")


//FORECAST 
fetchForecast(API_FORECAST)
  .then((response) => {
    return response.json();

  })
  .then((weatherForecast) => {


    const filteredForecast = weatherForecast.list.filter(item => item.dt_txt.includes('12:00'));
    console.log(filteredForecast);

    filteredForecast.forEach((weatherForecast) => {
      const temp = weatherForecast.main.temp;
      const desc = weatherForecast.weather[0].main;
      const date = new Date(weatherForecast.dt_txt);
      const options = { weekday: 'short' };
      const localDateString = date.toLocaleDateString('en-EN',
        options);
      // const fiveDays = document.getElementById('five-day');
      fiveDays.innerHTML += `<p>${localDateString} ${temp.toFixed(1)}°c</p>`;
      fiveDays.innerHTML += `<p>${desc}<p/>`;
    });

  });








