//--------DOM selectors stored as short variables-------------//






//---------------- Global Variables -------------------------//





//----------- Functions after this comment -----------------//



// Making an API request using fetch
fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => {
        // Process the API response data
        console.log(data)
    })
    .catch(error => {
        // Handle any errors that occurred during the API request
        console.error('Error:', error)
    })


// For example, to get the current weather in Stockholm, you can use the URL below. Remember to replace YOUR_API_KEY with the API key //you copied from your dashboard.
// https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=YOUR_API_KEY



//-------------------- All Event Listeners --------------------//