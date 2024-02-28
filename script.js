///////////////////////////// DOM selectors /////////////////////////////
const body = document.getElementById("body");
const cityName = document.getElementById("city-name");
const weather = document.getElementById("weather");
const degrees = document.getElementById("degrees");
const image = document.getElementById("image");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

/////////////////////////// Global Variables ////////////////////////////
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "5f9b0149e7c813c77ba22f081321a0c1";
const locale = "Stockholm,Sweden";
const units = "metric";
const URL = `${BASE_URL}?q=${locale}&units=${units}&APPID=${API_KEY}`;
let localCity = "";

console.log(URL);

////////////////////////////// Functions ///////////////////////////////
const fetchData = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => {
      cityName.innerText = "Something went wrong";
    });
};

const setCloudyDesign = () => {
  image.src = "./design/design2/icons/noun_Cloud_1188486.svg";
  body.className = "cloudy";
  console.log("It's cloudy");
  cityName.innerHTML = `Light a fire and get cosy. ${localCity} is looking grey today.`;
};
const setClearDesign = () => {
  image.src = "./design/design2/icons/noun_Sunglasses_2055147.svg";
  body.className = "clear";
  console.log("It's clear");
  cityName.innerHTML = `Get your sunnies on. ${localCity} is looking rather great today.`;
};

const setRainDesign = () => {
  image.src = "./design/design2/icons/noun_Umbrella_2030530.svg";
  body.className = "rain";
  console.log("It's rainy");
};

const getCityName = () => {
  fetchData(URL).then((json) => {
    localCity = json.name;
  });
};

const getCityWeather = () => {
  fetchData(URL).then((json) => {
    const localWeather = json.weather[0].main;
    weather.innerText = localWeather + " |";
    if (localWeather === "Clouds") {
      setCloudyDesign();
    } else if (localWeather === "Clear") {
      setClearDesign();
    } else if (localWeather === "Rain") {
      setRainDesign();
    } else {
      image.src = "./design/design2/icons/icons8-placeholder-50.png";
    }
  });
};

const getCityDegrees = () => {
  fetchData(URL).then((json) => {
    const localDegrees = json.main.temp;
    const roundedLocalDegrees = localDegrees.toFixed(1);
    // do I need parseFloat?
    degrees.innerText = `${roundedLocalDegrees}°`;
  });
};

const isItLessThanTen = (number) => {
  if (number < 10) {
    number = "0" + number;
  }
  return number;
};

const getSunriseSunset = () => {
  fetchData(URL).then((json) => {
    // Sunrise
    const sunriseData = new Date(json.sys.sunrise * 1000);
    let sunriseHours = sunriseData.getHours();
    sunriseHours = isItLessThanTen(sunriseHours);
    let sunriseMinutes = sunriseData.getMinutes();
    sunriseMinutes = isItLessThanTen(sunriseMinutes);
    sunrise.innerText = `${sunriseHours}:${sunriseMinutes}`;
    // Sunset
    const sunsetData = new Date(json.sys.sunset * 1000);
    let sunsetHours = sunsetData.getHours();
    sunsetHours = isItLessThanTen(sunsetHours);
    let sunsetMinutes = sunsetData.getMinutes();
    sunsetMinutes = isItLessThanTen(sunsetMinutes);
    sunset.innerText = `${sunsetHours}:${sunsetMinutes}`;
  });
};

getCityName();
getCityWeather();
getCityDegrees();
getSunriseSunset();
