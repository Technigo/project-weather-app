/*STEP 1: You will need to use the fetch() function in JavaScript to load the weather data into your page, and then select the values you want to inject into the DOM from the JSON which comes from the API.*/

//LINK TO HTML//
const weatherData = document.getElementsByClassName(`weatherData`)
const city = document.getElementById(`city`)
const temperature = document.getElementById(`Temperature`)
const todaysAdvice = document.getElementById(`todaysAdvice`)
const sunriseAndTime = document.getElementById(`sunriseAndTime`)
const description = document.getElementById(`description`)
const weeklyForecast = document.getElementsByClassName(`weeklyForecast`)

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
        todaysAdvice.textContent = "It's a clear day. Enjoy the sunshine!";
    } else if (weatherDescription.includes('rain')) {
        todaysAdvice.textContent = "It's raining. Don't forget your umbrella!";
    } else {
        todaysAdvice.textContent = "Check the weather and plan accordingly.";
    }


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

/*Show a forecast for the next 5 days. You can choose how to display the forecast - perhaps you want to show the min and max temperature for each day, or perhaps you want to show the temperature from the middle of the day,
The API gives us the next 5 days but for every third hour. So a good idea could be to only use the weather data from the same time every day. You can filter the forecast list array to only get the info from 12:00 each day for example.
Read the endpoint documentation for the forecast.*/

//FUNCTION FETCH 5DAY FORECAST DATA//
function fetchForecastData() {
    fetch(URLFOR)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((forecastData) => {
            // Handle the data here
            updateForecast(forecastData);
            console.log(forecastData)
        })
        .catch((error) => {
            console.error(`Error fetching data: ${error.message}`);
            console.log(error)
        });
}// (forecastData)= forecast data from API

//UpdateForecast Function TO DISPLAY DATA FETCHED IN THE fetchForecastData FUNCTION ON THE WEBSITE//
//forecastData here shows to data feched in function fetchForecastData()
function updateForecast(forecastData) {
    const weeklyForecast = document.getElementsByClassName(`weeklyForecast`);
    weeklyForecast.innerHTML = ``;
    const filteredForecast = forecastData.list.filter(item =>
        item.dt_txt.includes('12:00')
    );
}









//EVENT LISTENERS//
window.addEventListener("load", fetchWeatherData); //update weather information when site loads
window.addEventListener("load", fetchForecastData); //update 5day forecast information when site loads