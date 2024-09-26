//ea9a90c62aeaaa3811505087d195520e
//https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=ea9a90c62aeaaa3811505087d195520e
// base URL + api key


//True constants (SNAKECASE)
const API_KEY = "ea9a90c62aeaaa3811505087d195520e"
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID="

const URL = (`${BASE_URL}${API_KEY}`)

console.log (URL)


// DOM Selectors
const temperatureDisplay = document.getElementById("temperature")
const conditionDisplay = document.getElementById("condition")
const sunriseDisplay = document.getElementById ("sunriseTime")
const sunsetDisplay =  document.getElementById ("sunsetTime")
const weatherImg = document.getElementById ("weatherImage")
const weatherMsg = document.getElementById ("weatherMessage")


// Fetch weather data
fetch(URL)  
    .then(response => response.json())
    .then(data => {
        const stockholmTemp = data.main.temp 
        const weatherCondition = data.weather[0].description // Get the weather condition
        const roundedTemp = Math.round(stockholmTemp)
        const sunrise = data.sys.sunrise
        const sunset = data.sys.sunset

        console.log (sunrise)
        
        temperatureDisplay.innerText = `${roundedTemp}°C` // Display the temperature
        conditionDisplay.innerText = `${weatherCondition}` // Display the weather condition

    // Function to convert UNIX timestamp to readable time format (24-hour clock)
        const convertUnixToTime = (unixTimestamp) => {
            const date = new Date(unixTimestamp * 1000); // Multiply by 1000 to convert to milliseconds
            const hours = date.getHours();
            const minutes = String(date.getMinutes()).padStart(2, '0'); // Pad single-digit minutes with a zero
            return `${hours}:${minutes}`; // Return time in HH:MM format
        };

        // Convert and display sunrise and sunset times
        const sunriseTime = convertUnixToTime(sunrise);
        const sunsetTime = convertUnixToTime(sunset);
  
        sunriseDisplay.innerText = `${sunriseTime}`;
        sunsetDisplay.innerText = `${sunsetTime}`;

        // Call the updateUI function to change background color and message
        updateUI(roundedTemp, weatherCondition);


        // Log the temperature and data for debugging
        console.log(data); // Log inside the promise chain
    })

    .catch(error => console.error('Error fetching weather data:', error)); // Handle errors

 // Function to update UI based on weather condition
function updateUI(temperature, weatherDescription) {
    let weatherMessage; // Declare a variable for the weather message

    // Update background and image based on the weather description
    if (weatherDescription.includes("rain")) {
        document.body.style.backgroundColor = "#BDE8FA"; // blue for rain
        weatherImg.src = "assets/umbrella.png"; // Update image for rain
        weatherMessage = "Don’t forget your umbrella. It’s wet in Stockholm today."; // Custom message for rain
    } else if (weatherDescription.includes("clear")) {
        document.body.style.backgroundColor = "#ffd700"; // yellow for sun
        weatherImg.src = "assets/sunglasses.png"; // Update image for sunny weather
        weatherMessage = `Get your sunnies on. Stockholm is looking rather great today.`; // Default message for clear
    } else if (weatherDescription.includes("clouds")) {
        document.body.style.backgroundColor = "#c0c0c0"; // gray for cloudy
        weatherImg.src = "assets/cloud.png"; // Update image for cloudy weather
        weatherMessage = "Light a fire and get cosy. Stockholm is looking grey today."; // Custom message for clouds
    } else {
        document.body.style.backgroundColor = "#ff4500"; // fallback color
        weatherImg.src = "assets/fallback_image_url.jpg"; // Fallback image
        weatherMessage = `Put your sunnies on - the weather in Stockholm looks ${weatherDescription} today.`; // Default message
    }

    weatherMsg.textContent = weatherMessage; // Update the weather message display
}

console.log (backgroundColor)
    



    //     sunriseDisplay.innerText = `${sunrise}`
    //     sunsetDisplay.innerText = `${sunset}`

    //      // Function to convert UNIX timestamp to readable time format
    // const convertUnixToTime = (unixTimestamp) => {
    //     const date = new Date(unixTimestamp * 1000); // Multiply by 1000 to convert to milliseconds
    //     return date.toLocaleTimeString(); // Converts to local time string
    //   };
  
    //   // Extracting sunrise and sunset times
    //   const sunriseTime = convertUnixToTime(sunriseDisplay.sys.sunrise);
    //   const sunsetTime = convertUnixToTime(sunsetDisplay.sys.sunset);
  
    //   console.log(`Sunrise Time: ${sunriseTime}`);
    //   console.log(`Sunset Time: ${sunsetTime}`);


        // Log the temperature for debugging
        // console.log(data); // Log inside the promise chain
    // })
    // .catch(error => console.error('Error fetching weather data:', error)); // Handle errors

































//DOM Selectors
// const temperature = document.getElementById ("temperature")
// const condition = document.getElementById ("condition")


// fetch(URL)
// .then(response => response.json())
// .then(data => {
//     console.log(data.main.temp)
//    const temperature = data.main.temp; 
//    const stockholmTemp = data.list[0].main.temp
// });





// temperature.innerText = stockholmTemperature


