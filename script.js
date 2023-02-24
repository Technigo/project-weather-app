const weatherWrapper = document.getElementById ('weather-wrapper')
const searchBar = document.getElementById ('searchbar')
const forecastWrapper = document.getElementById ('forecast-wrapper')
const body = document.getElementById ('body')


fetch ('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=d9838d8630b03a974ed368611cffd256')

.then ((response) => {
    return response.json()
})

.then ((data) => {
    
    weatherWrapper.innerHTML += `
    <div id="city-name" class="city-name"><p>${data.name}</p></div>`

    const mainWeather = (data.weather[0].main);
    
    const roundedTemp = Math.round(data.main.temp * 10)/10; // this rounds the temperature data to one decimal point. *100)/100 would be two decimal points, etc
    const calcFar = (roundedTemp * 1.8) + 32
    
    const roundedFar = Math.round(calcFar);
   
    const feelsLikeC = Math.round(data.main.feels_like * 10)/10;
   
    const feelsLikeF = Math.round(feelsLikeC * 1.8 + 32)
 
    const sunriseDateAndTime = new Date(data.sys.sunrise * 1000); //*1000 makes it correct date and time, but don't know why
    const sunrise = sunriseDateAndTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    
    const sunsetDateAndTime = new Date(data.sys.sunset * 1000);
    const sunset = sunsetDateAndTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    weatherWrapper.innerHTML +=
    `<p><span id='weather-description' class= 'weather-description'>${mainWeather}</span> | <span id='main-temp' class='main-temp'>${roundedTemp}°C | ${roundedFar}°F</span></p>
    <p><span id='feels-like' class= 'feels-like'> Feels like: ${feelsLikeC}°C | ${feelsLikeF}°F </span></p>
    <p><span id='sunrise' class= 'sunrise'>Sunrise: ${sunrise}</span><p>
    <p><span id='sunset' class= 'sunset'>Sunset: ${sunset}</span><p>
 `  

    //Showing different text depending on the main descritption of the weather
    //.style to apply different styling to the statements

    data.weather.forEach((weatherDescription) => { //.weather comes from the API - it is an object name
    
    if (weatherDescription.main === 'Clear') {
        const gradientClear = 'linear-gradient(#F7E9B9, #FC7200)' // Sets color and direction of gradient
        weatherWrapper.style.background = gradientClear; 
        weatherWrapper.style.color = "#2A5510"; // Color for the text
        weatherWrapper.innerHTML = `
        <p><span id='weather-description' class= 'weather-description'>${mainWeather}</span> | <span id='main-temp' class='main-temp'>${roundedTemp}°C | ${roundedFar}°F</span></p>
        <p><span id='feels-like' class= 'feels-like'> Feels like: ${feelsLikeC}°C | ${feelsLikeF}°F </span></p>
        <p><span id='sunrise' class= 'sunrise'>Sunrise: ${sunrise}</span></p>
        <p><span id='sunset' class= 'sunset'>Sunset: ${sunset}</span></p>      
        <div class="clear">
        <img src="./img/sunglasses.svg" alt="sun-glasses icon"></img>
        <p> Get your sunnies on. ${data.name} is looking rather great today.
        </p>
        </div>`;
       
    } 
     else if (weatherDescription.main === 'Clouds') {
     const gradientClouds = 'linear-gradient(#F4F7F8, #BDC4C6)'
        body.style.background = gradientClouds;
        body.style.color = "#F47775";
        weatherWrapper.innerHTML = 
        `<p><span id='weather-description' class= 'weather-description'>${mainWeather}</span> | <span id='main-temp' class='main-temp'>${roundedTemp}°C | ${roundedFar}°F</span></p>
        <p><span id='feels-like' class= 'feels-like'> Feels like: ${feelsLikeC}°C | ${feelsLikeF}°F </span></p>
        <p><span id='sunrise' class= 'sunrise'>Sunrise: ${sunrise}</span></p>
        <p><span id='sunset' class= 'sunset'>Sunset: ${sunset}</span></p>        
        <div class="clouds">
        <img src="./img/cloud.svg" alt="cloud icon"></img>
        <p> Light a fire and get cosy. ${data.name} looks grey today.
        </p>
        </div>`;
    }  
    else if (weatherDescription.main === 'Rain' | "Drizzle") {
       const gradientClouds = 'linear-gradient(#447791, #A3DEF7)'
        body.style.background = gradientClouds;
        body.style.color = "#164A68";
        weatherWrapper.innerHTML = `
        <p><span id='weather-description' class= 'weather-description'>${mainWeather}</span> | <span id='main-temp' class='main-temp'>${roundedTemp}°C | ${roundedFar}°F</span></p>
        <p><span id='feels-like' class= 'feels-like'> Feels like: ${feelsLikeC}°C | ${feelsLikeF}°F </span></p>
        <p><span id='sunrise' class= 'sunrise'>Sunrise: ${sunrise}</span></p>
        <p><span id='sunset' class= 'sunset'>Sunset: ${sunset}</span></p>      
        <div class="rain">
        <img src="./img/umbrella.svg" alt="rain icon"></img>
        <p> Don’t forget your umbrella. It’s wet in ${data.name} today.
        </p>
        </div>`;
    } 
    else if (weatherDescription.main === 'Snow') {
        const gradientSnow = 'linear-gradient(#E9F8FF, #F4F7F8)'
        body.style.background = gradientSnow;
        body.style.color = "#AEB6FF";
        weatherWrapper.innerHTML = `
        <p><span id='weather-description' class= 'weather-description'>${mainWeather}</span> | <span id='main-temp' class='main-temp'>${roundedTemp}°C | ${roundedFar}°F</span></p>
        <p><span id='feels-like' class= 'feels-like'> Feels like: ${feelsLikeC}°C | ${feelsLikeF}°F </span></p>
        <p><span id='sunrise' class= 'sunrise'>Sunrise: ${sunrise}</span></p>
        <p><span id='sunset' class= 'sunset'>Sunset: ${sunset}</span></p>      
        <div class="snow">
        <img src="./img/snow-01.svg" alt="snow icon"></img>
        <p> Light a fire and get cosy. ${data.name} looks snowy today.
        </p>
        </div>`;
    } 
    else {
        const gradientOther= 'linear-gradient(#000000, #F4F7F8)'
        body.style.background = gradientOther;
        body.style.color = "#F47775";
        weatherWrapper.innerHTML =
        `<p><span id='weather-description' class= 'weather-description'>${mainWeather}</span> | <span id='main-temp' class='main-temp'>${roundedTemp}°C | ${roundedFar}°F</span></p>
        <p><span id='feels-like' class= 'feels-like'> Feels like: ${feelsLikeC}°C | ${feelsLikeF}°F </span></p>
        <p><span id='sunrise' class= 'sunrise'>Sunrise: ${sunrise}</span></p>
        <p><span id='sunset' class= 'sunset'>Sunset: ${sunset}</span></p>      
        <div class="other">
        <p> Go to the window and find out! </p>
        </div>`
    }
 
    })

   
})


    //Same function as above but changes depending on what you type in the searcbar
    searchBar.addEventListener('change', () => {

    fetch (`https://api.openweathermap.org/data/2.5/weather?q=${searchbar.value}&units=metric&APPID=d9838d8630b03a974ed368611cffd256`)

    .then ((response) => {
    return response.json()
})

.then ((data) => {
     searchbar.value = '';

    //Showing different text depending on the main descritption of the weather
    //.style to apply different styling to the statements

    weatherWrapper.innerHTML += `
    <div id="city-name" class="city-name"><p>${data.name}</p></div>`

    const mainWeather = (data.weather[0].main);
   
    const roundedTemp = Math.round(data.main.temp * 10)/10; // this rounds the temperature data to one decimal point. *100)/100 would be two decimal points, etc
    const calcFar = (roundedTemp * 1.8) + 32
   
    const roundedFar = Math.round(calcFar);
    
    const feelsLikeC = Math.round(data.main.feels_like * 10)/10;
    
    const feelsLikeF = Math.round(feelsLikeC * 1.8 + 32)
    
    const sunriseDateAndTime = new Date(data.sys.sunrise * 1000); //*1000 makes it correct date and time, but don't know why
    const sunrise = sunriseDateAndTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    
    const sunsetDateAndTime = new Date(data.sys.sunset * 1000);
    const sunset = sunsetDateAndTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    weatherWrapper.innerHTML +=
    `<p><span id='weather-description' class= 'weather-description'>${mainWeather}</span> | <span id='main-temp' class='main-temp'>${roundedTemp}°C | ${roundedFar}°F</span></p>
    <p><span id='feels-like' class= 'feels-like'> Feels like: ${feelsLikeC}°C | ${feelsLikeF}°F </span></p>
    <p><span id='sunrise' class= 'sunrise'>Sunrise: ${sunrise}</span><p>
    <p><span id='sunset' class= 'sunset'>Sunset: ${sunset}</span><p>`



    data.weather.forEach((weatherDescription) => { //.weather comes from the API - it is an object name
    
    if (weatherDescription.main === 'Clear') {
        const gradientClear = 'linear-gradient(#F7E9B9, #FC7200)' // Sets color and direction of gradient
        body.style.background = gradientClear;
        body.style.color = "#2A5510"; // Color for the text
        weatherWrapper.innerHTML = `
        <p><span id='weather-description' class= 'weather-description'>${mainWeather}</span> | <span id='main-temp' class='main-temp'>${roundedTemp}°C | ${roundedFar}°F</span></p>
        <p><span id='feels-like' class= 'feels-like'> Feels like: ${feelsLikeC}°C | ${feelsLikeF}°F </span></p>
        <p><span id='sunrise' class= 'sunrise'>Sunrise: ${sunrise}</span></p>
        <p><span id='sunset' class= 'sunset'>Sunset: ${sunset}</span></p>      
        <div class="clear">
        <img src="./img/sunglasses.svg" alt="sun-glasses icon"></img>
        <p> Get your sunnies on. ${data.name} is looking rather great today.
        </p>
        </div>`;
       
    } 
     else if (weatherDescription.main === 'Clouds') {
     const gradientClouds = 'linear-gradient(#F4F7F8, #BDC4C6)'
        body.style.background = gradientClouds;
        body.style.color = "#F47775";
        weatherWrapper.innerHTML = `
        <p><span id='weather-description' class= 'weather-description'>${mainWeather}</span> | <span id='main-temp' class='main-temp'>${roundedTemp}°C | ${roundedFar}°F</span></p>
        <p><span id='feels-like' class= 'feels-like'> Feels like: ${feelsLikeC}°C | ${feelsLikeF}°F </span></p>
        <p><span id='sunrise' class= 'sunrise'>Sunrise: ${sunrise}</span></p>
        <p><span id='sunset' class= 'sunset'>Sunset: ${sunset}</span></p>
        <div class="clouds">
        <img src="./img/cloud.svg" alt="cloud icon"></img>
        <p> Light a fire and get cosy. ${data.name} looks grey today.
        </p>
        </div>`;
    }  
    else if (weatherDescription.main === 'Rain' | "Drizzle") {
       const gradientClouds = 'linear-gradient(#447791, #A3DEF7)'
        body.style.background = gradientClouds;
        body.style.color = "#164A68";
        weatherWrapper.innerHTML = `
        <p><span id='weather-description' class= 'weather-description'>${mainWeather}</span> | <span id='main-temp' class='main-temp'>${roundedTemp}°C | ${roundedFar}°F</span></p>
        <p><span id='feels-like' class= 'feels-like'> Feels like: ${feelsLikeC}°C | ${feelsLikeF}°F </span></p>
        <p><span id='sunrise' class= 'sunrise'>Sunrise: ${sunrise}</span></p>
        <p><span id='sunset' class= 'sunset'>Sunset: ${sunset}</span></p>      
        <div class="rain">
        <img src="./img/umbrella.svg" alt="rain icon"></img>
        <p> Don’t forget your umbrella. It’s wet in ${data.name} today.
        </p>
        </div>`;
    } 
    else if (weatherDescription.main === 'Snow') {
        const gradientSnow = 'linear-gradient(#E9F8FF, #F4F7F8)'
        body.style.background = gradientSnow;
        body.style.color = "#AEB6FF";
        weatherWrapper.innerHTML = `
        <p><span id='weather-description' class= 'weather-description'>${mainWeather}</span> | <span id='main-temp' class='main-temp'>${roundedTemp}°C | ${roundedFar}°F</span></p>
        <p><span id='feels-like' class= 'feels-like'> Feels like: ${feelsLikeC}°C | ${feelsLikeF}°F </span></p>
        <p><span id='sunrise' class= 'sunrise'>Sunrise: ${sunrise}</span></p>
        <p><span id='sunset' class= 'sunset'>Sunset: ${sunset}</span></p>      
        <div class="snow">
        <img src="./img/snow-01.svg" alt="snow icon"></img>
        <p> Light a fire and get cosy. ${data.name} looks snowy today.
        </p>
        </div>`;
    } 
    else {
        const gradientOther= 'linear-gradient(#000000 10%, #F4F7F8)'
        body.style.background = gradientOther;
        body.style.color = "#F47775";
        weatherWrapper.innerHTML =
        `<p><span id='weather-description' class= 'weather-description'>${mainWeather}</span> | <span id='main-temp' class='main-temp'>${roundedTemp}°C | ${roundedFar}°F</span></p>
        <p><span id='feels-like' class= 'feels-like'> Feels like: ${feelsLikeC}°C | ${feelsLikeF}°F </span></p>
        <p><span id='sunrise' class= 'sunrise'>Sunrise: ${sunrise}</span></p>
        <p><span id='sunset' class= 'sunset'>Sunset: ${sunset}</span></p>      
        <div class="other">
        <p> Go to the window and find out! </p>
        </div>`
    }
    })
   
})
    })

  
const weeklyForecast = () => {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=f2f083df54fd7ea3ed8255ff0ee3d253')
    .then((response) =>{
        return response.json()
    })
    .then((data) => {
       
        const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00'))
        
        const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        filteredForecast.forEach((day) => {
            const eachDate = new Date(day.dt * 1000) //creates a variable for the full date for each item in the filtered array
            
            const today = new Date(Date.now()) //creates a variable for today's date
           
            const doTheDaysMatch = eachDate.getDay() === today.getDay(); //getDay returns the number of the weekday 0-6, Sunday-Saturday; this function compares each day's number to today's number
                        
            let dayName = daysOfTheWeek[eachDate.getDay()] //gets the day of the week in words
            
            let dayTemps = day.main.temp.toFixed(0)
           
            let dayFaren = ((dayTemps *1.8) + 32).toFixed(0)
           
            if(!doTheDaysMatch){ //prints the forecast as long as the date/day doesn't match today
                forecastWrapper.innerHTML += 
                `<div class="day-of-week" id="day-of-week">${dayName}</div>
                <div class="temp-of-day" id="temp-of-day">${dayTemps}°C | ${dayFaren}°F</div>
                ` 
              }
        })

    })
}

weeklyForecast();

searchBar.addEventListener('change', () => {

    fetch (`https://api.openweathermap.org/data/2.5/forecast?q=${searchBar.value}&units=metric&APPID=f2f083df54fd7ea3ed8255ff0ee3d253`)
    .then ((response) => {
    return response.json()
    })
    .then((data) => {
        const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00'))
               
        forecastWrapper.innerHTML = '' 

        const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        filteredForecast.forEach((day) => {
            const eachDate = new Date(day.dt * 1000) //creates a variable for the full date for each item in the filtered array
            
            const today = new Date(Date.now()) //creates a variable for today's date
           
            const doTheDaysMatch = eachDate.getDay() === today.getDay(); //getDay returns the number of the weekday 0-6, Sunday-Saturday; this function compares each day's number to today's number
                        
            let dayName = daysOfTheWeek[eachDate.getDay()] //gets the day of the week in words
            
            let dayTemps = day.main.temp.toFixed(0)
            
            let dayFaren = ((dayTemps *1.8) + 32).toFixed(0)
            
            if(!doTheDaysMatch){ //prints the forecast as long as the date/day doesn't match today
                 forecastWrapper.innerHTML += 
                `<div class="day-of-week" id="day-of-week">${dayName}</div>
                <div class="temp-of-day" id="temp-of-day">${dayTemps}°C | ${dayFaren}°F</div>
                ` 
              }
        })

    })
});