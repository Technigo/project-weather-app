// Global Variables
let cityNameStockholm = document.getElementById("cityNameStockholm");
let stockholmSunrise = document.getElementById("stockholmSunrise");
let stockholmSunset = document.getElementById("stockholmSunset");
let stockholmTemperature = document.getElementById("stockholmTemperature");
let cityNameCapeTown = document.getElementById("cityNameCapeTown");
let capeTownSunrise = document.getElementById("capeTownSunrise");
let capeTownSunset = document.getElementById("capeTownSunset");
let capeTownTemperature = document.getElementById("capeTownTemperature");

//APIs
const CAPE_TOWN = 'http://api.openweathermap.org/data/2.5/weather?id=3369157&units=metric&appid=3b3dfc4920c50815af4eaabe044bdc31';
const STOCKHOLM = 'http://api.openweathermap.org/data/2.5/weather?id=2673730&units=metric&appid=3b3dfc4920c50815af4eaabe044bdc31';
const weatherCapeTown = () => {
  fetch(CAPE_TOWN)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);

      cityNameCapeTown.innerHTML = json.name;
      capeTownTemperature.innerHTML = `${json.main.temp}℃`;
      capeTownSunriseDate = new Date(json.sys.sunrise * 1000);
      capeTownSunsetDate = new Date(json.sys.sunset * 1000);
      capeTownSunrise.innerHTML = `Sunrise:${capeTownSunriseDate.getHours()}:${capeTownSunriseDate.getMinutes()}`; //change timezone if coder not in Cape Town
      capeTownSunset.innerHTML = `Sunset:${capeTownSunsetDate.getHours()}:${capeTownSunsetDate.getMinutes()}` //change timezone if coder not in Cape Town
    });
};
weatherCapeTown();

const weatherStockholm = () => {
  fetch(STOCKHOLM)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);

      cityNameStockholm.innerHTML = json.name;
      stockholmTemperature.innerHTML = `${json.main.temp}℃`;
      stockholmSunriseDate = new Date((json.sys.sunrise + json.timezone) * 1000); //take away (+ json.timezone) if coder not in Cape Town
      stockholmSunsetDate = new Date((json.sys.sunset + json.timezone) * 1000); //take away (+ json.timezone) if coder not in Cape Town
      stockholmSunrise.innerHTML = `Sunrise:${stockholmSunriseDate.getHours()}:${stockholmSunriseDate.getMinutes()}`;
      stockholmSunset.innerHTML = `Sunset:${stockholmSunsetDate.getHours()}:${stockholmSunsetDate.getMinutes()}`
    });
};
weatherStockholm();