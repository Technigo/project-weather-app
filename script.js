//Step 1 - Get started with the weather API
fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=bb3a8ca602b6560b4bf988de0be7f379")
    .then((response)=>{
        return response.json();
    })
    .then((json)=>{
        console.log(json)
    })


// ### Step 2 - Present some data on your web app
// Your task is to present some data on your web app. Start with:
// - the city name
// - the temperature (rounded to 1 decimal place)
// - and what type of weather it is (the "description" in the JSON)

// ### Step 3 - Features
// Now it's time to start working in GitHub branches. Decide beforehand when you should have a "feature freeze" so that you make time for merging.

// **Feature: Sunrise and sunset 🌅**  
// Show the time for sunrise and sunset in a readable time format (Example: 13:00 or 1 PM). You will have to format the date from milliseconds to a readable format. [Here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date "Here") is a useful resource for how to do this.

// **Feature: Weather forecast 📅**  
// Show a forecast for the next 4 days. You can choose how to display the forecast - perhaps you want to show the min and max temperature for each day, or perhaps you want to show the temperature from the middle of the day, or the humidity, what it feels like and so on.

// ```
// https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=YOUR_API_KEY
// ```

// The API gives us the next 4-5 days but for every third hour. So a good idea could be to only use the weather data from the same time every day. You can filter the forecast list array to only get the info from 12:00 each day for example. 

// Read the [endpoint documentation](https://openweathermap.org/forecast5 "endpoint documentation") for the forecast.

// **Feature: Style it 🎨**  
// Style it to look like one of the provided designs.

// ## Requirements
// - You should fetch data from the API using `fetch()` in JavaScript
// - The app should have: city name, current temperature, weather description, sunrise/sunset time, 4-day forecast
// - The presentation of the data should be in the specified format
// - Make your app responsive (it should look good on devices from 320px width up to 1600px)
// - Follow one of the designs as closely as you can
// - Complete Step 1-2 in the main/master branch, and Step 3 in branches
// - Follow the guidelines on [how to write good code](https://www.notion.so/Guidelines-for-how-to-write-good-code-59abdd4307a24f5ca7914d566326f4df?pvs=4 "how to write good code")

// ## Stretch goals
// So you’ve completed the requirements? Great job! Make sure you've committed and pushed a version of your project before starting on the stretch goals. Remember that the stretch goals are optional.

// ### Intermediate Stretch Goals
// **Feature: Styling warm/cold 🌞❄️**  
// Change the colours of the page based on the weather. If the weather is warm – use warm colours. If the weather is colder, use cold colours. If you really want to push your CSS muscles you can even make a background gradient.

// Another alternative is to include visual indicators for the type of weather, cloudy/sunny/rainy/etc.

// **Feature: More cities 🏙️**  
// Give the user the option to choose between a couple of your favourite cities, or create a searchbar where the user can search for a specific city.

// ### Advanced Stretch Goals
// **Feature: Use your location 🗺️**  
// Use the [Geolocation API](https://www.w3schools.com/html/html5_geolocation.asp "Geolocation API") that is built into your browser to fetch the city that you are located in at the moment and show the weather for your location.

// **Feature: Add more data 💽**  
// Explore the API and use another endpoint of the Weather API to include supplementary information.

// **Feature: CSS Animations**  
// Add some CSS animations to your app, e.g. pulsating sun/raindrops.