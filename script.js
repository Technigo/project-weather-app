const cityInput = document.getElementById("city-input");
const geo = document.getElementById("geo")
const todaysWeather = document.getElementById("todaysWeather")
const message = document.getElementById("message")
const weatherForecast = document.getElementById("weather-forecast")

//trying fetch to see if connection between HTML is working, we can choose another API later
fetch ('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=399ae731e6b36c8272a3566b6ed57e5c')
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        console.log("it is working",json);
        const date = new Date(json.dt * 1000); //Today's date fetch
            const dateShort = date.toLocaleDateString([], {dateStyle: 'long'}); //changed the date format
                //console.log("date today is: ", date) //only for DEV control
        const temperature = (json.main.temp.toFixed(1))
        const cloudsCoverage = (json.clouds.all)
                //console.log("temperature", temperature)// only for DEV purposes
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
            if(cloudsCoverage < 30) {
            message.innerHTML += `
            <h1> Get your sunnies on. Stockholm is looking rather great today! </h1>
            `}
            else {
            message.innerHTML += `
            <h2> Don't forger your umbrella! Stockholm is wet today! </h2>`
        //console.log("message", dailyMessage)}
        
        }
         dailyMessage()
    })



//dailyMessage()

 