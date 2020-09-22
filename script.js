const apiUrlCurrWeather = "http://api.openweathermap.org/data/2.5/weather?q=Lund,Sweden&units=metric&APPID=81897fae64080a6ccc65fb8b9cecf3b8";

const container = document.getElementById("weather-info-daily");
const city = document.getElementById("city");
const temp = document.getElementById("temperature");
const description = document.getElementById("description");
const sunrise = document.getElementById("sunrise-time");
const sunset = document.getElementById("sunset-time");

//fetching the data
fetch(apiUrlCurrWeather)
.then((response) => {
  //status of the response - low level computer communication
  // console.log(response);
  //we ask for the response from json - can take long time
  //we can put a lot of code here
  return response.json();
})
.then((weatherObject) => {
  //when we have the data api returns, we log it
  //data is available here
  console.log(weatherObject);
  const currDate = new Date();
  console.log(`Current date: ${currDate}`);
  const dateFormatted = currDate.toLocaleDateString('se-SE');
  console.log(`Current date formatted: ${dateFormatted}`);
  //you can add more options at the same time
  const timeFormatted = currDate.toLocaleTimeString('se-SE', {timeStyle: "long"});

  container.innerHTML = `Daily Weather information`;
  city.innerHTML = weatherObject.name;
  temp.innerHTML = weatherObject.main.temp;
  description.innerHTML = weatherObject.weather[0].description;

  //formatting unix stamp to time
  const sunriseUnixStamp = weatherObject.sys.sunrise;
  const sunsetUnixStamp = weatherObject.sys.sunset;
 
  const sunriseTime = formatUnix(sunriseUnixStamp);
  console.log(`SunriseTime variable: ${sunriseTime}`);
  const sunsetTime = formatUnix(sunsetUnixStamp);
  console.log(`SunsetTime variable: ${sunsetTime}`);
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


//formatting sunrise/sunset unix stamps (in ms)
const formatUnix = (unixStamp) => {
  const stampDate = new Date(unixStamp * 1000);
  const stampTime = stampDate.toLocaleTimeString('se-SE', {timeStyle: "short"});
  return stampTime;
};

//FORECAST
const apiUrl5DayForecast = "https://api.openweathermap.org/data/2.5/forecast?q=Lund,Sweden&units=metric&APPID=81897fae64080a6ccc65fb8b9cecf3b8";
console.log(`5 day forecast: ${apiUrl5DayForecast}`);

fetch(apiUrl5DayForecast)
.then((response) => {
  return response.json();
})
.then((forecastObject) => {
  console.log(forecastObject);
  //extract element called list which is an array, from the object
  const listArray = forecastObject.list;
  console.log(`Array of weather forecast: ${listArray}`);

  //filters the listArray, returning a new array with items dt_text 12:00 
  const listFiltered = listArray.filter(item => item.dt_text.includes('12:00:00'));
  console.log(`${listFiltered}`);

  //iterate through an array and get the first element (assuming it's the date)
  // listArray.forEach((list) => {
  //   console.log(list.dt)
  //   return list[0]
  // })
});