const temp = document.getElementById("temp");
const city = document.getElementById("city");
const typeOfWeather = document.getElementById("typeOfWeather");
const forecastSection = document.getElementById("fiveDayPrognosis");

const fetchApi = () => {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Varberg,Sweden&units=metric&APPID=6e3a3db02f585218db04cdc935f5290c')
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            // Declaring a variable for our data
            const weatherData = json;
            console.log(weatherData);
            // Declaring a variable for temperature
            const temperature = weatherData.main.temp;
            // Declaring a variable for the rounded temperature, and rounding to first decimal in place
            const tempRounded = Math.round(temperature * 10) / 10;
            // Adds values to HTML via innerHTML
            temp.innerHTML = `<h1>${tempRounded}<span id="degree">°C</span></h1>`;
            city.innerHTML = `<h2>${weatherData.name}</h2>`;
            // To add values to HTML we first map through the array "Weather"
            const types = weatherData.weather.map((element) => element.description)
            //console.log(types);

            // Since types is an array, we first need to save the array in a variable as a string with toString-method
            const typesAsString = types.toString();
            //console.log(typesAsString);
            // Takes the string and places the first character in a new variable firstLetter
            const firstLetter = typesAsString.charAt(0);
            //console.log(firstLetter);
            // We make the first character uppercase
            const firstUpperLetter = firstLetter.toUpperCase();
            // Substring removes first letter at index 1 in the rest of the word
            const restOfWord = typesAsString.substring(1);

            // Adds values to HTML via innerHTML with the new variable names
            typeOfWeather.innerHTML = `<p>${firstUpperLetter}${restOfWord}</p>`;
        })
        .catch((error) => {
            // Shows an error message if fetch doesn't work
            console.error('Something went wrong', error);
        })
}
fetchApi();

// Function to fetch weather with timestamps
const weatherForecast = () => {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=Varberg,Sweden&units=metric&APPID=6e3a3db02f585218db04cdc935f5290c")
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        const forecastData = json; 

        // Function to convert the unix timestamp to readable dates/times
        const getMinMax = () => {
            forecastSection.innerHTML = "";
            // Saves all the temperature-info in a variable
            const temperatures = forecastData.list
            // Filters the array of temperatures for those times including the timestamp 12:00
            .filter((text) => text.dt_txt.includes("12:00"))
            // Then saves date, minTemp and maxTemp as the values from the array.

            .map((item) => ({
                day: getDayOfWeek(item.dt),
                minTemp: item.main.temp_min.toFixed(0),
                maxTemp: item.main.temp_max.toFixed(0),
                image: generateImage(item.weather[0].description.toLowerCase()) // Passes weather description to generateImage
            }));

            temperatures.forEach((temperature) => {
                forecastSection.innerHTML += `<td class="day-style">${temperature.day}</td><td><img src="${temperature.image}" alt="Weather Image"></td><td>${temperature.maxTemp}° / ${temperature.minTemp} °C</td>`;
            });
        } 
        getMinMax();
    })
    .catch((error) => {
        // Shows an error message if fetch doesn't work
        console.error('Something went wrong', error);
    })
}
weatherForecast();

// This function takes a parameter "timestamp", which we use in the getMinMax function to set the day and append it to the forecastSection.
function getDayOfWeek(timestamp) {
    // Declares a variable/an array with all the days of the week in the format we want to display them
    const daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
    // Using the Date-method by multiplying with 1000, we get the timestamp in a readable timeformat, it converts UNIX timestamp to milliseconds
    const date = new Date(timestamp * 1000);
    // getDay is a method on the Date object that returns the day as an integer. By setting the integer as an index we can decide what day should have what name. In the getDay method the integer 0 represents sunday, thats why the order of the weekdays above is with sunday as the first day. 
    const dayOfWeek = daysOfWeek[date.getDay()];
    return dayOfWeek;
    
};

function generateImage(weatherDescription) {
    let imageName = "";

    // Determine the image name based on the weather description
    if (weatherDescription.includes("sun")) {
        imageName = "Group36.png";
    } else if (weatherDescription.includes("cloud")) {
        imageName = "Group16.png";
    } else if (weatherDescription.includes("overcast")) {
        imageName = "Group34.png";
    } else {
        imageName = "Group34.png"; // Use a default image if no match is found
    }

    // Return the image URL
    return `design/design1/assets/${imageName}`;
}

// lägsta/högsta temp? 
// ikon som visar vädret?