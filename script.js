//Weather Today in Stockholm

const apiToday = 'http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=e33f1cc192401277e601a6aed3a82800'
const apiKey = "e33f1cc192401277e601a6aed3a82800"

const weatherLocation = document.getElementById('location');
const weatherDescription = document.getElementById('description');
const weatherTemperature = document.getElementById('temperature');
//const weatherSunrise = document.getElementById('sunrise');
//const weatherSunset = document.getElementById('sunset');

const fetchToday = () => {
fetch(apiToday)
  .then((response) => {
    return response.json();
    })
  .then((json) => {

weatherLocation.innerHTML = json.name;
weatherDescription.innerHTML = json.weather[0].description
weatherTemperature.innerHTML = json.main.temp.toFixed(0.5)

//weatherSunrise.innerHTML = new Date(json.sys.sunrise * 1000).toLocaleTimeString([]);//
//weatherSunset.innerHTML = new Date(json.sys.sunset * 1000).toLocaleTimeString([]);//

//Made a funtion of Sunrise/sunset instead//
const weatherSunset = () => {
  const dateSunset = new Date(json.sys.sunset * 1000);
  const timeSunset = dateSunset.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  document.getElementById('sunset').innerHTML = timeSunset;
};
weatherSunset();

const weatherSunrise = () => {
  const dateSunrise = new Date(json.sys.sunrise * 1000);
  const timeSunrise = dateSunrise.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  document.getElementById('sunrise').innerHTML = timeSunrise;
};
weatherSunrise();
});
};
fetchToday();

//Weather for the Week //
