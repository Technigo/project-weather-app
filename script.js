const API_URL =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=c51f401bafb99cdf6e4b149c98e89cc3";
const API_FORECAST = "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=c51f401bafb99cdf6e4b149c98e89cc3"
const cityName = document.getElementById("name");
const temp = document.getElementById("temp");
const description = document.getElementById("description");
const forecast = document.getElementById("forecast")

fetch(API_URL)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    // console.log(json);
    console.log("city:", json.name);
    cityName.innerHTML = `
    <p>${json.name}</p>`;

    console.log("temp:", json.main.temp);
    const tempDecimal = json.main.temp.toFixed(1);
    console.log(tempDecimal);
    temp.innerHTML = `
    <p>${tempDecimal}°C</p>`;

    console.log("description:", json.weather[0].description);
    description.innerHTML = `
    <p>${json.weather[0].description}</p>`;
  });

  fetch(API_FORECAST)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    console.log(json);
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
    console.log(`Filtered forecast:`,filteredForecast)



    filteredForecast.forEach((cast, index) => {
      const tempRightNow = filteredForecast[index].main.temp.toFixed(0)
      forecast.innerHTML += `
      <p>${tempRightNow}°C</p>`
    })

    // const filterForecastDecimal = filteredForecast[0].main.temp.toFixed(0)
    // const filterForecastDecimalTwo = filteredForecast[1].main.temp.toFixed(0)
    // const filterForecastDecimalThree = filteredForecast[2].main.temp.toFixed(0)
    // const filterForecastDecimalFour = filteredForecast[3].main.temp.toFixed(0)
    // const filterForecastDecimalFive = filteredForecast[4].main.temp.toFixed(0)
    // console.log(filterForecastDecimal)
    // forecast.innerHTML = `
    // <p>${filterForecastDecimal}°C</p>
    // <p>${filterForecastDecimalTwo}°C</p>
    // <p>${filterForecastDecimalThree}°C</p>
    // <p>${filterForecastDecimalFour}°C</p>
    // <p>${filterForecastDecimalFive}°C</p>`
  
  });
