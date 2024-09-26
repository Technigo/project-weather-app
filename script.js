// API CALL FORMAT https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&units=metric&appid={API key}
// let city_name = "custom typed in"
// let country_code = "custom typed in"

const API_KEY = "25d9e6e78d809a9dee3803bd737c523d"
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather"
const URL = `${BASE_URL}?q=Stockholm,Sweden&units=metric&appid=${API_KEY}`

console.log(URL)

// DOM selectors






/*
// Reference to the button element
const button = document.getElementById('breathingButton');
const background = document.getElementById('background');

// Function to update the button color based on the background condition
function updateButtonColor(condition) {
  switch (condition) {
    case 'clear-sky':
      // Set CSS variables for the breathing effect to match a clear sky
      button.style.setProperty('--initial-color', '#3498db'); // light blue
      button.style.setProperty('--alternate-color', '#2ecc71'); // green
      background.className = 'clear-sky'; // Update background class
      break;
    case 'light-rain':
      // Set CSS variables for a rain condition
      button.style.setProperty('--initial-color', '#34495e'); // dark blue
      button.style.setProperty('--alternate-color', '#2980b9'); // deep blue
      background.className = 'light-rain'; // Update background class
      break;
    case 'heavy-rain':
      // Set CSS variables for a heavy-rain condition
      button.style.setProperty('--initial-color', '#ecf0f1'); // light grey
      button.style.setProperty('--alternate-color', '#bdc3c7'); // darker grey
      background.className = 'heavy-rain'; // Update background class
      break;
    default:
      // Set default colors
      button.style.setProperty('--initial-color', '#3498db'); // light blue
      button.style.setProperty('--alternate-color', '#2ecc71'); // green
      background.className = ''; // No specific background
      break;
    }
}

// Example: Change button and background based on weather condition
// You can call this function based on real-time weather data or events
updateButtonColor('clear-sky');  // Call this dynamically, e.g., from an API


alert("Oops, city not found! Check your spelling please.")