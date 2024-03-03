//Step 1 - Get started with the weather API
fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=bb3a8ca602b6560b4bf988de0be7f379")
    .then((response)=>{
        return response.json();
    })
    .then((json)=>{
        console.log(json)
    })


// ### Step 2 - Present some data on your web app
const todayWeather = document.getElementById("todayWeather");
const allWeather = document.getElementById("allWeather");

todayWeather.innerHTML +=`
<img src="" id="logo" alt="logo">
<section class="text">
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

const weatherData={
    sunny:'design/design1/assets/sun.svg',
    moon:'design/design1/assets/moon.svg',
    clear:'design/design1/assets/Group36.png',
    cloudSun:'design/design1/assets/Group34.png',
    cloud:'design/design1/assets/Group16.png'
}

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
        temp.innerHTML = Math.round(json.main.temp)+"°C";
        const description = json.weather[0].description;
        clear.innerHTML = description[0].toUpperCase() + description.substring(1)
        
        //Show the time for sunrise and sunset in a readable time format
        let sunRiseDate = new Date(json.sys.sunrise * 1000)
        let sunRiseTime = sunRiseDate.getHours() + ":" +sunRiseDate.getMinutes() 
        sunrise.innerHTML =`sunrise: `+ sunRiseTime

        let sunSetDate = new Date(json.sys.sunset * 1000)
        let sunSetTime = sunSetDate.getHours() + ":" +sunSetDate.getMinutes()
        sunset.innerHTML =`sunset: `+sunSetTime

        //show image of the weather condition
        function showSunMoon(){
            const imgElement=document.getElementById("logo");
            const timeNow=Date.now();
            if(timeNow<sunSetDate&&timeNow>=sunRiseDate){
                imgElement.src=weatherData.sunny
            } else{
                imgElement.src=weatherData.moon
            }    
        }
        showSunMoon()
    })
}
ShowTodayWeather()

// ### Step 3 - Features
// Now it's time to start working in GitHub branches. Decide beforehand when you should have a "feature freeze" so that you make time for merging.

//I commited before starting with the branches so only the step of weather-icon which was worked in branch.

// **Feature: Weather forecast 📅**  
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

            // Initial value from first item of the array
            let previousDay = -1
            let minTempPerDay = 1000
            let maxTempPerDay = -1000
            let myTempArray = []
            const timeNow=new Date()
            let currentHour =timeNow.getHours()
            console.log(currentHour)

            array.forEach(el => {
                const myDate = new Date(el.dt * 1000) 
                const myDay = myDate.getDay()
                const myHour = myDate.getHours()
                const minTemp = Math.round(el.main.temp_min)
                const maxTemp = Math.round(el.main.temp_max)
                const weatherDescription = el.weather[0]?.description
                const weatherIcon = el.weather[0]?.icon
                
                // Set the min and max temp for each day
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

                // If the data hour matches current hour, set the weather icon for each day
                if (currentHour === myHour || currentHour === myHour + 1 || currentHour === myHour - 1) {
                    const foundItem = myTempArray.find(i => i.day === myDay)
                    foundItem.weather_description = weatherDescription
                    foundItem.weather_icon = weatherIcon
                }
            })

            myTempArray.forEach(row => {
                allWeather.innerHTML+=`
                <div id="dayWeather">
                    <div id="myDay">${dayNames[row.day]}</div>
                    <img src="design/design1/assets/${row.weather_icon}.png" id="mySymbol" alt="weather condition">  
                    <div id="myTemp">${row.min_temp} °C / ${row.max_temp} °C </div>   
                </div>                  
            `  
            })
        }
        predictWeather();
    })


//TODO
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