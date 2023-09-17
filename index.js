/*STEP 1: You will need to use the fetch() function in JavaScript to load the weather data into your page, and then select the values you want to inject into the DOM from the JSON which comes from the API.*/

//LINK TO HTML//
const weatherData = document.getElementsByClassName(`weatherData`)
const city = document.getElementById(`city`)
const temperature = document.getElementById(`Temperature`)
const todaysAdvice = document.getElementById(`todaysAdvice`)
const sunriseAndTime = document.getElementById(`sunriseAndTime`)
const description = document.getElementById(`description`)
//const weeklyForecast = document.getElementsByClassName(`weeklyForecast`)//SEEMS LIKE WE DO NOT NEED THIS? LOOK AT ROW 135, WORKS WITHOUT THIS


//GLOBAL VARIABLES - WEATHER//
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather"
const stadenMin = "Stockholm,Sweden"
const API_KEY = "964a15302a76eed8fe2ddd899c2fb441"

const URL = `${BASE_URL}?q=${stadenMin}&units=metric&APPID=${API_KEY}` // erlik 3 første const?
//FULL URL FRA OPENWEATHERMAP - WEATHER (API) "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=964a15302a76eed8fe2ddd899c2fb441"

//GLOBAL VARIABLES - 5DAY FORECAST/
const BASE_URL_FOR = "https://api.openweathermap.org/data/2.5/forecast"
const stadenMinFor = "Stockholm,Sweden"
const API_KEY_FOR = "964a15302a76eed8fe2ddd899c2fb441"

//const URLFOR = "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=YOUR_API_KEY";


const URLFOR = `${BASE_URL_FOR}?q=${stadenMinFor}&units=metric&APPID=${API_KEY_FOR}` // erlik 3 første const?
//FULL URL FRA OPENWEATHERMAP - FORECAST (API) "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=964a15302a76eed8fe2ddd899c2fb441"

console.log(URL) //console.log the url for weather API
console.log(URLFOR) //console.log the url for 5day forecast API

let forecastHTML = "" //MIRELA LAGT TIL

//FUNCTION - FETCH WEATHER DATA//
function fetchWeatherData() {
    fetch(URL)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            // Handle the data here
            updateWeatherUI(data);
            console.log(data)
        })
        .catch((error) => {
            console.error(`Error fetching data: ${error.message}`);
            console.log(error)
        });
}// (data)= weather data from API



/*STEP 2: Your task is to present some data on your web app. Start with:
•	the city name - DONE
•	the temperature (rounded to 1 decimal place) - DONE, BUT 2 dec
•	and what type of weather it is (the "description" in the JSON) - DONE*/


//DISPLAY DATA FETCHED IN THE fetchWeatherData FUNCTION ON THE WEBSITE//
//Data here shows to data feched in function fetchWeatherData()
function updateWeatherUI(data) {
    //temperature
    temperature.textContent = `${data.main.temp}°C`;
    //city
    city.textContent = data.name;
    //Gather weather description from API array "Weather"
    const weatherDescription = data.weather[0].description;
    const capitalizedDescription = weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);
    description.textContent = capitalizedDescription;
    // Todays advice - You can use a conditional statement here based on weatherDescription
    if (weatherDescription.includes('clear')) {
        todaysAdvice.textContent = "Det är en klar dag. Njut av solskenet!"; //"It's a clear day. Enjoy the sunshine!
    } else if (weatherDescription.includes('rain')) {
        todaysAdvice.textContent = "Det regnar. Glöm inte ditt paraply!"; //"It's raining. Don't forget your umbrella!"
    } else {
        todaysAdvice.textContent = "'Det finns inget dåligt väder,\nbara dåliga kläder'"; //"Check the weather and plan accordingly."
    }
    //OBS; BØR VI HA ANDRE BESKJEDER, FEKS EN FOR SOL?

    //sunrise
    const sunriseTime = new Date(data.sys.sunrise * 1000);
    // Convert sunrise time to milliseconds
    sunriseAndTime.textContent = `Sunrise ${sunriseTime.toLocaleTimeString()};`
    //HOW TO DISPLAY DATE and TIME
}

//Elin: sunrise, sunset (time og minutt feks: 06:12), decimaler på temperaturen, make sun img come up if sunny, rain if rainy, etc.

//Mirela: The next 5 days

//Elba: styling

//annet: dato og klokkeslett?

//brances added - need to commit? Did it just in case

<<<<<<< HEAD
//MIRELA LAGT TIL - 5 DAY FORECAST//
//FUNCTION FETCH 5DAY FORECAST DATA//
function fetchForecastData() {
    // Define the URL for fetching the 5-day forecast data (URLFOR should be updated accordingly)
    fetch(URLFOR)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((forecastData) => {
            // Handle the 5-day forecast data here
            updateForecast(forecastData);
            console.log(forecastData);
        })
        .catch((error) => {
            console.error(`Error fetching forecast data: ${error.message}`);
            console.log(error);
        });
}// (forecastData)= forecast data from API*/


// DO WE NEED THIS?? OR IS THE EVENT LISTENER IN THE END ENOUGH?? Call the fetchWeatherData function is used to initiate the fetching of current weather data when our web page loads.
fetchWeatherData();

//DEFINE UpdateForecast Function TO DISPLAY 5 DAYS FORECAST DATA FETCHED IN THE fetchForecastData FUNCTION, ON THE WEBSITE//
//forecastData here shows to data feched in function fetchForecastData()
function updateForecast(forecastData) {
    // Get the HTML element where the forecast data will be displayed
    const weeklyForecast = document.querySelector('.weeklyForecast');
    // Empty string to store the HTML content
    let forecastHTML = '';
    // Object to group daily forecast data by date
    const dailyForecast = {};

    // Process the JSON data received from the API
    forecastData.list.forEach(item => {
        const date = new Date(item.dt * 1000);// Convert the timestamp to a date object
        const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date); // Get the full weekday name 

        //HAD THIS IN THE CODE, but looks like it is not needed as we display weekdays, so consider removing:
        /* Format the date as yyyy-mm-dd
        const dateString = date.toISOString().split('T')[0];*/

        // Initialize an entry in the dailyForecast object
        if (!dailyForecast[weekday]) {
            dailyForecast[weekday] = {
                maxTemp: -Infinity, // Initialize with negative infinity to find max temperature
                minTemp: Infinity,  // Initialize with positive infinity to find min temperature
            };
        }
        // Update the max temperature if a higher value is found (+remove decimals)
        if (item.main.temp_max > dailyForecast[weekday].maxTemp) {
            dailyForecast[weekday].maxTemp = Math.round(item.main.temp_max);
        }
        // Update the min temperature if a lower value is found (+remove decimals)
        if (item.main.temp_min < dailyForecast[weekday].minTemp) {
            dailyForecast[weekday].minTemp = Math.round(item.main.temp_min);
        }
    });

    //HTML ELEMENTS TO DISPLAY THE 5 DAY FORECAST//
    // Create HTML elements for each day's forecast
    for (const weekday in dailyForecast) {
        const { maxTemp, minTemp } = dailyForecast[weekday];

        // Generate HTML code for each day's forecast
        forecastHTML += `
        <div class="forecast-item">
            <p>${weekday} ${maxTemp}/ ${minTemp}°C</p>
        </div>
        `;
        console.log(`${weekday} ${maxTemp}/ ${minTemp}`)
    }

    // Update the HTML content of the weekly forecast element
    weeklyForecast.innerHTML = forecastHTML;
}




=======
//ELBA ADDED "function toggleNavMenu" FOR NAVBAR
function toggleNavMenu() {
    var x = document.getElementById("myLinks");
    var icon = document.querySelector("nav a.icon");
    var topOfPage = document.querySelector(".style-topOfPage");

    if (x.style.display === "block") {
        x.style.display = "none";
        icon.classList.remove("active"); // Remove the "active" class
        topOfPage.style.height = "auto"; // Set the height to auto to expand
        topOfPage.classList.remove("clicked"); // Remove the "clicked" class
    } else {
        x.style.display = "block";
        icon.classList.add("active"); // Add the "active" class
        topOfPage.style.height = topOfPage.scrollHeight + x.scrollHeight + "px"; // Expand to the full content height plus the menu height
        topOfPage.classList.add("clicked"); // Add the "clicked" class
    }
}
//I think I understand the if/else and remove add, but find it hard to explain. I'll try to if we have enough time.

window.addEventListener("load", fetchWeatherData);
>>>>>>> styling


//EVENT LISTENERS//
window.addEventListener("load", fetchWeatherData); //update weather information when site loads
window.addEventListener("load", fetchForecastData); //update 5day forecast information when site loads