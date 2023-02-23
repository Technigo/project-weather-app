
const searchBar = document.getElementById ('searchBar')
const name = document.getElementById("name");
const tempMax = document.getElementById("tempmax");
const tempMin = document.getElementById("tempmin");
const description = document.getElementById("description");
const sunriseTime = document.getElementById("sunriseTime");
const sunsetTime = document.getElementById("sunsetTime");
const weatherHeader = document.getElementById("weatherHeader")
const forecastTable = document.getElementById('forecast-table');

//global variables
let defaultCity = "Stockholm";
const maxDayDisplay = 5;
const cod = "7309e4a5829fafe809df835ad95f18ea"




// url with our api id / stockholm as default city
const API_WEATHER = `https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=${cod}`

//url where we can choose position 
const API_FORECAST = `https://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=93834bb23b2a9e80836d0a5415cc4a72`



   // Setting basic information on the app and rounded numbers to first decimal.
      
      
   const weatherData = () => {
   fetch(API_WEATHER)
      
       .then((response) => {
      return response.json();
       })
      .then((json) => {
      console.log(json);
      
      name.innerHTML = json.name;
      tempMax.innerHTML =  Math.round(json.main.temp_max);
      tempMin.innerHTML =  Math.round(json.main.temp_min);
      description.innerHTML = json.weather[0].description;


      console.log(json.weather[0].description)
      setWeatherMessage(json.weather[0].description)
    })
    
     name.innerHTML = json.name;
      tempMax.innerHTML = json.main.temp_max;
      tempMin.innerHTML = json.main.temp_min;
      description.innerHTML = json.weather[0].description;

      const sunriseStart = new Date (json.sys.sunrise*1000); 
      const sunsetStart = new Date (json.sys.sunset*1000); 
      
      weatherHeader.innerHTML = `
      <p>${json.weather[0].description.toLowerCase()} | ${Math.round(json.main.temp)}°</p>
      <p>sunrise ${sunriseStart.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</p>
      <p>sunset ${sunsetStart.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</p>
      `; 
      
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
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,minutely&units=metric&appid=${cod}`)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    // in this variable we will make sure it display only 5 days
    let forecastList; 
    console.log(json)
    console.log(typeof(json.daily))
    console.log(json.daily[0])
  
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
     
      console.log(date)
      console.log(dayName)
     // round the decimals of the temperature
      const minTemp = Math.round(day.temp.min)
      const maxTemp = Math.round(day.temp.max)

      // Setting the data into the HTML table.
      forecastTable.innerHTML += `
      <tr>
          <td class="weekday">${dayName}</td>
          <td class="temperature">${minTemp} ºC / ${maxTemp} ºC</td>
      </tr>
      `  
    })

  })
  .catch((error) => {
    console.error(error);
  });
  
}

weatherData();

//  phrase that change depending on the weather 
const setWeatherMessage = (weather) => {
  if    (weather.includes("thunderstorm")) {
    description.innerHTML = `
    <h1> today we are having ${weather} ..... </h1>`


  }

  else if (weather.includes("drizzle")) {
    description.innerHTML = `
    <h1> today we are having ${weather} ..... </h1>`


    
  }

  else if (weather.includes("rain")) {
    description.innerHTML = `
    <h1> today we are having ${weather} ..... </h1>`

    

  }

  else if (weather.includes("snow")) {
    description.innerHTML = `
    <h1> today we are having ${weather} ..... </h1>`


  }

  else if (weather.includes("atmosphere")) {
    description.innerHTML = `
    <h1>  today we are having  ${weather}.... </h1>`

  }


  else if (weather.includes("clear")) {
    description.innerHTML = `
    <h1> today we are having ${weather} ..... </h1>`


  }


  else if  (weather.includes("clouds")){
    description.innerHTML = `
    <h1> today we are having ${weather} .....</h1>`

  }

}
=======
     

    })
      
    .catch((error) => {
      console.error(error);
    });
    
};







