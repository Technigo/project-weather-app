const searchBar = document.getElementById('searchBar')
const forecastTable = document.getElementById('forecast-table');
const weatherHeader = document.getElementById("weatherHeader");
const middleSection = document.getElementById ("middleSection");

//const API_WEATHER = `https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=${cod}`


//url where we can choose position

//global variables
let defaultCity = "Stockholm";
const maxDayDisplay = 7;
const cod = "7309e4a5829fafe809df835ad95f18ea"


const WeatherData = () => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=${cod}`)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      // Setting basic information on the app and rounded numbers to first decimal.
      
      const sunriseStart = new Date (json.sys.sunrise*1000);
      const sunsetStart = new Date (json.sys.sunset*1000);


      console.log(weatherHeader)
      weatherHeader.innerHTML = `
      <h4>${json.weather[0].description.toLowerCase()} | ${Math.round(json.main.temp)}°C</h4>
      <h4>sunrise ${sunriseStart.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}</h4>
      <h4>sunset ${sunsetStart.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}</h4>
      `; 

      setWeatherMessage(json.weather[0].description, json.name) // add city name as a parameter
    })

  

    .catch((error) => {
      console.error(error);
    });

      // Showcasing forecast of next five days.
      // Here we will inject the json data into the
      // html table related to the id = forecast-table
      displayForecast()

};



//https://api.openweathermap.org/data/2.5/onecall?lat=59.3326&lon=18.0649&exclude=hourly,minutely&appid=${cod}

const displayForecast = () => {
  //fetch(`https://api.openweathermap.org/data/2.5/onecall?q=Stockholm,Sweden&units=metric&APPID=${cod}`)
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=59.334591&lon=18.063240&exclude=hourly,minutely&units=metric&appid=${cod}`)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    // in this variable we will make sure it display only 5 days
    let forecastList; 

  
    if (json.daily.length > maxDayDisplay) {
      // if it has more than 5 days slice the rest
      forecastList = json.daily.slice(0, maxDayDisplay)
    } else {
      // if it has 5 or less display them
      forecastList = json.daily
    }

  // here we loop through every day of the list and inject the info on the html
    forecastList.forEach(day => {
      // Getting data to be displayed on each row.
      // convert the weird data number in a human readable date
      const date = new Date(day.dt * 1000)
      let dayName = date.toLocaleDateString("en-EN", {weekday: "short"})
     
      .toLowerCase(); 

     // round the decimals of the temperature
      const minTemp = Math.round(day.temp.min)
      const maxTemp = Math.round(day.temp.max)

      // Setting the data into the HTML table.
      forecastTable.innerHTML += `
      <tr>
          <td class="weekday">${dayName}</td>
          <td class="temperature"> ${maxTemp} ºC</td>
      </tr>
      `  
    })

  })
  .catch((error) => {
    console.error(error);
  });
  
}

WeatherData();

//  phrase that change depending on the weather 
const setWeatherMessage = (weather, cityName) => { // add parameter of weather & name here
  if    (weather.includes("thunderstorm")) {
    body.className = "thunderstorm"
    middleSection.innerHTML = `
    <img id=""weatherIcon"" class=""weather-icon"" src="Designs/Design-2/icons/noun_Umbrella_2030530.svg"/>
    <h1> A ${weather} awaits. Be safe. </h1>`

  }

  else if (weather.includes("drizzle")) {
    body.className = "drizzle"
    middleSection.innerHTML = `
    <img id=""weatherIcon"" class=""weather-icon"" src="Designs/Design-2/icons/noun_Umbrella_2030530.svg"/>
    <h1 > Today we can expect ${weather}. Don't forget your umbrella! </h1>`

    
  }

  else if (weather.includes("rain")) {
    body.className = "rain"
    middleSection.innerHTML = `
    <img id="weatherIcon" class="weather-icon" src="Designs/Design-2/icons/noun_Umbrella_2030530.svg"/>
    <h1> Today we can expect ${weather}. Don't forget your umbrella! </h1>`
  

  }

  else if (weather.includes("snow")) {
    body.className = "snow"
    middleSection.innerHTML = `
    <img id="weatherIcon" class="weather-icon" src="Designs/Design-2/icons/noun_Cloud_1188486.svg"/>
    <h1> Put those winter boots on and get ready for ${weather}. </h1>`


  }

  else if (weather.includes("atmosphere")) {
    body.className = "atmosphere"
    middleSection.innerHTML = `
    <img id="weatherIcon" class="weather-icon" src="Designs/Design-2/icons/noun_Cloud_1188486.svg"/>
    <h1>  today we are having  ${weather}.... </h1>`

  }


  else if (weather.includes("clear")) {
    body.className = "clear"
    middleSection.innerHTML = `
    <img id="weatherIcon" class="weather-icon" src="Designs/Design-2/icons/noun_Sunglasses_2055147.svg"/>    
    <h1> Woo-hoo! We have ${weather} today. Better enjoy it while it lasts. </h1>`


  }


  else if  (weather.includes("clouds")){
    body.className = "clouds"
    middleSection.innerHTML = `
    <img id="weatherIcon" class="weather-icon" src="Designs/Design-2/icons/noun_Cloud_1188486.svg"/>
    <h1 id="headline">  It's ${weather} in ${cityName} today. Perfect weather for a good cup of tea. </h1>`

  }

}

