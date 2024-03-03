//global variables

const overview = document.getElementById("overview");
const forecastTable = document.getElementById("forecastTable");
const cityInput = document.getElementById("cityInput");
const myButton = document.getElementById("myButton");
const weeklyForecast = document.getElementById("weeklyForecast");
const body = document.body;

// OpenWeatherMap API key
const API_Key = "4f1f799026ecba0bd7e986152b35fba5";
// The city from where we want to get the weather
let cityName = "Herning";

//changing const to let, you allow the cityName variable to be reassigned later in the code without causing an error.

// Function that will let us get and display data about todays weather from the API.
async function todaysWeatherData(){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_Key}&units=metric`);
    var data = await response.json(); // Will make the data that we have fetched readable.
    console.log(data); // Will show us the data we have fetched in the console.
    
    // Data that we have fetched from the API stored in variables to make it easier to read and understand.
    const description = data.weather[0].main;
    const temperature = (data.main.temp).toFixed(1);
    const sunriseTime = (new Date(data.sys.sunrise * 1000)).toLocaleTimeString('da-DK', {hour: '2-digit', minute: '2-digit'});
    const sunsetTime = (new Date(data.sys.sunset * 1000)).toLocaleTimeString('da-DK', {hour: '2-digit', minute: '2-digit'});
    
    let weatherIcon = ``;
    let weatherQuote = ``;
    let nameOfCity = (cityName.charAt(0).toUpperCase() + cityName.slice(1))
     
    // Else if statement to change picture, weather quote and design depending on the weather description.
    if (cityName != "Herning" && description === "Clear") {
      body.className = "Clear"; // Will change the class of the HTML body.
      weatherIcon = `<img src="https://raw.githubusercontent.com/Kipourou/project-weather-app/91df6f896f868df389728c9c370fd7b8150fd539/design/design2/icons/noun_Sunglasses_2055147.svg" alt="Clear weather"/>`;
      weatherQuote = `Get your sunnies on. ${nameOfCity} is looking rather great today!`;
    } else if (cityName != "Herning" && description === "Snow") {
      body.className = "RainSnowOther"; // Will change the class of the HTML body.
      weatherIcon = `<img src="" alt="Snow"/>`;
      weatherQuote = `Bring your warmest jacket. ${nameOfCity} is looking white today!`;
    } else if (cityName != "Herning" && description === "Rain") {
      body.className = "RainSnowOther"; // Will change the class of the HTML body.
      weatherIcon = `<img src="https://raw.githubusercontent.com/Kipourou/project-weather-app/91df6f896f868df389728c9c370fd7b8150fd539/design/design2/icons/noun_Umbrella_2030530.svg" alt="Umbrella"/>`;
      weatherQuote = `Don't forget your umberella. It is wet in ${nameOfCity} today!`;
    } else if (cityName != "Herning" && description === "Clouds") {
      body.className = "Clouds"; // Will change the class of the HTML body.
      weatherIcon = `<img src="https://raw.githubusercontent.com/Kipourou/project-weather-app/91df6f896f868df389728c9c370fd7b8150fd539/design/design2/icons/noun_Cloud_1188486.svg" alt="Clouds"/>`;
      weatherQuote = `Light a fire and get cozy. ${nameOfCity} is looking grey today!`;
    } else if (cityName === "Herning") {
      weatherIcon = `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Herning_Kommune_byv%C3%A5ben.svg/1641px-Herning_Kommune_byv%C3%A5ben.svg.png" alt="Herning"/>`;
      weatherQuote = "Herning: Embrace the weather, embrace the essence of Denmark!";
    } else {
      weatherIcon = ``;
      weatherQuote = ``;
      body.className = "RainSnowOther";
    };
    
    // Will print the overview in the HTML document.
    overview.innerHTML += `
      <p>${description} | ${temperature}°C</p>
      <p>Sunrise: ${sunriseTime}</p>
      <p>Sunset: ${sunsetTime}</p>
      </br></br>
      ${weatherIcon}
      <h2 class="quote">${weatherQuote}</h2>
      </br>
      `;
  };
  
  async function fetchWeeklyForecast(){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_Key}&units=metric`);
    const data = await response.json(); // Will make the data that you have fetched visible.
   // console.log(data); // Will let you see the data in the console.
  
    // Filter the forecast data so we only get the weather for the days when the clock is 15:00.
    const dailyForecasts = data.list.filter((item) => item.dt_txt.includes("12:00:00"));
    
    // Open the table.
    let forecastTableHTML = `<table>`;
    
    // Will store data from each day in different variables.
    dailyForecasts.forEach((forecast) => {
      const date = new Date(forecast.dt * 1000);
      const day = date.toLocaleDateString("da-DK", {weekday: "long"}); // to convert the dates to the name of the date.
      const temp = (forecast.main.temp).toFixed(1); // Get the temperature of the date and round it to an integer.
      
      // Create a row for each day and temperature of that day.
      forecastTableHTML += `
        <tr>
          <td>${day}</td>
          <td>${temp}°C</td>
        </tr>
      `;
    });
    // Will close the table.
    forecastTableHTML += `</table>`;
    weeklyForecast.innerHTML = forecastTableHTML;
  };
  
  todaysWeatherData();
  fetchWeeklyForecast();
  
  // Function will assign the cityName variable a city based on the input we get from the user.

  function handleButtonClick() {
    const inputCity = document.getElementById("cityInput").value;
    if (inputCity) {
        cityName = inputCity; // Will update the cityName variable with the users input.
        overview.innerHTML = ""; //Deletes the old content in "overview"
        weeklyForecast.innerHTML = ""; // Deletes the old content in "weeklyForecast".
        todaysWeatherData(); //New content based on the users input.
        fetchWeeklyForecast(); //New content based on the users input.
    } else {
        alert("Sorry, I could not find a city with that name :(");
    }
}
