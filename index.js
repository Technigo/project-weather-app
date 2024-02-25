//LINK TO HTML//
const weatherData = document.getElementsByClassName(`weatherData`)
const city = document.getElementById(`city`)
const temperature = document.getElementById(`Temperature`)
const todaysAdvice = document.getElementById(`todaysAdvice`)
const sunriseAndTime = document.getElementById(`sunriseAndTime`)
const sunsetAndTime = document.getElementById(`sunsetAndTime`)
const description = document.getElementById(`description`)
const img = document.getElementById(`correctImg`)
const dateAndTime = document.getElementById(`dateAndTime`)

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

const URLFOR = `${BASE_URL_FOR}?q=${stadenMinFor}&units=metric&APPID=${API_KEY_FOR}` // erlik 3 første const?
//FULL URL FRA OPENWEATHERMAP - FORECAST (API) "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=964a15302a76eed8fe2ddd899c2fb441"

console.log(URL) //console.log the url for weather API
console.log(URLFOR) //console.log the url for 5day forecast API

//used to display 5day forecast
let forecastHTML = ""

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


//DISPLAY DATA FETCHED IN THE fetchWeatherData FUNCTION ON THE WEBSITE//
//Data here shows to data feched in function fetchWeatherData()
function updateWeatherUI(data) {

    correctImg.innerHTML = '';//ensures that only one of the icon is displayed at a time, replacing any existing icons when the this function is called.

    //temperature
    temperature.textContent = `${data.main.temp.toFixed(1)}`;
    const celsiusSymbol = document.createElement("span");
    celsiusSymbol.textContent = "°C";
    document.getElementById("Temperature").appendChild(celsiusSymbol);

    //city
    city.textContent = data.name;
    //Gather weather description from API array "Weather"
    const weatherDescription = data.weather[0].description;
    const capitalizedDescription = weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);
    description.textContent = capitalizedDescription;

    // Todays advice - You can use a conditional statement here based on weatherDescription
    if (weatherDescription.includes('clear')) {
        todaysAdvice.textContent = "Put on your shades and bask in the sunshine!\nRemember to stay 'cool' with some sunscreen.";

        //create img according to weather
        const img = document.createElement("img");
        img.src = "./images/daymin-kopi.png";
        img.alt = "sunny";
        img.style.width = "150px";
        img.style.height = "auto";
        correctImg.appendChild(img);

    } else if (weatherDescription.includes('rain')) {
        todaysAdvice.textContent = "It's raining cats and dogs out there. Don't forget your umbrella, or you might end up 'purr-fectly' soaked!";

        //create img according to weather
        const img = document.createElement("img");
        img.src = "./design/design1/assets/Group16.png";
        img.alt = "rain";
        img.style.width = "150px";
        img.style.height = "auto";
        correctImg.appendChild(img);
    } else {
        todaysAdvice.textContent = "As we scandinavians say:'There's no such thing as bad weather, only inappropriate clothing!'";

        //create img according to weather
        const img = document.createElement("img");
        img.src = "./images/dayothermin.png";
        img.alt = "sunnyclouds";
        img.style.width = "150px";
        img.style.height = "auto";
        correctImg.appendChild(img);
    }

    //SUNRISE SUNSET//
    //sunrise
    const sunriseTime = new Date(data.sys.sunrise * 1000); //convert sunrise time to milliseconds
    const hours = sunriseTime.getHours(); //fetching hours for sunrise
    const minutes = sunriseTime.getMinutes(); //fetching minutes for sunrise
    const formattedMinutes = (minutes < 10) ? `0${minutes}` : minutes; //if minutes3 is less then 10, it adds a 0 in front of the minute. For example: the time is 15:05. Without formatted minutes it'd say 15:5.
    sunriseAndTime.textContent = `Sunrise ${hours}:${formattedMinutes}` //displaying only hours and minutes of sunrise

    //sunset
    const sunsetTime = new Date(data.sys.sunset * 1000); //convert sunrise time to milliseconds
    const hours2 = sunsetTime.getHours(); //fetching hours for sunrise
    const minutes2 = sunsetTime.getMinutes(); //fetching minutes for sunrise
    const formattedMinutes2 = (minutes2 < 10) ? `0${minutes2}` : minutes2; //if minutes3 is less then 10, it adds a 0 in front of the minute. For example: the time is 15:05. Without formatted minutes it'd say 15:5.
    sunsetAndTime.textContent = `Sunset ${hours2}:${formattedMinutes2}` //displaying only hours and minutes of sunrise
}

//DATE AND TIME//
const currentDate = new Date();

const todaysDay = currentDate.getDay(); //Get day from Date (recieves day in number 0=sunday, 1=monday etc)
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; //array of weekdays made to be able to set current day as "monday" instead of "1" (has to start on sunday to work correctly)
const dayOfWeek = daysOfWeek[currentDate.getDay()]; //converts weekdays from numbers to strings
const todaysDate = currentDate.getDate(); //get date from Date
const todaysMonth = currentDate.getMonth(); //get month from Date
const monthAbbreviations = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]; //Array of months made to be able to set current month to "Jan" instead of "1"
const todaysMonthAbbreviation = monthAbbreviations[currentDate.getMonth()]; //converts months from number to strings
const hours3 = currentDate.getHours(); //get hours from Date
const minutes3 = currentDate.getMinutes(); //get minutes from Date
const formattedMinutes3 = (minutes3 < 10) ? `0${minutes3}` : minutes3; //if minutes3 is less then 10, it adds a 0 in front of the minute. For example: the time is 15:05. Without formatted minutes it'd say 15:5.

//displays time and date in the browser
dateAndTime.textContent = `${dayOfWeek} ${todaysDate} ${todaysMonthAbbreviation}. ${hours3}:${formattedMinutes3} `


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

//DEFINE UpdateForecast Function TO DISPLAY 5 DAYS FORECAST DATA FETCHED IN THE fetchForecastData FUNCTION, ON THE WEBSITE//
//forecastData here shows to data feched in function fetchForecastData()
function updateForecast(forecastData) {
    // Get the HTML element where the forecast data will be displayed
    const weeklyForecast = document.querySelector('.weeklyForecast');
    // Clear the existing content in weeklyForecast
    weeklyForecast.innerHTML = '';

    // Object to group daily forecast data by date
    const dailyForecast = {};

    // Process the JSON data received from the API
    forecastData.list.forEach(item => {
        const date = new Date(item.dt * 1000); // Convert the timestamp to a date object
        const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date); // Get the full weekday name 

        // Initialize an entry in the dailyForecast object
        if (!dailyForecast[weekday]) {
            dailyForecast[weekday] = {
                maxTemp: -Infinity, // Initialize with negative infinity to find max temperature
                minTemp: Infinity, // Initialize with positive infinity to find min temperature
                weatherIcon: '', // Initialize an empty string for weather icon
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
        // Set the weather icon based on the weather description
        if (item.weather[0].description.includes('clear')) {
            dailyForecast[weekday].weatherIcon = './images/day_clear-tiny.png';
        } else if (item.weather[0].description.includes('rain')) {
            dailyForecast[weekday].weatherIcon = './images/day_rain-tiny.png';
        } else {
            dailyForecast[weekday].weatherIcon = './images/day_partial_cloud-tiny.png';
        }
    });

    // Generate HTML code for each day's forecast
    for (const weekday in dailyForecast) {
        const { maxTemp, minTemp, weatherIcon } = dailyForecast[weekday];

        // Create a new forecast item element
        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');

        // Create paragraph elements for other values
        const weekdayElement = document.createElement('p');
        weekdayElement.textContent = weekday;
        weekdayElement.classList.add('weekday');

        // Create an img element for the weather icon
        const weatherIconElement = document.createElement('img');
        weatherIconElement.src = weatherIcon;
        weatherIconElement.alt = 'Weather Icon';
        weatherIconElement.style.width = '50px'; // Adjust the width as needed

        // Create a single paragraph element for maxTemp and minTemp
        const tempElement = document.createElement('p');
        tempElement.textContent = `${maxTemp}°C / ${minTemp}°C`;
        tempElement.classList.add('temperature');

        // Append the paragraph elements to the forecast item
        forecastItem.appendChild(weekdayElement);
        forecastItem.appendChild(weatherIconElement); // Add the weather icon
        forecastItem.appendChild(tempElement);

        // Append the forecast item to the weekly forecast container
        weeklyForecast.appendChild(forecastItem);
    }
}

//NOT SURE THE ICONS MATCH THE DATA FROM API. TOO TIRED NOW. 


//ADDED "function toggleNavMenu" FOR NAVBAR
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

//EVENT LISTENERS//
window.addEventListener("load", fetchWeatherData); //update weather information when site loads
window.addEventListener("load", fetchForecastData); //update 5day forecast information when site loads    #todaysAdvice {


