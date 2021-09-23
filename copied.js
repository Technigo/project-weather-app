
// Idas förslag på vårt problem:
const API_URL_5DAY =
  "https://api.openweathermap.org/data/2.5/forecast?q=Gothenburg,Sweden&units=metric&APPID=affe19113e10ebc0685623d229879d1f";
  //Låter denna ligga kvar för nu.
const forecastContainer = document.getElementById("forecast-container");
fetch(API_URL_5DAY)
  .then((response) => response.json())
  .then((data) => {
    console.log("DATA!", data);
    const filteredForecast = data.list.filter((item) =>
      item.dt_txt.includes("12:00")
    );
    console.log("FILTEREDFORECAST!", filteredForecast);
    const currentGothenburgDate = new Date(filteredForecast[0].dt * 1000);
    console.log("CURRENT DATE", currentGothenburgDate);
    forecastContainer.innerHTML += `
    <h1>Datum:${currentGothenburgDate.getDay()}</h1>
    `
    /////// end of section /////////////
    forecastContainer.innerHTML += `
    <table>
    <th>Weekday</th>
    <th>Temperature</th>
    <tr>
     <td>${filteredForecast[0].dt}</td>
     <td class="degrees">${filteredForecast[0].main.temp.toFixed(1)} C°</td>
    
    </tr>
      </table>
      `;
    })
    
    //forecastContainer.innerHTML += `
  //   <table>
  //   <th>Weekday</th>
  //   <th>Temperature</th>
  //   <tr>
  //    <td>${filteredForecast[0].dt}</td>
  //    <td class="degrees">${filteredForecast[0].main.temp.toFixed(1)} C°</td>
    
  //   </tr>
  //   <tr>
  //    <td>${filteredForecast[1].dt_txt.substring(0, 10)}</td>
  //    <td class="degrees">${filteredForecast[1].main.temp.toFixed(1)} C°</td> 
  //   </tr>
  //   <tr>
  //    <td>${filteredForecast[2].dt_txt.substring(0, 10)}</td>
  //    <td class="degrees">${filteredForecast[2].main.temp.toFixed(1)} C°</td>
  //   </tr>
  //   <tr>
  //    <td>${filteredForecast[3].dt_txt.substring(0, 10)}</td>
  //    <td class="degrees">${filteredForecast[3].main.temp.toFixed(1)} C°</td>
  //   </tr>
  //   <tr>
  //    <td>${filteredForecast[4].dt_txt.substring(0, 10)}</td>
  //    <td class="degrees">${filteredForecast[4].main.temp.toFixed(1)} C°</td>
  //   </tr>
  //   </table>
  //  `;
  // })
  .catch((error) => console.error(error));


  // fetch(WEATHER_API_URL)
  // .then((res) => res.json())
  // .then((data) => {
  //   console.log("DATA", data);
 
  



  //   // const sunsetTaipeiDate = new Date(
  //   //   (data.sys.sunset + data.timezone + new Date().getTimezoneOffset() * 60) *
  //   //     1000
  //   const sunriseStockholmDate = new Date(
  //     (data.sys.sunrise + data.timezone + new Date().getTimezoneOffset() * 60) *
  //       1000
  //   );
  //   console.log("SUNRISE Stockholm", sunriseStockholmDate);
  //   const sunsetStockholmDate = new Date(
  //     (data.sys.sunset + data.timezone + new Date().getTimezoneOffset() * 60) *
  //       1000
  //   );
  //   console.log("SUNSET Stockholm", sunsetStockholmDate);
  // });



      ///////// weekdays /////////////////

    // const theDate = new Date(filteredForecast[0].dt_txt.substring(0, 10))
    // const weekday = new Array(7); //has to be named Array - dont know why
    // weekday[0] = "Sunday";
    // weekday[1] = "Monday";
    // weekday[2] = "Tuesday";
    // weekday[3] = "Wednesday";
    // weekday[4] = "Thursday";
    // weekday[5] = "Friday";
    // weekday[6] = "Saturday";
    // const correctDay = weekday[theDate.getDay()];
    // console.log("a weekday", correctDay)
