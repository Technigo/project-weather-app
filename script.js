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
// - theame
// - the temperature city n (rounded to 1 decimal place)
// - and what type of weather it is (the "description" in the JSON)


const todayWeather = document.getElementById("todayWeather");
const allWeather = document.getElementById("allWeather");

todayWeather.innerHTML +=`
<section class="menu"></section>
<img src="" id="logo" alt="logo">
<section>
    <h1 class="temp" id="temp"></h1>
    <h3 class="location" id="location"></h3>
    <p class="clear" id="clear"></p>
    <section id="sunTime">
        <p class="sunrise" id="sunrise"></p>
        <p class="sunset" id="sunset"></p>
    </section>
    <section class="arrow" id="arrow"></section>
</section>
`

const ShowTodayWeather =()=>{
    fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=bb3a8ca602b6560b4bf988de0be7f379")
    .then((response)=>{
        return response.json();
    })
    .then((json)=>{
        const location = document.getElementById("location")
        const temp = document.getElementById("temp")
        const clear = document.getElementById("clear")
        const sunrise = document.getElementById("sunrise")
        const sunset = document.getElementById("sunset")
       
        location.innerHTML = json.name
        temp.innerHTML = parseInt(json.main.temp)+"°C";
        clear.innerHTML = json.weather[0].main

        //Show the time for sunrise and sunset in a readable time format
        let sunRiseDate = new Date(json.sys.sunrise * 1000)
        let sunRiseTime = sunRiseDate.getHours() + ":" +sunRiseDate.getMinutes() 
        sunrise.innerHTML =`sunrise: `+ sunRiseTime

        let sunSetDate = new Date(json.sys.sunset * 1000)
        let sunSetTime = sunSetDate.getHours() + ":" +sunSetDate.getMinutes()
        sunset.innerHTML =`sunset: `+sunSetTime
    })
}
ShowTodayWeather()

// ### Step 3 - Features
// Now it's time to start working in GitHub branches. Decide beforehand when you should have a "feature freeze" so that you make time for merging.



// **Feature: Weather forecast 📅**  
// Show a forecast for the next 4 days. You can choose how to display the forecast - perhaps you want to show the min and max temperature for each day, or perhaps you want to show the temperature from the middle of the day, or the humidity, what it feels like and so on.
const dayNames=['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']

fetch("https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=bb3a8ca602b6560b4bf988de0be7f379")
    .then((response)=>{        
        return response.json();
    })
    .then((json)=>{
        console.log(json)
        //weather forecast function
        const predictWeather=()=>{
            allWeather.innerHTML = ``
            let array = json.list
            console.log(array)
            // Initial value from first item of the array
            let previousDay = -1
            let minTempPerDay = 1000
            let maxTempPerDay = -1000
            // Result
            // An example: 
            // type MyTempArray = [
            // {
            //    day: 0,
            //    min_temp: 3.6,
            //    max_temp: 8.2,
            //    weather: 'cloud'
            // },
            // {
            //    day: 1,
            //    min_temp: 2.6,
            //    max_temp: 9.9,
            //    weather: 'sun'
            // }
            // ]
            let myTempArray = []

            
            array.forEach(el => {
                const myDate = new Date(el.dt * 1000)
                const myDay = myDate.getDay()
                const minTemp = el.main.temp_min
                const maxTemp = el.main.temp_max
                if(myDay!==previousDay){
                    minTempPerDay = minTemp
                    maxTempPerDay = maxTemp
                    const item = {
                        day: myDay,
                        min_temp: minTemp,
                        max_temp: maxTemp
                    }
                    myTempArray.push(item)
                    previousDay = myDay              
                } else {
                    // Compare the new minTemp with the minTempPerDay
                    if (minTemp < minTempPerDay){
                        minTempPerDay = minTemp

                        const foundItem = myTempArray.find(i => i.day === myDay)
                        foundItem.min_temp = minTemp
                    } 
                    if(maxTemp > maxTempPerDay){
                        maxTempPerDay = maxTemp

                        const foundItem = myTempArray.find(i => i.day === myDay)
                        foundItem.max_temp = maxTemp

                    }
                    
                } 
            })

            console.log(myTempArray)

            myTempArray.forEach(row => {
                allWeather.innerHTML+=`
                <div id="dayWeather">
                    <div id="myDay">${dayNames[row.day]}</div>
                    <div id="mySymbol">${row.weather}</div>   
                    <div id="myTemp">${row.min_temp} °C / ${row.max_temp} °C </div>   
                </div>                  
            `  

            }

            )

                
            

            

        }
        predictWeather();
    })
            
        








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