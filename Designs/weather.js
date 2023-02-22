const searchBar = document.getElementById('searchBar')
const name = document.getElementById("name");
const tempMax = document.getElementById("tempmax");
const tempMin = document.getElementById("tempmin");
const description = document.getElementById("description");
const forecastTable = document.getElementById('forecast-table');

//global variables
let defaultCity = "Stockhoml";
const maxDayDisplay = 5;
const cod = "93834bb23b2a9e80836d0a5415cc4a72"


const WeatherData = () => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=${cod}`)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);
      // Setting basic information on the app and rounded numbers to first decimal.
      name.innerHTML = json.name;
      tempMax.innerHTML = Number(json.main.temp_max).toFixed(1);
      tempMin.innerHTML = Number(json.main.temp_min).toFixed(1);
      description.innerHTML = json.weather[0].description;
    })
    .catch((error) => {
      console.error(error);
    });

      // Showcasing forecast of next five days.
      // Here we will inject the json data into the
      // html table related to the id = forecast-table
      displayForecast()
};

const displayForecast = () => {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=${cod}`)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    // in this variable we will make sure it display only 5 days
    let forecastList; 
  
    if (json.list.length > maxDayDisplay) {
      // if it has more than 5 days slice the rest
      forecastList = json.list.slice(0, maxDayDisplay)
    } else {
      // if it has 5 or less display them
      forecastList = json.list
    }

  // here we loop through every day of the list and inject the info on the html
    forecastList.forEach(day => {
      // Getting data to be displayed on each row.
      // convert the weird data number in a human readable date
      const date = new Date(day.dt * 1000)
      let dayName = date.toLocaleDateString("en-US", {weekday: "short"})
     // round the decimals of the temperature
      const minTemp = Math.round(day.main.temp_min)
      const maxTemp = Math.round(day.main.temp_max)

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