const apiUrlCurrWeather = "http://api.openweathermap.org/data/2.5/weather?q=Lund,Sweden&units=metric&APPID=81897fae64080a6ccc65fb8b9cecf3b8";
// const apiUrl5DayForecast;
const container = document.getElementById("weather-info");
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
  const dateFormatted = currDate.toLocaleDateString('se-SE');
  //you can add more options at the same time
  const timeFormatted = currDate.toLocaleTimeString('se-SE', {timeStyle: "long"});

  container.innerHTML = `Weather information`;
  city.innerHTML = weatherObject.name;
  temp.innerHTML = weatherObject.main.temp;
  description.innerHTML = weatherObject.weather[0].description;
  sunrise.innerHTML = weatherObject.sys.sunrise;

  // let sunriseTimeFormatted = weatherObject.sys.sunrise.toLocaleTimeString('se-SE');
  // sunrise.innerHTML = sunriseTimeFormatted;
  
  sunset.innerHTML = weatherObject.sys.sunset;
  document.getElementById("date").innerHTML = dateFormatted;
  document.getElementById("time").innerHTML = timeFormatted;
  


});