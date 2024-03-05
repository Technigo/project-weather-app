

 const searchBar = document.getElementById("searchPlace");
 const searchForCityText = document.getElementById("searchForCityText");
 const weatherContainer = document.getElementById("weatherContainer");
 const weatherForecastContainer = document.getElementById("weatherForecastContainer");
 const fullContainer = document.getElementById("fullContainer");
 const textContainer = document.getElementById("textContainer");
 const icon = document.getElementById("icon");
 const sunrise = document.getElementById("sunrise");
 const sunset = document.getElementById("sunset");


const city = "Palma";
const base_URL = "https://api.openweathermap.org/data/2.5/weather?";
const API_Key = "a27f07476fdacc3ee7dc03fc0b7264ed";
const units = "metric";
const baseForecast_URL = "https://api.openweathermap.org/data/2.5/forecast?"
const forecast_URL = `${baseForecast_URL}q=${city}&units=${units}&APPID=${API_Key}`;


// Update text and image depending on weather
const sunny = () => {
  icon.src = "./design/design2/icons/noun_Sunglasses_2055147.svg";
  document.documentElement.style.backgroundColor = "#F7E9B9";
  textContainer.innerHTML = `Get your sunnies on. ${city} is looking rather great today.`;
  fullContainer.style.color = "#2A5510";
}

const rainy = () => {
  icon.src = "./design/design2/icons/noun_Umbrella_2030530.svg";
  document.documentElement.style.backgroundColor = "#BDE8FA";
  textContainer.innerHTML = `Don't forget your umbrella. It's wet in ${city} today.`
  fullContainer.style.color = "#164A68";
}

const cloudy = () => {
  icon.src = "./design/design2/icons/noun_Cloud_1188486.svg";
  document.documentElement.style.backgroundColor = "#F4F7F8";
  textContainer.innerHTML = `Light a fire and get cozy. ${city} is looking grey today.`
  fullContainer.style.color = "#F47775";
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
    const degrees = Math.round(json.main.temp);
    const weatherDescription = json.weather[0].description;
    
    // Turn sunset and sunrise to a readable format like 13:00

   function convertTime(timestamp) {
     const date = new Date(timestamp * 1000);

   const hours = date.getHours().toString().padStart(2, "0");

   const minutes = date.getMinutes().toString().padStart(2, "0");

   return `${hours}:${minutes}`;

   }

    const sunriseTime = convertTime(json.sys.sunrise);
    console.log("Sunrise time: ", sunriseTime);

    const sunsetTime = convertTime(json.sys.sunset);
    console.log("Sunset time: ", sunsetTime);


// Fill the content in the HTML elements
weatherContainer.textContent = `${weatherDescription} | ${degrees}°C`;

// Fill in the sunset and sunrise in the HTML element. 

sunrise.textContent = `Sunrise ${sunriseTime}`;
sunset.textContent =`Sunset ${sunsetTime}`;

// Choose function for display looks based on description

if (weatherDescription.includes("clear sky")) {
  sunny();
  } else if (weatherDescription.includes("broken clouds") || weatherDescription.includes("scattered clouds") || weatherDescription.includes("few clouds") || weatherDescription.includes("mist")) {
  cloudy();
  } else {
  rainy();
  }

  })
   .catch((error) => {
    console.error("Error fetching data:", error);
   });
  };

// Example of city
  
  fetchWeatherData(city);

// Fetch for the forecast data

const fetchForecast = (city) => {
  fetch(forecast_URL)
  .then((response) => response.json())
  .then((json) => {
    console.log(json);
  
  // Check that time is 12:00
  const filteredTime = json.list.filter((daytimeWeather)=> 
  daytimeWeather.dt_txt.includes("12:00")
  );

  let number = 1

  filteredTime.forEach((day) => {
    const date = new Date(day.dt * 1000);
    nameOfDay = date.toLocaleDateString("en-US", {weekday: "short"});
    const tempMin = Math.round(day.main.temp_min);
    const tempMax = Math.round(day.main.temp_max);

    console.log(nameOfDay, tempMin, tempMax);

    document.getElementById(`day${number}`).innerHTML = `${nameOfDay}`;
    document.getElementById(`dayTemp${number}`).innerHTML = `${tempMin}°C / ${tempMax}°C\n`;
    number++;
    console.log(`day${number}`)

  });
 
  })

  .catch((error) => {
    console.error("Error fetching forecast: ", error);
  });
};

  fetchForecast(city);
  console.log(forecast_URL);










  

 


 


 













