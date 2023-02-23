const searchBar = document.getElementById('searchBar')
const name = document.getElementById("name");
const tempMax = document.getElementById("tempmax");
const tempMin = document.getElementById("tempmin");
const description = document.getElementById("description");
const forecastTable = document.getElementById('forecast-table');

//global variables
let defaultCity = "Stockhoml";
const maxDayDisplay = 5;
const cod = "7309e4a5829fafe809df835ad95f18ea"


const WeatherData = () => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=${cod}`)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);
      // Setting basic information on the app and rounded numbers to first decimal.
      name.innerHTML = json.name;
      tempMax.innerHTML =  Math.round(json.main.temp_max);
      tempMin.innerHTML =  Math.round(json.main.temp_min);
      description.innerHTML = json.weather[0].description;


      console.log("HERE")
      console.log(json.weather[0].description)
      setWeatherMessage(json.weather[0].description)
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

WeatherData();

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



