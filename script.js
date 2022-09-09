const cityInput = document.getElementById("city-input");
const geo = document.getElementById("geo")
const todaysWeather = document.getElementById("todaysWeather")
const message = document.getElementById("message")
const weatherForecast = document.getElementById("weather-forecast")

//--------DATA FETCH FROM API FOR TODAY'S FORECAST-----------

fetch ('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=399ae731e6b36c8272a3566b6ed57e5c')
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        console.log("it is working",json);
        const date = new Date(json.dt * 1000); //Today's date fetch
            const dateShort = date.toLocaleDateString([], {dateStyle: 'long'}); //changed the date format
        const temperature = (json.main.temp.toFixed(1)) //temprature from API
        const cloudsCoverage = (json.clouds.all)
        const weather = (json.weather[0].main) //variable to use in dailyMessage
                console.log("weather today", weather) //only for DEV purposes
                
        const sunrise = new Date(json.sys.sunrise * 1000); //declare the sunrise time from API
            const sunriseShort = sunrise.toLocaleTimeString([], {timeStyle: 'short'}) //change the sunrise format for hh:mm
        const sunset = new Date(json.sys.sunset * 1000); //declare the sunrise time from API
            const sunsetShort = sunset.toLocaleTimeString([], {timeStyle: 'short'}) //change the sunset format for hh:mm
        
        todaysWeather.innerHTML = `
            <h1 class = "date"> ${dateShort}<h1>
            <p class = "temperature">Temp: ${temperature}°C | clouds coverage ${cloudsCoverage} % </p>
            <p class = "sunrise"> Sunrise: ${sunriseShort} </p>
            <p class = "sunset"> Sunset: ${sunsetShort} </p>
            `;
                    /*only for development purposes
                    console.log("sunrise time:" , sunrise) 
                    console.log("sunset time", sunset)*/
        const dailyMessage = () => {
            if(weather === "Clear") {
                icon.src = "./Designs/Design-2/icons/noun_Sunglasses_2055147.svg"
                message.innerHTML =  `
                    <h1> Get your sunnies on. Stockholm is looking rather great today! </h1>
            `}
            else if (weather === "Rain") {
                icon.src = "./Designs/Design-2/icons/noun_Umbrella_2030530.svg"
                message.innerHTML = `
                    <h2> Don't forger your umbrella! Stockholm is wet today! </h2>`;
            }
            else {
                icon.src = "./Designs/Design-2/icons/noun_Cloud_1188486.svg"
                message.innerHTML =  `
                    <h2> Light a fire and get cosy. Stockholm is looking great today. </h2>`
            }
            //console.log("message", dailyMessage)
        }
         dailyMessage()
    })



//dailyMessage()

 