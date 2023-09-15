/*STEP 1: You will need to use the fetch() function in JavaScript to load the weather data into your page, and then select the values you want to inject into the DOM from the JSON which comes from the API.*/

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
    temperature.textContent = `${data.main.temp.toFixed(1)}°C`;
    //city
    city.textContent = data.name;
    //Gather weather description from API array "Weather"
    const weatherDescription = data.weather[0].description;
    const capitalizedDescription = weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);
    description.textContent = capitalizedDescription;

    // Todays advice - You can use a conditional statement here based on weatherDescription
    if (weatherDescription.includes('clear')) {
        todaysAdvice.textContent = "It's a sunny day. Enjoy the sunshine!";

        //create img according to weather
        const img = document.createElement("img");
        img.src = "./design/design1/assets/Group36.png";
        img.alt = "sunny";
        correctImg.appendChild(img);

    } else if (weatherDescription.includes('rain')) {
        todaysAdvice.textContent = "It's raining. Don't forget your umbrella!";

        //create img according to weather
        const img = document.createElement("img");
        img.src = "./design/design1/assets/Group16.png";
        img.alt = "rain";
        correctImg.appendChild(img);
    } else {
        todaysAdvice.textContent = "Check the weather and plan accordingly.";

        //create img according to weather
        const img = document.createElement("img");
        img.src = "./design/design1/assets/Group34.png";
        img.alt = "sunnyclouds";
        correctImg.appendChild(img);
    }


    //sunrise
    const sunriseTime = new Date(data.sys.sunrise * 1000); //convert sunrise time to milliseconds
    const hours = sunriseTime.getHours(); //fetching hours for sunrise
    const minutes = sunriseTime.getMinutes(); //fetching minutes for sunrise

    sunriseAndTime.textContent = `Sunrise ${hours}:${minutes}` //displaying only hours and minutes of sunrise
    //HOW TO DISPLAY DATE and TIME

    //sunset
    const sunsetTime = new Date(data.sys.sunset * 1000); //convert sunrise time to milliseconds
    const hours2 = sunsetTime.getHours(); //fetching hours for sunrise
    const minutes2 = sunsetTime.getMinutes(); //fetching minutes for sunrise

    sunsetAndTime.textContent = `Sunset ${hours2}:${minutes2}` //displaying only hours and minutes of sunrise
}

//date and time
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
const formattedMinutes = (minutes3 < 10) ? `0${minutes3}` : minutes3; //if minutes3 is less then 10, it adds a 0 in front of the minute. For example: the time is 15:05. Without formatted minutes it'd say 15:5.

//displays time and date in the browser
dateAndTime.textContent = `${dayOfWeek} ${todaysDate} ${todaysMonthAbbreviation}. Time is ${hours3}:${formattedMinutes} `

//Elin: 

//Mirela: The next 5 days

//Elba: styling

//annet: dato og klokkeslett?

//brances added - need to commit? Did it just in case

window.addEventListener("load", fetchWeatherData);