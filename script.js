///////////////////////////// DOM selectors /////////////////////////////
const cityName = document.getElementById("city-name");
const weather = document.getElementById("weather");
const degrees = document.getElementById("degrees");
const image = document.getElementById("image");

/////////////////////////// Global Variables ////////////////////////////
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "5f9b0149e7c813c77ba22f081321a0c1";
const locale = "Stockholm,Sweden";
const units = "metric";
const URL = `${BASE_URL}?q=${locale}&units=${units}&APPID=${API_KEY}`;

console.log(URL);

////////////////////////////// Functions ///////////////////////////////
const setCloudyDesign = () => {
  image.src = "./design/design2/icons/noun_Cloud_1188486.svg";
  console.log("It's cloudy");
};
const setClearDesign = () => {
  image.src = "./design/design2/icons/noun_Sunglasses_2055147.svg";
  console.log("It's clear");
};

const setRainDesign = () => {
  image.src = "./design/design2/icons/noun_Umbrella_2030530.svg";
  console.log("It's rainy");
};

const getCityName = () => {
  fetch(URL)
    .then((response) => response.json())
    .then((json) => {
      const localCity = json.name;
      cityName.innerHTML = `You're checking the weather in ${localCity}`;
    })
    .catch((error) => {
      cityName.innerText = "Something went wrong";
    });
};

const getCityWeather = () => {
  fetch(URL)
    .then((response) => response.json())
    .then((json) => {
      const localWeather = json.weather[0].main;
      weather.innerText = localWeather;
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
  fetch(URL)
    .then((response) => response.json())
    .then((json) => {
      const localDegrees = json.main.temp;
      const roundedLocalDegrees = localDegrees.toFixed(1);
      // do I need parseFloat?
      degrees.innerText = `${roundedLocalDegrees}°`;
    });
};

getCityName();
getCityWeather();
getCityDegrees();
