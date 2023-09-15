const currentWeather_URL = `https://api.openweathermap.org/data/2.5/weather?q=`
const fiveDayWeather_URL = `https://api.openweathermap.org/data/2.5/forecast?q=`
const API_KEY = `5261612a788e0fbd6e1f5336fd150afe`

const cityName = "Visby";

const currentWeather = `${currentWeather_URL}${cityName}&appid=${API_KEY}&units=metric`
const fiveDayWeather = `${fiveDayWeather_URL}${cityName}&appid=${API_KEY}&units=metric`

console.log(fiveDayWeather)

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

// Call the fetchCurrentWeather function to initiate the fetch request










// ------------
//Function that fetches the 5 day weather



const fetchFiveDayWeather = () => {

  // This prints the Api to console used for debugging
  console.log('Fetching data from API:', fiveDayWeather);

  // clear any existing forecast data in the container
  forecastContainer.innerHTML = '';
  fetch(fiveDayWeather)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);

      // Extract the list of forecasts from the fetched data
      const forecastList = data.list;

      // Create variables to track the current day
      let currentDay = '';
      let isNoonTemperatureAdded = false;
      let dayForecast = '';

      forecastList.forEach((forecast) => {
        // Extract the timestamp for this data point
        const timestamp = forecast.dt * 1000; // Convert timestamp to milliseconds
        const date = new Date(timestamp);
        const day = date.toLocaleDateString('en', { weekday: 'short' });
        const temperature = Math.round(forecast.main.temp);

        // Check if it's a new day
        if (day !== currentDay) {
          // If it's a new day, add the day name and temperature on a single line
          dayForecast += `<div class="forecast-row">${day} ${temperature}°C</div>`;
          currentDay = day;
        } else {
          // If it's the same day, just append the temperature on a new line
          dayForecast += `<br>${temperature}°C`;
        }
      });

      forecastContainer.innerHTML = dayForecast;




  /*
  // clear any existing forecast data in the container
  forecastContainer.innerHTML = '';
  fetch(fiveDayWeather) 
  .then((response) => { 
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
    // Log the fetched data to the console for debugging
    console.log(data);
    
    const forecastList = data.list.filter(item => item.dt_txt.includes('12:00'));
    
    const getDay = timestamp => {
      const date = new Date(timestamp * 1000);
      return date.toLocaleDateString('en', {weekday: 'short'}); 
    } 
    
    const forecastElement = document.getElementById('forecast');
    
    const forecastHTML = forecastList.map(item => `
    <div class="forecast-row">
    <div class="forecast-item">
    ${getDay(item.dt)}
    </div>
    <div class="forecast-item"><br>
    ${Math.round(item.main.temp)}°C
    </div>
    </div>
    `).join('');
    
    forecastContainer.innerHTML = forecastHTML;*/

    
  })
  .catch((error) => {
    console.error('Error:', error);
  });
};

// Call the function to initiate the fetch request
fetchCurrentWeather();
fetchFiveDayWeather();




console.log(fetchCurrentWeather)















