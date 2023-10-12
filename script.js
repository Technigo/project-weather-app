//GLOBAL VARIABLES
//const URL = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=231ff309be8ceb223aff125da6bf7bb2';
const temperature = document.getElementById("temperature");
const city = document.getElementById("city");
const citySearched = document.getElementById("search-input");
const weatherType = document.getElementById("weather-main");
const searchBtn = document.getElementById("search-btn");

//FETCH API
const fetchWeatherData = async (cityByName) => {
    try {
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityByName}&units=metric&APPID=231ff309be8ceb223aff125da6bf7bb2`;

        const responseFromApi = await fetch(URL);
        const weatherData = await responseFromApi.json();

        return weatherData;
    } catch (error) {
        console.log(error);
    }
};

//MAIN FUNCTION TO DISPLAY THE PROPERTIES
const showCity = async (cityName) => {
        //waiting response(promise to be resolved) of the function (async) fetchWeatherData with the param and store this value in weatherData
        const weatherData = await fetchWeatherData(cityName);

        //Save data in respective variables
        const temperatureValue = Math.round(weatherData.main.temp * 10) / 10;
        const cityValue = weatherData.name;
        const weatherNow = weatherData.weather[0].description;

        //Example usage: Display the values in console.log
        console.log(temperatureValue);
        console.log(cityValue);
        //Example usage: Display in HTML

        temperature.textContent = `${temperatureValue}°C` ;
        city.textContent = cityValue;
        weatherType.textContent = weatherNow;
};
showCity("Stockholm");

//SEARCH BAR INPUT
const search = (e) => {
    let cityName = citySearched.value;

    if(cityName && cityName.trim().length>0){
        cityName = cityName.trim().toLowerCase();
    }
    //listener for the 'Enter' key for search bar
    showCity(cityName);
}
//SEARCH EVENT LISTENERS (BUTTON + ENTER KEY)
searchBtn.addEventListener("click", search);
citySearched.addEventListener("keyup", (e) => {
    if(e.key =="Enter") {search()}
  });

  // TOGGLE SEARCH BAR
function toggleSearchBar() {
    const searchContainer = document.getElementById('search-container');
    const searchInput = document.getElementById('search-input');
    const searchIcon = document.getElementById('search-icon');
    const closeIcon = document.getElementById('close-icon');
  
    searchContainer.classList.toggle('active');
    if (searchContainer.classList.contains('active')) {
      searchInput.focus(); // Automatically focus on the input when the search bar is active.
    }
  
    if (searchContainer.classList.contains('active')) {
      searchIcon.style.display = 'none';
      closeIcon.style.display = 'block';
    } else {
      searchIcon.style.display = 'block';
      closeIcon.style.display = 'none';
    }
  }

  //FUNCTION FOR SUNSET / SUNRISE TIMESTAMP CONVERSION
const unixConversion = ((unixTimestamp) => {
    //convert Unix Timestamp from seconds to milliseconds
    const date = new Date(unixTimestamp * 1000);

    const options = {
        hour: "2-digit",
        minute: "2-digit",
    }
    //Generate time string
    console.log(date.toLocaleTimeString("default", options));
});
unixConversion(1697087826);


// //convert Fahrenheit to Celcius
// const convertToCelsius = function(fahrenheit) {
//     const celsius = (fahrenheit - 32) * (5 / 9);
//     return Math.round(celsius * 10) / 10;
//   };
//   console.log (convertToCelsius(100));
// //Convert Celcius to Fahrenheit
// const convertToFahrenheit = function(celsius) {
  
//     const fahrenheit = (celsius * 1.8) + 32;
//     return Math.round(fahrenheit * 10) / 10;
//   };
//   console.log (convertToFahrenheit(32.40));
  