// DOM selectors stored as short variables
const city = document.getElementById("city");
const currentWeather = document.getElementById("currentWeather");
const currentTemp = document.getElementById("currentTemp");
const todaysPrompt = document.getElementById("todays-prompt")
const sunriseSunset = document.getElementById("sunrise-sunset");

// Global variables
let URLweather = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=1ecbebf1161e80b656c352a8c659aec8"
let URLforecast = "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=8802f8b4b2d622931613aace44be57ae";



// Fetch
fetch(URLforecast)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
    city.innerHTML += `City: ${data.city.name}`;
    currentWeather.innerHTML += `Current weather: ${data.list[0].weather[0].description} `;
    currentTemp.innerHTML += `Temperature: ${data.list[0].main.temp.toFixed(
      1
    )}<sup>°C</sup>`; // toFixed(1) rounds temperature to one decimal
    // Stackoverflow re: <sup> solution: https://stackoverflow.com/c/technigo/questions/750
   
  });

  fetch (URLweather)
    .then ((res) => {
      return res.json();
    })
    .then ((json)=> {

      //Declare variables for the time of sunset and sunrise. new Date () changes the UNIX time to day/date/year/hh:mm:ss/time zone. 
      //Convert timestamp to milliseconds with *1000. JavaScript stores Dates in milliseconds. 
      const sunriseUNIX = new Date (json.sys.sunrise*1000); 
      const sunsetUNIX = new Date (json.sys.sunset*1000); 
      console.log(sunsetUNIX)

      sunriseSunset.innerHTML = `Sunrise:${sunriseUNIX}Sunset:${sunsetUNIX}`;
 

      

      // https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript

    })


// All the event listeners

// Stackoverflow asked question: https://stackoverflow.com/c/technigo/questions/4001
