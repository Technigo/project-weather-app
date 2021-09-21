const API_URL =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=c51f401bafb99cdf6e4b149c98e89cc3";
const cityName = document.getElementById("name");
const temp = document.getElementById("temp");
const description = document.getElementById("description");

fetch(API_URL)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    console.log(json);
    console.log("city:", json.name);
    cityName.innerHTML = `
    <p>${json.name}</p>`;
    console.log("temp:", json.main.temp);
    const tempDecimal = json.main.temp.toFixed(1);
    console.log(tempDecimal);
    temp.innerHTML = `
    <p>${tempDecimal}°c</p>`;
    console.log("description:", json.weather[0].description);
    description.innerHTML = `
    <p>${json.weather[0].description}</p>`;
  });
