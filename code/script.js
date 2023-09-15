const temp = document.getElementById("temp");
const city = document.getElementById("city");
const typeOfWeather = document.getElementById("typeOfWeather");
const forecastSection = document.getElementById("fiveDayPrognosis");
const sunUpDown = document.getElementById("sunUpDown");
const locationSpecifics = document.getElementById("locationSpecifics");
// const changeCityBtn = document.getElementById("changeBtn"); //Just testing the button

let cityToUrl = "Borås,Sweden";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";
const API_KEY = "6e3a3db02f585218db04cdc935f5290c";
const weatherURL = `${BASE_URL}weather?q=${cityToUrl}&units=metric&APPID=${API_KEY}`;
const forecastURL = `${BASE_URL}forecast?q=${cityToUrl}&units=metric&APPID=${API_KEY}`;

const getWeather = () => {
    fetch(weatherURL)
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            // Declaring a variable for our data
            const weatherData = json;
            showMainWeatherInfo(weatherData);
            sunsetSunrise(weatherData); // Save the relevant data
        })
        .catch((error) => {
            // Shows an error message if fetch doesn't work
            console.error("Something went wrong", error);
        });
};
getWeather();

const showMainWeatherInfo = (weatherData) => {
    // Declaring a variable for temperature
    const temperature = weatherData.main.temp;
    // Declaring a variable for the rounded temperature, and rounding to first decimal in place
    const tempRounded = Math.round(temperature * 10) / 10;
    // Adds values to HTML via innerHTML
    temp.innerHTML = `<h1>${tempRounded}</h1><span id="degree">°C</span>`;
    city.innerHTML = `<h2>${weatherData.name}</h2>`;
    // To add values to HTML we first map through the array "Weather"
    const types = weatherData.weather.map((element) => element.description)

    // Since types is an array, we first need to save the array in a variable as a string with toString-method
    const typesAsString = types.toString();
    // Takes the string and places the first character in a new variable firstLetter
    const firstLetter = typesAsString.charAt(0);
    // We make the first character uppercase
    const firstUpperLetter = firstLetter.toUpperCase();
    // Substring removes first letter at index 1 in the rest of the word
    const restOfWord = typesAsString.substring(1);

    // Adds values to HTML via innerHTML with the new variable names
    typeOfWeather.innerHTML = `<p>${firstUpperLetter}${restOfWord}</p>`;
}

// Function to change sunrise and sunset visuals
const sunsetSunrise = (weatherData) => {
    // Gets and saves timezone
    const timezone = weatherData.timezone;
    // Returns timedifference
    const offset = new Date().getTimezoneOffset() * 60;
    // Set sunrise and sunset timestamps in UNIX form
    const unixTimestampSunrise = weatherData.sys.sunrise;
    const unixTimestampSunset = weatherData.sys.sunset;

    const sunriseInSeconds = unixTimestampSunrise + timezone + offset; // Adds timedifference to timezone and unixTimestamp
    const sunriseInMilli = sunriseInSeconds * 1000; // Converting the UNIX timestamp into a human-readable time.
    const sunriseLocalDate = new Date(sunriseInMilli); // Local sunrise in actual time
    const sunriseShort = sunriseLocalDate.toLocaleTimeString(["en-GB"], { timeStyle: `short` }); //Set a short timestamp to only show hour and minute.

    // Same as above for sunset
    const sunsetInSeconds = unixTimestampSunset + timezone + offset;
    const sunsetInMilli = sunsetInSeconds * 1000;
    const sunsetLocalDate = new Date(sunsetInMilli);
    const sunsetShort = sunsetLocalDate.toLocaleTimeString(["en-GB"], { timeStyle: `short` });

    locationSpecifics.innerHTML += `
        <div class="sunUpDown">
            <p>Sunrise ${sunriseShort}</p>
            <p>Sunset ${sunsetShort}</p>
        </div>
    `;

    const today = new Date(); // Gets todays date
    const time = today.getHours() * 100 + today.getMinutes(); // Converts the time to a numeric format like 1234 for 12:34

    const sunImage = document.querySelector(".day-image");
    const moonImage = document.querySelector(".night-image");

    const sunriseTime = parseInt(sunriseShort.replace(":", "")); // Converts sunrise and sunset times to the same numeric format that the overall time is in to enable comparing down below
    const sunsetTime = parseInt(sunsetShort.replace(":", ""));

    // Statement to decide if the sun or moon is showing
    if (time >= sunriseTime && time < sunsetTime) {
        sunImage.style.display = "flex";
        moonImage.style.display = "none";
    } else {
        sunImage.style.display = "none";
        moonImage.style.display = "flex";
        // Makes the background color change when it's night time
        insertStyle(
            `.location-specifics:before{
                background: rgb(34,35,80);
                background: linear-gradient(180deg, rgba(34,35,80,1) 0%, rgba(98,100,162,1) 100%);
            }`
        )
    }
}

// Function to fetch forecast with timestamps
const getForecast = () => {
    fetch(forecastURL)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            const forecastData = json;
            const dailyTemperatures = saveData(forecastData); // Save the relevant data
            createTable(dailyTemperatures); // Create and display the HTML table
        })
        .catch((error) => {
            // Shows an error message if fetch doesn't work
            console.error("Something went wrong", error);
        })
}
getForecast();

// This function takes a parameter "timestamp", which we use in the getMinMax function to set the day and append it to the forecastSection.
const getDayOfWeek = (timestamp) => {
    // Declares a variable/an array with all the days of the week in the format we want to display them
    const daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
    // Using the Date-method by multiplying with 1000, we get the timestamp in a readable timeformat, it converts UNIX timestamp to milliseconds
    const date = new Date(timestamp * 1000);
    // getDay is a method on the Date object that returns the day as an integer. By setting the integer as an index we can decide what day should have what name. In the getDay method the integer 0 represents sunday, thats why the order of the weekdays above is with sunday as the first day. 
    const dayOfWeek = daysOfWeek[date.getDay()];
    return dayOfWeek;
};

// Function to extract and save the relevant data, takes forecastData as a parameter so that we get the data from the fetch and can use it here
const saveData = (forecastData) => {
    // Create an object to store temperature data for each day
    const dailyTemperatures = {};

    forecastData.list.forEach((item) => {
        const date = item.dt_txt.split(' ')[0]; // Extract the date part from dt_txt
        const day = getDayOfWeek(item.dt); // Get the day of the week
        const temperature = {
            minTemp: item.main.temp_min.toFixed(0), // Gets the minimum temperature for each day
            maxTemp: item.main.temp_max.toFixed(0), // Gets the maximum temperature for each day
            icon: item.weather[0].icon, // Gets the icon from the weather array
        };

        // Checks if the date is already in the dailyTemperatures object declared above
        if (!dailyTemperatures[date]) {
            dailyTemperatures[date] = {
                // Sets all needed values
                day,
                minTemp: temperature.minTemp,
                maxTemp: temperature.maxTemp,
                icon: temperature.icon,
            };
        } else {
            // Update min and max temperatures if they need to be updated
            dailyTemperatures[date].minTemp = Math.min(dailyTemperatures[date].minTemp, temperature.minTemp);
            dailyTemperatures[date].maxTemp = Math.max(dailyTemperatures[date].maxTemp, temperature.maxTemp);
        }
    });

    // Returns the dailyTemperatures object for use in the createTable function. To be able to use it, the object first needs to be stored as a variable in the fetch above and then passed as an argument to createTable from there.
    return dailyTemperatures;
};

// Function to create the HTML table and append it to the forecastSection
const createTable = (dailyTemperatures) => {
    forecastSection.innerHTML = "";

    // Loop through dailyTemperatures and generate HTML
    for (const date in dailyTemperatures) { // for each date in the objects dailyTemperatures
        const weather = dailyTemperatures[date];
        const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}.png`; // Construct the icon URL
        forecastSection.innerHTML += `<td class="day-style">${weather.day}</td><td><img src="${iconUrl}" alt="Weather Icon"></td><td>${weather.maxTemp}° / ${weather.minTemp} °C</td>`;
    }
};

// Utility function to insert styling easier
function insertStyle(code) {
    var style = document.createElement("style");
    style.innerHTML = code;
    document.getElementsByTagName("head")[0].appendChild(style);
};
