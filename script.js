const weatherWrapper = document.getElementById ('weather-wrapper')
const searchBar = document.getElementById ('searchbar')
const forecastWrapper = document.getElementById ('forecast-wrapper')


fetch ('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=d9838d8630b03a974ed368611cffd256')

.then ((response) => {
    return response.json()
})

.then ((data) => {
    console.log (data)

    weatherWrapper.innerHTML += `
    <div id="city-name" class="city-name"><p>${data.name}</p></div>`

    // data.weather.forEach((weatherDescription) => { //.weather comes from the API - it is an object name
    //     weatherWrapper.innerHTML +=
    //     `${weatherDescription.description}`
    // })

    const mainWeather = (data.weather[0].main);
    //console.log(mainWeather)
    const roundedTemp = Math.round(data.main.temp * 10)/10; // this rounds the temperature data to one decimal point. *100)/100 would be two decimal points, etc
    const calcFar = (roundedTemp * 1.8) + 32
    //console.log(calcFar)
    const roundedFar = Math.round(calcFar);
    //console.log(roundedFar)
    //console.log(roundedTemp)

    const feelsLikeC = Math.round(data.main.feels_like * 10)/10;
    //console.log(feelsLikeC)
    const feelsLikeF = Math.round(feelsLikeC * 1.8 + 32)
    // console.log(feelsLikeF)

    const sunriseDateAndTime = new Date(data.sys.sunrise * 1000); //*1000 makes it correct date and time, but don't know why
    const sunrise = sunriseDateAndTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    

    const sunsetDateAndTime = new Date(data.sys.sunset * 1000);
    const sunset = sunsetDateAndTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    weatherWrapper.innerHTML +=
    `<p><span id='weather-description' class= 'weather-description'>${mainWeather}</span> | <span id='main-temp' class='main-temp'>${roundedTemp}°C | ${roundedFar}°F</span></p>
    <p><span id='feels-like' class= 'feels-like'> Feels like: ${feelsLikeC}°C | ${feelsLikeF}°F </span></p>
    <p><span id='sunrise' class= 'sunrise'>Sunrise: ${sunrise}</span><p>
    <p><span id='sunset' class= 'sunset'>Sunset:${sunset}</span><p>
 `  

    //Showing different text depending on the main descritption of the weather
    //.style to apply different styling to the statements

    data.weather.forEach((weatherDescription) => { //.weather comes from the API - it is an object name
    
    if (weatherDescription.main === 'Clear') {
        const gradientClear = 'linear-gradient(#F7E9B9 10%, #FC7200)' // Sets color and direction of gradient
        weatherWrapper.style.background = gradientClear; 
        weatherWrapper.style.color = "#2A5510"; // Color for the text
        weatherWrapper.innerHTML = `
        <div class="clear">
        <img src="./img/sunglasses.svg" alt="sun-glasses icon"></img>
        <p> Get your sunnies on. ${data.name} is looking rather great today.
        </p>
        </div>`;
       
    } 
     else if (weatherDescription.main === 'Clouds') {
     const gradientClouds = 'linear-gradient(#F4F7F8 10%, #BDC4C6)'
        weatherWrapper.style.background = gradientClouds;
        weatherWrapper.style.color = "#F47775";
        weatherWrapper.innerHTML = 
        `<p><span id='weather-description' class= 'weather-description'>${mainWeather}</span> | <span id='main-temp' class='main-temp'>${roundedTemp}°C | ${roundedFar}°F</span></p>
        <p><span id='feels-like' class= 'feels-like'> Feels like: ${feelsLikeC}°C | ${feelsLikeF}°F </span></p>
        <p><span id='sunrise' class= 'sunrise'>Sunrise: ${sunrise}</span><p>
        <p><span id='sunset' class= 'sunset'>Sunset:${sunset}</span><p>        
        <div class="clouds">
        <img src="./img/cloud.svg" alt="cloud icon"></img>
        <p> Light a fire and get cosy. ${data.name} looks grey today.
        </p>
        </div>`;
    }  
    else if (weatherDescription.main === 'Rain' | "Drizzle") {
       const gradientClouds = 'linear-gradient(#164A68 10%, #A3DEF7)'
        weatherWrapper.style.background = gradientClouds;
        weatherWrapper.style.color = "#164A68";
        weatherWrapper.innerHTML = `
        <div class="rain">
        <img src="./img/umbrella.svg" alt="rain icon"></img>
        <p> Don’t forget your umbrella. It’s wet in ${data.name} today.
        </p>
        </div>`;
    } 
    else if (weatherDescription.main === 'Snow') {
        const gradientSnow = 'linear-gradient(#A3DEF7 10%, #F4F7F8)'
        weatherWrapper.style.background = gradientSnow;
        weatherWrapper.style.color = "#AEB6FF";
        weatherWrapper.innerHTML = `
        <div class="snow">
        <img src="./img/snow-01.svg" alt="snow icon"></img>
        <p> Light a fire and get cosy. ${data.name} looks snowy today.
        </p>
        </div>`;
    } 
    else {
        const gradientOther= 'linear-gradient(#000000 10%, #F4F7F8)'
        weatherWrapper.style.background = gradientOther;
        weatherWrapper.style.color = "#F47775";
        weatherWrapper.innerHTML =
        `<div class="other">
        <p> Go to the window and find out! </p>
        </div>`
    }
 
    })

    //const roundedTemp = Math.round(data.main.temp * 10)/10;
    console.log(roundedTemp)
    weatherWrapper.innerHTML +=
    `<div id='main-temp' class='main-temp'><p>${roundedTemp}°C</p></div>`
})


    //Same function as above but changes depending on what you type in the searcbar
    searchbar.addEventListener('change', () => {

    fetch (`https://api.openweathermap.org/data/2.5/weather?q=${searchbar.value}&units=metric&APPID=d9838d8630b03a974ed368611cffd256`)

    .then ((response) => {
    return response.json()
})

.then ((data) => {
    console.log (data)
     searchbar.value = '';

    //Showing different text depending on the main descritption of the weather
    //.style to apply different styling to the statements

    data.weather.forEach((weatherDescription) => { //.weather comes from the API - it is an object name
    
    if (weatherDescription.main === 'Clear') {
        const gradientClear = 'linear-gradient(#F7E9B9 10%, #FC7200)' // Sets color and direction of gradient
        weatherWrapper.style.background = gradientClear;
        weatherWrapper.style.color = "#2A5510"; // Color for the text
        weatherWrapper.innerHTML = `
        <div class="clear">
        <img src="./img/sunglasses.svg" alt="sun-glasses icon"></img>
        <p> Get your sunnies on. ${data.name} is looking rather great today.
        </p>
        </div>`;
       
    } 
     else if (weatherDescription.main === 'Clouds') {
     const gradientClouds = 'linear-gradient(#F4F7F8 10%, #BDC4C6)'
        weatherWrapper.style.background = gradientClouds;
        weatherWrapper.style.color = "#F47775";
        weatherWrapper.innerHTML = `
        <div class="clouds">
        <img src="./img/cloud.svg" alt="cloud icon"></img>
        <p> Light a fire and get cosy. ${data.name} looks grey today.
        </p>
        </div>`;
    }  
    else if (weatherDescription.main === 'Rain' | "Drizzle") {
       const gradientClouds = 'linear-gradient(#164A68 10%, #A3DEF7)'
        weatherWrapper.style.background = gradientClouds;
        weatherWrapper.style.color = "#164A68";
        weatherWrapper.innerHTML = `
        <div class="rain">
        <img src="./img/umbrella.svg" alt="rain icon"></img>
        <p> Don’t forget your umbrella. It’s wet in ${data.name} today.
        </p>
        </div>`;
    } 
    else if (weatherDescription.main === 'Snow') {
        const gradientSnow = 'linear-gradient(#A3DEF7 10%, #F4F7F8)'
        weatherWrapper.style.background = gradientSnow;
        weatherWrapper.style.color = "#AEB6FF";
        weatherWrapper.innerHTML = `
        <div class="snow">
        <img src="./img/snow-01.svg" alt="snow icon"></img>
        <p> Light a fire and get cosy. ${data.name} looks snowy today.
        </p>
        </div>`;
    } 
    else {
        const gradientOther= 'linear-gradient(#000000 10%, #F4F7F8)'
        weatherWrapper.style.background = gradientOther;
        weatherWrapper.style.color = "#F47775";
        weatherWrapper.innerHTML =
        `<div class="other">
        <p> Go to the window and find out! </p>
        </div>`
    }
    })
    const roundedTemp = Math.round(data.main.temp * 10)/10;
    console.log(roundedTemp)
    weatherWrapper.innerHTML +=
    `<div id='main-temp' class='main-temp'><p>${roundedTemp}°C</p></div>`
})
    })

  
const weeklyForecast = () => {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=f2f083df54fd7ea3ed8255ff0ee3d253')
    .then((response) =>{
        return response.json()
    })
    .then((data) => {
        //console.log(data)
        const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00'))
        console.log(filteredForecast)

        const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        filteredForecast.forEach((day) => {
            const eachDate = new Date(day.dt * 1000) //creates a variable for the full date for each item in the filtered array
            //console.log(eachDate)

            const today = new Date(Date.now()) //creates a variable for today's date
            //console.log(today)

            const doTheDaysMatch = eachDate.getDay() === today.getDay(); //getDay returns the number of the weekday 0-6, Sunday-Saturday; this function compares each day's number to today's number
            //console.log(doTheDaysMatch)
            
            let dayName = daysOfTheWeek[eachDate.getDay()] //gets the day of the week in words
            //console.log(dayName)

            let dayTemps = day.main.temp.toFixed(0)
            //console.log(dayTemps)

            let dayFaren = ((dayTemps *1.8) + 32).toFixed(0)
            //console.log(dayFaren)

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

