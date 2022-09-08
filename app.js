const container = document.getElementById("container");
const today = document.getElementById("details-today");
const forecast = document.getElementById("forecast");
fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=7d5ebdb08a9c797cf1689d3a1ad108be"
)
  .then((Response) => {
    return Response.json();
  })
  .then((data) => {
    container.innerHTML = `<h1>${data.name}</h1>
    <h3>${data.main.temp.toFixed(1)}</h3>
    <h4> ${data.weather[0].description} </h4>
    
    `;
    console.log(data);

    // Temp as a string with 1 decimal pointed;
    const temp = data.main.temp.toFixed(1);
    // console.log(Math.round(data.main.temp * 10) / 10);
  });

//*******  5 days weather forecast *********
fetch(
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=7d5ebdb08a9c797cf1689d3a1ad108be"
)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    console.log(json);

    const filteredForecast = json.list.filter((item) => item.dt);
    console.log("filtered forecast", filteredForecast);

    const filteredTemp = json.list.filter((item) =>
      item.dt_txt.includes("12:00")
    );
    console.log("filtered temp", filteredTemp);

    filteredTemp.forEach((item) => {
      weekdayName = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];
      const date = new Date(item.dt * 1000);
      let dayName = weekdayName[date.getDay()];
      forecast.innerHTML += `
            <div class="weekdays"> 
              <div class="weekday-name">
                      <p>${dayName}<p>
                      <div class="temp-weather">
                      <p>${item.main.temp.toFixed(1)} °C</p>
                      <p>${item.weather[0].main}</p>
                      </div>
                  </div>
              </div>`;
    });
  });
