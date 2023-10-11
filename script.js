const container = document.getElementById("container");
const header = document.getElementById("header");
const typeTemp = document.getElementById("typeTemp");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const weatherDescription = document.getElementById("weatherDescription");
const weatherImg = document.getElementById("weatherImg");
const fiveDaysForecast = document.getElementById("fiveDaysForecast");

//Weather Api
const APIKey = "496c5252f6db6014138471f722aa58d4";

// Function to fetch data in Stockholm
const fetchStockholmWeather = async () => {
  let stockholmUrl = `https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=${APIKey}`;

  await fetch(stockholmUrl)
    .then((res)=>{
      return res.json();
    })
    .then(json => {
      console.log(json)
      const city = json.name;
      console.log("city:", city);
      const temp = json.main.temp;
      const tempRounded = Math.round(temp * 10) / 10;
      console.log("temp:", tempRounded);
      const weather = json.weather[0].description;
      console.log("type:", weather);

      // Convert sunrise unix time to hours & minutes
      const sunriseTime = new Date(json.sys.sunrise * 1000);
      const sunriseHour = sunriseTime.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2});
      console.log(sunriseHour);
      const sunriseMinutes = sunriseTime.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2});
      console.log(sunriseMinutes);

      // Convert sunset unix time to hours & minutes
      const sunsetTime = new Date(json.sys.sunset * 1000);
      const sunsetHour = sunsetTime.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2});
      console.log(sunsetHour);
      const sunsetMinutes = sunsetTime.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2});
      console.log(sunsetMinutes);


      // Display image depending on weather type
      const weatherId = json.weather[0].id;
      console.log(weatherId);
      if (weatherId > 800) {
        weatherImg.innerHTML = `
          <img src="./design/design2/icons/cloud.svg" />
        `
      } else if (weatherId = 800) {
        weatherImg.innerHTML = `
          <img src="./design/design2/icons/sunnies.svg" />
        `
      } else if (weatherId > 700) {
        weatherImg.innerHTML = `
          <img src="./design/design2/icons/cloud.svg" />
        `
      } else {
        weatherImg.innerHTML = `
          <img src="./design/design2/icons/umbrella.svg" />
        `
      }

      // Display values in DOM
      typeTemp.innerHTML = `
        <h3>${weather} | ${tempRounded}&deg</h3>
      `
      sunrise.innerHTML = `
        <h3>sunrise ${sunriseHour}:${sunriseMinutes}</h3>
      `;
      sunset.innerHTML = `
        <h3>sunset ${sunsetHour}:${sunsetMinutes}</h3>
      `;
    }) 
    .catch((err) => console.log(error));
};

fetchStockholmWeather();