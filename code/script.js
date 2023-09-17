//--------DOM selectors stored as short variables-------------//

const container = document.getElementById('sun_rise_sunset');

//---------------- Global Variables -------------------------//

//example URL: https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=YOUR_API_KEY

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "9055fb4826563eac25a47e211073a627"; //Beckie's API key

const city = "Stockholm,Sweden";
const apiUrl = `${BASE_URL}?q=${city}&units=metric&APPID=${API_KEY}`;
const forecastAPI = `https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&exclude=hourly,daily,current&units=metric&APPID=9055fb4826563eac25a47e211073a627`

console.log(forecastAPI)

//------------------API fetch functions ----------------------//

// API fetch request for current weather for city
fetch(apiUrl)
    .then(response => response.json())
    .then((json) => {
        //console.log(json)
        updateHTML(json);
    })
    .catch((error) => console.error('Error:', error)) // Handle any errors that occurred during the API request


// API fetch request for city forecast to display for next 5 days
fetch(forecastAPI)
    .then(response => response.json())
    .then((json) => {
        console.log(json)
        updateHTMLforecast(json);
    })
    .catch((error) => console.error('Error:', error)) // Handle any errors that occurred during the API request

// ----- updateHTML function - display current forecast, sunrise, sunset, icon for city ---------------   //

const updateHTML = (json) => {
    // Convert sunrise timestamp to a Date object
    const sunriseTimestamp = new Date(json.sys.sunrise * 1000); // Multiply by 1000 to convert from seconds to milliseconds
    const sunriseHours = sunriseTimestamp.getUTCHours().toString().padStart(2, '0'); // Get hours in 24-hour format
    const sunriseMinutes = sunriseTimestamp.getUTCMinutes().toString().padStart(2, '0'); // Get minutes
    const sunriseTime = `${sunriseHours}: ${sunriseMinutes}`; // Create time string

    // Convert sunset timestamp to a Date object
    const sunsetTimestamp = new Date(json.sys.sunset * 1000); // Multiply by 1000 to convert from seconds to milliseconds
    const sunsetHours = sunsetTimestamp.getUTCHours().toString().padStart(2, '0'); // Get hours in 24-hour format
    const sunsetMinutes = sunsetTimestamp.getUTCMinutes().toString().padStart(2, '0'); // Get minutes
    const sunsetTime = `${sunsetHours}:${sunsetMinutes} `; // Create time string

    container.innerHTML = `<p> ${json.weather[0].description} | ${json.main.temp.toFixed(1)}°C</p>
    <p>sunrise ${sunriseTime}</p>
    <p>sunset ${sunsetTime}</p>`;

    const weatherStatus = json.weather[0].main;
    const cityNameElement = document.getElementById("cityName");

    if (weatherStatus == "Clear") {
        cityNameElement.innerText = `Get your sunnies on.
        ${json.name} is looking rather great today.`;
    } else {
        cityNameElement.innerText = `Check out the weather in ${json.name} today.`;
    }

    //display icon for either clouds, sunglasses or rain
    if (weatherStatus === "Clouds") {
        document.getElementById("weatherIcon").innerHTML = (`<img src="/design/design2/icons/noun_Cloud_1188486.svg" alt = "clouds icon" width = "100" height = "100" >`)
    } else if (weatherStatus === "Rain") {
        document.getElementById("weatherIcon").innerHTML = (`<img src="/design/design2/icons/noun_Umbrella_2030530.svg" alt = "umbrella icon"   width = "100" height = "100" >`)
    } else if (weatherStatus === "Clear") {
        document.getElementById("weatherIcon").innerHTML = (`<img src="/design/design2/icons/noun_Sunglasses_2055147.svg" alt = "sunglasses icon" width = "100" height = "100" >`)
    }
}

// ------ updateHTMLforecast function - display forecast for next 5 days ---------------   //

const updateHTMLforecast = (json) => {
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'));
    // Initialize a date for tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    // Loop through the filtered forecast and display the day names and temperatures
    for (let counter = 0; counter < 5; counter++) {
        const day = filteredForecast[counter];
        const date = new Date(tomorrow); // Copy the date for manipulation
        date.setDate(date.getDate() + counter); // Increment the date
        const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
        const temp = day.main.temp.toFixed(1);
        forecast5Days.innerHTML += `
            <div class="grid-child day" style="box-sizing: border-box; border-bottom: 2px dotted #164a68;">
                ${dayName}
            </div>
                        <div class="grid-child temp" style="box-sizing: border-box;text-align: right; border-bottom: 2px dotted #164a68;">
                ${temp}°c
            </div>
        `;
    }
};

function updateClock() {
    const clockElement = document.getElementById('clock');
    const stockholmTimeZone = 'Europe/Stockholm'; // Time zone for Stockholm, Sweden
    const options = { timeZone: stockholmTimeZone, hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const stockholmTime = new Date().toLocaleTimeString('sv-SE', options);
    clockElement.textContent = stockholmTime;
}

// Update the clock every second
setInterval(updateClock, 1000);

// Initial update
updateClock();

const stockholmDatesElement = document.getElementById('stockholmDates');

function displayCurrentStockholmDate() {
    const stockholmTimeZone = 'Europe/Stockholm'; // Time zone for Stockholm, Sweden
    const stockholmTime = new Date().toLocaleString('en-US', { timeZone: stockholmTimeZone });

    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    const stockholmDate = new Date(stockholmTime).toLocaleDateString('en-US', options);

    stockholmDatesElement.innerHTML = stockholmDate;
}

// Call the function to display the current Stockholm date
displayCurrentStockholmDate();





//-------------------- All Event Listeners --------------------//
//if we make a button to scroll through to other cities????
