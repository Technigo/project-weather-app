// Present some data on the web app
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
    moon:'design/design1/assets/moon.svg'
}

const ShowTodayWeather =(city)=>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=bb3a8ca602b6560b4bf988de0be7f379`)
    .then((response)=>{
        return response.json();
    })
    .then((json)=>{
        const location = document.getElementById("location")
        const temp = document.getElementById("temp")
        const clear = document.getElementById("clear")
        const sunrise = document.getElementById("sunrise")
        const sunset = document.getElementById("sunset")
        console.log(json)
        
        if(json.cod!=='404'){
            location.innerHTML = json.name
            const tempRound = json.main.temp;
            temp.innerHTML =Math.round(tempRound*10)/10+"°C";
            const description = json.weather[0].description;
            clear.innerHTML = description[0].toUpperCase() + description.substring(1)
            
            //Show the time for sunrise and sunset in a readable time format
            const timezoneSeconds = json.timezone
            let sunRiseCetDate = new Date(json.sys.sunrise * 1000)
            let sunSetCetDate = new Date(json.sys.sunset * 1000)

            // Get the difference in ms btw CET and GMT to get the utc date
            const sunRiseCetOffset = sunRiseCetDate.getTimezoneOffset() * 60000
            const sunSetCetOffset= sunSetCetDate.getTimezoneOffset() * 60000
            // Get the utc date
            sunRiseDate = new Date(json.sys.sunrise * 1000 + sunRiseCetOffset)
            sunSetDate = new Date(json.sys.sunset * 1000 + sunSetCetOffset)

            // Get the target city's date based on utc date + timezone differences in seconds
            sunRiseDate.setSeconds(sunRiseDate.getSeconds()+timezoneSeconds)
            let sunRiseTime = sunRiseDate.getHours() + ":" +sunRiseDate.getMinutes()
            sunrise.innerHTML =`sunrise: `+ sunRiseTime

            
            sunSetDate.setSeconds(sunSetDate.getSeconds()+timezoneSeconds)
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
        } else {
            location.innerHTML = json.message + "<br>Please enter a valid city name"
            temp.innerHTML=" "
            clear.innerHTML=' '
            sunset.innerHTML =' '
            sunrise.innerHTML =' '
            const imgElement=document.getElementById("logo");
            imgElement.style.display = "none"
        
        }
    })
}
ShowTodayWeather('Stockholm')

// ### Step 3 - Features
//I commited before starting with the branches so only the step of weather-icon which was worked in branch.

// **Feature: Weather forecast 📅**  
const dayNames=['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']

//weather forecast function
const predictWeather=(city)=>{
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=bb3a8ca602b6560b4bf988de0be7f379`)
    .then((response)=>{        
        return response.json();
    })
    .then((json)=>{
        console.log(json)

        
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
            
                console.log(myHour)
                
                // Set the min and max temp for each day
                if(myDay!==previousDay){
                    minTempPerDay = minTemp
                    maxTempPerDay = maxTemp
                    const item = {
                        day: myDay,
                        weather_icon: weatherIcon,
                        weather_description: weatherDescription,
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
                    if(foundItem.weather_icon === '01n'||foundItem.weather_icon=== '02n' ||foundItem.weather_icon=== '01d' || foundItem.weather_icon=== '02d' ){
                        foundItem.weather_icon = foundItem.weather_icon
                    } else {
                        foundItem.weather_icon = '03n'
                    }
                }
            })
            
            console.log(myTempArray)
            myTempArray.splice(0,1)
            if (myTempArray.length ===4){
                myTempArray.forEach(row => {
                    allWeather.innerHTML+=`
                    <div id="dayWeather">
                        <div id="myDay">${dayNames[row.day]}</div>
                        <img src="design/design1/assets/${row.weather_icon}.png" id="mySymbol" alt="weather condition">  
                        <div id="myTemp">${row.min_temp} °C / ${row.max_temp} °C </div>   
                    </div>                  
                ` 
                }) 
            } else if(myTempArray.length ===5){
                myTempArray.slice(0,-1).forEach(row => {
                    allWeather.innerHTML+=`
                    <div id="dayWeather">
                        <div id="myDay">${dayNames[row.day]}</div>
                        <img src="design/design1/assets/${row.weather_icon}.png" id="mySymbol" alt="weather condition">  
                        <div id="myTemp">${row.min_temp} °C / ${row.max_temp} °C </div>   
                    </div>                  
                ` 
                })
            }

    })
}

predictWeather('Stockholm');
            
        
//TODO
// ### Intermediate Stretch Goals
// **Feature: Styling warm/cold 🌞❄️**  
// Change the colours of the page based on the weather. If the weather is warm – use warm colours. If the weather is colder, use cold colours. If you really want to push your CSS muscles you can even make a background gradient.

// Another alternative is to include visual indicators for the type of weather, cloudy/sunny/rainy/etc.

// **Feature: More cities 🏙️**  
// Give the user the option to choose between a couple of your favourite cities, or create a searchbar where the user can search for a specific city.
//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=bb3a8ca602b6560b4bf988de0be7f379

 userSearch.innerHTML  +=`
    <input type="text" id="userInput" placeholder="
    Search your city">
    <button id="userButton">GO</button>
`

const searchCity=()=>{
    let userInput = document.getElementById("userInput");
    document.getElementById("userButton").addEventListener("click",(event)=>{
        const cityInput = userInput.value.trim().toUpperCase();

        if (/^[a-zA-Z\s-]+$/.test(cityInput)){
            ShowTodayWeather(cityInput)
            predictWeather(cityInput)
            console.log(cityInput)
        } else {
            console.log("Please enter a valid city name.")
        }
    })
} 
searchCity()






// ### Advanced Stretch Goals
// **Feature: Use your location 🗺️**  
// Use the [Geolocation API](https://www.w3schools.com/html/html5_geolocation.asp "Geolocation API") that is built into your browser to fetch the city that you are located in at the moment and show the weather for your location.

// **Feature: Add more data 💽**  
// Explore the API and use another endpoint of the Weather API to include supplementary information.

// **Feature: CSS Animations**  
// Add some CSS animations to your app, e.g. pulsating sun/raindrops.