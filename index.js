/*STEP 1: You will need to use the fetch() function in JavaScript to load the weather data into your page, and then select the values you want to inject into the DOM from the JSON which comes from the API.*/

//LINK TO HTML//
const weatherData = document.getElementsByClassName(`weatherData`)
const city = document.getElementById(`city`)
const temperature = document.getElementById(`Temperature`)
const todaysAdvice = document.getElementById(`todaysAdvice`)
const sunriseAndTime = document.getElementById(`sunriseAndTime`)
const description = document.getElementById(`description`)

//GLOBAL VARIABLES//
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather"
const stadenMin = "Stockholm,Sweden"
const API_KEY = "964a15302a76eed8fe2ddd899c2fb441"

const URL = `${BASE_URL}?q=${stadenMin}&units=metric&APPID=${API_KEY}` // erlik 3 første const?
//FULL URL FRA OPENWEATHERMAP (API) "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=964a15302a76eed8fe2ddd899c2fb441"

console.log(URL)

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


window.addEventListener("load", fetchWeatherData);