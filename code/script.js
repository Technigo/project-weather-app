// API Key = b7874ca1c4d00ac10b0c0385176b9111
// API key 2 = 6912cf21e673e1261cfa693ed33d2aa7

const weekdayWrapper = document.getElementById('schedule-weekdays')
const mainWrapper = document.getElementById('main-wrapper')
const skyState = document.getElementById('skyState')
const skyInfo = document.getElementById('skyInfo')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')

const apiUrlSthlm = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=6912cf21e673e1261cfa693ed33d2aa7"


// Current weather 

fetch(apiUrlSthlm)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        const weatherType = `${json.weather[0].main}`
        const currentTemp = `${json.main.temp}` 
        const roundedTemp = Math.round(currentTemp*10)/10 //this rounds the current temp up to 1 decimal
        let sunriseTime = json.sys.sunrise
        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        var date = new Date(sunriseTime * 1000);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();     
        // Will display time in 10:30:23 format
        var formattedTimeSunrise = hours + ':' + minutes.substr(-2)
        
        let sunsetTime = json.sys.sunset
        var date = new Date(sunsetTime * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var formattedTimeSunset = hours + ':' + minutes.substr(-2)

        console.log(roundedTemp)
        skyState.innerHTML =`${json.name} | ${weatherType} | ${roundedTemp}°C`
        sunrise.innerHTML = `Sunrise ${formattedTimeSunrise}`
        sunset.innerHTML = `Sunset ${formattedTimeSunset}`

// Sunny, cluody or rain? change of styling depending on weather

        if (weatherType === "Clouds") {
          document.body.style.backgroundColor = "#F4F7F8";
          document.body.style.color = "#F47775";
         
            mainWrapper.innerHTML = `
              <img class="mainImg" src="./Designs/Design-2/icons/noun_Cloud_1188486.svg" alt="cloudy"/>
              <h1>Light a fire and get cozy. Your city is looking grey today.</h1>
            `
          } else if (weatherType === "Clear") {
            document.body.style.backgroundColor = "#F7E9B9";
            document.body.style.color = "#2A5510";
           
            mainWrapper.innerHTML = `
              <img class="mainImg" src="./Designs/Design-2/icons/noun_Sunglasses_2055147.svg" alt="sunglasses"/>
              <h1>Get your sunnies on. Your city is looking rather great today.</h1>
            `
                    
          } else if (weatherType === "Rain" || "Drizzle" || "Thunderstorm") {
            document.body.style.backgroundColor = "#A3DEF7";
            document.body.style.color = "#164A68";
         
            mainWrapper.innerHTML = `
              <img class="mainImg" src="./Designs/Design-2/icons/noun_Umbrella_2030530.svg" alt="umbrella"/>
              <h1>Don't forget your umbrella. It's wet in your city today.</h1>
            `
          }
         
    })


 // 5-day weather forecast

 fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Swedenn&units=metric&APPID=6912cf21e673e1261cfa693ed33d2aa7')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        console.log('weatherforecast', json) 

        const filteredTemp = json.list.filter(item => item.dt_txt.includes('12:00')) //filters out only the forecast at 12.00 each day
        console.log('filtered temp', filteredTemp)
       
        
        filteredTemp.map((item) => {  //maps out the filtered forecast at 12 for upcoming days
            weekdayName = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
            const date = new Date(item.dt * 1000) // converts the date in json to correct format
            const dayName = weekdayName[date.getDay()] // the getDay() method returns the day of the week for the specified date in weekdayName array to local time, 0 represents Sunday.
            const weatherIcon = item.weather[0].icon  //gets the correct icon from the forecast
            
            weekdayWrapper.innerHTML += `   
            <div class="weekdays" id="weekdayWrapper">  
              <div class="weekday-rows" id="weekdayRows">
                      <p>${dayName}</p>
                    <div class="tempAndIcon">
                      <img class="icons" src="./Designs/Design-2/icons/${weatherIcon}.png"/>
                      <p>${item.main.temp.toFixed(1)} °C</p> 
                      </div> 
                  </div>
              </div>`
          })  //the toFixed() method converts the temp number to a string and rounds the string to only 1 decimal

        })


  

       