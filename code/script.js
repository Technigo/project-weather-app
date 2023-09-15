



const currentWeather_URL = `https://api.openweathermap.org/data/2.5/weather?q=`
const fiveDayWeather_URL = `https://api.openweathermap.org/data/2.5/forecast?q=`
const API_KEY = `5261612a788e0fbd6e1f5336fd150afe`

const cityName = "Tokyo";

const currentWeather = `${currentWeather_URL}${cityName}&appid=${API_KEY}&units=metric`
const fiveDayWeather = `${fiveDayWeather_URL}${cityName}&appid=${API_KEY}&units=metric`



// https://api.openweathermap.org/data/2.5/weather?lat=57&lon=-2.15&appid={API key}&units=metric



/* const cityName = "Visby"

const fetchCurrentWeather = () => {
    fetch('currentWeather')
    .then(response => response.json())
    .then(data => {
       console.log(data) 
    })
    .catch(error => {
        console.error('Error', error)
    });

    fetchCurrentWeather() 

};



const currentWeather_URL = `https://api.openweathermap.org/data/2.5/weather?q=`;
const fiveDayWeather_URL = `https://api.openweathermap.org/data/2.5/forecast?q=`;
const API_KEY = `5261612a788e0fbd6e1f5336fd150afe`;

*/


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
       // console.log(data.main.temp);
// Extract the temperature data (in Celsius) from the API response
const cityName = data.name;
//const temperatureCelsius = Math.round(data.main.temp - 273.15).toFixed(1);// Fix to 1 decimal place
const currentTemperatures = data.main.temp.toFixed(1);
const weatherDescription = data.weather[0].description; // Get the weather description
// const weatherIcon = data.weather[0].icon;
const windSpeed = data.wind.speed;

  //const createIconURL= () => {
  //let base_URL = 'https://openweathermap.org/img/wn/'
  //let icon = 
  //let end_URL = '@2x.png'

  //return base_URL+icon+end_URL
//}
// Capitalize the first letter of the weather description
// const capitalizedWeatherDescription = capitalizeFirstLetter(weatherDescription);


// Find the DOM element with id "temperature"
const currentTemperature = document.getElementById('temperature');
const locationName = document.getElementById('locationName');
      const windSpeedElement = document.getElementById('windSpeed');
      const weatherDescriptionElement = document.getElementById('weatherDescription'); 
      //const weatherIconElement = document.getElementById("weatherIcon"); // Add this line

// Update the DOM with the current temperature
locationName.textContent = cityName;

currentTemperature.textContent = `${currentTemperatures}°C`;
windSpeedElement.textContent = `${windSpeed} m/s`;
weatherDescriptionElement.textContent = weatherDescription; // Update the weather description
// weatherIconElement.textContent = `${weatherIcon}`;






    
    })

   .catch(error => {
      console.error('Error:', error);
    });
};

// Call the fetchCurrentWeather function to initiate the fetch request
fetchCurrentWeather();




// ------------
//Function that fetches the 5 day weather










const fetchFiveDayWeather = () => {
  fetch(fiveDayWeather) // Use the variable fiveDayWeather here
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
        const date = new date(timestamp * 1000);
        return date.toLocaleDateString('en', {weekday: 'short'}); 
      } 

      const forecastElement = document.getElementById('forecast');

      const forecastHTML = forecastList.map(item => `
      <div class="forecast-row">
      <div class="forecast-item">
      ${getDay(item.dt)}
      </div>
      <div class="forecast-item">
      ${Math.round(item.main.temp)}°C
      </div>
      </div>
      `).join('');

      forecastElement.innerHTML = forecastHTML;

     /* // Extract the list of forecasts from the fetched data
      const forecastList = data.list;

      // Find the DOM element to populate with forecast data
      const forecastContainer = document.getElementById('forecastContainer');

      // Clear any existing forecast data in the container
      forecastContainer.innerHTML = '';

      // Loop through the forecast data and find the temperature at 12:00 PM for each day
      forecastList.forEach((forecast) => {
        // Extract the timestamp for this data point
        const timestamp = forecast.dt * 1000; // Convert timestamp to milliseconds

        // Create a Date object from the timestamp
        const date = new Date(timestamp);

        // Check if the timestamp corresponds to 12:00 PM (noon)
        if (date.getHours() === 12) {
          // Extract relevant data for this day's forecast
          const temperatureCelsius = (forecast.main.temp - 273.15).toFixed(1);
          const weatherDescription = forecast.weather[0].description;

          // Create a list item for the day's forecast
          const listItem = document.createElement('li');
          listItem.textContent = `${date.toDateString()}: ${temperatureCelsius}°C, ${weatherDescription}`;

          // Append the list item to the forecast container
          forecastContainer.appendChild(listItem);
        }
      });*/
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

// Call the function to initiate the fetch request
fetchFiveDayWeather();




















/*
const fetchFiveDayWeather = () => {
    fetch(fiveDayWeather) // Use the variable currentWeather here
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);

const forecastList = data.list;
//console.log(forecastList[1])
//console.log(forecastList[15])
//console.log(forecastList[23])
//console.log(forecastList[31])
//console.log(forecastList[39])
   

      // Find the DOM element to populate with forecast data
// const forecastListElement = document.getElementById('forecastList');
const forecastContainer = document.getElementById("forecastContainer")
      // Clear any existing forecast data in the list
      forecastContainer.innerHTML = `${forecastList[1]}`;

      // Loop through the forecast data and find the temperature at 12:00 PM for each day
      forecastList.forEach(forecast => {
        // Extract the timestamp for this data point
        const timestamp = forecast.dt * 1000; // Convert timestamp to milliseconds
        
        // Check if the timestamp corresponds to 12:00 PM (noon)
        const date = new Date(timestamp);
        if (date.getHours() === 12) {
          // Extract relevant data for this day's forecast
          const temperatureCelsius = (forecast.main.temp - 273.15).toFixed(1);
          const weatherDescription = forecast.weather[0].description;

          // Create a list item for the day's forecast
          const listItem = document.createElement('li');
          listItem.textContent = `${date.toDateString()}: ${temperatureCelsius}°C, ${weatherDescription}`;

          // Append the list item to the forecast list
          forecastListElement.appendChild(listItem);
        }
      });

      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  
  // Call the function to initiate the fetch request
  fetchFiveDayWeather();


*/