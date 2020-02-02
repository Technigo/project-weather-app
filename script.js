const weatherContainer = document.getElementById("weather");
const tempContainer = document.getElementById("temp");
const sunriseContainer = document.getElementById("sunrise");
const sunsetContainer = document.getElementById("sunset");
const forcastContainer = document.getElementById("forcast");
const dayNames = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=f4893e301384d5deeafa555ccaa61aaa")
.then((response) => {
  return response.json();
})
.then((json) => {
  console.log(json);
  weatherContainer.innerHTML = `<h1> ${json.name} </h1>`;
  tempContainer.innerHTML = `<p>${json.weather[0].description}</p><p> | </p><p> ${json.main.temp.toFixed(1)} &#176;</p>`;
  
  //use to test different weatherbackgrounds
  //json.weather[0].description="mist"
  //${json.weather[0].description}

  if (json.weather[0].description.includes ("sun")){
    document.getElementById("backgroundContainer").classList.add("sunny");
    document.getElementById("weather").innerHTML = `<h1>Get your sunnies on. Stockholm is looking rather great today.</h1>`;    
  }
  else if(json.weather[0].description.includes ("rain")){
    document.getElementById("backgroundContainer").classList.add("rainy"); 
    document.getElementById("weather").innerHTML = `<h1>Dont forget your umbrella. Its wet in Stockholm today.</h1>`;       
  }
  else if(json.weather[0].description.includes ("cloud")){ 
    document.getElementById("backgroundContainer").classList.add("cloudy");
    document.getElementById("weather").innerHTML = `<h1>Light a fire and get cozy. Stockholm is looking grey today. </h1>`;
  }
  else{
    document.getElementById("backgroundContainer").classList.add("other");
    document.getElementById("weather").innerHTML = `<h1>Stockholm </h1>`;
  }
  
  let sunrise = new Date(json.sys.sunrise * 1000)
  let sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short' });
  
  let sunset = new Date(json.sys.sunset * 1000)
  let sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short' });
  
  sunriseContainer.innerHTML = `<p>sunrise ${sunriseTime} </p>`;
  sunsetContainer.innerHTML = `<p>sunset ${sunsetTime} </p>`;
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
      forcast += `<div class="forcastDayTemp"><p class="forecastDay">${dayNames[weatherDate.getDay()]}</p> <p class="forecastDay">${element.main.temp.toFixed(1)} &#176;</p></div>`;
      console.log(dayNames[weatherDate.getDay()]);
    }
  });
  forcastContainer.innerHTML = forcast;
});



