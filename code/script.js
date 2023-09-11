const temp = document.getElementById("temp");
const city = document.getElementById("city");
const typeOfWeather = document.getElementById("typeOfWeather");

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