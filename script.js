console.log("Hello world!");
const WEATHER_API =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=96cb0f55d34310e596ed4792c7800540";
const weatherContainer = document.getElementById("weather");

let wData = "";

const fetchData = () => {
  fetch(WEATHER_API)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log("This is data", data);
      console.log("This is data.main.temp", data.main.temp);

      weatherContainer.innerHTML = `
          <h3> Hello, the tempature is ${data.main.temp}</h3>
        `;
    })
    .catch((error) => {
      console.error("caught error", error);
    })
    .finally(() => {
      console.log("finished");
    });
};

fetchData();

// console.log("this is the wData", wData);

// weatherContainer.innerHTML = `
//   <h3> Hello, the tempature is ${wData}</h3>
// `;
