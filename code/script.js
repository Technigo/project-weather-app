



const currentWeather_URL = `https://api.openweathermap.org/data/2.5/weather?q=`
const fiveDayWeather_URL = `https://api.openweathermap.org/data/2.5/forecast?q=`
const API_KEY = `5261612a788e0fbd6e1f5336fd150afe`

let cityName = "Visby";

const currentWeather = `${currentWeather_URL}${cityName}&appid=${API_KEY}&units=metric`
const fiveDayWeather = `${fiveDayWeather_URL}${cityName}&appid=${API_KEY}&units=metric`



const forecastContainer = document.getElementById('forecastContainer');
//-----------------------------------
//Function that fetches the currentweather

const fetchCurrentWeather = () => {
  fetch(currentWeather) // Use the variable currentWeather here
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {

      console.log(data);
       

const cityName = data.name;
const currentTemperatures = data.main.temp.toFixed(1);
const weatherDescription = data.weather[0].description; // Get the weather description
const windSpeed = data.wind.speed;

 


// Find the DOM element 
const currentTemperature = document.getElementById('temperature');
const locationName = document.getElementById('locationName');
      const windSpeedElement = document.getElementById('windSpeed');
      const weatherDescriptionElement = document.getElementById('weatherDescription'); 
    
     
// Update the DOM with the current temperature
locationName.textContent = cityName;

currentTemperature.textContent = `${currentTemperatures}°C`;
windSpeedElement.textContent = `${windSpeed} m/s`;
weatherDescriptionElement.textContent = weatherDescription; // Update the weather description

})

.catch(error => {
   console.error('Error:', error);
 });
};

// ------------
//Function that fetches the 5 day weather


const fetchFiveDayWeather = () => {
  // Clear any existing forecast data in the container
  forecastContainer.innerHTML = '';
  fetch(fiveDayWeather)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      // Extract the list of forecasts from the fetched data
      const forecastList = data.list;

      // Filter the forecasts to include only data at 12:00 PM
      const filteredForecast = forecastList.filter((item) =>
        item.dt_txt.includes("12:00")
      );

      // Function to get the day from a timestamp
      const getDay = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString("en", { weekday: "short" });
      };

      // Iterate through the filtered data and add it to the forecast container
      filteredForecast.forEach((forecast) => {
        const day = getDay(forecast.dt);
        const temperature = Math.round(forecast.main.temp * 10) / 10;

        // Add the day and temperature on the same line
        forecastContainer.innerHTML += `
          <div class="forecast-row">
            <div class="forecast-item">
              ${day} ${temperature}°C
            </div>
          </div>`;
      });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};
fetchCurrentWeather();
  fetchFiveDayWeather();

// Function to update cityName based on user input and fetch weather data for the new city
const updateCity = () => {
  const inputField = document.getElementById('location'); // Assuming your input field has an id of 'location'
  cityName = inputField.value;

  // Update the currentWeather and fiveDayWeather URLs with the new cityName
  const updatedCurrentWeather = `${currentWeather_URL}${cityName}&appid=${API_KEY}&units=metric`;
  const updatedFiveDayWeather = `${fiveDayWeather_URL}${cityName}&appid=${API_KEY}&units=metric`;

  // Call the fetch functions again to update weather data based on the new city
  fetchCurrentWeather(updatedCurrentWeather);
  fetchFiveDayWeather(updatedFiveDayWeather);
};


// Attach the updateCity function to the button click event
const searchButton = document.getElementById('searchBtn'); 
searchButton.addEventListener('click', updateCity);

























