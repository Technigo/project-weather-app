const cityInput = document.getElementById("city-input");
const geo = document.getElementById("geo")
const todaysWeather = document.getElementById("todaysWeather")
const message = document.getElementById("message")
const weatherForecast = document.getElementById("weather-forecast")
const searchDisplay = document.getElementById("search-display");
const cityName = document.getElementById("city-name");
const searchBtn = document.getElementById("search-button");
const bodyContainer = document.querySelector(".body-container");

 //trying fetch to see if connection between HTML is working, we can choose another API later
//--------DATA FETCH FROM API FOR TODAY'S FORECAST-----------

fetch ('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=399ae731e6b36c8272a3566b6ed57e5c')
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        console.log(json);
 
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
            message.innerHTML =  `<h1> Get your sunnies on. Stockholm is looking rather great today! </h1>`
            bodyContainer.classList.add("clear");
        }
        else if (weather === "Rain") {
            icon.src = "./Designs/Design-2/icons/noun_Umbrella_2030530.svg"
            message.innerHTML = `<h1> Don't forget your umbrella! Stockholm is wet today! </h1>`
            bodyContainer.classList.add('rain');
        } else {
            icon.src = "./Designs/Design-2/icons/noun_Cloud_1188486.svg"
            message.innerHTML =  `<h1> Light a fire and get cosy. Stockholm is looking grey today. </h1>`
            bodyContainer.classList.add('clouds');
        } 
        //console.log("message", dailyMessage)
    }
     dailyMessage()
});



/*----- dynamic city input TO CHECK------
//the city name + error display when input a city name 
   const citySearch = (event)=> {
    console.log(event);
    fetch("https://api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&limit={limit}&appid=399ae731e6b36c8272a3566b6ed57e5c")
    .then(response => {
        if(response.status == 200) {
            return response.json();
        } else {
            alert("please enter a solid city name");
        }
    })
        .then(readableResponse=> {
            cityName.innerHTML = `City: ${readableResponse.city.name}`;   
            //here can add the main information, make it dynamic
        });
        console.log("Stockholm weather",readableResponse);
    }; 

    citySearch();*/




   //display week forecast for the chosen city, in this case Stockholm
        //here fetching forecast 
        fetch ('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=399ae731e6b36c8272a3566b6ed57e5c')
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            console.log("json forecast",json);
            //filter out object only with updates at 12:00
            const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'));
            console.log("filtered forecast",filteredForecast);

            filteredForecast.forEach(day => {      
                const date = new Date(day.dt * 1000);
                let dayName = date.toLocaleDateString("en-US", {weekday:"short"});
                    
                weatherForecast.innerHTML +=`
                    <div class="daily-display">
                        <p>${dayName} </p>
                        <p>${day.main.temp.toFixed(1)}°</p>
                    </div>
                `;
                console.log("date", filteredForecast)
                
               });

  
    })

    //searchBtn.addEventListener("click", 
