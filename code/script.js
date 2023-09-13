//--------DOM selectors stored as short variables-------------//






//---------------- Global Variables -------------------------//

const city = "test city";

//example URL: https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=YOUR_API_KEY

//const BASE_URL = https://api.openweathermap.org/data/2.5/weather
//const API_KEY = 9055fb4826563eac25a47e211073a627 //Beckie's API key


//----------- Functions after this comment -----------------//


//NOTE put the fetch inside a function so that we can then decide when it happens by calling that function

// Making an API request using fetch
fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=9055fb4826563eac25a47e211073a627')
    .then(response => response.json())
    .then((json) => {
        console.group(json)
        document.getElementById("cityName").innerText = (`City name: ${json.name}`)
        //  document.getElementById("cityTemp").innerText
    })
    .catch((error) => console.error('Error:', error)) // Handle any errors that occurred during the API request





// For example, to get the current weather in Stockholm, you can use the URL below. Remember to replace YOUR_API_KEY with the API key //you copied from your dashboard.
// https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=YOUR_API_KEY



//-------------------- All Event Listeners --------------------//