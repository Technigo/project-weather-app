//--------DOM selectors stored as short variables-------------//






//---------------- Global Variables -------------------------//

//const city = "test city";


//example URL: https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=YOUR_API_KEY

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "9055fb4826563eac25a47e211073a627"; //Beckie's API key

const city = "Stockholm,Sweden";
const apiUrl = `${BASE_URL}?q=${city}&units=metric&APPID=${API_KEY}`;
//Stenli's API key???
//const API_KEY = "c4bbbb8387fb23359391cfb36ed8fd24"; //Stenli's API key


//----------- Functions after this comment -----------------//
//https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=c4bbbb8387fb23359391cfb36ed8fd24

//NOTE put the fetch inside a function so that we can then decide when it happens by calling that function

// Making an API request using fetch
fetch(apiUrl)
    .then(response => response.json())
    .then((json) => {
        console.log(json)
        updateHTML(json);
    })
    .catch((error) => console.error('Error:', error)) // Handle any errors that occurred during the API request

const updateHTML = (json) => {
    document.getElementById("cityName").innerText = (`City name: ${json.name}`)
    document.getElementById("cityTemp").innerText = (`City Temp: ${json.main.temp.toFixed(1)}`)
    document.getElementById("weatherDescription").innerText = (`Description: ${json.weather[0].description}`)
}




// For example, to get the current weather in Stockholm, you can use the URL below. Remember to replace YOUR_API_KEY with the API key //you copied from your dashboard.
// https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=YOUR_API_KEY



//-------------------- All Event Listeners --------------------//