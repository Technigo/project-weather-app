

 const searchBar = document.getElementById("searchPlace");
 const searchForCityText = document.getElementById("searchForCityText");
 const weatherContainer = document.getElementById("weatherContainer");
 const weatherForecastContainer = document.getElementById("weatherForecastDocument");
 const textContainer = document.getElementById("textContainer");
 const icon = document.getElementById("icon");
 
const base_URL = "https://api.openweathermap.org/data/2.5/weather?";
const API_Key = "a27f07476fdacc3ee7dc03fc0b7264ed";
const units = "metric";

// Update text and image depending on weather
const sunny = () => {
  textContainer.innerHTML = `Get your sunnies on. ${city} is looking rather great today.`;
}

sunny();

const rainy = () => {
  
  textContainer.innerHTML = `Don't forget your umbrella. It's wet in ${city} today.`
}

const cloudy = () => {

  textContainer.innerHTML = `Light a fire and get cozy. ${city} is looking grey today.`
}



// Fetch the API
const fetchWeatherData = (city) => {
  const URL = `${base_URL}q=${city}&units=${units}&APPID=${API_Key}`;
  console.log(URL);

fetch(URL)
   .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
   })
   .then((json) => {
    const cityName = json.name;
    console.log(cityName);
    const degrees = json.main.temp;
    console.log(degrees);
    const weatherDescription = json.weather[0].description;
    console.log(weatherDescription);

// Fill the content in the HTML elements
weatherContainer.textContent = `${degrees}°C ${cityName} ${weatherDescription}`;
   })

   .catch((error) => {
    console.error("Error fetching data:", error);
   })
  };

// Example of city
  const city = "Palma de Mallorca, Spain";
  fetchWeatherData(city);

 


 













