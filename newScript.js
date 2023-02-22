
//DOM-selectors
const today = document.getElementById("weatherToday");
const dailyTextMsg = document.getElementById("dailyText");
const dayFive = document.getElementById("fiveDays");

const bodyColor =document.documentElement;


//api key
const apiKey = "4f9ca5d3e70c95a041bc513ac8b31ff8"


//Lisbon coordinates
const latitude = 38.7167
const longitude = -9.1333

const lisbonURL = `http://api.openweathermap.org/data/2.5/weather?q=Lisbon,Portugal&units=metric&APPID=${apiKey}`;
const fiveDayURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`


//This code fetches the data, turns it into json and passes it to other functions
fetch(lisbonURL)
  .then(response => response.json())
  .then(dataLis => {
    currentTemp(dataLis);      //functions for later use
    checkWeather(dataLis);
  
  })
  //.catch(error => console.error("errror is:" + error));


//Sunrise/sunset-function
const currentTemp = (dataLis) => {
  //console.log(`Just nu är det ${data.main.temp} grader varmt`);
 
 const sunriseTime = dataLis.sys.sunrise;
const sunsetTime = dataLis.sys.sunset;

const sunriseDate = new Date(sunriseTime * 1000);
const hours = sunriseDate.getHours() + ":" + sunriseDate.getMinutes();
const sunsetDate = new Date(sunsetTime * 1000);
const hoursSunset = sunsetDate.getHours() + ":" + sunsetDate.getMinutes()
const sunriseTimeString =sunriseDate.toLocaleTimeString();

const sunsetTimeString =sunsetDate.toLocaleTimeString();
console.log("Sunrise: " + sunriseTimeString)
console.log("Sunset: " + sunsetTimeString)
 
 
  today.innerHTML = `
    <p>${dataLis.weather[0].description} | ${Math.round(dataLis.main.temp)}°C</p>
   

    <div>
        <p class="sunrises" id="sunrise"> 
         Sunrise ${hours} </p>
        </div>
 
        
        <div>
        <p class="sunsets" id="sunset"> 
        Sunset ${hoursSunset} 
        </p>`

}


//Checks weather type (cloudy, clear, rainy)
const checkWeather = (dataLis) => {
    console.log(dataLis)
  console.log(dataLis.weather[0].main);

  if (dataLis.weather[0].main === 'Clouds'){
    dailyTextMsg.innerHTML=   `<div id="cloud" class="cloudy">
<img src="/Designs/Design-2/icons/noun_Cloud_1188486.svg" alt="">
    <p>oh oooo Its cloudy in ${dataLis.name} right now</p>
</div>`
bodyColor.style.setProperty('--primary-color', '#B5DCE9')}

    else if (dataLis.weather[0].main === 'Clear'){
      dailyTextMsg.innerHTML=  `<div id="sunGlasses" class="sunglasses">
      <img src="/Designs/Design-2/icons/noun_Sunglasses_2055147.svg" alt="">
        
      <p>it's sunny on ${dataLis.name} right now</p>
    </div>
    `
    } 
    else if (dataLis.weather[0].main === 'Fog'){
     dailyTextMsg.innerHTML=    
     `<div id="fog" class="fog">
  <img src="/Designs/Design-2/icons/noun_Umbrella_2030530.svg" alt="">
  <p>Fog on ${dataLis.name} right now</p>
</div>`
    }
    
    else {
      
     dailyTextMsg.innerHTML=  `<div id="umbrella" class="umbrellas">
  <img src="/Designs/Design-2/icons/noun_Umbrella_2030530.svg" alt="">
  <p>Raindropps on ${dataLis.name} right now</p>
</div>`
    };
};


//Five day forecast needs new API-call 
//fixa i css så de hamnar i linje med varandra
fetch(fiveDayURL)
.then(response => response.json())
.then(fiveDayData => {
  ///includes  data from everyday at 12.00 hours 

//Returns seven days
const filteredData = fiveDayData.list.filter(data => data.dt_txt.includes('12:00:00'));
//This part slices first five days
const sliceData= filteredData.slice(0, 5);

console.log(sliceData);


//function to show the data in html
sliceData.forEach(data => {
const day = new Date (data.dt_txt).toLocaleString('en-US', {weekday: 'short'});
const temp = Math.round(data.main.temp);


dayFive.innerHTML += `
        <p>${day}</p>
        <p>${temp}°C</p>
      `;


})

  }
  )
  
