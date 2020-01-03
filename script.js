const weatherContainer = document.getElementById("weather");
const tempContainer = document.getElementById("temp");
const sunriseContainer = document.getElementById("sunrise");
const sunsetContainer = document.getElementById("sunset");
const forcastContainer = document.getElementById("forcast");
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=f4893e301384d5deeafa555ccaa61aaa")
.then((response) => {
  return response.json();
})
.then((json) => {
  console.log(json);
  weatherContainer.innerHTML = `<h1> ${json.name} </h1>`; 
  tempContainer.innerHTML = `<p>${json.main.temp.toFixed(1)} &#176;</p><p>${json.weather[0].description}</p>`;
  
  //use to test different weatherbackgrounds
  //json.weather[0].description="mist"

  if (json.weather[0].description.includes ("sun")){
    document.getElementById("backgroundContainer").classList.add("sunny");
    document.getElementById("weatherIcon").src="sunIcon.png";
      
  }
  else if(json.weather[0].description.includes ("rain")){
    document.getElementById("backgroundContainer").classList.add("rainy"); 
    document.getElementById("weatherIcon").src="rainIcon.png"; 
  }
  else if(json.weather[0].description.includes ("snow")){
    document.getElementById("backgroundContainer").classList.add("snowy");
    document.getElementById("weatherIcon").src="snowIcon.png";      
  }
  else if(json.weather[0].description.includes ("cloud")){ 
    document.getElementById("backgroundContainer").classList.add("cloudy");
    document.getElementById("weatherIcon").src="cloudsIcon.png";
  }
  else{
    document.getElementById("backgroundContainer").classList.add("other");
  }
  
  let sunrise = new Date(json.sys.sunrise * 1000)
  let sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short' });
  
  let sunset = new Date(json.sys.sunset * 1000)
  let sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short' });
  
  sunriseContainer.innerHTML = `<p>Sunrise ${sunriseTime} </p>`;
  sunsetContainer.innerHTML = `<p>Sunset ${sunsetTime} </p>`;
})

fetch("https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=f4893e301384d5deeafa555ccaa61aaa")
.then((response) => {
  return response.json()
})
.then((json) =>{
  console.log(json);
  let forcast = ""; 
  json.list.forEach((element) =>{
    let weatherDate = new Date(element.dt * 1000);
    console.log(weatherDate.getHours());
    if (weatherDate.getHours() === 13){
      forcast += `<div class="forcastDay">${dayNames[weatherDate.getDay()]}:</div>`;
      forcast += `<div class="forcastTemp">${element.main.temp.toFixed(1)} &#176;</div>`;
      forcast += `<div class="forcastDescription">${element.weather[0].description}</div>`;
      console.log(dayNames[weatherDate.getDay()]);
    }
  });
  forcastContainer.innerHTML = forcast;
});
// container2.innerHTML = `<p>Wed: ${json.list[8].main.temp.toFixed(1)} &#176; ${json.list[8].weather[0].description}</p> <p> Thu: ${json.list[16].main.temp.toFixed(1)} &#176; ${json.list[16
// ].weather[0].description}</p> <p> Fri: ${json.list[24].main.temp.toFixed(1)} &#176; ${json.list[24].weather[0].description}</p> <p> Sat: ${json.list[32].main.temp.toFixed(1)} &#176; ${json.list[32].weather[0].description}</p>` 
  



