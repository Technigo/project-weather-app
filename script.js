const container = document.getElementById("container");
const header = document.getElementById("header");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const weatherDescription = document.getElementById("weatherDescription");
const weatherImg = document.getElementById("weatherImg");
const fiveDaysForecast = document.getElementById("fiveDaysForecast");

//Weather Api
const APIKey = "496c5252f6db6014138471f722aa58d4";


fetch(`https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=${APIKey}`)
    .then((res)=>{
      return res.json();
    })
    .then(json => {
      console.log(json)
      const city = json.name;
      console.log("city:", city);
      const temp = json.main.temp; //13.8
      const tempRounded = Math.round(temp * 10) / 10;
      console.log("temp:", tempRounded);
      const weather = json.weather[0].description;
      console.log("type:", weather);
    })