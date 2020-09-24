//VARIABLES weather
const API_KEY = "81897fae64080a6ccc65fb8b9cecf3b8";
const API_URL_WEATHER = `https://api.openweathermap.org/data/2.5/weather?q=Lund,Sweden&units=metric&APPID=${API_KEY}`;

// const city = document.getElementById("city");
// const country = document.getElementById("country");
const cityCountry = document.getElementById("cityCountry");
const temp = document.getElementById("temperature");
const description = document.getElementById("description");
const sunrise = document.getElementById("sunriseTime");
const sunset = document.getElementById("sunsetTime");

//ALL the functions
//formatting sunrise/sunset unix stamps (in ms)
const formatUnix = (unixStamp) => {
  const stampDate = new Date(unixStamp * 1000);
  const stampTime = stampDate.toLocaleTimeString('se-SE', {timeStyle: "short"});
  return stampTime;
};


//FETCHING the weather data
fetch(API_URL_WEATHER)
  .then((response) => {
  //status of the response - low level computer communication
  console.log(response);
  //we ask for the response from json - can take long time
  //we can put a lot of code here
  return response.json();
})
.then((weatherObject) => {
  //when we have the data api returns, we log it
  //data is available here
  // console.log(`Weather object: ${weatherObject}`);
  const currDate = new Date();
  // console.log(`Current date: ${currDate}`);
  const dateFormatted = currDate.toLocaleDateString('se-SE', {month: "long", day: "2-digit"},);
  // console.log(`Current date formatted: ${dateFormatted}`);
  //you can add more options at the same time
  const timeFormatted = currDate.toLocaleTimeString('se-SE', {timeStyle: "short"});

  // city.innerHTML = weatherObject.name;
  // country.innerHTML = weatherObject.sys.country; //how do I transform SE -> Sweden?

  //city + country
  cityCountry.innerHTML = `${weatherObject.name}, ${weatherObject.sys.country}`;

  temp.innerHTML = `${weatherObject.main.temp}°`;
  description.innerHTML = weatherObject.weather[0].description;

  //formatting unix stamp to time
  const sunriseUnixStamp = weatherObject.sys.sunrise;
  const sunsetUnixStamp = weatherObject.sys.sunset;
 
  const sunriseTime = formatUnix(sunriseUnixStamp);
  // console.log(`SunriseTime variable: ${sunriseTime}`);
  const sunsetTime = formatUnix(sunsetUnixStamp);
  // console.log(`SunsetTime variable: ${sunsetTime}`);
  //formatting sunrise/sunset unix stamps (in ms)
  // console.log(`Unix sunrise stamp: ${sunriseUnixStamp}`);
  // const sunriseDate = new Date(sunriseUnixStamp * 1000);
  // console.log(`Sunrise date: ${sunriseDate}`);
  // const sunriseTime = sunriseDate.toLocaleTimeString('se-SE', {timeStyle: "short"});
  // console.log(`Sunrise time: ${sunriseTime}`);

  // const sunriseHour = sunriseDate.getHours();
  // console.log(`Hours from the date: ${sunriseHour}`);
  // const sunriseMinutes = sunriseDate.getMinutes();
  // console.log(`Sunrise in minutes: ${sunriseMinutes}`);

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
  // console.log(forecastObject);
  //extract element called list which is an array, from the object
  const listArray = forecastObject.list;
  // console.log(`Array of weather forecast: ${listArray}`);

  //filter out info for each day at 12:00 = array of objects (days)
  const listArrayFiltered = listArray.filter(item => item.dt_txt.includes('12:00'));

  //filtered array = array of objects
  console.log(`Filtered array: ${listArrayFiltered}`);

  //loop through array to get forcasted data
  listArrayFiltered.forEach((day => {
    console.log(`Each day: ${day}`);
    const date = new Date(day.dt * 1000);
    console.log(`Date: ${date}`);
    const weekday = date.toLocaleDateString('se-SE', {weekday: "short"});
    console.log(`Weekday: ${weekday}`);
    const dailyTemp = day.main.temp.toFixed();
    console.log(`Daily temp: ${dailyTemp}`);

    forecastText.innerHTML += `
    <div class="daily-forecast">
    <p class="weekday">${weekday.toLocaleLowerCase()}</p>
    <p class="weekday-temp">${dailyTemp}°</p>
    </div>`; 
  }))
});